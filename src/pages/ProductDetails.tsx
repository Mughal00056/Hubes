/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Star, Heart, ShoppingCart, Check, ShieldAlert, ArrowLeft, ArrowRight,
  HardDrive, FileCode, Users, Award, MessageSquare, Plus, Clock, ExternalLink, Calendar
} from 'lucide-react';
import { useAppState } from '../store/StateContext';
import { ProductCard } from '../components/product/ProductCard';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    products, addToCart, isInCart, toggleWishlist, isInWishlist,
    productReviews, submitProductReview
  } = useAppState();

  // Selected state
  const product = products.find(p => p.id === id);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  // Review submission state
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');
  const [helpfulRatings, setHelpfulRatings] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setActiveImgIdx(0);
    // Scroll window to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-100">
        <h2 className="text-xl font-bold font-display">Product asset not found</h2>
        <p className="text-sm text-slate-400 mt-2">The selected digital item was either moved or is invalid.</p>
        <Link to="/marketplace" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-cyan hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Catalog
        </Link>
      </div>
    );
  }

  const reviews = productReviews[product.id] || [];
  const inCart = isInCart(product.id);
  const isSaved = isInWishlist(product.id);
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  // Recommendations mapping
  const relatedRecommendations = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;

    submitProductReview(product.id, userRating, userComment);
    setUserComment('');
    setUserRating(5);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  const toggleHelpful = (revId: string) => {
    setHelpfulRatings(prev => ({
      ...prev,
      [revId]: !prev[revId]
    }));
  };

  return (
    <div className="relative overflow-hidden bg-slate-950 min-h-screen text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Background radial overlays */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-brand-purple/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Back Link breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/marketplace"
            className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back to Marketplace index
          </Link>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            ID: {product.id}
          </span>
        </div>

        {/* Primary details layout splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side Column: Multi-Image Showcase Gallery */}
          <div className="col-span-1 lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-white/8 shadow-xl">
              <img
                src={gallery[activeImgIdx]}
                alt={product.title}
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />

              {product.isBestseller && (
                <span className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded bg-amber-500 text-slate-950 font-sans text-[10px] uppercase tracking-wider font-bold shadow-lg">
                  Demand bestseller
                </span>
              )}
            </div>

            {/* Thumbnail Navigation Row */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIdx(idx)}
                  className={`relative w-20 sm:w-24 aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border-2 transition-all cursor-pointer flex-shrink-0 ${
                    activeImgIdx === idx ? 'border-brand-purple scale-95 shadow-md' : 'border-white/10 opacity-70 hover:opacity-100'
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

            {/* In-app Guarantee Card */}
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex items-start gap-3 mt-6">
              <ShieldAlert className="w-5 h-5 text-brand-cyan mt-0.5 flex-shrink-0" />
              <div className="text-xs leading-relaxed">
                <span className="font-bold text-slate-200">100% Sandbox Secured Assets:</span>
                <p className="text-slate-400 mt-0.5">
                  Every product is compiled with clean TypeScript code, virus-scanned, and fully tested. Downloads are preserved securely inside local storage nodes.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side Column: Meta details and Purchase Block */}
          <div className="col-span-1 lg:col-span-5 space-y-6">
            
            {/* Badges, rating and TITLE */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 justify-between">
                <span className="text-[10px] font-sans font-extrabold text-brand-purple tracking-widest uppercase border border-brand-purple/20 bg-brand-purple/10 px-2.5 py-0.5 rounded">
                  {product.category.replace('-', ' ')}
                </span>
                
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span className="text-sm font-bold font-sans">{product.rating}</span>
                  <span className="text-xs text-slate-500">({reviews.length} total reviews)</span>
                </div>
              </div>

              <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                {product.title}
              </h1>

              <div className="flex items-center gap-1 text-xs text-slate-400">
                <span>By:</span>
                <span className="font-semibold text-slate-200">{product.author}</span>
                <span>•</span>
                <span className="font-mono text-[11px] text-slate-400">{product.fileSize}</span>
              </div>
            </div>

            {/* Description Text */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {product.detailedDescription || product.description}
            </p>

            {/* Specifications metrics list */}
            <div className="grid grid-cols-2 gap-3 bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-xs font-sans">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-brand-purple flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">Storage size</p>
                  <p className="font-bold text-slate-300">{product.fileSize}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Format Bundle</p>
                  <p className="font-bold text-slate-300 truncate tracking-tight">{product.fileType}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                <Users className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">Asset Sales</p>
                  <p className="font-bold text-slate-200">{product.salesCount} customers</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                <Award className="w-4 h-4 text-brand-pink flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">Access Rights</p>
                  <p className="font-bold text-slate-200">{product.license || 'Personal use only'}</p>
                </div>
              </div>
            </div>

            {/* Features check bullet points */}
            <div className="space-y-2 border-t border-white/5 pt-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Asset Specifications Included</h4>
              <ul className="text-xs text-slate-400 space-y-2">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Purchase control section */}
            <div className="border-t border-white/10 pt-5 space-y-4">
              
              <div className="flex items-baseline gap-3">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">PRICE:</span>
                <span className="font-mono text-2xl sm:text-3xl font-bold text-white">${product.price}</span>
                {product.originalPrice && (
                  <span className="font-mono text-sm text-slate-500 line-through">${product.originalPrice}</span>
                )}
              </div>

              {/* Action buttons list */}
              <div className="flex gap-2">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex-shrink-0 ${
                    isSaved
                      ? 'border-rose-500/40 bg-rose-500/10 text-rose-400 shadow-md shadow-rose-950/10'
                      : 'border-white/10 hover:border-white/20 text-slate-400 hover:text-white'
                  }`}
                  title={isSaved ? 'Saved to Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-[18px] h-[18px] ${isSaved ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={() => addToCart(product)}
                  className={`flex-grow py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all border ${
                    inCart
                      ? 'border-brand-purple/20 bg-brand-purple/10 text-brand-purple cursor-default'
                      : 'border-white/10 hover:border-white/20 hover:bg-white/5 text-slate-200'
                  }`}
                >
                  <ShoppingCart className="w-[18px] h-[18px]" />
                  {inCart ? 'Carted already' : 'Add to Shopping Cart'}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-lg shadow-purple-500/20 whitespace-nowrap cursor-pointer"
                >
                  Buy Instant
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Reviews and Commenting Submission Corner */}
        <section className="border-t border-white/8 pt-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-bold text-brand-cyan">DEVELOPER APPRECIATION</span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-brand-cyan" /> Customer Reviews ({reviews.length})
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Reviews list rows */}
            <div className="col-span-1 lg:col-span-7 space-y-4">
              {reviews.length === 0 ? (
                <div className="py-12 border border-dashed border-white/5 rounded-xl text-center text-slate-500 text-xs">
                  <MessageSquare className="w-6 h-6 mx-auto mb-2 opacity-30" />
                  No reviews submitted yet. Purchase and leave your first feedback!
                </div>
              ) : (
                reviews.map((rev) => {
                  const hasLiked = helpfulRatings[rev.id];
                  return (
                    <div
                      key={rev.id}
                      className="p-4 rounded-xl border border-white/5 bg-white/[0.01] space-y-3 mt-1 leading-relaxed"
                    >
                      <div className="flex items-start justify-between gap-2.5">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={rev.userAvatar}
                            alt={rev.userName}
                            className="w-8 h-8 rounded-full object-cover ring-1 ring-white/10"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h5 className="font-bold text-xs text-slate-200">{rev.userName}</h5>
                            <span className="text-[9px] text-slate-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-500" /> {rev.date}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-0.5">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-500" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 pl-0.5 leading-relaxed">{rev.comment}</p>

                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-white/[0.03]">
                        <button
                          onClick={() => toggleHelpful(rev.id)}
                          className={`hover:text-slate-300 flex items-center gap-1 cursor-pointer ${hasLiked ? 'text-brand-purple font-bold' : ''}`}
                        >
                          Helpful ({rev.helpfulCount + (hasLiked ? 1 : 0)})
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Leave a review interactive stateful form */}
            <div className="col-span-1 lg:col-span-5">
              <div className="rounded-xl border border-white/8 bg-slate-900/30 backdrop-blur-md p-5 space-y-4">
                <h4 className="font-display font-semibold text-sm text-slate-100 uppercase tracking-wider border-b border-white/8 pb-2">
                  Submit Review Feedback
                </h4>

                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  {/* Select Star Rating slider or click */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Client Rating</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setUserRating(star)}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= userRating ? 'fill-amber-400 text-amber-500' : 'text-slate-700'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment message */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Detailed Comments</label>
                    <textarea
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs placeholder-slate-500 text-white focus:outline-none focus:border-brand-purple"
                      rows={4}
                      placeholder="Discuss code layouts, bundle size improvements or overall value..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-white hover:bg-slate-200 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Publish Review
                  </button>
                </form>
              </div>
            </div>

          </div>
        </section>

        {/* Categories related recommended carousel list */}
        {relatedRecommendations.length > 0 && (
          <section className="border-t border-white/8 pt-10 space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-brand-purple">RECOMMENDED COMPILATION</span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">Related Products</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedRecommendations.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onQuickView={() => {}} // inside recommendations we default to main details redirect
                />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
