/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  User, CreditCard, ShieldCheck, Bell, Sparkles, LogOut, CheckCircle,
  TrendingUp, RefreshCw, Key, Eye, EyeOff, Save, Trash2, Calendar, MapPin, Edit3
} from 'lucide-react';
import { useAppState } from '../store/StateContext';

export const Dashboard: React.FC = () => {
  const {
    user, purchases, wishlist, notifications, theme, toggleTheme,
    updateUserProfile, addNotification, markNotificationRead, clearAllNotifications
  } = useAppState();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  // Stats
  const totalPurchases = purchases.length;
  const totalWishlist = wishlist.length;
  const totalSpent = purchases.reduce((acc, curr) => acc + curr.price, 0);
  const totalDownloads = purchases.reduce((acc, curr) => acc + curr.downloadCount + 1, 0); // simulated count

  // Profile Form states
  const [profileName, setProfileName] = useState(user.name);
  const [profileEmail, setProfileEmail] = useState(user.email);
  const [profileBio, setProfileBio] = useState(user.bio || '');
  const [profileLoc, setProfileLoc] = useState(user.location || '');
  const [profileAvatar, setProfileAvatar] = useState(user.avatar);

  // Password Security Form states
  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [pwMsg, setPwMsg] = useState({ type: '', text: '' });

  // Preset Avatars mapping
  const avPool = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  ];

  useEffect(() => {
    // Sync field states if user changes in context
    setProfileName(user.name);
    setProfileEmail(user.email);
    setProfileBio(user.bio || '');
    setProfileLoc(user.location || '');
    setProfileAvatar(user.avatar);
  }, [user]);

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileName.trim() || !profileEmail.trim()) {
      addNotification('Update Failed', 'Name and Email fields are required parameters.', 'warning');
      return;
    }

    updateUserProfile({
      name: profileName,
      email: profileEmail,
      bio: profileBio,
      location: profileLoc,
      avatar: profileAvatar
    });
  };

  const handlePwSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg({ type: '', text: '' });

    if (!oldPw || !newPw || !confirmPw) {
      setPwMsg({ type: 'error', text: 'All password fields are required.' });
      return;
    }

    if (newPw.length < 6) {
      setPwMsg({ type: 'error', text: 'New password must have at least 6 characters.' });
      return;
    }

    if (newPw !== confirmPw) {
      setPwMsg({ type: 'error', text: "Passwords do not match." });
      return;
    }

    // Success simulation
    setOldPw('');
    setNewPw('');
    setConfirmPw('');
    setPwMsg({ type: 'success', text: 'Password credentials revised securely inside local storage.' });
    addNotification('Password Changed', 'Your security password was successfully rotated.', 'success');
  };

  return (
    <div className="relative overflow-hidden bg-slate-950 min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Background neon ambient lamps */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Banner header title */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-purple" />
            <span className="text-[10px] tracking-widest font-bold text-brand-purple uppercase">WORKSPACE PANEL</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white leading-none">
            User Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Organize digital reference items, adjust profile credentials, change visual themes, and review recent activity logs.
          </p>
        </div>

        {/* Outer Frame Grid splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column Navigation List options */}
          <div className="col-span-1 lg:col-span-3 space-y-4">
            
            {/* Quick Profile Bio Summary */}
            <div className="rounded-xl border border-white/8 bg-slate-900/10 backdrop-blur-sm p-4 text-center space-y-3.5">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-purple mx-auto"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <h3 className="font-display font-semibold text-slate-100 text-sm leading-none">{user.name}</h3>
                <span className="text-[10px] text-slate-400 font-mono block">{user.email}</span>
                {user.location && (
                  <span className="text-[9px] text-slate-500 font-bold flex items-center justify-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-500" /> {user.location}
                  </span>
                )}
              </div>
            </div>

            {/* Selection tabs */}
            <div className="rounded-xl border border-white/8 bg-slate-900/30 backdrop-blur-md p-3 flex flex-col gap-1 text-xs">
              
              <button
                onClick={() => handleTabChange('overview')}
                className={`py-2 px-3 rounded-lg text-left font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-brand-purple/15 text-brand-purple'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <TrendingUp className="w-4 h-4" /> Dashboard Overview
              </button>

              <button
                onClick={() => handleTabChange('profile')}
                className={`py-2 px-3 rounded-lg text-left font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-brand-purple/15 text-brand-purple'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <User className="w-4 h-4" /> Profile Settings
              </button>

              <button
                onClick={() => handleTabChange('security')}
                className={`py-2 px-3 rounded-lg text-left font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                  activeTab === 'security'
                    ? 'bg-brand-purple/15 text-brand-purple'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <ShieldCheck className="w-4 h-4" /> Password Security
              </button>

              <button
                onClick={() => handleTabChange('notifications')}
                className={`py-2 px-3 rounded-lg text-left font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                  activeTab === 'notifications'
                    ? 'bg-brand-purple/15 text-brand-purple'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Bell className="w-4 h-4" /> Notification Logs
              </button>

            </div>
          </div>

          {/* Right Column Layouts: Interactive Tabs contents */}
          <div className="col-span-1 lg:col-span-9 leading-relaxed min-h-[400px]">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: OVERVIEW STATISTICS GRID & ACTIVITY */}
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  {/* Stats card parameters */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    
                    <div className="p-4 border border-white/8 bg-slate-900/15 rounded-xl">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500">Acquired Packs</span>
                      <p className="font-mono text-2xl font-bold text-slate-100 mt-1">{totalPurchases}</p>
                    </div>

                    <div className="p-4 border border-white/8 bg-slate-900/15 rounded-xl">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500">Sandbox Spent</span>
                      <p className="font-mono text-2xl font-bold text-brand-cyan mt-1">${totalSpent.toFixed(2)}</p>
                    </div>

                    <div className="p-4 border border-white/8 bg-slate-900/15 rounded-xl">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500">Saved Items</span>
                      <p className="font-mono text-2xl font-bold text-brand-pink mt-1">{totalWishlist}</p>
                    </div>

                    <div className="p-4 border border-white/8 bg-slate-900/15 rounded-xl">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500">Ledger balance</span>
                      <p className="font-mono text-2xl font-bold text-emerald-400 mt-1">${user.balance.toFixed(2)}</p>
                    </div>

                  </div>

                  {/* Settings quick preference banner */}
                  <div className="rounded-xl border border-white/8 bg-white/[0.01] p-5 space-y-4">
                    <h3 className="font-display font-semibold text-sm text-slate-100 uppercase tracking-widest border-b border-white/8 pb-2">
                      Portal Theme Alignment
                    </h3>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                      <div>
                        <span>Theme Toggle Configuration</span>
                        <p className="text-slate-400 text-[11px] mt-0.5 leading-normal max-w-md">
                          Switch layouts cleanly. Selecting and persisting dark modes optimizes pixel luminance for creative work environments.
                        </p>
                      </div>
                      <button
                        onClick={toggleTheme}
                        className="py-1.5 px-4 rounded-lg bg-slate-900 border border-white/10 text-xs font-bold font-sans hover:bg-slate-800 transition-colors uppercase tracking-wider text-brand-cyan cursor-pointer"
                      >
                        Activate {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
                      </button>
                    </div>
                  </div>

                  {/* Recent Sandbox operations timeline logs */}
                  <div className="rounded-xl border border-white/8 bg-slate-900/30 backdrop-blur-md p-5 space-y-4">
                    <h3 className="font-display font-semibold text-sm text-white uppercase tracking-widest border-b border-white/8 pb-2">
                      Recent Activity Nodes
                    </h3>
                    <div className="space-y-3 pt-2 text-xs divide-y divide-white/[0.03]">
                      {purchases.length === 0 ? (
                        <p className="text-slate-500 italic py-3 text-center">No transactions registered inside ledger history.</p>
                      ) : (
                        purchases.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-start justify-between gap-4 py-2 text-[11px]">
                            <div className="space-y-0.5">
                              <span className="font-semibold text-slate-200">Aquired Asset: "{item.title}"</span>
                              <p className="text-slate-500 text-[10px] font-mono">CODE: {item.orderId} • license active in download system</p>
                            </div>
                            <span className="font-mono text-slate-400">
                              {new Date(item.purchaseDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </motion.div>
              )}

              {/* TAB 2: PROFILE MANAGEMENT EDIT FORM */}
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="rounded-xl border border-white/8 bg-slate-900/30 backdrop-blur-md p-5 sm:p-6 space-y-6"
                >
                  <h2 className="font-display font-bold text-lg text-slate-100 border-b border-white/8 pb-2">
                    Profile Configurations
                  </h2>

                  <form onSubmit={handleProfileSubmit} className="space-y-5">
                    
                    {/* Choose Preset Avatar */}
                    <div className="space-y-3.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Choose Profile Avatar</label>
                      
                      <div className="flex items-center gap-4 flex-wrap">
                        {/* Current loaded avatar */}
                        <img
                          src={profileAvatar}
                          alt=""
                          className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-purple"
                          referrerPolicy="no-referrer"
                        />
                        
                        <div className="flex gap-2.5">
                          {avPool.map((src, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setProfileAvatar(src)}
                              className={`relative w-10 h-10 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                                profileAvatar === src ? 'border-brand-purple scale-95' : 'border-transparent opacity-60'
                              }`}
                            >
                              <img
                                src={src}
                                alt=""
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 flex-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Profile Name</label>
                        <input
                          type="text"
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-brand-purple"
                          required
                        />
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Reference Email</label>
                        <input
                          type="email"
                          value={profileEmail}
                          onChange={(e) => setProfileEmail(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-brand-purple"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 flex-grow">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Geographic Location</label>
                        <input
                          type="text"
                          value={profileLoc}
                          onChange={(e) => setProfileLoc(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-brand-purple"
                          placeholder="e.g. Manchester, UK"
                        />
                      </div>

                      <div className="space-y-1.5 flex-grow">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Brief Bio</label>
                        <input
                          type="text"
                          value={profileBio}
                          onChange={(e) => setProfileBio(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-brand-purple"
                          placeholder="Figma designer, fullstack engineer..."
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-lg bg-white hover:bg-slate-200 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Save className="w-4 h-4" /> Save Profile Details
                    </button>
                  </form>
                </motion.div>
              )}

              {/* TAB 3: PASSWORD ROTATION REVIEWS SECURITY */}
              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="rounded-xl border border-white/8 bg-slate-900/30 backdrop-blur-md p-5 sm:p-6 space-y-6"
                >
                  <h2 className="font-display font-bold text-lg text-slate-100 border-b border-white/8 pb-2 flex items-center gap-2">
                    Password Securities and Keys
                  </h2>

                  <form onSubmit={handlePwSubmit} className="space-y-4 max-w-md">
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Current Secret Password</label>
                      <div className="relative">
                        <input
                          type={showPw ? 'text' : 'password'}
                          value={oldPw}
                          onChange={(e) => setOldPw(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPw(!showPw)}
                          className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                        >
                          {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Enter New Password</label>
                      <input
                        type={showPw ? 'text' : 'password'}
                        value={newPw}
                        onChange={(e) => setNewPw(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-brand-purple"
                        placeholder="Min 6 symbols"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Confirm New Password</label>
                      <input
                        type={showPw ? 'text' : 'password'}
                        value={confirmPw}
                        onChange={(e) => setConfirmPw(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-brand-purple"
                        required
                      />
                    </div>

                    {pwMsg.text && (
                      <p className={`text-[11px] font-semibold ${pwMsg.type === 'error' ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {pwMsg.text}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-lg bg-white hover:bg-slate-200 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      Update Password
                    </button>
                  </form>
                </motion.div>
              )}

              {/* TAB 4: EXPANDED DETAILED NOTIFICATION CENTER LOGS */}
              {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="rounded-xl border border-white/8 bg-slate-900/30 backdrop-blur-md p-5 sm:p-6 space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-white/8 pb-2">
                    <h2 className="font-display font-bold text-lg text-slate-100 flex items-center gap-2">
                      Notification Logs Manager
                    </h2>
                    {notifications.length > 0 && (
                      <button
                        onClick={clearAllNotifications}
                        className="text-[10px] font-bold text-rose-400 hover:underline hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Clear All logs
                      </button>
                    )}
                  </div>

                  <div className="space-y-3.5 divide-y divide-white/[0.04] max-h-[500px] overflow-y-auto pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-slate-500 italic text-center py-12 text-xs">No notifications are logged inside standard workspace history.</p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationRead(notif.id)}
                          className={`p-3 rounded-xl border flex gap-3 text-xs leading-relaxed transition-all cursor-pointer ${
                            notif.isRead
                              ? 'border-transparent bg-transparent opacity-60'
                              : 'border-white/5 bg-white/5 dark:bg-white/3 dark:border-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${notif.isRead ? 'bg-transparent' : 'bg-brand-cyan'}`} />
                          
                          <div className="flex-grow">
                            <div className="flex items-center justify-between gap-1.5">
                              <span className="font-bold text-slate-100">{notif.title}</span>
                              <span className="text-[9px] font-mono text-slate-500">
                                {new Date(notif.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="mt-1 text-slate-400 text-[11px] leading-relaxed">
                              {notif.message}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
};
