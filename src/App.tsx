/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StateProvider, useAppState } from './store/StateContext';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { CartDrawer } from './components/cart/CartDrawer';
import { QuickViewModal } from './components/product/QuickViewModal';

// Pages
import { Home } from './pages/Home';
import { Marketplace } from './pages/Marketplace';
import { ProductDetails } from './pages/ProductDetails';
import { Wishlist } from './pages/Wishlist';
import { Checkout } from './pages/Checkout';
import { Purchases } from './pages/Purchases';
import { Dashboard } from './pages/Dashboard';
import { Auth } from './pages/Auth';

// Specific types
import { Product } from './types';

function AppLayout() {
  const { theme } = useAppState();
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);

  const handleQuickView = (prod: Product) => {
    setSelectedQuickViewProduct(prod);
  };

  // Hide nav / footer on checkout, success or auth views for absolute landing immersive experience
  const isMinimalLayout = location.pathname === '/auth';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${theme === 'dark' ? 'bg-slate-950 text-slate-100 dark' : 'bg-slate-50 text-slate-800'}`}>
      
      {!isMinimalLayout && <Navbar onOpenCart={() => setIsCartOpen(true)} />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onQuickView={handleQuickView} />} />
          <Route path="/marketplace" element={<Marketplace onQuickView={handleQuickView} />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist onQuickView={handleQuickView} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/purchases" element={<Purchases onQuickView={handleQuickView} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>

      {!isMinimalLayout && <Footer />}

      {/* Slide Cartesian cart */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Floating active toasts */}
      <Toast />

      {/* Micro lightbox inspect quick views */}
      <QuickViewModal
        product={selectedQuickViewProduct}
        onClose={() => setSelectedQuickViewProduct(null)}
      />

    </div>
  );
}

export default function App() {
  return (
    <StateProvider>
      <HashRouter>
        <AppLayout />
      </HashRouter>
    </StateProvider>
  );
}
