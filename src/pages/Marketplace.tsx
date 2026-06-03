/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, ChevronDown, Check, Loader2, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { useAppState } from '../store/StateContext';
import { ProductCard } from '../components/product/ProductCard';
import { CATEGORIES } from '../data/products';
import { Product } from '../types';

interface MarketplaceProps {
  onQuickView: (product: Product) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ onQuickView }) => {
  const { products } = useAppState();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL parameters query
  const catQuery = searchParams.get('cat') || 'all';

  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(catQuery);
  const [maxPrice, setMaxPrice] = useState(100);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [loadingMode, setLoadingMode] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6); // To mock Infinite Scroll / Paginated blocks

  // Keep category in sync with URL queries
  useEffect(() => {
    setSelectedCategory(catQuery);
  }, [catQuery]);

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    setSearchParams(id === 'all' ? {} : { cat: id });
    setVisibleCount(6); // reset pagination counts
  };

  const toggleFormat = (format: string) => {
    setSelectedFormats((prev) =>
      prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
    );
    setVisibleCount(6);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSearchParams({});
    setMaxPrice(100);
    setSelectedFormats([]);
    setSortBy('popular');
    setVisibleCount(6);
  };

  // Distinct file formats extracted from product mock data
  const availableFormats = useMemo(() => {
    const formats = products.map((p) => p.fileType.split(' (')[0].trim());
    return Array.from(new Set(formats));
  }, [products]);

  // Combined Filters Implementation
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category Query
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price ceiling slider
    result = result.filter((p) => p.price <= maxPrice);

    // Format query checkbox
    if (selectedFormats.length > 0) {
      result = result.filter((p) =>
        selectedFormats.some((fmt) => p.fileType.toLowerCase().includes(fmt.toLowerCase()))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'sales':
      case 'popular':
      default:
        result.sort((a, b) => b.salesCount - a.salesCount);
        break;
    }

    return result;
  }, [products, searchTerm, selectedCategory, maxPrice, selectedFormats, sortBy]);

  // Sliced Visible Products
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // Mock loading animation for infinite scrolling
  const handleLoadMore = () => {
    setLoadingMode(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setLoadingMode(false);
    }, 800);
  };

  return (
    <div className="relative overflow-hidden bg-slate-950 min-h-screen text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Background flare ambient grids */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Banner Section */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center gap-1.5 justify-center sm:justify-start">
            <Sparkles className="w-4 h-4 text-brand-purple" />
            <span className="text-[10px] tracking-widest font-bold text-brand-purple uppercase">THE COMPLETE LEDGER</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white leading-none">
            Digital Assets Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Expand your utility library. Filter by price, layout formats, specific categories, or file formats with instantaneous responsive search feedback.
          </p>
        </div>

        {/* Filter Toolbar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column Controls: Filters Pane */}
          <div className="col-span-1 lg:col-span-3 space-y-6 lg:sticky lg:top-24">
            <div className="rounded-xl border border-white/8 bg-slate-900/30 backdrop-blur-md p-5 space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/8 pb-3">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-brand-purple" /> Filters
                </span>
                <button
                  onClick={handleResetFilters}
                  className="text-[10px] font-semibold text-brand-cyan hover:underline hover:text-brand-purple cursor-pointer"
                >
                  Reset All
                </button>
              </div>

              {/* Instant Search input */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Search assets</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setVisibleCount(6);
                    }}
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs placeholder-slate-500 text-white focus:outline-none focus:border-brand-purple"
                    placeholder="E.g., Figma, Saas Boilerplate"
                  />
                </div>
              </div>

              {/* Categories Links selectors */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Department</label>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => handleCategorySelect('all')}
                    className={`w-full py-1.5 px-3 rounded-lg text-xs text-left font-semibold flex items-center justify-between cursor-pointer ${
                      selectedCategory === 'all'
                        ? 'bg-brand-purple/10 text-brand-purple border-l-2 border-brand-purple font-bold'
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                    }`}
                  >
                    <span>All Departments</span>
                    <span className="text-[9px] font-mono opacity-60">{products.length}</span>
                  </button>
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    const catCount = products.filter((p) => p.category === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                        className={`w-full py-1.5 px-3 rounded-lg text-xs text-left font-semibold flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-brand-purple/10 text-brand-purple border-l-2 border-brand-purple font-bold'
                            : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        <span className="text-[9px] font-mono opacity-60">{catCount}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Ceiling custom slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Price Limit</span>
                  <span className="font-mono text-brand-cyan">${maxPrice} max</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(parseInt(e.target.value));
                    setVisibleCount(6);
                  }}
                  className="w-full accent-brand-purple h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>$5</span>
                  <span>$60</span>
                  <span>$120+</span>
                </div>
              </div>

              {/* Checkboxes Formats filter */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Available extension</label>
                <div className="space-y-2 pt-1.5">
                  {availableFormats.map((fmt) => {
                    const isChecked = selectedFormats.includes(fmt);
                    return (
                      <label
                        key={fmt}
                        className="flex items-center gap-2 cursor-pointer group text-xs text-slate-400 hover:text-slate-200"
                      >
                        <div
                          onClick={() => toggleFormat(fmt)}
                          className={`w-4 class-toggle-checkbox h-4 rounded border flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-brand-purple border-brand-purple text-white'
                              : 'border-white/10 group-hover:border-white/30 bg-slate-900'
                          }`}
                        >
                          {isChecked && <Check className="w-2.5 h-2.5" />}
                        </div>
                        <span className="text-xs font-semibold select-none">{fmt}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column Layout: Grid header sorting and items */}
          <div className="col-span-1 lg:col-span-9 space-y-6">
            
            {/* Sorting banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/8 rounded-xl p-4 bg-slate-900/10 backdrop-blur-sm">
              <p className="text-xs text-slate-400 text-center sm:text-left leading-none">
                Showing <strong className="text-slate-200 font-mono">{filteredProducts.length}</strong> available product(s) in general index
              </p>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sort:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-xs font-semibold text-slate-200 cursor-pointer focus:outline-none focus:border-brand-purple"
                  >
                    <option value="popular">Best Sellers</option>
                    <option value="rating">Top Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* List Results Grid */}
            <AnimatePresence mode="popLayout">
              {filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl border border-white/8 bg-slate-900/10 p-12 text-center space-y-4 max-w-md mx-auto"
                >
                  <AlertCircle className="w-8 h-8 text-slate-600 mx-auto" />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-white">No products matched catalog</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Expand your current criteria adjustments, decrease searching, or reset sorting variables to find matching templates.
                    </p>
                  </div>
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-bold text-slate-300 border border-white/10 cursor-pointer flex items-center gap-1.5 mx-auto"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset Filters
                  </button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleProducts.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onQuickView={onQuickView}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Simulated Paginated Infinite Scroll Trigger */}
            {filteredProducts.length > visibleCount && (
              <div className="pt-4 text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMode}
                  className="px-6 py-2.5 rounded-xl border border-white/10 hover:border-white/25 hover:bg-white/5 text-slate-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all mx-auto min-w-[160px]"
                >
                  {loadingMode ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-brand-purple" />
                      Loading Index...
                    </>
                  ) : (
                    'Catalog Load More'
                  )}
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
