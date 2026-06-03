/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, Info, ShoppingBag, X } from 'lucide-react';
import { useAppState } from '../../store/StateContext';

export const Toast: React.FC = () => {
  const { notifications, markNotificationRead } = useAppState();
  const [activeToast, setActiveToast] = useState<typeof notifications[0] | null>(null);

  useEffect(() => {
    // Find latest unread notification
    const unread = notifications.filter(n => !n.isRead);
    if (unread.length > 0) {
      const latest = unread[0];
      setActiveToast(latest);

      // Dismiss automatically after 4 seconds
      const timer = setTimeout(() => {
        markNotificationRead(latest.id);
        setActiveToast(null);
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      setActiveToast(null);
    }
  }, [notifications, markNotificationRead]);

  if (!activeToast) return null;

  const getIcon = () => {
    switch (activeToast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-400" />;
      case 'purchase':
        return <ShoppingBag className="w-5 h-5 text-brand-purple" />;
      default:
        return <Info className="w-5 h-5 text-brand-cyan" />;
    }
  };

  const getBorderColor = () => {
    switch (activeToast.type) {
      case 'success':
        return 'border-emerald-500/30 shadow-emerald-950/20';
      case 'warning':
        return 'border-amber-500/30 shadow-amber-950/20';
      case 'purchase':
        return 'border-violet-500/30 shadow-violet-950/20';
      default:
        return 'border-cyan-500/30 shadow-cyan-950/20';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full px-4 sm:px-0">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className={`flex items-start gap-3 p-4 rounded-xl border bg-slate-900 shadow-2xl ${getBorderColor()}`}
        >
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>
          <div className="flex-grow min-w-0">
            <h5 className="text-sm font-semibold text-slate-100 font-sans">
              {activeToast.title}
            </h5>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              {activeToast.message}
            </p>
          </div>
          <button
            onClick={() => {
              markNotificationRead(activeToast.id);
              setActiveToast(null);
            }}
            className="flex-shrink-0 text-slate-500 hover:text-slate-300 transition-colors p-0.5 hover:bg-slate-800/50 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
