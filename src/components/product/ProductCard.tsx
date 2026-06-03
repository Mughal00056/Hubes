/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, Star, Eye, FileText, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { useAppState } from '../../store/StateContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { toggleWishlist, isInWishlist, addToCart, isInCart } = useAppState();

  const isSaved = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col h-full rounded-2xl border border-white/8 bg-slate-900/30 backdrop-blur-md overflow-hidden hover:border-brand-purple/40 transition-colors"
    >
      {/* Thumbnail Block */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
        
        {/* Discount / Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.isBestseller && (
            <span className="px-2 py-0.5 rounded-md bg-amber-500 font-sans text-[9px] font-bold text-slate-950 uppercase tracking-wider shadow-lg">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-0.5 rounded-md bg-brand-cyan font-sans text-[9px] font-bold text-slate-950 uppercase tracking-wider shadow-lg">
              New Asset
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-brand-pink font-sans text-[9px] font-bold text-white uppercase tracking-wider shadow-lg">
              -{discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button Overlay */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-xl transition-all duration-200 cursor-pointer ${
            isSaved
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/15 scale-105'
              : 'bg-slate-950/40 text-slate-400 hover:text-white hover:bg-slate-950/80 backdrop-blur-md'
          }`}
          title={isSaved ? 'Remove from Saved list' : 'Save Asset to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Interactive Hover Actions Backdrop */}
        <div className="absolute inset-0 z-5 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => onQuickView(product)}
            className="p-3 rounded-full bg-slate-100 text-slate-950 hover:bg-white hover:scale-105 transition-all shadow-xl cursor-pointer"
            title="Inspect Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => addToCart(product)}
            className={`p-3 rounded-full transition-all shadow-xl cursor-pointer ${
              inCart
                ? 'bg-brand-purple text-white hover:scale-105'
                : 'bg-brand-cyan text-slate-950 hover:bg-cyan-300 hover:scale-105'
            }`}
            title={inCart ? 'Available in Cart' : 'Add to Cart'}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Thumbnail Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Mini Format Overlay bottom edge */}
        <div className="absolute bottom-2.5 left-3 z-8 pointer-events-none text-[10px] font-mono text-slate-300 bg-slate-950/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/5 uppercase">
          {product.fileType.split(' (')[0]}
        </div>
      </div>

      {/* Meta Content */}
      <div className="flex flex-col flex-grow p-4 space-y-2.5">
        
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span className="font-semibold text-brand-purple tracking-widest uppercase">
            {product.category.replace('-', ' ')}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span className="font-bold text-slate-300 font-sans">{product.rating}</span>
          </div>
        </div>

        {/* Title and description */}
        <div className="space-y-1 flex-grow">
          <Link
            to={`/product/${product.id}`}
            className="block text-left w-full text-slate-200 dark:text-slate-200 light:text-slate-900 font-semibold font-display text-sm hover:text-brand-purple transition-colors line-clamp-1 cursor-pointer"
          >
            {product.title}
          </Link>
          <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
          <span className="truncate">by {product.author}</span>
          <span>•</span>
          <span>{product.fileSize}</span>
        </div>

        {/* Price and Add button section */}
        <div className="flex items-center justify-between border-t border-white/5 pt-3.5 mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base font-bold text-white dark:text-white light:text-slate-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-slate-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer ${
              inCart
                ? 'bg-brand-purple/15 text-brand-purple border border-brand-purple/20 cursor-default'
                : 'bg-white text-slate-950 hover:bg-slate-200 transition-colors'
            }`}
          >
            {inCart ? 'Carted' : 'Get'}
          </button>
        </div>

      </div>
    </motion.div>
  );
};
