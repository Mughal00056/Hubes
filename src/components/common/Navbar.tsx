/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, Search, Heart, ShoppingCart, Bell, User, LogOut, Sun, Moon,
  ChevronDown, CreditCard, Plus, HelpCircle, Check, Sparkles, MessageSquare,
  Upload, Image, FileText, Send
} from 'lucide-react';
import { useAppState } from '../../store/StateContext';
import { CATEGORIES } from '../../data/products';

interface NavbarProps {
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const {
    user, cart, wishlist, notifications, theme, toggleTheme,
    markNotificationRead, markAllNotificationsRead, clearAllNotifications, addFunds,
    addCustomProduct
  } = useAppState();

  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [fundsModalOpen, setFundsModalOpen] = useState(false);
  const [addAmount, setAddAmount] = useState('50');

  // Customized Logos and Thumbnails creator modal state
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);
  const [creatorTab, setCreatorTab] = useState<'logo' | 'thumbnail'>('logo');
  const [customName, setCustomName] = useState('');
  const [customPNGUrl, setCustomPNGUrl] = useState('');
  const [customCategory, setCustomCategory] = useState('logos');
  const [customFile, setCustomFile] = useState('');
  const [customPrice, setCustomPrice] = useState('19');
  const [customDescription, setCustomDescription] = useState('');

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const cartItemCount = cart.length;

  const handleAddFundsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(addAmount);
    if (!isNaN(val) && val > 0) {
      addFunds(val);
      setFundsModalOpen(false);
    }
  };

  const handleCustomProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isLogo = customCategory === 'logos';
    const isThumbnail = customCategory === 'thumbnails';
    
    const finalPNGUrl = customPNGUrl.trim() || (isLogo
      ? 'https://images.unsplash.com/photo-1618005198143-d3663efd8ccd?auto=format&fit=crop&w=500&q=80'
      : isThumbnail
        ? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80'
        : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80');
    
    const finalName = customName.trim() || (isLogo
      ? 'Custom Premium Corporate Logo Vector'
      : isThumbnail
        ? 'Ultimate Clickbait Viral Thumbnail Layout'
        : 'Custom Artistic Template Pack');
        
    const finalFile = customFile.trim() || (isLogo
      ? 'Master SVG File + Transparent PNG (4.5 MB)'
      : isThumbnail
        ? 'Ultra HD JPG + Layered Figma File (18.2 MB)'
        : 'High-res Digital Asset Package (12.0 MB)');
        
    const priceNum = parseFloat(customPrice) || 19;
    
    const finalDesc = customDescription.trim() || (isLogo
      ? 'Professional standard personalized company brandmark or symbolic asset. Designed with perfect geometry alignment parameters, transparent background alpha transparency layers, and clean vector anchors.'
      : isThumbnail
        ? 'High CTR social cover artwork scaled to exact 16:9 pixel grids. Perfect for high performance YouTube presentation decks, rich Twitch banners, or tech tutorial showcases.'
        : 'High-fidelity customizable visual layouts catalogued with high-performance specs. Built with scalable PNG elements, transparent alpha layers, and beautiful visual density constraints.');

    const generatedId = `custom-prod-${Date.now()}`;
    const newProduct = {
      id: generatedId,
      title: finalName,
      description: finalDesc.slice(0, 150) + '...',
      detailedDescription: finalDesc,
      features: isLogo ? [
        '100% Transparent PNG render layout included',
        'Includes editable master SVG/vector nodes',
        'Commercial premium sandbox license pre-cleared',
        'Fully responsive visual framing metrics'
      ] : isThumbnail ? [
        'High contrast graphic composition optimized for CTR',
        'Fully editable layered master project file included',
        'Responsive color variants (Dark/Light setup pre-configured)',
        'Royalty-free premium elements layout pre-packed'
      ] : [
        'Highly modular customizable design assets',
        'Organized styles and component definitions',
        'Ready-to-use vector exports',
        'Full customer support and updates path'
      ],
      price: priceNum,
      rating: 5.0,
      reviewsCount: 1,
      category: customCategory,
      image: finalPNGUrl,
      gallery: [finalPNGUrl],
      fileSize: isLogo ? '4.5 MB' : isThumbnail ? '18.2 MB' : '12.0 MB',
      fileType: finalFile,
      isNew: true,
      salesCount: 1,
      tags: isLogo
        ? ['Customized', 'Branding', 'Artwork', 'PNG Logo', 'Corporate']
        : isThumbnail
          ? ['Thumbnail', 'YouTube', 'Social Cover', 'CTR Boost', 'PSD Layered']
          : ['Customized', 'Sandbox', 'Visuals', 'Templates'],
      author: user.name || 'Amelia Sterling',
      license: 'Commercial License'
    };

    addCustomProduct(newProduct);
    
    // Clear inputs and dismiss modal
    setCustomName('');
    setCustomPNGUrl('');
    setCustomFile('');
    setCustomDescription('');
    setCreatorModalOpen(false);

    // Redirect user to the specific channel category inside Marketplace to view their creation!
    navigate(`/marketplace?cat=${customCategory}`);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'My Purchases', path: '/purchases' },
    { name: 'Dashboard', path: '/dashboard' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/8 glass-nav bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-50/80 light:border-slate-200 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-cyan shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-200">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:from-white dark:via-slate-200 dark:to-slate-400 light:from-slate-900 light:to-slate-700 bg-clip-text text-transparent">
                  NEBULA
                </span>
                <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-brand-cyan border border-brand-cyan/30 px-1.5 py-0.5 rounded-md hidden sm:block">
                  PRO
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Link Block */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                      isActive
                        ? 'text-brand-purple dark:text-brand-purple'
                        : 'text-slate-400 hover:text-slate-200 dark:text-slate-400 dark:hover:text-slate-100 light:text-slate-600 light:hover:text-slate-900'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 bg-white/5 dark:bg-white/5 light:bg-slate-900/5 rounded-lg -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </Link>
                );
              })}

              <button
                onClick={() => setCreatorModalOpen(true)}
                className="ml-2 relative px-3 py-1.5 text-xs font-bold rounded-lg border border-brand-cyan/20 bg-slate-950 text-brand-cyan hover:text-white hover:border-brand-purple hover:bg-gradient-to-tr hover:from-brand-purple/20 hover:to-brand-cyan/20 transition-all shadow-inner cursor-pointer flex items-center gap-1 active:scale-95 text-nowrap"
                title="Design Custom Logos & Thumbnails"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
                Custom Creator
              </button>
            </nav>

            {/* Action Bar (Theme, Saved, Cart, Notifications, User Profile) */}
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 light:hover:bg-slate-200 dark:hover:bg-slate-800/50 transition-colors"
                title={theme === 'dark' ? 'Activate Light Theme' : 'Activate Dark Theme'}
              >
                {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
              </button>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="relative p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 light:hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors"
                title="Wishlist"
              >
                <Heart className="w-[18px] h-[18px]" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-pink text-[9px] font-bold text-white ring-2 ring-slate-950">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Shopping Cart Trigger */}
              <button
                onClick={onOpenCart}
                className="relative p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 light:hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors"
                title="Cart Drawer"
              >
                <ShoppingCart className="w-[18px] h-[18px]" />
                {cartItemCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-purple text-[9px] font-bold text-white ring-2 ring-slate-950 animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Notifications Center */}
              <div ref={notifRef} className="relative">
                <button
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen);
                    setProfileOpen(false);
                  }}
                  className="relative p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 light:hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors"
                  title="Notifications HUB"
                >
                  <Bell className="w-[18px] h-[18px]" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
                  )}
                </button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-white/8 dark:border-white/8 light:border-slate-200 glass-panel shadow-2xl p-4 text-slate-100 dark:text-slate-100 light:text-slate-800 overflow-hidden"
                    >
                      <div className="flex items-center justify-between border-b border-white/10 dark:border-white/10 light:border-slate-200 pb-3">
                        <div className="flex items-center gap-1.5">
                          <Bell className="w-4 h-4 text-brand-purple" />
                          <span className="font-semibold text-sm">Notifications ({unreadCount})</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={markAllNotificationsRead}
                            className="text-[10px] font-semibold text-brand-cyan hover:underline hover:text-brand-purple cursor-pointer"
                          >
                            Read All
                          </button>
                          <span className="text-white/10">|</span>
                          <button
                            onClick={clearAllNotifications}
                            className="text-[10px] font-semibold text-rose-400 hover:underline hover:text-rose-300 cursor-pointer"
                          >
                            Clear
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 max-h-64 overflow-y-auto space-y-2.5 pr-1">
                        {notifications.length === 0 ? (
                          <div className="py-8 text-center text-slate-500 text-xs">
                            <Check className="w-5 h-5 mx-auto mb-1 text-slate-600" />
                            No notifications in sight.
                          </div>
                        ) : (
                          notifications.map((notif) => (
                            <div
                              key={notif.id}
                              onClick={() => markNotificationRead(notif.id)}
                              className={`p-2.5 rounded-lg border leading-tight transition-all duration-150 cursor-pointer text-xs ${
                                notif.isRead
                                  ? 'bg-transparent border-transparent opacity-60'
                                  : 'bg-white/5 border-white/5 dark:bg-white/3 dark:border-white/5 light:bg-slate-200/30 light:border-slate-200/50 hover:bg-white/10'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-1.5">
                                <span className={`font-semibold ${notif.isRead ? 'text-slate-400' : 'text-slate-200 dark:text-slate-200 light:text-slate-900'}`}>
                                  {notif.title}
                                </span>
                                <span className="text-[9px] text-slate-500 flex-shrink-0">
                                  {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="mt-1 text-slate-400 dark:text-slate-400 light:text-slate-600 text-[11px] leading-relaxed">
                                {notif.message}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Dropdown Profile with Balance Control */}
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => {
                    setProfileOpen(!profileOpen);
                    setNotificationsOpen(false);
                  }}
                  className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-slate-800/40 dark:hover:bg-slate-800/40 light:hover:bg-slate-200/50 transition-colors cursor-pointer"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-64 rounded-xl border border-white/8 dark:border-white/8 light:border-slate-200 glass-panel shadow-2xl p-4 text-slate-100 dark:text-slate-100 light:text-slate-800"
                    >
                      <div className="flex items-center gap-3 border-b border-white/10 dark:border-white/10 light:border-slate-200 pb-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-lg object-cover ring-2 ring-brand-purple/40"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-sm truncate text-white dark:text-white light:text-slate-900">{user.name}</h4>
                          <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 truncate block">{user.email}</span>
                        </div>
                      </div>

                      {/* Wallet Balance Integration */}
                      <div className="mt-3.5 bg-brand-purple/10 border border-brand-purple/20 p-3 rounded-lg flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-brand-cyan uppercase font-bold tracking-wider">Account Balance</span>
                          <p className="font-mono text-lg font-bold text-white dark:text-white light:text-slate-900">${user.balance.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => {
                            setFundsModalOpen(true);
                            setProfileOpen(false);
                          }}
                          className="p-1 px-2.5 rounded-md bg-brand-purple hover:bg-purple-600 transition-colors text-[10px] font-bold text-white flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" /> Add Funds
                        </button>
                      </div>

                      <div className="mt-4 space-y-1">
                        <Link
                          to="/dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-900 hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <User className="w-3.5 h-3.5 text-brand-purple" /> User Dashboard
                        </Link>
                        <Link
                          to="/dashboard?tab=settings"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-900 hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <CreditCard className="w-3.5 h-3.5 text-brand-cyan" /> Edit Settings
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile menu switch */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown Panels */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-white/8 overflow-hidden bg-slate-950"
            >
              <div className="px-4 py-4 space-y-1.5">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-2 text-sm font-medium rounded-lg ${
                        isActive
                          ? 'bg-brand-purple/10 text-brand-purple border-l-2 border-brand-purple'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCreatorModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan text-white rounded-lg mt-3 shadow-lg active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                  Custom Design Hub ✦
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories Line Wise Subbar */}
        <div className="border-t border-white/5 bg-slate-950 py-2.5 overflow-x-auto scrollbar-none whitespace-nowrap">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start md:justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs">
            <span className="font-mono font-bold text-slate-500 uppercase tracking-wider text-[9px] select-none">Channels:</span>
            {CATEGORIES.map((cat, idx) => (
              <React.Fragment key={cat.id}>
                {idx > 0 && <span className="text-white/10 select-none">|</span>}
                <Link
                  to={`/marketplace?cat=${cat.id}`}
                  className="text-slate-400 hover:text-brand-purple transition-colors font-medium tracking-normal"
                >
                  {cat.name}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </header>

      {/* Wallet Add Funds Quick Dialog Modal */}
      <AnimatePresence>
        {fundsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm rounded-xl border border-white/8 glass-panel shadow-2xl p-6 text-slate-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-brand-purple" />
                  <h3 className="font-semibold text-lg">Top Up Ledger</h3>
                </div>
                <button
                  onClick={() => setFundsModalOpen(false)}
                  className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddFundsSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Select Amount</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['25', '50', '100'].map(amt => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setAddAmount(amt)}
                        className={`py-2 rounded-lg border font-mono text-sm font-semibold transition-colors cursor-pointer ${
                          addAmount === amt
                            ? 'bg-brand-purple/20 border-brand-purple text-brand-cyan shadow-md shadow-brand-purple/15'
                            : 'border-white/10 hover:border-white/20 text-slate-300'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Or enter manual amount ($)</label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-sm font-semibold font-mono text-white focus:outline-none focus:border-brand-purple"
                    placeholder="Enter Custom Amount"
                    required
                  />
                </div>

                <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg text-xs leading-relaxed text-slate-400">
                  This simulates receiving safe local sandbox funds instantly into your app storage. You can then try buying themes, templates, and plugins!
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFundsModalOpen(false)}
                    className="w-1/2 py-2.5 rounded-lg hover:bg-slate-800 transition-colors text-xs font-bold border border-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 rounded-lg bg-gradient-to-r from-brand-purple to-brand-cyan text-xs font-bold text-white hover:opacity-95 shadow-lg shadow-purple-500/20 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Credit ${parseFloat(addAmount || '0').toFixed(2)}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Customized Logo & Thumbnail Creator Workspace Dialog Modal */}
      <AnimatePresence>
        {creatorModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl p-6 text-slate-100 overflow-hidden relative"
            >
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan" />

              <div className="flex items-center justify-between pb-4 border-b border-white/8">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-brand-purple/10 border border-brand-purple/20">
                    <Sparkles className="w-5 h-5 text-brand-purple" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">Nebula Design Workspace</h3>
                    <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Catalog Customized Logos & Thumbnail assets</p>
                  </div>
                </div>
                <button
                  onClick={() => setCreatorModalOpen(false)}
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCustomProductSubmit} className="mt-5 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Left Column Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">Asset / Brand Name</label>
                      <input
                        type="text"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-950/85 border border-white/10 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                        placeholder="e.g. Apex Chrome Brand Identity Pack"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">PNG Logo / Thumbnail URL</label>
                      <input
                        type="url"
                        value={customPNGUrl}
                        onChange={(e) => setCustomPNGUrl(e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-950/85 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                        placeholder="Paste image URL (https://...)"
                      />

                      {/* Hot preset selector tags to aid user experience */}
                      <div className="mt-2 space-y-1">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Or quick click premium art presets:</span>
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {[
                            { name: 'Metallic Sphere', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80' },
                            { name: 'Neon Workspace', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80' },
                            { name: '3D Chrome Logo', url: 'https://images.unsplash.com/photo-1618005198143-d3663efd8ccd?auto=format&fit=crop&w=500&q=80' },
                            { name: 'Retro Horizon', url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=500&q=80' }
                          ].map(preset => (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => setCustomPNGUrl(preset.url)}
                              className={`px-2 py-1 rounded text-[9px] font-mono border transition-colors cursor-pointer ${
                                customPNGUrl === preset.url
                                  ? 'bg-brand-cyan/20 border-brand-cyan text-brand-cyan font-bold'
                                  : 'bg-slate-950 border-white/5 hover:border-white/10 text-slate-400'
                              }`}
                            >
                              {preset.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">Asset Category</label>
                        <select
                          value={customCategory}
                          onChange={(e) => setCustomCategory(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-brand-purple transition-all cursor-pointer"
                        >
                          <option value="logos">Premium Logos & Branding</option>
                          <option value="thumbnails">Thumbnails & Covers</option>
                          <option value="templates">UI Kits & Templates</option>
                          <option value="design">Figma Systems</option>
                          <option value="assets-3d">3D Assets</option>
                          <option value="audio">Audio & Presets</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">Sandbox Valuation ($)</label>
                        <input
                          type="number"
                          min="0"
                          max="999"
                          value={customPrice}
                          onChange={(e) => setCustomPrice(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-xs font-mono font-bold text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                          placeholder="25"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">File Format & Size</label>
                      <input
                        type="text"
                        value={customFile}
                        onChange={(e) => setCustomFile(e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-950/85 border border-white/10 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-brand-purple transition-all"
                        placeholder="e.g. Master SVG + Hi-Res PNG (14.2 MB ZIP)"
                        required
                      />
                    </div>
                  </div>

                  {/* Right Column Layout: Asset Sandbox Live Card Preview! */}
                  <div className="flex flex-col justify-between space-y-4">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5 text-center">Interactive Real-time Live Preview</span>
                      
                      {/* Simulated Card resembling the beautiful aesthetic layout */}
                      <div className="w-full max-w-[240px] mx-auto rounded-2xl border border-white/10 bg-slate-950 overflow-hidden shadow-xl p-3 space-y-2.5 relative group">
                        
                        {/* Dynamic category badge */}
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-brand-purple/10 border border-brand-purple/20 text-[8px] font-mono font-bold uppercase tracking-wider text-brand-cyan">
                            {CATEGORIES.find(c => c.id === customCategory)?.name || 'Custom'}
                          </span>
                          <span className="text-[8px] font-mono text-slate-500 uppercase">PREVIEW NODE</span>
                        </div>

                        {/* Visual Thumbnail PNG */}
                        <div className="aspect-[1.6] rounded-xl bg-slate-900 border border-white/5 overflow-hidden flex items-center justify-center relative">
                          <img
                            src={customPNGUrl.trim() || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80'}
                            alt=""
                            className="w-full h-full object-cover pointer-events-none"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                          <div className="absolute bottom-1.5 right-1.5 bg-slate-900/40 p-1 rounded-md backdrop-blur-md">
                            <Image className="w-3.5 h-3.5 text-white/70" />
                          </div>
                        </div>

                        {/* Title and Specs */}
                        <div>
                          <h5 className="font-semibold text-xs text-white truncate">{customName.trim() || 'Awesome customized logo asset'}</h5>
                          <div className="flex items-center justify-between mt-1 text-[9px] text-slate-400">
                            <span className="font-mono">{customFile.trim() || '14.2 MB ZIP'}</span>
                            <span className="font-bold text-brand-purple text-xs font-mono">${parseFloat(customPrice || '19').toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="border-t border-white/5 pt-1.5 flex justify-between items-center text-[8px] text-slate-500">
                          <span>Author: {user.name}</span>
                          <span>Rating: ★ 5.0</span>
                        </div>

                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">Detailed Assets Decsription</label>
                      <textarea
                        value={customDescription}
                        onChange={(e) => setCustomDescription(e.target.value)}
                        rows={2}
                        className="w-full px-3.5 py-1.5 bg-slate-950/85 border border-white/10 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-brand-purple transition-all resize-none"
                        placeholder="Provide details about standard transparent scales, editable properties..."
                      />
                    </div>
                  </div>

                </div>

                <div className="bg-brand-cyan/5 border border-brand-cyan/15 rounded-xl p-3.5 flex items-start gap-2.5">
                  <div className="p-1 rounded bg-brand-cyan/10">
                    <Check className="w-4 h-4 text-brand-cyan" />
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-300">
                    Your customized art templates and logos are generated live in the client sandbox cache. Clicking the **Send Catalog** button instantly catalogues this item. All pages will synchronise isomorphically.
                  </p>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setCreatorModalOpen(false)}
                    className="w-1/3 py-2.5 rounded-xl text-xs font-bold font-sans border border-white/10 hover:bg-slate-800 transition-colors"
                  >
                    Close Desk
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan text-xs font-bold text-white hover:opacity-95 shadow-lg shadow-purple-500/20 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" /> Send Assets to Sandbox Stream ✦
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
