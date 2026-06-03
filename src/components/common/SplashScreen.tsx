/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Cpu, HardDrive, ShieldCheck } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);

  const statuses = [
    { text: 'Establishing secure sandbox ledger nodes...', icon: <Cpu className="w-3.5 h-3.5 text-brand-purple" /> },
    { text: 'Synchronizing client storage index map...', icon: <HardDrive className="w-3.5 h-3.5 text-brand-cyan" /> },
    { text: 'Loading custom design resources & typography...', icon: <Sparkles className="w-3.5 h-3.5 text-brand-pink" /> },
    { text: 'Atmosphere stabilized. Quantum gate active.', icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> }
  ];

  useEffect(() => {
    // Increment loading progress
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        // Jump progress organically
        const jump = Math.floor(Math.random() * 12) + 6;
        return Math.min(100, prev + jump);
      });
    }, 180);

    return () => clearInterval(progressTimer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const exitDelay = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(exitDelay);
    }

    // Step through the status logs based on progress thresholds
    if (progress > 75) {
      setStatusIdx(3);
    } else if (progress > 50) {
      setStatusIdx(2);
    } else if (progress > 25) {
      setStatusIdx(1);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 overflow-hidden"
    >
      {/* Background glowing ambience */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40%] -left-[30%] w-[100%] h-[100%] rounded-full bg-brand-purple/10 blur-[140px] animate-pulse" />
        <div className="absolute -bottom-[40%] -right-[30%] w-[100%] h-[100%] rounded-full bg-brand-cyan/8 blur-[140px] animate-pulse" />
        <div className="absolute inset-x-0 inset-y-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0)_0%,rgba(2,6,23,0.8)_100%)]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center text-center space-y-8">
        
        {/* Glowing Logo Circle */}
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
            className="absolute -inset-4 rounded-full bg-gradient-to-tr from-brand-purple via-brand-pink to-brand-cyan opacity-40 blur-lg"
          />
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="relative w-20 h-20 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-2xl"
          >
            <Sparkles className="w-10 h-10 text-brand-cyan animate-pulse" />
          </motion.div>
        </div>

        {/* Title details */}
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display font-extrabold text-3xl tracking-widest text-white leading-none"
          >
            NEBULA <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">PRO</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.4 }}
            className="text-[10px] uppercase font-mono tracking-[0.25rem] text-slate-400"
          >
            Digital Assets Sandbox Stream
          </motion.p>
        </div>

        {/* Realistic Progress bar */}
        <div className="w-full space-y-3.5 pt-4">
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5 relative">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          {/* Dynamic log status message with icons */}
          <div className="flex items-center justify-center gap-2 h-6 text-slate-400 font-mono text-[11px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={statusIdx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                {statuses[statusIdx].icon}
                <span>{statuses[statusIdx].text}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Skip action button */}
        <motion.button
          onClick={onComplete}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          className="px-4 py-1.5 rounded-full border border-white/10 hover:border-white/20 bg-slate-950 text-[10px] font-mono uppercase tracking-wider text-slate-300 cursor-pointer transition-all active:scale-95 text-slate-400"
        >
          Skip Intro
        </motion.button>

      </div>
    </motion.div>
  );
};
