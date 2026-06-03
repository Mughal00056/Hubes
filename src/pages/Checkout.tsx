/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  CreditCard, ShieldCheck, ArrowLeft, ArrowRight, ShoppingCart, Tag, CheckCircle,
  Download, Wallet, Terminal, HelpCircle, HardDrive, Key, Copy, Check
} from 'lucide-react';
import { useAppState } from '../store/StateContext';

export const Checkout: React.FC = () => {
  const {
    cart, user, appliedCoupon, triggerCheckout, addNotification, clearCart
  } = useAppState();

  const navigate = useNavigate();

  // Basic States
  const [billingName, setBillingName] = useState(user.name);
  const [billingEmail, setBillingEmail] = useState(user.email);
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'balance' | 'card' | 'crypto'>('balance');
  const [checkoutError, setCheckoutError] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // CC details simulation states
  const [ccNum, setCcNum] = useState('');
  const [ccExp, setCcExp] = useState('');
  const [ccCvv, setCcCvv] = useState('');

  // Calculations
  const subtotal = cart.reduce((acc, c) => acc + (c.product.price * c.quantity), 0);
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = subtotal * (appliedCoupon.discountValue / 100);
    } else if (appliedCoupon.discountType === 'fixed') {
      discount = appliedCoupon.discountValue;
    }
  }
  const finalTotal = Math.max(0, subtotal - discount);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError('');

    if (cart.length === 0) {
      setCheckoutError('Your shopping cart is empty.');
      return;
    }

    if (paymentMethod === 'card') {
      if (!ccNum || !ccExp || !ccCvv) {
        setCheckoutError('Please enter valid credit card details.');
        return;
      }
    }

    // Call Context action
    const res = triggerCheckout(
      { name: billingName, email: billingEmail, address: postalCode },
      paymentMethod
    );

    if (res.success) {
      setCheckoutSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCheckoutError(res.error || 'Something went wrong during checkout.');
    }
  };

  const handleCopy = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedKey(txt);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // SUCCESS SUB-SCREEN (Fully animated)
  if (checkoutSuccess) {
    // We generate dummy success codes matching their order code block in context
    const simulatedOrderCode = `ORD-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(3, 7).toUpperCase()}`;

    return (
      <div className="relative overflow-hidden bg-slate-950 min-h-screen text-slate-100 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        
        {/* Background cosmic glow */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-brand-cyan/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl rounded-2xl border border-emerald-500/30 bg-slate-900/40 backdrop-blur-md p-6 sm:p-10 space-y-6 sm:space-y-8 text-center shadow-2xl relative z-10"
        >
          
          {/* Check icon */}
          <div className="flex flex-col items-center gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20"
            >
              <CheckCircle className="w-8 h-8" />
            </motion.div>
            <div className="space-y-1">
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">Checkout Completed!</h1>
              <p className="text-xs sm:text-sm text-slate-400 leading-normal max-w-md">
                We processed your sandbox test purchase successfully. Files and product registrations are ready inside your local repository.
              </p>
            </div>
          </div>

          {/* Sandbox order registration badge */}
          <div className="rounded-xl border border-white/5 bg-slate-950/60 p-4 space-y-3.5 text-xs text-left">
            <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono tracking-widest border-b border-white/5 pb-2">
              <span>SANDBOX RECEIPT</span>
              <span>CODE: {simulatedOrderCode}</span>
            </div>
            
            <div className="space-y-2 text-slate-300 divide-y divide-white/5 max-h-36 overflow-y-auto pr-1">
              <div className="flex justify-between items-center py-1">
                <span className="font-semibold text-slate-400">Transaction Status</span>
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">Processed</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-slate-400">Simulated Method</span>
                <span className="font-mono text-slate-200 capitalize">{paymentMethod} ledger block</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-slate-400">Est. Price charged</span>
                <span className="font-mono text-slate-200">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.01] border border-white/5 p-3.5 rounded-lg text-[10px] leading-relaxed text-slate-400 text-left flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-brand-cyan flex-shrink-0" />
            <span>
              Your secure digital license key was updated inside the sandbox. Navigate directly below to view activation numbers and immediately download compilation folders.
            </span>
          </div>

          {/* Nav Links */}
          <div className="grid grid-cols-2 gap-3.5 pt-2">
            <Link
              to="/"
              className="py-3 px-4 rounded-xl border border-white/10 hover:border-white/20 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors"
            >
              Back Home
            </Link>
            <Link
              to="/purchases"
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 text-white shadow-lg shadow-purple-500/20"
            >
              My Purchases
            </Link>
          </div>

        </motion.div>
      </div>
    );
  }

  // STANDARD CHECKOUT BILLING LAYOUT
  return (
    <div className="relative overflow-hidden bg-slate-950 min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Back Link breadcrumbs */}
        <div>
          <Link
            to="/marketplace"
            className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back to Catalog
          </Link>
        </div>

        {/* Double-column billing grids */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Billing fields and payment selectors */}
          <div className="col-span-1 lg:col-span-7 space-y-6">
            <div className="rounded-xl border border-white/8 bg-slate-900/30 backdrop-blur-md p-5 sm:p-6 space-y-6">
              
              <h2 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight border-b border-white/8 pb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-purple animate-pulse" /> Sandbox Checkout Portal
              </h2>

              <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                
                {/* Section 1: Billing Fields */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">1. Client Billing</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Client Name</label>
                      <input
                        type="text"
                        value={billingName}
                        onChange={(e) => setBillingName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-brand-purple"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Billing Email</label>
                      <input
                        type="email"
                        value={billingEmail}
                        onChange={(e) => setBillingEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-brand-purple"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Postal Zip Code (Billing Reference)</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-brand-purple"
                      placeholder="e.g. M13 9PL"
                      required
                    />
                  </div>
                </div>

                {/* Section 2: Payment Choices list */}
                <div className="space-y-4 border-t border-white/5 pt-5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">2. Select Payment method</h3>
                  
                  <div className="grid grid-cols-3 gap-2.5">
                    
                    {/* Method 1: Ledger Balance */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('balance')}
                      className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                        paymentMethod === 'balance'
                          ? 'border-brand-purple bg-brand-purple/10 text-white shadow-lg shadow-brand-purple/5'
                          : 'border-white/10 hover:border-white/20 text-slate-400'
                      }`}
                    >
                      <Wallet className="w-4 h-4 text-brand-purple" />
                      <span className="text-[10px] font-semibold block uppercase">Ledger Wallet</span>
                    </button>

                    {/* Method 2: CC card */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-brand-cyan bg-brand-cyan/10 text-white shadow-lg shadow-brand-cyan/5'
                          : 'border-white/10 hover:border-white/20 text-slate-400'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-brand-cyan" />
                      <span className="text-[10px] font-semibold block uppercase">Credit card</span>
                    </button>

                    {/* Method 3: Crypto */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('crypto')}
                      className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                        paymentMethod === 'crypto'
                          ? 'border-brand-pink bg-brand-pink/10 text-white shadow-lg shadow-brand-pink/5'
                          : 'border-white/10 hover:border-white/20 text-slate-400'
                      }`}
                    >
                      <Terminal className="w-4 h-4 text-brand-pink" />
                      <span className="text-[10px] font-semibold block uppercase">Crypto Dev</span>
                    </button>

                  </div>

                  {/* Payment Choices Detail Blocks */}
                  <div className="bg-slate-900 border border-white/5 rounded-xl p-4 mt-2">
                    {paymentMethod === 'balance' && (
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center justify-between text-slate-300">
                          <span>Developer Ledger Wallet Balance</span>
                          <span className="font-mono font-bold text-slate-200">${user.balance.toFixed(2)}</span>
                        </div>
                        {finalTotal > user.balance ? (
                          <div className="p-2.5 rounded border border-rose-500/20 bg-rose-500/5 mt-2 flex flex-col gap-1.5 text-xs">
                            <p className="text-rose-400 font-semibold leading-normal">
                              Warning: Ledger Balance insufficient. Top up your ledger instantly by clicking the top-right navbar profile menu or switch methods!
                            </p>
                          </div>
                        ) : (
                          <p className="text-[10px] text-slate-500 leading-tight">
                            Safe and rapid sandbox ledger debit deduction. No real money required.
                          </p>
                        )}
                      </div>
                    )}

                    {paymentMethod === 'card' && (
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-semibold text-slate-500 uppercase">Card Number (Sandbox)</label>
                          <input
                            type="text"
                            value={ccNum}
                            onChange={(e) => setCcNum(e.target.value.replace(/\D/g, '').slice(0, 16))}
                            className="w-full px-2.5 py-1.5 bg-slate-950 border border-white/5 rounded text-xs text-slate-200 font-mono"
                            placeholder="4111 2222 3333 4444"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] font-semibold text-slate-500 uppercase">Expiry date</label>
                            <input
                              type="text"
                              value={ccExp}
                              onChange={(e) => setCcExp(e.target.value.slice(0, 5))}
                              className="w-full px-2.5 py-1.5 bg-slate-950 border border-white/5 rounded text-xs text-slate-200 font-mono"
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-semibold text-slate-500 uppercase">CVV Number</label>
                            <input
                              type="password"
                              value={ccCvv}
                              onChange={(e) => setCcCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                              className="w-full px-2.5 py-1.5 bg-slate-950 border border-white/5 rounded text-xs text-slate-200 font-mono"
                              placeholder="771"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'crypto' && (
                      <div className="text-xs text-slate-400 space-y-1 pb-1">
                        <span className="font-mono text-slate-300 font-semibold flex items-center gap-1">
                          SOLANA BLOCK ADDRESS: <strong className="text-[11px] text-brand-pink select-all bg-white/5 px-1 py-0.5 rounded">Neb7X4A8N...93F</strong>
                        </span>
                        <p className="text-[10px] text-slate-500 leading-tight">
                          Transfer assets parameters. Click "Authorize Sandbox transaction" below to simulate transaction ledger confirmation automatically.
                        </p>
                      </div>
                    )}
                  </div>

                </div>

                {checkoutError && (
                  <p className="text-xs font-semibold text-rose-400 pl-0.5">{checkoutError}</p>
                )}

                <button
                  type="submit"
                  disabled={paymentMethod === 'balance' && finalTotal > user.balance}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-brand-purple to-brand-cyan text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 text-white shadow-lg shadow-purple-500/20 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Authorize Sandbox transaction <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </form>

            </div>
          </div>

          {/* Right Column: Order breakdown summaries */}
          <div className="col-span-1 lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="rounded-xl border border-white/8 bg-slate-900/30 backdrop-blur-md p-5 sm:p-6 space-y-6 text-slate-200">
              
              <h3 className="font-display font-bold text-xs uppercase tracking-widest text-slate-400 border-b border-white/8 pb-2">
                Order Summary ({cart.length} items)
              </h3>

              {cart.length === 0 ? (
                <div className="py-6 text-center text-slate-500 text-xs">
                  Your checkout bundle is currently empty.
                </div>
              ) : (
                <div className="divide-y divide-white/5 max-h-56 overflow-y-auto space-y-2.5 pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-3 py-2 items-center">
                      <img
                        src={item.product.image}
                        alt=""
                        className="w-12 h-9 object-cover rounded bg-slate-950"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-grow min-w-0">
                        <h4 className="font-semibold text-xs text-slate-200 truncate">{item.product.title}</h4>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono truncate block">
                          {item.product.fileType}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-300">
                        ${(item.product.price * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Subtotal metrics items */}
              <div className="space-y-2 border-t border-white/5 pt-4 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-slate-200">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-emerald-400">
                    <span>Discount code coupon</span>
                    <span className="font-mono">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm pt-2 border-t border-dashed border-white/10">
                  <span className="font-semibold text-slate-100">Sandbox Charge Total</span>
                  <span className="font-mono font-bold text-base text-brand-cyan">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Security indicators */}
              <div className="flex items-center gap-1.5 pt-2 text-[10px] justify-center text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Encrypted secure checkout. No funds risk in database.</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
