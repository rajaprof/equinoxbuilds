"use client";

import { motion } from 'framer-motion';

export default function ScopeInvestmentSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="estimate" className="py-32 px-6 md:px-16 lg:px-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-5/12 relative lg:sticky lg:top-32"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4 block">
            03 — Scope & Investment
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black mb-6 leading-tight">
            Predictable pricing.<br />No hidden variables.
          </h2>
          <p className="text-lg text-gray-500 mb-10 leading-relaxed">
            I operate on a value-driven pricing model. Your investment is calculated transparently based on the architectural complexity, the speed of delivery, and your local market standards.
          </p>
          
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-estimator'))}
            className="group relative inline-flex items-center gap-4 px-8 py-4 bg-black text-white text-sm font-medium tracking-wide overflow-hidden"
          >
            <span className="relative z-10">Launch Project Estimator</span>
            
            <svg
              className="w-4 h-4 relative z-10 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>

            <div className="absolute inset-0 bg-gray-800 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-7/12 flex flex-col gap-10"
        >
          <motion.div variants={itemVariants} className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xs font-mono text-gray-500">
                01
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-2">Architectural Baselines</h3>
              <p className="text-gray-600 leading-relaxed">
                Every project begins with a strict baseline cost depending on the service category (Web Apps, Native Mobile, or Chrome Extensions). This ensures we are fundamentally aligned on the scale of the solution before writing a single line of code.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xs font-mono text-gray-500">
                02
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-2">Purchasing Power Parity</h3>
              <p className="text-gray-600 leading-relaxed">
                Operating globally requires economic fairness. The interactive estimator automatically adjusts the final investment range based on your region, ensuring high-end development remains accessible whether you are in London, New York, or Bengaluru.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xs font-mono text-gray-500">
                03
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-2">Scope & Velocity Multipliers</h3>
              <p className="text-gray-600 leading-relaxed">
                Need a rapid MVP in under 4 weeks? Or perhaps a highly complex, offline-first secure architecture? The investment scales logically with the urgency of your timeline and the depth of the requested features.
              </p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
