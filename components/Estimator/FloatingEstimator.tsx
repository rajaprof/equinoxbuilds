"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, X, Monitor, Sparkles, LayoutTemplate, RefreshCcw, Users, GitMerge, PenTool, ArrowRight, ChevronRight } from 'lucide-react';
import { calculatePriceRange, RegionCode, SERVICES, SCOPE_MULTIPLIERS, TIMELINE_MULTIPLIERS, REGION_MULTIPLIERS, COMMUNICATION_LANGUAGES } from '@/lib/pricing-config';

const IconMap: Record<string, React.ElementType> = {
  'monitor': Monitor,
  'sparkles': Sparkles,
  'layout-template': LayoutTemplate,
  'refresh-ccw': RefreshCcw,
  'users': Users,
  'git-merge': GitMerge,
  'pen-tool': PenTool,
};

export default function FloatingEstimator() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedScope, setSelectedScope] = useState<keyof typeof SCOPE_MULTIPLIERS>('standard');
  const [selectedTimeline, setSelectedTimeline] = useState<keyof typeof TIMELINE_MULTIPLIERS>('standard');
  const [region, setRegion] = useState<RegionCode>('IN');
  const [language, setLanguage] = useState('English');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLocating, setIsLocating] = useState(true);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-estimator', handleOpen);
    return () => window.removeEventListener('open-estimator', handleOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setIsSuccess(false);
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const country = data.country_code;
        if (country === 'IN' || country === 'US' || country === 'GB' || country === 'EU') {
          setRegion(country === 'GB' ? 'UK' : country as RegionCode);
        } else {
          setRegion('GLOBAL');
        }
      } catch {
        console.error('Location detection failed');
      } finally {
        setIsLocating(false);
      }
    }
    fetchLocation();
  }, []);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const priceData = selectedService
    ? calculatePriceRange(selectedService, selectedScope, selectedTimeline, region)
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedService,
          selectedScope,
          selectedTimeline,
          region,
          language,
          clientName,
          clientEmail,
          priceRange: priceData?.formattedString
        }),
      });
      if (response.ok) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getServiceTitle = () => SERVICES.find(s => s.id === selectedService)?.title || selectedService;

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-2xl hover:bg-gray-800 transition-colors group"
            aria-label="Open Project Estimator"
          >
            <Calculator className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="absolute right-16 px-3 py-1.5 bg-black text-white text-xs font-medium rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
              Estimate Project
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm sm:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 bottom-4 top-32 sm:top-auto sm:inset-auto sm:bottom-10 sm:right-6 z-50 sm:w-[420px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-semibold tracking-wide text-black uppercase">Project Scope</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="w-full h-1 bg-gray-100">
                <motion.div
                  className="h-full bg-black"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(step / 4) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-xl font-bold text-black mb-4">What are we building?</h3>
                      <motion.div
                        className="grid grid-cols-1 gap-3"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
                        }}
                      >
                        {SERVICES.map((service) => {
                          const Icon = IconMap[service.iconName] || Monitor;
                          const isSelected = selectedService === service.id;
                          return (
                            <motion.button
                              variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                              }}
                              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                              whileTap={{ scale: 0.98 }}
                              key={service.id}
                              onClick={() => {
                                setSelectedService(service.id);
                                setTimeout(handleNext, 400);
                              }}
                              className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-colors duration-200 ${
                                isSelected
                                  ? 'border-black ring-1 ring-black bg-gray-50 text-black shadow-sm'
                                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                              }`}
                            >
                              <div className={`p-2 rounded-lg transition-colors duration-300 ${isSelected ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>
                                <motion.div
                                  initial={false}
                                  animate={isSelected ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] } : { scale: 1, rotate: 0 }}
                                  transition={{ duration: 0.4, ease: "easeInOut" }}
                                >
                                  <Icon className="w-5 h-5" />
                                </motion.div>
                              </div>
                              <div>
                                <span className="font-medium block">{service.title}</span>
                                {'desc' in service && <span className="text-xs text-gray-500 mt-0.5 block">{service.desc}</span>}
                              </div>
                            </motion.button>
                          );
                        })}
                      </motion.div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-xl font-bold text-black mb-4">Project complexity?</h3>
                      <motion.div
                        className="grid grid-cols-1 gap-3"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
                        }}
                      >
                        {Object.entries(SCOPE_MULTIPLIERS).map(([id, scope]) => {
                          const isSelected = selectedScope === id;
                          return (
                            <motion.button
                              variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                              }}
                              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                              whileTap={{ scale: 0.98 }}
                              key={id}
                              onClick={() => {
                                setSelectedScope(id as keyof typeof SCOPE_MULTIPLIERS);
                                setTimeout(handleNext, 400);
                              }}
                              className={`flex items-center justify-between p-4 rounded-xl border text-left transition-colors duration-200 ${
                                isSelected
                                  ? 'border-black ring-1 ring-black bg-gray-50 text-black shadow-sm'
                                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                              }`}
                            >
                              <span className="font-medium">{scope.title}</span>
                              <motion.div
                                animate={isSelected ? { x: [0, 4, 0] } : { x: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronRight className="w-4 h-4" />
                              </motion.div>
                            </motion.button>
                          );
                        })}
                      </motion.div>
                      <button onClick={handleBack} className="mt-4 text-sm font-medium text-gray-500 hover:text-black">Go Back</button>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-xl font-bold text-black mb-4">Timeline?</h3>
                      <motion.div
                        className="grid grid-cols-1 gap-3"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
                        }}
                      >
                        {Object.entries(TIMELINE_MULTIPLIERS).map(([id, timeline]) => {
                          const isSelected = selectedTimeline === id;
                          return (
                            <motion.button
                              variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                              }}
                              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                              whileTap={{ scale: 0.98 }}
                              key={id}
                              onClick={() => {
                                setSelectedTimeline(id as keyof typeof TIMELINE_MULTIPLIERS);
                                setTimeout(handleNext, 400);
                              }}
                              className={`flex items-center justify-between p-4 rounded-xl border text-left transition-colors duration-200 ${
                                isSelected
                                  ? 'border-black ring-1 ring-black bg-gray-50 text-black shadow-sm'
                                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                              }`}
                            >
                              <div>
                                <span className="font-medium block">{timeline.title}</span>
                              </div>
                              <motion.div
                                animate={isSelected ? { x: [0, 4, 0] } : { x: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronRight className="w-4 h-4" />
                              </motion.div>
                            </motion.button>
                          );
                        })}
                      </motion.div>
                      <button onClick={handleBack} className="mt-4 text-sm font-medium text-gray-500 hover:text-black">Go Back</button>
                    </motion.div>
                  )}

                  {step === 4 && !isSuccess && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-xl font-bold text-black mb-4">Finalize</h3>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Region</label>
                          <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value as RegionCode)}
                            className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-black focus:ring-1 focus:ring-black outline-none"
                          >
                            {Object.entries(REGION_MULTIPLIERS).map(([code, config]) => (
                              <option key={code} value={code}>{code} ({config.currency})</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Language</label>
                          <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-black focus:ring-1 focus:ring-black outline-none"
                          >
                            {COMMUNICATION_LANGUAGES.map((lang) => (
                              <option key={lang} value={lang}>{lang}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="Your Name"
                            required
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-700 placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black outline-none"
                          />
                        </div>

                        <div>
                          <input
                            type="email"
                            placeholder="Your Email"
                            required
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-700 placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black outline-none"
                          />
                        </div>

                        {priceData && (
                          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Estimated Range</span>
                            <p className="text-xl font-bold text-black mt-1">{priceData.formattedString}</p>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? 'Sending...' : 'Send Estimate'}
                          {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                        </button>
                      </form>
                      <button onClick={handleBack} className="mt-4 text-sm font-medium text-gray-500 hover:text-black">Go Back</button>
                    </motion.div>
                  )}

                  {isSuccess && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-8"
                    >
                      <h3 className="text-2xl font-bold text-black mb-2">Blueprint Secured.</h3>
                      <p className="text-gray-500 mb-4">Your project details have been transmitted.</p>
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-left mb-6">
                        <p className="text-sm"><span className="text-gray-500">Service:</span> <span className="font-medium">{getServiceTitle()}</span></p>
                        <p className="text-sm mt-1"><span className="text-gray-500">Estimate:</span> <span className="font-bold">{priceData?.formattedString}</span></p>
                      </div>
                      <p className="text-sm text-gray-500">I will review your requirements and reach out via {clientEmail} shortly.</p>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="mt-6 px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Close
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
