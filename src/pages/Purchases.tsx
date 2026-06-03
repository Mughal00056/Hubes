/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download, ArrowRight, Search, Key, Check, Copy, HardDrive, Calendar, FileCode, ShoppingBag
} from 'lucide-react';
import { useAppState } from '../store/StateContext';

export const Purchases: React.FC = () => {
  const { purchases, addNotification } = useAppState();
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Filter list
  const filteredPurchases = purchases.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    addNotification('Serialized License Copied', 'License activation parameters written to clipboard.', 'success');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleDownloadFile = (productId: string, title: string) => {
    setDownloadingId(productId);
    
    // Simulate compilation sandbox progress
    setTimeout(() => {
      setDownloadingId(null);
      // Trigger a direct browser anchor trigger of mock file or print direct success toast
      addNotification(
        'Downloading Compiled Package',
        `Successfully downloaded the file package bundle for "${title}". Check your downloads folders.`,
        'success'
      );
    }, 1200);
  };

  return (
    <div className="relative overflow-hidden bg-slate-950 min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 justify-center sm:justify-start">
              <ShoppingBag className="w-4 h-4 text-brand-cyan" />
              <span className="text-[10px] tracking-widest font-bold text-brand-cyan uppercase">Vault Access</span>
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white leading-none">
              Purchased Materials
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Verify legal ownership. Download files, copy secure system evaluation licenses, and track release dates of assets.
            </p>
          </div>

          {/* Local Search input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs placeholder-slate-500 text-white focus:outline-none focus:border-brand-purple"
              placeholder="Search purchases index..."
            />
          </div>
        </div>

        {/* Catalog list grids */}
        <div className="space-y-4">
          {purchases.length === 0 ? (
            <div className="rounded-2xl border border-white/8 bg-slate-900/10 p-12 text-center space-y-4 max-w-md mx-auto">
              <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
              <div className="space-y-1">
                <h4 className="font-semibold text-white">No registered assets found</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Your sandbox ledger has no acquired templates yet. Explore our marketplace list to purchase some assets with credit funds!
                </p>
              </div>
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-1 px-4 py-2 bg-white text-slate-950 rounded-lg text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Inspect catalog <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : filteredPurchases.length === 0 ? (
            <p className="text-slate-500 text-xs text-center py-10">No items matched your searching filter parameters.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredPurchases.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-5 rounded-2xl border border-white/8 bg-slate-900/10 backdrop-blur-sm flex flex-col justify-between gap-5 hover:border-brand-purple/20 transition-colors"
                  >
                    
                    {/* Header: thumb, title, dates */}
                    <div className="flex gap-4 items-start">
                      <img
                        src={item.image}
                        alt=""
                        className="w-16 h-12 object-cover rounded-xl bg-slate-950 border border-white/8"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-grow">
                        <Link
                          to={`/product/${item.id}`}
                          className="font-display font-semibold text-slate-100 hover:text-brand-purple transition-colors text-xs sm:text-sm line-clamp-1 cursor-pointer"
                        >
                          {item.title}
                        </Link>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-1 uppercase font-mono truncate">
                          <span className="text-brand-purple font-semibold">{item.category}</span>
                          <span>•</span>
                          <span>{item.fileSize}</span>
                        </div>
                      </div>
                    </div>

                    {/* Metadata details receipt block */}
                    <div className="bg-slate-950/60 rounded-xl border border-white/5 p-3.5 text-[11px] font-sans space-y-2">
                      <div className="flex justify-between items-center text-slate-400">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-500" /> Acquired Date</span>
                        <span className="font-mono text-slate-300">
                          {new Date(item.purchaseDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center text-slate-400 pt-2 border-t border-white/[0.03]">
                        <span className="flex items-center gap-1"><Key className="w-3.5 h-3.5 text-slate-500" /> Ownership License Key</span>
                        <div className="flex items-center gap-1 text-[10px]">
                          <span className="font-mono text-slate-300 bg-white/5 px-1.5 py-0.5 rounded truncate max-w-[130px] select-all">
                            {item.licenseKey}
                          </span>
                          <button
                            onClick={() => handleCopyKey(item.licenseKey)}
                            className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                            title="Copy Evaluation code"
                          >
                            {copiedKey === item.licenseKey ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Action direct layout triggers download */}
                    <button
                      onClick={() => handleDownloadFile(item.id, item.title)}
                      disabled={downloadingId === item.id}
                      className="w-full py-2.5 rounded-lg border border-white/10 hover:border-white/20 bg-slate-900 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Download className={`w-4 h-4 ${downloadingId === item.id ? 'animate-bounce text-brand-cyan' : ''}`} />
                      {downloadingId === item.id ? 'Compiling ZIP package...' : 'Download Bundle ZIP'}
                    </button>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
