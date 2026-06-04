/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Coupon, Review } from '../types';

export const CATEGORIES = [
  { id: 'logos', name: 'Premium Logos & Branding', icon: 'Sparkles', count: 16, color: 'from-[#ec4899] to-[#8b5cf6]' },
  { id: 'thumbnails', name: 'Thumbnails & Covers', icon: 'Image', count: 12, color: 'from-[#fb7185] to-[#f43f5e]' },
  { id: 'templates', name: 'UI Kits & Templates', icon: 'Layout', count: 18, color: 'from-[#ec4899] to-[#8b5cf6]' },
  { id: 'design', name: 'Figma Systems', icon: 'Palette', count: 12, color: 'from-[#3b82f6] to-[#06b6d4]' },
  { id: 'assets-3d', name: '3D Assets', icon: 'Component', count: 9, color: 'from-[#10b981] to-[#3b82f6]' },
  { id: 'audio', name: 'Audio & Presets', icon: 'Music', count: 14, color: 'from-[#f59e0b] to-[#ec4899]' }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Synapse - React SaaS UI Kit & Boilerplate',
    description: 'Fully responsive, polished dark SaaS startup template equipped with pre-built dashboards, authentication layouts, page transitions, and complete Tailwind configuration.',
    detailedDescription: 'Synapse is a developer-first React boilerplate designed for modern SaaS organizations. Built using React 19, Tailwind CSS, and Framer Motion, it offers a visual hierarchy crafted for high conversions. Simply pull, plug in your environment coordinates, and deploy in minutes.',
    features: [
      '30+ Pre-built highly functional responsive components',
      'Unified aesthetic with Cosmic Dark theme built-in',
      'SEO optimized routing and clean code annotations',
      'Advanced customizable SVG interactive dashboard charts',
      'Full custom theme file mapping with Tailwind CSS v4'
    ],
    price: 49,
    originalPrice: 79,
    rating: 4.8,
    reviewsCount: 38,
    category: 'templates',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=800&q=80'
    ],
    fileSize: '42.6 MB',
    fileType: 'React Template (ZIP)',
    isBestseller: true,
    salesCount: 342,
    tags: ['React', 'Next.js', 'Tailwind', 'SaaS', 'Dashboard'],
    author: 'QuantumBits Workspace',
    license: 'Single Commercial License'
  },
  {
    id: 'prod-2',
    title: 'Aero - Figma Dashboard Design System',
    description: 'Masterfully structured Figma component library for building executive analytical dashboards. Over 400+ interactive variants, auto-layouts, and color tokens.',
    detailedDescription: 'Aero is our flagship dashboard kit for Figma. It relies 100% on native auto-layout 4.0, structured local variables, component slots, and high contrast typography. Ideal for designers looking to cut client deliverable schedules in half.',
    features: [
      '400+ customizable variants and nested component structures',
      'Real-time component slot swapping support',
      'Light & Dark theme responsive toggles right in Figma',
      'Full typographic typographic scale and desktop-grid systems',
      'Includes 12 pre-built mobile & tablet responsive screen layouts'
    ],
    price: 29,
    originalPrice: 45,
    rating: 4.9,
    reviewsCount: 54,
    category: 'design',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541462608141-27b297b15a2e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80'
    ],
    fileSize: '158 MB',
    fileType: 'Figma File (.fig)',
    isTrending: true,
    salesCount: 810,
    tags: ['Figma', 'UI Kit', 'Dashboard', 'Design System'],
    author: 'Studio Obsidian',
    license: 'Unlimited Projects License'
  },
  {
    id: 'prod-3',
    title: 'Chronos - Cinematic 3D Blender Assets Pack',
    description: 'A stellar assembly of 45+ procedural metallic and glass 3D models configured with photorealistic materials for Blender 4.0 Cycles engine.',
    detailedDescription: 'Elevate your UI landings or project graphics in seconds. Chronos provides hyper-futuristic glass shapes, chrome modules, floating abstract shapes, and customized ambient camera rigs that provide instantaneous render results.',
    features: [
      '45 high-fidelity abstract modeling shapes fully rigged',
      '100% vector-procedural glass, metals, and holographic nodes',
      'Optimized mesh layouts for ultra-fast rendering',
      'Preconfigured atmospheric lighting and camera pipelines',
      'FBX and OBJ formats included for other standard engines'
    ],
    price: 39,
    rating: 4.7,
    reviewsCount: 22,
    category: 'assets-3d',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618005198143-d3663efd8ccd?auto=format&fit=crop&w=800&q=80'
    ],
    fileSize: '312 MB',
    fileType: 'Blender Archive (ZIP)',
    isNew: true,
    salesCount: 94,
    tags: ['Blender', '3D Model', 'Render', 'Cycles', 'Chrome'],
    author: 'Voxel Horizon',
    license: 'Royalty Free'
  },
  {
    id: 'prod-4',
    title: 'Nova - Deep Ambient Serum Synth Presets',
    description: '64 premium presets for Xfer Serum, tailored specifically for cinematic tech, ambient electronica, and vaporwave soundscapes.',
    detailedDescription: 'Bring rich synth atmospheres, cybernetic analog plucks, heavy bass pulses, and rich warm keys into your DAW. Every preset comes mapped with responsive macros to control audio filtering on-the-fly.',
    features: [
      '64 custom crafted Serum sound wave presets',
      'Full MIDI loop library included with corresponding cues',
      'Completely mapped customizable dials (macros 1-4)',
      '12 premium digital wavetables compiled internally',
      '100% royalty free for streaming and commercial outputs'
    ],
    price: 19,
    originalPrice: 29,
    rating: 4.6,
    reviewsCount: 17,
    category: 'audio',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'
    ],
    fileSize: '8.4 MB',
    fileType: 'Serum Preset File (.fxp)',
    isTrending: true,
    salesCount: 205,
    tags: ['Serum', 'Presets', 'Music Production', 'Synth', 'FL Studio'],
    author: 'Lofi Pulse Systems',
    license: 'Commercial License'
  },
  {
    id: 'prod-5',
    title: 'SolanaFlow - Web3 Crypto Wallet Boilerplate',
    description: 'A typescript landing and interaction environment connecting phantom, backlog, and ledger wallets securely. Powered by tailwind gradients.',
    detailedDescription: 'SolanaFlow maps out Web3 dApp layouts. This boilerplate integrates Solana Web3.js wrappers, customized modal layout grids, transparent transactions simulator, and high speed reactivity using modern hooks.',
    features: [
      'Pre-built ledger modal interactions and wallet triggers',
      'Interactive responsive transaction simulator dashboard',
      'Custom styled Tailwind CSS glow gradient grids',
      '100% TypeScript typed connection hooks',
      'Responsive navigation tailored for mobile web browsers'
    ],
    price: 59,
    originalPrice: 99,
    rating: 4.9,
    reviewsCount: 19,
    category: 'web3',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&w=800&q=80'
    ],
    fileSize: '18.2 MB',
    fileType: 'Web3 React App (ZIP)',
    isBestseller: true,
    salesCount: 154,
    tags: ['Solana', 'Web3', 'React', 'Crypto', 'TypeScript'],
    author: 'Hyperion Labs',
    license: 'Single Domain SaaS License'
  },
  {
    id: 'prod-6',
    title: 'TypeCraft - Modern Brutalist Serif Font Family',
    description: 'An aggressive neo-brutalist display font family consisting of regular, italic, bold, and outline variants for high-impact title headers.',
    detailedDescription: 'TypeCraft has been designed with extreme contrast. Combining high-impact geometric lines with elegant classic serifs, it gives physical products, clothing lines, SaaS landings, and banners a distinct industrial identity.',
    features: [
      '4 typographic distinct weights (Regular, Italic, SemiBold, Outline)',
      'Full extended character latin support with 140+ glyphs',
      'True OTF, TTF, and WebFont (WOFF2) assets packed inside',
      'Excellent performance metrics on mobile view typography styling',
      'Includes vector logo sample assets as Adobe Illustrator layers'
    ],
    price: 15,
    rating: 4.5,
    reviewsCount: 11,
    category: 'fonts',
    image: 'https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=800&q=80'
    ],
    fileSize: '4.8 MB',
    fileType: 'Font Pack (WOFF2/OTF)',
    isNew: true,
    salesCount: 68,
    tags: ['Font', 'Typography', 'Brutalist', 'OTF', 'Display Font'],
    author: 'TypeFoundry Berlin',
    license: 'Single Designer License'
  },
  {
    id: 'prod-7',
    title: 'Prism - iOS Glassmorphic UI Icon Set',
    description: '120 sleek, hyper-stylized app icons utilizing translucent blur overlays and colorful background maps for custom iOS setups.',
    detailedDescription: 'Prism is an beautiful compilation of 3D layered iOS graphics. Perfect for matching custom, dark, minimal layouts with glowing color backdrops on portable screens.',
    features: [
      '120 unique handcrafted application icons',
      'Precompiled standard high resolution PNG and vector SVGs',
      'Configured transparent shadows to maximize overlay glossiness',
      'Free lifetime design additions and widget formats',
      'Detailed onboarding manual detailing direct iOS configurations'
    ],
    price: 12,
    originalPrice: 19,
    rating: 4.8,
    reviewsCount: 47,
    category: 'design',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
    ],
    fileSize: '34 MB',
    fileType: 'Vector Assets (ZIP)',
    salesCount: 512,
    tags: ['iOS', 'Icons', 'Glassmorphic', 'PNG', 'Figma'],
    author: 'Studio Obsidian',
    license: 'Personal / Single-User Pack'
  },
  {
    id: 'prod-8',
    title: 'Lumina - Next.js Creative Portfolio Template',
    description: 'An elegant personal portfolio website template containing integrated content CMS capabilities, animated showcase work sliders, and smooth scrolling mechanisms.',
    detailedDescription: 'Showcase your creative work in style. Lumina is a high-octane portfolio boilerplate engineered with responsive Tailwind, optimized responsive images layout, dynamic case-studies mapping, and immersive page routes.',
    features: [
      'Next.js 15 app routing configuration layout ready',
      'Optimized content rendering via markdown blog components',
      'Interactive work grid with sorting and responsive lightbox views',
      'Fully customizable contact form system integrated with EmailJS hooks',
      'Dynamic light-sensing dark mode styling built with ease'
    ],
    price: 35,
    rating: 4.7,
    reviewsCount: 15,
    category: 'templates',
    image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'
    ],
    fileSize: '14.1 MB',
    fileType: 'Next.js App (ZIP)',
    salesCount: 122,
    tags: ['Next.js', 'React', 'Portfolio', 'CMS', 'Framer Motion'],
    author: 'QuantumBits Workspace',
    license: 'Standard Commercial'
  }
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    userName: 'Elena Rostova',
    role: 'Lead UX Designer, FinFlow',
    comment: 'The Figma System by Studio Obsidian completely revamped our onboarding workflow. Client sign-off speeds spiked by almost 45%. Highly recommended visual token alignments!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    productName: 'Aero Figma System'
  },
  {
    id: 'test-2',
    userName: 'Marcus Sterling',
    role: 'Creative Web Developer',
    comment: 'Impressed with the React Template codebase quality. Zero layout bloat, well modules separation, and framer motion runs extremely fluid in browser viewports.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    productName: 'Synapse UI Boilerplate'
  },
  {
    id: 'test-3',
    userName: 'Tariq Al-Mansoori',
    role: 'Digital Indie Hacker',
    comment: 'The Web3 Template saved me at least two weeks of building solid connection modals. Solana flows work precisely as indicated.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    productName: 'SolanaFlow Boilerplate'
  }
];

export const REVIEWS_POOL: Review[] = [
  {
    id: 'rev-1',
    userName: 'Danielle K.',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    comment: 'Exceptional file quality. Every layers has clear labelling and color coding. Super helpful developers too!',
    date: '2026-05-12',
    helpfulCount: 18
  },
  {
    id: 'rev-2',
    userName: 'Jonathan Wu',
    userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
    rating: 4,
    comment: 'Extremely good assets pack! Only wish standard FBX included preset shader materials, but blender nodes work beautifully.',
    date: '2026-05-24',
    helpfulCount: 7
  },
  {
    id: 'rev-3',
    userName: 'Sarah Jenkins',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    comment: 'The sound presets are gorgeous, incredibly spacious and exactly what my synthwave album required.',
    date: '2026-05-30',
    helpfulCount: 12
  }
];

export const COUPONS: Coupon[] = [
  { code: 'COSMIC20', discountType: 'percentage', discountValue: 20 },
  { code: 'LEVELUP10', discountType: 'fixed', discountValue: 10, minSpend: 30 },
  { code: 'FREEDIGITAL', discountType: 'percentage', discountValue: 100, minSpend: 15 } // Fun 100% discount to test checkout
];
