"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { id: '01', label: 'Architecture', href: '#' },
    { id: '02', label: 'Selected Works', href: '#portfolio' },
    { id: '03', label: 'Scope & Investment', href: '#estimate' },
    { id: '04', label: 'Transmission', href: '#footer' },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-white/10"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <motion.nav
          layout
          initial={{ borderRadius: 9999 }}
          animate={{
            width: isOpen ? 340 : isHovered ? 280 : 240,
            height: isOpen ? 420 : 56,
            borderRadius: isOpen ? 24 : 9999,
          }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="bg-black text-white overflow-hidden shadow-2xl shadow-black/20 border border-gray-800"
        >
          <AnimatePresence mode="wait">
            {!isOpen && (
              <motion.button
                key="closed-state"
                onClick={() => setIsOpen(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className="w-full h-full flex items-center justify-center gap-4 px-6"
              >
                <div className="relative flex items-center justify-center w-3 h-3">
                  <motion.div
                    animate={{
                      width: isHovered ? 14 : 6,
                      height: 6,
                      borderRadius: isHovered ? 3 : 6
                    }}
                    className="bg-white z-10"
                  />
                  {!isHovered && (
                    <motion.div
                      animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute w-4 h-4 bg-white rounded-full opacity-50"
                    />
                  )}
                </div>

                <motion.span
                  layout
                  className="text-sm md:text-base font-bold tracking-widest uppercase"
                >
                  {isHovered ? 'Expand' : 'Menu'}
                </motion.span>
              </motion.button>
            )}

            {isOpen && (
              <motion.div
                key="open-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="w-full h-full flex flex-col p-6 md:p-8"
              >
                <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                  <span className="text-sm font-semibold tracking-widest uppercase text-gray-500">
                    Directory
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors p-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 13L13 1M1 1L13 13" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col gap-6">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + (i * 0.05), duration: 0.4 }}
                      className="group flex items-baseline gap-4 hover:pl-3 transition-all duration-300"
                    >
                      <span className="text-sm font-mono text-gray-600 group-hover:text-gray-400 transition-colors">
                        {link.id}
                      </span>
                      <span className="text-xl md:text-2xl font-semibold text-gray-300 group-hover:text-white transition-colors">
                        {link.label}
                      </span>
                    </motion.a>
                  ))}
                </div>

                <div className="mt-auto pt-6 flex items-center gap-3">
                   <div className="w-2 h-2 bg-gray-400 rounded-full" />
                   <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                     System Online
                   </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
}
