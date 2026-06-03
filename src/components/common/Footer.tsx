/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Send, ShieldCheck, HelpCircle, FileText, Heart } from 'lucide-react';
import { useAppState } from '../../store/StateContext';
import { CATEGORIES } from '../../data/products';

export const Footer: React.FC = () => {
  const { addNotification } = useAppState();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      addNotification(
        'Newsletter Joined!',
        `Your mail of "${email}" was logged. Prepared to receive exclusive coupon codes monthly!`,
        'success'
      );
      setEmail('');
    }
  };

  return (
    <footer className="relative mt-auto border-t border-white/8 bg-slate-950 text-slate-400">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.05),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.05),transparent_40%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-white/10">
          
          {/* Brand/Inspirational tagline */}
          <div className="col-span-1 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-purple to-brand-cyan">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white tracking-wider">NEBULA</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              We curate premier software products, 3D templates, design systems, and audio presets built to help developers and creatives ship stunning projects instantly.
            </p>
            <div className="flex gap-4 text-xs font-semibold text-slate-500">
              <span>Secure Transactions</span>
              <span>•</span>
              <span>Direct Downloads</span>
            </div>
          </div>

          {/* Quick links & Categories */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 space-y-3">
            <h5 className="font-display font-semibold text-xs text-white uppercase tracking-wider">Explore</h5>
            <div className="flex flex-col gap-2 text-xs">
              <Link to="/marketplace" className="hover:text-white transition-colors cursor-pointer">All Products</Link>
              <Link to="/marketplace?cat=templates" className="hover:text-white transition-colors cursor-pointer">React Templates</Link>
              <Link to="/marketplace?cat=design" className="hover:text-white transition-colors cursor-pointer">Figma Projects</Link>
              <Link to="/marketplace?cat=assets-3d" className="hover:text-white transition-colors cursor-pointer">3D models</Link>
            </div>
          </div>

          <div className="col-span-1 sm:col-span-2 lg:col-span-2 space-y-3">
            <h5 className="font-display font-semibold text-xs text-white uppercase tracking-wider">Support</h5>
            <div className="flex flex-col gap-2 text-xs">
              <Link to="/dashboard" className="hover:text-white transition-colors cursor-pointer">Dashboard</Link>
              <Link to="/marketplace" className="hover:text-white transition-colors cursor-pointer">How It Works</Link>
              <span className="hover:text-white transition-colors cursor-default">Author Licensing</span>
              <span className="hover:text-white transition-colors cursor-default">API Documentation</span>
            </div>
          </div>

          {/* Subscription Card */}
          <div className="col-span-1 lg:col-span-4 space-y-3">
            <h5 className="font-display font-semibold text-xs text-white uppercase tracking-wider">Newsletter Subscription</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sign up to receive 15% off discount codes, creative advice, and direct dev content drops. Unsubscribe anytime.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs placeholder-slate-500 text-white focus:outline-none focus:border-brand-purple"
                placeholder="developer@nebula.io"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-white text-slate-950 font-bold text-xs hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3 h-3" /> Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Categories Line Wise list */}
        <div className="py-4 my-2 border-t border-b border-white/5 text-[11px] text-slate-500 overflow-x-auto scrollbar-none whitespace-nowrap">
          <div className="flex items-center gap-2 sm:gap-4 md:justify-center">
            <span className="font-semibold text-slate-300 uppercase tracking-widest text-[9px]">Direct Channels:</span>
            {CATEGORIES.map((cat, idx) => (
              <React.Fragment key={cat.id}>
                {idx > 0 && <span className="text-white/10 select-none">|</span>}
                <Link
                  to={`/marketplace?cat=${cat.id}`}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  {cat.name}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Footer Bottom elements */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Nebula Marketplace Inc. All rights reserve-loaded. Built in sandbox.</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Full SSL Encrypted checkout</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
              <span>for Creators</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
