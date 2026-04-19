"use client";

import { motion } from 'framer-motion';
import LiquidEther from './LiquidEther';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative h-screen flex flex-col justify-center items-start px-6 md:px-16 lg:px-24 bg-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#000000', '#333333', '#666666']}
          mouseForce={15}
          cursorSize={80}
          isViscous={true}
          viscous={25}
          resolution={0.4}
          autoDemo={true}
          autoSpeed={0.3}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-gray-500">
            Independent IT Consultant & Developer
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-black leading-[1.1] mb-8"
        >
          Engineering digital solutions that eliminate friction.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mb-10"
        >
          From high-performance web applications to custom data-processing Chrome extensions, I design and build secure software architecture that scales businesses.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-estimator'))}
            className="px-8 py-4 bg-black text-white text-sm font-medium tracking-wide rounded-none hover:bg-gray-900 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-gray-200"
          >
            Start a Project Estimate
          </button>

          <button
            onClick={() => {
              const portfolioSection = document.getElementById('portfolio');
              portfolioSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors duration-300"
          >
            <span>View Past Work</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-y-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}