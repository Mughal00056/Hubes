/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  features: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: string;
  image: string;
  gallery: string[];
  fileSize: string;
  fileType: string; // e.g. "ZIP", "Figma", "Blend", "React Native", "Tailwind Template"
  isBestseller?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
  salesCount: number;
  tags?: string[];
  author: string;
  license?: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpfulCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number; // For digital items, default is 1, but useful for license tiers or item quantities
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  balance: number;
  joinedDate: string;
  bio?: string;
  location?: string;
}

export interface PurchasedProduct extends Product {
  purchaseDate: string;
  orderId: string;
  licenseKey: string;
  downloadCount: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'purchase';
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend?: number;
}
