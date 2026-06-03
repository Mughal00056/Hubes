/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, UserProfile, PurchasedProduct, AppNotification, Coupon, Review } from '../types';
import { PRODUCTS, REVIEWS_POOL } from '../data/products';

interface StateContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  user: UserProfile;
  purchases: PurchasedProduct[];
  notifications: AppNotification[];
  theme: 'dark' | 'light';
  appliedCoupon: Coupon | null;
  productReviews: Record<string, Review[]>;
  toggleTheme: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isInCart: (productId: string) => boolean;
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  clearCart: () => void;
  triggerCheckout: (billingData: { name: string; email: string; address?: string }, paymentMethod: string) => { success: boolean; error?: string };
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  addNotification: (title: string, message: string, type: AppNotification['type']) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearAllNotifications: () => void;
  submitProductReview: (productId: string, rating: number, comment: string) => void;
  addFunds: (amount: number) => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

const initialUser: UserProfile = {
  name: 'Amelia Sterling',
  email: 'mrflop786@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  balance: 175.00,
  joinedDate: 'June 2024',
  bio: 'Lead Interface Developer & Technical Artist curious about creative coding, modular synths, and web animation wrappers.',
  location: 'Manchester, UK'
};

const defaultNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Welcome to Nebula Marketplace!',
    message: 'Explore pristine digital assets, UI boilerplates, and Blender assets tuned for speed and aesthetic excellence.',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    isRead: false,
    type: 'info'
  },
  {
    id: 'notif-2',
    title: 'Aero Figma System updated',
    message: 'Version 2.4 of the Aero Dashboard design system is now active. Refresh your local project references.',
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hours ago
    isRead: true,
    type: 'success'
  },
  {
    id: 'notif-3',
    title: 'Premium Dark Aesthetic Enabled',
    message: 'The dark premium layout uses high contrast glowing text coupled with smooth visual glass overlays to ease eye fatigue.',
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    isRead: false,
    type: 'info'
  }
];

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme logic
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('cosmic_marketplace_theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cosmic_marketplace_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('cosmic_marketplace_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // User state
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('cosmic_marketplace_user');
    return saved ? JSON.parse(saved) : initialUser;
  });

  // Purchases state
  const [purchases, setPurchases] = useState<PurchasedProduct[]>(() => {
    const saved = localStorage.getItem('cosmic_marketplace_purchases');
    if (saved) return JSON.parse(saved);
    // Initialize with a default purchase to make the app feel alive
    const defaultProduct = PRODUCTS.find(p => p.id === 'prod-2'); // Aero Figma
    if (defaultProduct) {
      const pProd: PurchasedProduct = {
        ...defaultProduct,
        purchaseDate: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
        orderId: 'ORD-984A-522F',
        licenseKey: 'LIC-AERO-92NF-83KJ-LQ93',
        downloadCount: 2
      };
      return [pProd];
    }
    return [];
  });

  // Notifications state
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('cosmic_marketplace_notifications');
    return saved ? JSON.parse(saved) : defaultNotifications;
  });

  // Reviews dictionary state
  const [productReviews, setProductReviews] = useState<Record<string, Review[]>>(() => {
    const saved = localStorage.getItem('cosmic_marketplace_reviews');
    if (saved) return JSON.parse(saved);
    // Seed default reviews for our products
    const initialReviews: Record<string, Review[]> = {};
    PRODUCTS.forEach((prod, i) => {
      // Seed reviews with slice of pool
      initialReviews[prod.id] = [
        { ...REVIEWS_POOL[0], id: `r-${prod.id}-1`, date: new Date(Date.now() - 86400000 * (i + 1)).toISOString().split('T')[0] },
        { ...REVIEWS_POOL[1], id: `r-${prod.id}-2`, date: new Date(Date.now() - 86400000 * (i + 3)).toISOString().split('T')[0] },
        { ...REVIEWS_POOL[2], id: `r-${prod.id}-3`, date: new Date(Date.now() - 86400000 * (i + 5)).toISOString().split('T')[0] }
      ];
    });
    return initialReviews;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('cosmic_marketplace_theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('cosmic_marketplace_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cosmic_marketplace_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('cosmic_marketplace_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cosmic_marketplace_purchases', JSON.stringify(purchases));
  }, [purchases]);

  useEffect(() => {
    localStorage.setItem('cosmic_marketplace_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('cosmic_marketplace_reviews', JSON.stringify(productReviews));
  }, [productReviews]);

  // Theme actions
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // Cart operations
  const addToCart = (product: Product) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.product.id === product.id);
      if (idx > -1) {
        // Digital product: limit quantity to 1 or increment. Let's make digital assets unique in cart
        return prev;
      }
      return [...prev, { product, quantity: 1 }];
    });
    addNotification('Added to Cart', `Added "${product.title}" to your shopping cart.`, 'info');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: Math.max(1, quantity) };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    const isSaved = wishlist.includes(productId);
    const prodName = PRODUCTS.find(p => p.id === productId)?.title || 'Digital Asset';

    if (isSaved) {
      setWishlist(prev => prev.filter(id => id !== productId));
      addNotification('Removed from Wishlist', `"${prodName}" has been removed from your saved list.`, 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      addNotification('Added to Wishlist', `"${prodName}" has been added to your saved list.`, 'success');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);
  const isInCart = (productId: string) => cart.some(item => item.product.id === productId);

  // Coupon application
  const applyCouponCode = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'COSMIC20') {
      const coup: Coupon = { code: 'COSMIC20', discountType: 'percentage', discountValue: 20 };
      setAppliedCoupon(coup);
      return { success: true, message: 'Coupon COSMIC20 applied successfully! Enjoy 20% off.' };
    } else if (formatted === 'LEVELUP10') {
      const coup: Coupon = { code: 'LEVELUP10', discountType: 'fixed', discountValue: 10, minSpend: 30 };
      setAppliedCoupon(coup);
      return { success: true, message: 'Coupon LEVELUP10 applied successfully! $10.00 discount.' };
    } else if (formatted === 'FREEDIGITAL') {
      const coup: Coupon = { code: 'FREEDIGITAL', discountType: 'percentage', discountValue: 100, minSpend: 15 };
      setAppliedCoupon(coup);
      return { success: true, message: 'Coupon FREEDIGITAL active. 100% discount achieved!' };
    }
    return { success: false, message: 'Invalid or expired coupon code. Try COSMIC20 or FREEDIGITAL' };
  };

  const removeCoupon = () => setAppliedCoupon(null);

  // Notifications operations
  const addNotification = (title: string, message: string, type: AppNotification['type']) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      title,
      message,
      timestamp: new Date().toISOString(),
      isRead: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Funds
  const addFunds = (amount: number) => {
    setUser(prev => ({ ...prev, balance: prev.balance + amount }));
    addNotification('Funds Added', `Successfully added $${amount.toFixed(2)} to your account balance.`, 'success');
  };

  // Checkout transaction
  const triggerCheckout = (billingData: { name: string; email: string }, paymentMethod: string) => {
    // Generate order calculation
    let subtotal = cart.reduce((acc, c) => acc + (c.product.price * c.quantity), 0);
    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountType === 'percentage') {
        discount = subtotal * (appliedCoupon.discountValue / 100);
      } else {
        discount = appliedCoupon.discountValue;
      }
    }
    const finalPrice = Math.max(0, subtotal - discount);

    if (finalPrice > user.balance && paymentMethod === 'balance') {
      return { success: false, error: `Insufficient account balance. Click your profile card in navbar/dashboard to add funds! (Price: $${finalPrice.toFixed(2)}, Balance: $${user.balance.toFixed(2)})` };
    }

    // Allocate order ID and keys
    const orderId = `ORD-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(3, 7).toUpperCase()}`;

    const newPurchasedItems: PurchasedProduct[] = cart.map(item => {
      // Craft a deterministic custom license key for visual fidelity
      const block1 = item.product.title.split(' ')[0].toUpperCase().slice(0, 4);
      const block2 = Math.random().toString(36).substring(2, 6).toUpperCase();
      const block3 = Math.random().toString(36).substring(5, 9).toUpperCase();
      const licenseKey = `LIC-${block1}-${block2}-${block3}-KEY9`;

      return {
        ...item.product,
        purchaseDate: new Date().toISOString(),
        orderId,
        licenseKey,
        downloadCount: 0
      };
    });

    // Update state
    setPurchases(prev => [...newPurchasedItems, ...prev]);

    // Debit user balance if using account balance, otherwise pretend card/crypto checkout deduction
    if (paymentMethod === 'balance') {
      setUser(prev => ({ ...prev, balance: Number((prev.balance - finalPrice).toFixed(2)) }));
    }

    // Trigger Notification
    addNotification(
      'Checkout Successful!',
      `You acquired ${cart.length} digital product(s). License keys are active in your Downloads.`,
      'purchase'
    );

    // Clear cart & discount
    clearCart();

    return { success: true };
  };

  // User Profile
  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...profile }));
    addNotification('Profile Updated', 'Your profile details were updated and saved successfully.', 'success');
  };

  // Reviews submission
  const submitProductReview = (productId: string, rating: number, comment: string) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      userName: user.name,
      userAvatar: user.avatar,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0
    };

    setProductReviews(prev => {
      const current = prev[productId] || [];
      return {
        ...prev,
        [productId]: [newRev, ...current]
      };
    });

    addNotification('Review Submitted', 'Thanks! Your detailed review was submitted.', 'success');
  };

  return (
    <StateContext.Provider value={{
      products: PRODUCTS,
      cart,
      wishlist,
      user,
      purchases,
      notifications,
      theme,
      appliedCoupon,
      productReviews,
      toggleTheme,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      toggleWishlist,
      isInWishlist,
      isInCart,
      applyCouponCode,
      removeCoupon,
      clearCart,
      triggerCheckout,
      updateUserProfile,
      addNotification,
      markNotificationRead,
      markAllNotificationsRead,
      clearAllNotifications,
      submitProductReview,
      addFunds
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be used inside a StateProvider');
  }
  return context;
};
