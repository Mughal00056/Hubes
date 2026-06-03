/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Tag, ShieldCheck, ArrowRight, Minus, Plus } from 'lucide-react';
import { useAppState } from '../../store/StateContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const {
    cart, removeFromCart, updateCartQuantity, appliedCoupon,
    applyCouponCode, removeCoupon
  } = useAppState();

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const itemsCount = cart.length;

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = subtotal * (appliedCoupon.discountValue / 100);
    } else if (appliedCoupon.discountType === 'fixed') {
      discount = appliedCoupon.discountValue;
    }
  }

  const finalTotal = Math.max(0, subtotal - discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    if (!couponInput.trim()) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    const res = applyCouponCode(couponInput);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponInput('');
    } else {
      setCouponError(res.message);
    }
  };

  const handleCheckoutRedirect = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Drawer Sidebar Frame */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-950 border-l border-white/8 shadow-2xl flex flex-col h-full text-slate-100"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-purple" />
                <h3 className="font-semibold text-lg">My Shopping Cart ({itemsCount})</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-900 rounded-xl text-slate-400 hover:text-slate-200 transition-colors"
                title="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List Body */}
            <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-slate-500 text-center">
                  <div className="w-12 h-12 rounded-full border border-dashed border-slate-700 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-6 h-6 text-slate-600" />
                  </div>
                  <p className="text-sm font-semibold">Your cart is currently empty</p>
                  <p className="text-xs text-slate-600 mt-1 max-w-xs">
                    Explore our collection of templates, icons, presets and plugins to start building.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 rounded-xl border border-white/5 bg-white/[0.01]"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-16 h-12 object-cover rounded-lg bg-slate-950 border border-white/10 flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between gap-1.5">
                        <h4 className="font-semibold text-slate-200 text-xs truncate">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-slate-900 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5 truncate uppercase tracking-wider font-mono">
                        {item.product.fileType}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2.5">
                        {/* Quantity picker */}
                        <div className="flex items-center border border-white/10 rounded-lg overflow-hidden bg-slate-900">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 px-2 hover:bg-white/5 text-slate-400 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold select-none font-mono text-slate-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 px-2 hover:bg-white/5 text-slate-400 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Total Single Row Price */}
                        <span className="font-mono text-xs font-bold text-slate-200">
                          ${(item.product.price * item.quantity).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Calculations & Cart Summary Block */}
            {cart.length > 0 && (
              <div className="border-t border-white/10 bg-slate-950 p-4 sm:p-6 space-y-4 relative">
                
                {/* Coupon Coupon Box element */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Discount Coupon</span>
                    {appliedCoupon && (
                      <button
                        onClick={removeCoupon}
                        className="text-[10px] text-rose-400 hover:underline cursor-pointer"
                      >
                        Remove ({appliedCoupon.code})
                      </button>
                    )}
                  </div>

                  {!appliedCoupon ? (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <div className="relative flex-grow">
                        <Tag className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs placeholder-slate-500 text-white focus:outline-none focus:border-brand-purple uppercase"
                          placeholder="PROMO CODE (e.g., COSMIC20)"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-3 rounded-lg border border-white/10 bg-slate-900 text-xs font-bold text-slate-300 hover:bg-slate-800 cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  ) : (
                    <div className="p-2.5 rounded-lg border border-emerald-500/10 bg-emerald-500/5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                        <Tag className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-semibold font-mono">CODE: {appliedCoupon.code}</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-400">
                        {appliedCoupon.discountType === 'percentage' ? `-${appliedCoupon.discountValue}%` : `-$${appliedCoupon.discountValue}`}
                      </span>
                    </div>
                  )}

                  {couponError && <p className="text-[10px] font-semibold text-rose-400 pl-0.5">{couponError}</p>}
                  {couponSuccess && <p className="text-[10px] font-semibold text-emerald-400 pl-0.5">{couponSuccess}</p>}
                </div>

                {/* Subtotals List Grid */}
                <div className="space-y-2 border-t border-white/5 pt-4 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-mono text-slate-200">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center justify-between text-emerald-400">
                      <span>Promo Discount</span>
                      <span className="font-mono">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-dashed border-white/10">
                    <span className="font-semibold text-slate-100">Estimated Total</span>
                    <span className="font-mono font-bold text-base text-brand-cyan">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Delivery Pledge */}
                <div className="p-2 rounded bg-white/[0.02] text-[10px] text-slate-500 leading-tight flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Downloads and custom serial activation licenses delivered instantly to your downloads grid.</span>
                </div>

                <button
                  onClick={handleCheckoutRedirect}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-brand-purple to-brand-cyan text-xs font-bold text-white hover:opacity-95 shadow-lg shadow-purple-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Proceed to Checkout <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
