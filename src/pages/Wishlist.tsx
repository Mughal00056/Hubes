/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Trash2, ShoppingCart, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { useAppState } from '../store/StateContext';

export interface WishlistProps {
  onQuickView: (product: any) => void;
}

export const Wishlist: React.FC<WishlistProps> = ({ onQuickView }) => {
  const { wishlist, products, toggleWishlist, addToCart, isInCart } = useAppState();

  // Find actual products in saved list
  const savedItems = products.filter(p => wishlist.includes(p.id));

  const handleMoveToCart = (prod: typeof products[0]) => {
    addToCart(prod);
    toggleWishlist(prod.id); // Move to cart means add to cart and remove from wishlist
  };

  return (
    <div className="relative overflow-hidden bg-slate-950 min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/3 w-[350px] h-[350px] bg-brand-pink/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center gap-1.5 justify-center sm:justify-start">
            <Heart className="w-4 h-4 text-brand-pink" />
            <span className="text-[10px] tracking-widest font-bold text-brand-pink uppercase">My Collection</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white leading-none">
            Saved Digital Assets
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Monitor and save items to acquire at a later date. Move them immediately to your shopping drawer to proceed with checkouts.
          </p>
        </div>

        {/* List table */}
        <div className="border border-white/8 rounded-2xl bg-slate-900/10 backdrop-blur-sm overflow-hidden">
          {savedItems.length === 0 ? (
            <div className="py-20 text-center space-y-4 max-w-sm mx-auto">
              <div className="w-12 h-12 rounded-full border border-dashed border-slate-700 flex items-center justify-center mb-2 mx-auto">
                <Heart className="w-6 h-6 text-slate-600" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-white text-sm sm:text-base">Your Saved Index is empty</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Browse modern templates or design systems and check the little hearts to collect references here.
                </p>
              </div>
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-brand-purple to-brand-cyan rounded-lg text-xs font-bold text-white hover:opacity-95 shadow-md shadow-purple-500/10 cursor-pointer"
              >
                Go to Catalog <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {savedItems.map((item) => {
                  const inCart = isInCart(item.id);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 gap-4 sm:gap-6 hover:bg-white/[0.01] transition-colors"
                    >
                      {/* Product Thumbnail Info */}
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-15 object-cover rounded-xl bg-slate-950 border border-white/8 flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <button
                            onClick={() => onQuickView(item)}
                            className="font-display font-semibold text-slate-200 hover:text-brand-purple transition-colors text-sm sm:text-base cursor-pointer line-clamp-1 text-left bg-transparent border-0 p-0 focus:outline-none"
                          >
                            {item.title}
                          </button>
                          
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-mono">
                            <span className="text-brand-purple font-semibold">{item.category.replace('-', ' ')}</span>
                            <span>•</span>
                            <span>{item.fileSize}</span>
                            <span>•</span>
                            <span>{item.fileType}</span>
                          </div>
                        </div>
                      </div>

                      {/* Pricings & Direct Actions Row on Right */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t border-white/5 sm:border-t-0 pt-3 sm:pt-0">
                        
                        <div className="flex flex-col text-left sm:text-right">
                          <span className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Instant price</span>
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono font-bold text-slate-200 text-sm sm:text-base">${item.price}</span>
                            {item.originalPrice && (
                              <span className="font-mono text-xs text-slate-500 line-through">${item.originalPrice}</span>
                            )}
                          </div>
                        </div>

                        {/* Interactive Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleWishlist(item.id)}
                            className="p-2 sm:p-2.5 rounded-xl border border-white/10 hover:border-white/20 text-slate-500 hover:text-rose-400 hover:bg-slate-900 transition-colors cursor-pointer"
                            title="Delete Referenc"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => onQuickView(item)}
                            className="p-2 sm:p-2.5 rounded-xl border border-white/10 hover:border-white/20 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer bg-transparent"
                            title="Inspect Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleMoveToCart(item)}
                            className={`px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer  ${
                              inCart
                                ? 'bg-brand-purple/10 border border-brand-purple/20 text-brand-purple cursor-default'
                                : 'bg-white text-slate-950 hover:bg-slate-200'
                            }`}
                          >
                            <ShoppingCart className="w-3.5 h-3.5" /> Move
                          </button>
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
