"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Linkedin, Terminal } from 'lucide-react';

export default function TransmissionSection() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent'>('idle');

  useEffect(() => {
    const updateTime = () => {
      const timeString = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(`${timeString} IST`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  return (
    <section id="footer" className="relative bg-black text-white pt-32 pb-12 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row gap-20">
        
        <div className="w-full lg:w-5/12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Terminal className="w-5 h-5 text-gray-400" />
              <span className="text-xs font-mono tracking-widest uppercase text-gray-400">
                Secure Channel
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Initiate<br />Transmission.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-md">
              Whether you need to architect a new solution, optimize an existing workflow, or discuss a freelance partnership, my inbox is open.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col gap-2 p-4 border border-gray-800 rounded-lg bg-gray-900/50 backdrop-blur-sm max-w-sm">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-mono">Location</span>
                <span className="font-medium text-white">Tamil Nadu, India</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-mono">Local Time</span>
                <span className="font-mono text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  {currentTime || 'Loading...'}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm mt-2 pt-2 border-t border-gray-800">
                <span className="text-gray-400 font-mono">Availability</span>
                <span className="font-medium text-white">Accepting Projects</span>
              </div>
            </div>

            <div className="flex gap-6">
              <a href="mailto:time.to.get.rich.com@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Email</span>
                <Mail className="w-6 h-6" strokeWidth={1.5} />
              </a>
              <a href="https://www.linkedin.com/in/k-maharaja-bca" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="w-6 h-6" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-7/12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            
            <div className="relative group">
              <input 
                type="text" 
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-gray-800 py-4 text-lg text-white placeholder-transparent focus:outline-none focus:border-white peer transition-colors"
                placeholder="Name"
              />
              <label 
                htmlFor="name" 
                className="absolute left-0 top-4 text-gray-500 text-lg cursor-text transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gray-400 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-gray-400"
              >
                Identification (Name)
              </label>
            </div>

            <div className="relative group">
              <input 
                type="email" 
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-gray-800 py-4 text-lg text-white placeholder-transparent focus:outline-none focus:border-white peer transition-colors"
                placeholder="Email"
              />
              <label 
                htmlFor="email" 
                className="absolute left-0 top-4 text-gray-500 text-lg cursor-text transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gray-400 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-gray-400"
              >
                Return Address (Email)
              </label>
            </div>

            <div className="relative group">
              <textarea 
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-b border-gray-800 py-4 text-lg text-white placeholder-transparent focus:outline-none focus:border-white peer transition-colors resize-none"
                placeholder="Message"
              />
              <label 
                htmlFor="message" 
                className="absolute left-0 top-4 text-gray-500 text-lg cursor-text transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gray-400 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-gray-400"
              >
                Transmission Payload (Message)
              </label>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <AnimatePresence mode="wait">
                {status === 'sent' && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-green-400 text-sm font-mono flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    Payload delivered successfully.
                  </motion.span>
                )}
              </AnimatePresence>

              <button 
                type="submit" 
                disabled={status !== 'idle'}
                className="group ml-auto flex items-center gap-4 px-8 py-4 bg-white text-black text-sm font-bold tracking-wide hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Transmitting...' : 'Send Transmission'}
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto mt-32 pt-8 border-t border-gray-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-600">
        <p>&copy; {new Date().getFullYear()} Independent IT Consultant. All rights reserved.</p>
        <p>Engineered for minimal friction.</p>
      </div>
    </section>
  );
}
