/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, ArrowRight, Star, ShoppingBag, ShieldCheck, Download, Users, Lightbulb,
  Heart, Flame, ArrowLeft, Send, Layout, Palette, Component, Music, Type, Cpu
} from 'lucide-react';
import { useAppState } from '../store/StateContext';
import { CATEGORIES, TESTIMONIALS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { Product } from '../types';

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Layout': return <Layout className="w-5 h-5 text-brand-purple group-hover:text-brand-cyan transition-colors" />;
    case 'Palette': return <Palette className="w-5 h-5 text-brand-purple group-hover:text-brand-cyan transition-colors" />;
    case 'Component': return <Component className="w-5 h-5 text-brand-purple group-hover:text-brand-cyan transition-colors" />;
    case 'Music': return <Music className="w-5 h-5 text-brand-purple group-hover:text-brand-cyan transition-colors" />;
    case 'Type': return <Type className="w-5 h-5 text-brand-purple group-hover:text-brand-cyan transition-colors" />;
    case 'Cpu': return <Cpu className="w-5 h-5 text-brand-purple group-hover:text-brand-cyan transition-colors" />;
    default: return <Lightbulb className="w-5 h-5 text-brand-purple group-hover:text-brand-cyan transition-colors" />;
  }
};

interface HomeProps {
  onQuickView: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = ({ onQuickView }) => {
  const { products } = useAppState();
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  // Filter lists
  const featuredProducts = products.filter(p => p.isBestseller || p.id === 'prod-1').slice(0, 3);
  const trendingProducts = products.filter(p => p.isTrending || p.id === 'prod-3').slice(0, 4);

  // Sliced Hero banners mapping to actual quality products
  const heroSlides = [
    {
      id: 'slide-1',
      productId: 'prod-1',
      title: 'Synapse UI Framework Boilerplate',
      subtitle: 'REVOLUTIONARY DARK CONTEXT MODEL',
      badge: 'React 19 Tech Stack',
      description: 'The premier dark theme SaaS kit mapped out in responsive styled Tailwind elements for high-growth tech setups.',
      color: 'from-violet-600 via-indigo-600 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      price: '$49'
    },
    {
      id: 'slide-2',
      productId: 'prod-2',
      title: 'Aero Figma Analytical Component Hub',
      subtitle: 'HIGH CONTRAST AUTO-LAYOUTS v4',
      badge: 'Figma Library',
      description: 'Streamline interface prototypes in minutes. Fully synchronized local styling parameters, custom variants, and auto-layouts.',
      color: 'from-cyan-600 via-blue-600 to-indigo-500',
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80',
      price: '$29'
    },
    {
      id: 'slide-3',
      productId: 'prod-3',
      title: 'Chronos Atmospheric 3D Glass Objects',
      subtitle: 'BLENDER MATERIALS COMPILATION',
      badge: '3D modeling Cycles rigging',
      description: 'Generate stunning tech assets or landing showcases with hyper-futuristic glass nodes and metallic custom procedural structures.',
      color: 'from-emerald-600 via-teal-600 to-blue-500',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      price: '$39'
    }
  ];

  // Automated slider rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <div className="relative overflow-hidden bg-slate-950 min-h-screen text-slate-100 pb-16">
      
      {/* Background ambient glowing spheres */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-brand-purple/10 mask-radial blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-cyan/10 mask-radial blur-3xl animate-pulse-slow pointer-events-none" />

      {/* Hero interactive visual slider */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="relative rounded-3xl border border-white/8 overflow-hidden bg-slate-900/40 backdrop-blur-md aspect-[16/9] md:aspect-[21/9] min-h-[360px] sm:min-h-[420px] flex flex-col justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              {/* Image backdrop with dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/20 z-10" />
              <img
                src={heroSlides[activeSlide].image}
                alt=""
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>

          {/* Slider Content */}
          <div className="relative z-20 px-6 sm:px-12 max-w-2xl space-y-4">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-cyan border border-brand-cyan/30 bg-brand-cyan/15"
            >
              <Sparkles className="w-3.5 h-3.5" /> {heroSlides[activeSlide].badge}
            </motion.span>

            <div className="space-y-1 sm:space-y-2">
              <span className="block text-[11px] font-bold tracking-widest text-slate-400 font-mono">
                {heroSlides[activeSlide].subtitle}
              </span>
              <h1 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight leading-none">
                {heroSlides[activeSlide].title}
              </h1>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg">
              {heroSlides[activeSlide].description}
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => {
                  const prod = products.find(p => p.id === heroSlides[activeSlide].productId);
                  if (prod) onQuickView(prod);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-lg shadow-purple-500/20 flex items-center gap-2 cursor-pointer text-white border-none"
              >
                Inspect Asset <ArrowRight className="w-4 h-4" />
              </button>
              <span className="font-mono font-bold text-lg text-slate-300">
                Starting at {heroSlides[activeSlide].price}
              </span>
            </div>
          </div>

          {/* Slider Controls Dots */}
          <div className="absolute bottom-5 right-8 z-20 flex gap-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  activeSlide === idx ? 'w-6 bg-brand-purple' : 'w-2 bg-slate-600'
                }`}
                title={`Product slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Grid of categories list quick access */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">Browse by Creative Category</h2>
          </div>
          <Link
            to="/marketplace"
            className="text-xs font-semibold text-brand-cyan hover:text-brand-purple flex items-center gap-1 transition-colors cursor-pointer"
          >
            All products catalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 pt-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/marketplace?cat=${cat.id}`)}
              className="group flex flex-col items-center gap-3 cursor-pointer select-none"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/8 bg-slate-900/20 flex flex-col items-center justify-center gap-1.5 hover:border-brand-purple/40 hover:bg-slate-900/60 shadow-inner group-hover:shadow-brand-purple/5 transition-all duration-300 transform group-hover:scale-105">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-purple/20 to-brand-cyan/20 border border-white/8 flex items-center justify-center">
                  {getCategoryIcon(cat.icon)}
                </div>
                <span className="text-[10px] text-slate-500 font-mono tracking-wide group-hover:text-slate-400 transition-colors uppercase">{cat.count} files</span>
              </div>
              <h4 className="font-semibold text-slate-300 text-xs text-center group-hover:text-white transition-colors max-w-[110px] leading-tight">{cat.name}</h4>
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
