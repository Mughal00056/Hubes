/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Heart, Star, Sparkles, Check, ChevronLeft, ChevronRight, FileCode, HardDrive } from 'lucide-react';
import { Product } from '../../types';
import { useAppState } from '../../store/StateContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, isInCart, toggleWishlist, isInWishlist } = useAppState();
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!product) return null;

  const inCart = isInCart(product.id);
  const isSaved = isInWishlist(product.id);

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleNextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
        
        {/* Backdrop Trigger close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 cursor-default"
        />

        {/* Modal Window Frame */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-4xl rounded-2xl border border-white/8 bg-slate-900/90 backdrop-blur-md shadow-2xl p-4 sm:p-6 text-slate-100 z-10 grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed max-h-[90vh] overflow-y-auto pr-2 sm:pr-6"
        >
          {/* Close button top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-200 cursor-pointer z-20"
            title="Close QuickView"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Media Slideshouse */}
          <div className="space-y-3">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-white/5 group">
              <img
                src={images[activeImageIdx]}
                alt={product.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-950/60 text-slate-400 hover:text-white backdrop-blur-sm border border-white/5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-950/60 text-slate-400 hover:text-white backdrop-blur-sm border border-white/5 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Micro Gallery Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-12 sm:w-16 aspect-[4/3] rounded-md overflow-hidden bg-slate-950 border transition-all cursor-pointer ${
                      activeImageIdx === idx ? 'border-brand-purple' : 'border-white/10 opacity-60'
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Descriptions & Details Grid */}
          <div className="flex flex-col justify-between space-y-4">
            
            {/* Title Block */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-sans font-bold text-[10px] text-brand-cyan tracking-widest uppercase bg-brand-cyan/10 px-2 py-0.5 rounded">
                  {product.category.replace('-', ' ')}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span className="text-sm font-bold">{product.rating}</span>
                  <span className="text-xs text-slate-500">({product.reviewsCount} downloads rate)</span>
                </div>
              </div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">{product.title}</h2>
              <p className="text-slate-400 text-xs sm:text-sm">{product.description}</p>
            </div>

            {/* Spec grid */}
            <div className="grid grid-cols-2 gap-3.5 bg-white/[0.02] border border-white/5 rounded-xl p-3 sm:p-4 text-xs font-sans">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-brand-purple flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">File Size</p>
                  <p className="font-semibold text-slate-200">{product.fileSize}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">File Type</p>
                  <p className="font-semibold text-slate-200 whitespace-nowrap overflow-hidden text-ellipsis">{product.fileType}</p>
                </div>
              </div>
              <div className="col-span-2 border-t border-white/5 pt-2 mt-1 flex justify-between text-[11px] text-slate-400">
                <span>By: <strong className="text-slate-300">{product.author}</strong></span>
                <span>License: <strong className="text-slate-300">{product.license || 'Commercial'}</strong></span>
              </div>
            </div>

            {/* Features preview bullet point */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Product Highlights</span>
              <ul className="text-xs text-slate-400 space-y-1">
                {product.features.slice(0, 3).map((feat, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price list and interactive buy links */}
            <div className="border-t border-white/10 pt-4 mt-auto flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Instant Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-white">${product.price}</span>
                  {product.originalPrice && (
                    <span className="font-mono text-xs text-slate-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
              </div>

              {/* Action row buttons */}
              <div className="flex items-center gap-2 flex-grow sm:flex-grow-0">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                    isSaved
                      ? 'border-rose-500/35 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20'
                      : 'border-white/10 hover:border-white/20 text-slate-400 hover:text-white'
                  }`}
                  title={isSaved ? 'Saved to lists' : 'Save as wish'}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                  className="px-4 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-lg shadow-purple-500/20 flex items-center gap-2 flex-grow sm:flex-grow-0 justify-center text-white cursor-pointer"
                >
                  {inCart ? (
                    <>
                      <Check className="w-4 h-4" /> Go to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" /> {product.price === 0 ? 'Download Free' : 'Get Access'}
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
