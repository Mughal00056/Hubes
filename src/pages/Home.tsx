/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, ArrowRight, Star, ShoppingBag, ShieldCheck, Download, Users, Lightbulb,
  Heart, Flame, ArrowLeft, Send, Layout, Palette, Component, Music, Type, Cpu,
  ChevronLeft, ChevronRight, Image
} from 'lucide-react';
import { useAppState } from '../store/StateContext';
import { CATEGORIES, TESTIMONIALS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { Product } from '../types';

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Sparkles': return <Sparkles className="w-5 h-5 text-brand-purple group-hover:text-brand-cyan transition-colors" />;
    case 'Image': return <Image className="w-5 h-5 text-brand-purple group-hover:text-brand-cyan transition-colors" />;
    case 'Layout': return <Layout className="w-5 h-5 text-brand-purple group-hover:text-brand-cyan transition-colors" />;
    case 'Palette': return <Palette className="w-5 h-5 text-brand-purple group-hover:text-brand-cyan transition-colors" />;
    case 'Component': return <Component className="w-5 h-5 text-brand-purple group-hover:text-brand-cyan transition-colors" />;
    case 'Music': return <Music className="w-5 h-5 text-brand-purple group-hover:text-brand-cyan transition-colors" />;
    case 'Type': return <Type className="w-5 h-5 text-brand-purple group-hover:text-brand-cyan transition-colors" />;
    case 'Cpu': return <Cpu className="w-5 h-5 text-brand-purple group-hover:text-brand-cyan transition-colors" />;
    default: return <Lightbulb className="w-5 h-5 text-brand-purple group-hover:text-brand-cyan transition-colors" />;
  }
};

const CATEGORY_CARDS = [
  {
    id: 'logos',
    name: 'Logos & Brand Identity',
    count: '16+ templates',
    actionText: 'Build Custom',
    gradient: 'from-[#6366f1] via-[#8b5cf6] to-[#ec4899]',
    image: 'https://images.unsplash.com/photo-1618005198143-d3663efd8ccd?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'thumbnails',
    name: 'Thumbnails & Covers',
    count: '12+ models',
    actionText: 'Create Custom',
    gradient: 'from-[#fb7185] via-[#f43f5e] to-[#be185d]',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'templates',
    name: 'UI Kits & Templates',
    count: '18+ items',
    actionText: 'Download',
    gradient: 'from-[#0ea5e9] via-[#2563eb] to-[#7c3aed]',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'design',
    name: 'Figma Systems',
    count: '12+ files',
    actionText: 'View All',
    gradient: 'from-[#ca8a04] via-[#ea580c] to-[#dc2626]',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'assets-3d',
    name: '3D Assets Pack',
    count: '9+ assets',
    actionText: 'Explore',
    gradient: 'from-[#15803d] via-[#16a34a] to-[#2563eb]',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'audio',
    name: 'Audio & Presets',
    count: '14+ wave presets',
    actionText: 'Download',
    gradient: 'from-[#b91c1c] via-[#dc2626] to-[#be185d]',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=500&q=80',
  }
];

interface HomeProps {
  onQuickView: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = ({ onQuickView }) => {
  const { products } = useAppState();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [randomMsgIdx, setRandomMsgIdx] = useState(0);
  const [consoleSwitchOn, setConsoleSwitchOn] = useState(true);

  const randomTexts = [
    "✦ Dynamic Sandbox compilations: 3D render modules synchronized & calibrated.",
    "✦ Network Channel Feed: Transparency layers optimized for PNG/SVG exports.",
    "✦ Quantum Design Engine: Auto-layout variants loaded with zero visual offsets.",
    "✦ Ambient Stream: 5,420 unique vector glyphs catalogued in customizable sandbox."
  ];

  const handleNextMessage = () => {
    setRandomMsgIdx(prev => (prev + 1) % randomTexts.length);
  };

  const handlePrevMessage = () => {
    setRandomMsgIdx(prev => (prev - 1 + randomTexts.length) % randomTexts.length);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Filter lists
  const featuredProducts = products.filter(p => p.isBestseller || p.id === 'prod-1').slice(0, 3);
  const trendingProducts = products.filter(p => p.isTrending || p.id === 'prod-3').slice(0, 4);

  return (
    <div className="relative overflow-hidden bg-slate-950 min-h-screen text-slate-100 pb-16">
      
      {/* Background ambient glowing spheres */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-brand-purple/10 mask-radial blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-cyan/10 mask-radial blur-3xl animate-pulse-slow pointer-events-none" />

      {/* Static Premium Branding Banner replacing the slider */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="relative rounded-3xl border border-white/8 overflow-hidden bg-gradient-to-tr from-slate-900/90 via-slate-950 to-slate-900/60 p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 min-h-[280px]">
          {/* Subtle logo backdrop reflection */}
          <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-brand-cyan/5 via-brand-purple/5 to-transparent blur-2xl rounded-full pointer-events-none" />

          <div className="max-w-xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20">
              <Sparkles className="w-3 h-3 text-brand-cyan" /> Interactive Assets Desk
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-none">
              Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan">NEBULA</span> Sandbox
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              A high-precision modular portal geared for fullstack engineers and artistic pioneers. Catalogue custom layouts directly to your personal workspace live.
            </p>
          </div>

          <div className="flex-shrink-0 relative z-10 flex flex-col sm:flex-row gap-3">
            <Link
              to="/marketplace"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan hover:opacity-95 text-xs font-bold text-white uppercase tracking-wider text-center cursor-pointer transition-all active:scale-95 shadow-lg shadow-purple-500/10"
            >
              Examine Stock Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Grid of categories list quick access & requested console switch widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        
        {/* Custom requested "random text arrow switch lagao" channel console */}
        <div className="rounded-2xl border border-white/10 bg-slate-950 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <div className="p-2 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center">
              <Cpu className={`w-4 h-4 ${consoleSwitchOn ? 'text-brand-cyan animate-pulse' : 'text-slate-600'}`} />
            </div>
            
            <div className="space-y-1">
              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold block">
                Sandbox Console Live Transmission
              </span>
              
              {/* Cycling random text row */}
              <div className="text-xs font-semibold font-mono tracking-tight text-slate-100 flex items-center gap-1.5 h-5">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={randomMsgIdx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.18 }}
                    className={consoleSwitchOn ? "text-brand-cyan" : "text-slate-400"}
                  >
                    {randomTexts[randomMsgIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            {/* Arrow controllers to switch random text logs */}
            <div className="flex items-center gap-1 bg-slate-900 rounded-lg p-0.5 border border-white/5">
              <button
                onClick={handlePrevMessage}
                className="p-1 px-2 text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                title="Previous message"
              >
                &larr;
              </button>
              <span className="text-[10px] font-mono font-bold text-slate-600 px-1 select-none">
                {randomMsgIdx + 1}/{randomTexts.length}
              </span>
              <button
                onClick={handleNextMessage}
                className="p-1 px-2 text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                title="Next message"
              >
                &rarr;
              </button>
            </div>

            {/* Glowing cyberpunk switch toggle */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-slate-500">
                {consoleSwitchOn ? "Active" : "Muted"}
              </span>
              
              <button
                type="button"
                onClick={() => setConsoleSwitchOn(!consoleSwitchOn)}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer ${
                  consoleSwitchOn ? 'bg-brand-cyan shadow-[0_0_8px_rgba(6,182,212,0.4)]' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-slate-950 transition-transform duration-200 flex items-center justify-center border border-white/10 ${
                    consoleSwitchOn ? 'translate-x-5' : 'translate-x-0'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${consoleSwitchOn ? 'bg-brand-cyan animate-ping' : 'bg-slate-600'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">Browse by Creative Category</h2>
            <p className="text-xs text-slate-500 mt-1">High-fidelity curated digital asset bundles sorted by department channels.</p>
          </div>
          
          <div className="flex items-center gap-3 self-end sm:self-center">
            {/* Horizontal Scroll Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                className="w-10 h-10 rounded-full border border-white/8 bg-slate-900/40 hover:bg-slate-900/80 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-all active:scale-95"
                title="Scroll Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="w-10 h-10 rounded-full border border-white/8 bg-slate-900/40 hover:bg-slate-900/80 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-all active:scale-95"
                title="Scroll Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <span className="text-white/10 select-none hidden sm:inline">|</span>

            <Link
              to="/marketplace"
              className="text-xs font-semibold text-brand-cyan hover:text-brand-purple flex items-center gap-1 transition-colors cursor-pointer"
            >
              All products catalog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Straight Horizontal Banner Cards Rail */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory pt-2"
          style={{ scrollBehavior: 'smooth' }}
        >
          {CATEGORY_CARDS.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/marketplace?cat=${cat.id}`)}
              className="group relative flex-shrink-0 w-64 sm:w-72 aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer select-none snap-start border border-white/10 shadow-2xl transition-all duration-300 hover:border-brand-purple/40 hover:scale-[1.02]"
            >
              
              {/* Vibrant Base Gradient Layer */}
              <div className={`absolute inset-0 bg-gradient-to-b ${cat.gradient} opacity-90 z-0`} />

              {/* Textured Unsplash Art Background */}
              <img
                src={cat.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 group-hover:scale-105 transition-transform duration-500 z-0 pointer-events-none"
                referrerPolicy="no-referrer"
              />

              {/* Gradient dark fade on the bottom content layout */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-1" />

              {/* Internal Card Details mapping the Mockup */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                
                {/* Top edge: Asset counts */}
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg">
                    {getCategoryIcon(CATEGORIES.find(c => c.id === cat.id)?.icon || 'Layout')}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-white tracking-wide uppercase">
                    {cat.count}
                  </span>
                </div>

                {/* Center / Bottom: Title and centered capsule Frosted Action Button */}
                <div className="text-center space-y-4">
                  <div>
                    <h4 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight leading-tight drop-shadow-md">
                      {cat.name}
                    </h4>
                    <p className="text-[10px] text-white/70 font-mono uppercase tracking-widest mt-1.5">
                      Explore repository
                    </p>
                  </div>

                  {/* Frosted Action Button resembling the mockup image ('Download', 'View All', etc.) */}
                  <div className="pt-2">
                    <span className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border-2 border-white/30 bg-white/20 text-xs font-bold text-white uppercase tracking-wider backdrop-blur-sm hover:bg-white hover:text-slate-900 hover:border-white transition-all shadow-lg active:scale-95">
                      {cat.actionText}
                    </span>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-brand-cyan">HANDPICKED DEMAND</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">Our Featured Deliverables</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>

      {/* Banner highlight discount code */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative rounded-2xl overflow-hidden border border-violet-500/30 bg-gradient-to-r from-violet-950/55 to-slate-950 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-80 h-full bg-brand-purple/10 mask-radial blur-3xl rounded-full pointer-events-none" />
          <div className="space-y-2 relative z-10 text-center md:text-left">
            <span className="text-[10px] uppercase font-bold text-brand-cyan border border-brand-cyan/20 bg-brand-cyan/10 px-2 py-0.5 rounded">Summer Promo Code Exclusive</span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">Get 100% Free Trial Downloads</h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Apply coupon <strong className="text-white font-mono bg-white/10 px-2 py-0.5 rounded text-xs">FREEDIGITAL</strong> in the cart to activate full 100% discounts on products priced under $15.00!
            </p>
          </div>
          <button
            onClick={() => navigate('/marketplace')}
            className="px-5 py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors z-10 whitespace-nowrap cursor-pointer"
          >
            Redeem Now
          </button>
        </div>
      </section>

      {/* Trending Products Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-brand-pink fill-brand-pink animate-pulse" />
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-brand-pink">POPULAR TRAFFIC</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">Trending This Week</h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>

      {/* Customer reviews block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="text-center space-y-1 max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-wider font-bold text-brand-purple">VERIFIED APPRECIATION</span>
          <h2 className="font-display font-bold text-2xl text-white tracking-tight">Client Review Summaries</h2>
          <p className="text-xs text-slate-400">
            Read details written directly by working fullstack engineers and creative leads after using our templates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col justify-between hover:border-brand-purple/20 transition-colors leading-relaxed"
            >
              <div className="space-y-3">
                <div className="flex gap-0.5">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  ))}
                </div>
                <p className="text-slate-300 text-xs italic">
                  "{test.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-5 border-t border-white/5 mt-5">
                <img
                  src={test.avatar}
                  alt={test.userName}
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h5 className="font-bold text-xs text-slate-100">{test.userName}</h5>
                  <p className="text-[10px] text-slate-500">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
