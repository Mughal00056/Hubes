/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, Key, Eye, EyeOff, Loader2, Mail, User, ShieldCheck, ArrowRight, ArrowLeft, ArrowUpRight
} from 'lucide-react';
import { useAppState } from '../store/StateContext';

export const Auth: React.FC = () => {
  const { updateUserProfile, addNotification } = useAppState();
  const navigate = useNavigate();

  // Selected state
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot' | 'reset'>('login');
  
  // Input fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitting(true);

    // Form inputs validation
    if (activeTab === 'register' && !name.trim()) {
      setAuthError('Name is required to register a sandbox profile.');
      setIsSubmitting(false);
      return;
    }

    if (!email.trim() || !pw.trim()) {
      setAuthError('Email and Password references are required.');
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      setIsSubmitting(false);

      if (activeTab === 'register') {
        // Sync registered sandbox user to ledger store
        updateUserProfile({
          name,
          email,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
          balance: 100.00, // starting sandbox balance reward!
          joinedDate: new Date().toLocaleDateString([], { month: 'long', year: 'numeric' })
        });

        addNotification(
          'Profile Registered',
          `Welcome aboard, "${name}"! Your test ledger was credited $100.00 as a sandbox grant.`,
          'success'
        );
      } else {
        // Login simulation
        addNotification(
          'Login Successful',
          `Successfully authenticated. Welcome back to Nebula digital space!`,
          'success'
        );
      }

      // Route immediately to profile dashboard
      navigate('/dashboard');
    }, 1200);
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      addNotification(
        'Email Dispatched',
        `We dispatched a simulated reset token code to ${email}. Check sandbox templates.`,
        'success'
      );
      setActiveTab('reset');
    }, 1000);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      addNotification(
        'Password Revised',
        'Credentials restored successfully. Log in using your revised credentials.',
        'success'
      );
      setActiveTab('login');
      setPw('');
    }, 1000);
  };

  return (
    <div className="relative overflow-hidden bg-slate-950 min-h-screen text-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Glow background lamps */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        
        {/* Logo label */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-cyan shadow-lg shadow-purple-500/20">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <h2 className="font-display font-bold text-2xl tracking-tight text-white uppercase sm:text-3xl">
            Nebula Account
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Access secure digital code bases and templates instantly.
          </p>
        </div>

        {/* Card Box container */}
        <div className="rounded-2xl border border-white/8 bg-slate-900/30 backdrop-blur-md p-6 shadow-2xl space-y-6">
          
          <AnimatePresence mode="wait">
            
            {/* LOGIN / SIGNUP VIEW SECTION */}
            {(activeTab === 'login' || activeTab === 'register') && (
              <motion.div
                key="auth-login-register"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Tabs toggler */}
                <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1.5 rounded-xl border border-white/5 text-xs text-center font-semibold leading-none">
                  <button
                    onClick={() => {
                      setActiveTab('login');
                      setAuthError('');
                    }}
                    className={`py-2 rounded-lg cursor-pointer transition-colors ${
                      activeTab === 'login' ? 'bg-brand-purple text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Authenticate Login
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('register');
                      setAuthError('');
                    }}
                    className={`py-2 rounded-lg cursor-pointer transition-colors ${
                      activeTab === 'register' ? 'bg-brand-purple text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Register Sandbox
                  </button>
                </div>

                {/* Form fields */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {activeTab === 'register' && (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-brand-purple"
                          placeholder="Your Name (e.g., Joshua)"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Email reference</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-brand-purple"
                        placeholder="developer@nebula.io"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Secret Password</label>
                      {activeTab === 'login' && (
                        <button
                          type="button"
                          onClick={() => setActiveTab('forgot')}
                          className="text-[10px] font-semibold text-brand-cyan hover:underline hover:text-brand-purple cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Key className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                      <input
                        type={showPw ? 'text' : 'password'}
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        className="w-full pl-9 pr-[40px] py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-brand-purple"
                        placeholder={activeTab === 'register' ? 'Choose strong character' : '••••••••'}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw(!showPw)}
                        className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 cursor-pointer"
                      >
                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {authError && (
                    <p className="text-[11px] font-semibold text-rose-450 text-rose-400">{authError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-lg bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin text-brand-purple" />
                    ) : activeTab === 'login' ? (
                      'Inquire Login'
                    ) : (
                      'Initiate Platform Register'
                    )}
                  </button>

                </form>
              </motion.div>
            )}

            {/* FORGOT PASSWORD VIEW */}
            {activeTab === 'forgot' && (
              <motion.div
                key="auth-forgot"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                <div>
                  <button
                    onClick={() => setActiveTab('login')}
                    className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Return to Login
                  </button>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-white">Reset Credentials Request</h3>
                  <p className="text-[11px] text-slate-400">
                    Provide your recovery email address below to receive sandbox password setup coordinates.
                  </p>
                </div>

                <form onSubmit={handleRecoverySubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Email input</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none"
                        placeholder="your-email@nebula.io"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-lg bg-white hover:bg-slate-200 text-slate-950 text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Reset Link'}
                  </button>
                </form>
              </motion.div>
            )}

            {/* RESET PASSWORD SETTINGS FORM */}
            {activeTab === 'reset' && (
              <motion.div
                key="auth-reset"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-white">Choose New Password</h3>
                  <p className="text-[11px] text-slate-400">
                    Verify reset coordinates and write your revised secret code.
                  </p>
                </div>

                <form onSubmit={handleResetSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">New Password Code</label>
                    <input
                      type="password"
                      value={pw}
                      onChange={(e) => setPw(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none"
                      placeholder="At least 6 symbols"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Repeat password reference</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none"
                      placeholder="Repeat accurately"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-brand-purple to-brand-cyan text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Authorize Password Reset'}
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* Developer Sandbox Note */}
        <div className="bg-white/[0.01] border border-white/5 rounded-xl p-4 text-[10px] leading-relaxed text-slate-500">
          <p className="font-semibold text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-cyan" /> Secure Dev Sandbox Isolation:
          </p>
          <p className="mt-1">
            Registration simulates setting up true profiles in client-local indices. Since this is an offline-capable frontend mock, click register directly to receive a initial balance of $100.00 to complete your test checkout experiences!
          </p>
        </div>

      </div>
    </div>
  );
};
