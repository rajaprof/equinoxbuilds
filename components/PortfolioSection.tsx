"use client";

import { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import TiltedCard from './TiltedCard';

const PROJECTS = [
  {
    id: 'aarah-ecom',
    title: 'AARAH Maternity',
    role: 'Full-Stack E-Commerce Development',
    description: 'Architected and developed a comprehensive, mobile-responsive e-commerce platform. Unified the storefront, administrative dashboard, and super-user controls into a single, cohesive Next.js and Tailwind CSS architecture.',
    metricLabel: 'Unified Access Portal',
    metricNumber: 3,
    metricSuffix: '-Tier System',
    metricContext: 'Storefront, Admin, and Super User',
    techStack: ['Next.js', 'Tailwind CSS', 'State Management'],
    image: '/projects/aarah-ecom.png'
  },
  {
    id: 'header-cleaner',
    title: 'Header Cleaner Engine',
    role: 'Chrome Extension Development',
    description: 'Developed a robust data cleaning and reformatting extension. It processes and re-maps headers and data from pasted text or uploaded files while strictly preserving critical formatting like leading zeros.',
    metricLabel: 'Processing Time Reduced',
    metricNumber: 96,
    metricSuffix: '% Faster',
    metricContext: 'Reduced 8-hour workflow to 2 minutes',
    techStack: ['JavaScript', 'Chrome API', 'Data Parsing'],
    image: '/projects/header-cleaner.png'
  },
  {
    id: 'stat-brio',
    title: 'Stat-Brio',
    role: 'Lead Product Engineer',
    description: 'A high-performance business intelligence platform designed to turn complex data into actionable insights. I spearheaded the entire project lifecycle—engineering everything from the initial UI/UX architecture to full-stack development and cloud deployment.',
    metricLabel: 'Project Lifecycle',
    metricNumber: 100,
    metricSuffix: '% Ownership',
    metricContext: 'Design, Development, and Deployment (End-to-End)',
    techStack: ['Next.js', 'Business Intelligence', 'Cloud Deployment'],
    image: '/projects/stat-brio.png'
  },
  {
    id: 'cipher-saver',
    title: 'Cipher Saver',
    role: 'Mobile Architecture & Security',
    description: 'Engineered a highly secure, offline-first mobile application focusing on zero-knowledge principles. Built from the ground up with custom authentication and secure local storage architecture.',
    metricLabel: 'Core Architecture',
    metricNumber: 100,
    metricSuffix: '% Local',
    metricContext: 'Zero-Knowledge Security Standard',
    techStack: ['React Native', 'Expo', 'Secure Storage'],
    image: '/projects/cipher-saver.png'
  },
  {
    id: 'workstation-pro',
    title: 'Workstation Pro (DI Tool)',
    role: 'Workflow Automation',
    description: 'Built a persistent Chrome Side Panel application to serve as a daily data validation hub. Features a rigorous automated checklist to ensure client data integrity against local databases.',
    metricLabel: 'Validation Workflow',
    metricNumber: 28,
    metricSuffix: '-Point',
    metricContext: 'Automated Data Integrity Check',
    techStack: ['React', 'Chrome Side Panel API', 'Architecture'],
    image: '/projects/workstation-pro.png'
  }
];

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.round(latest).toString();
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>0</span>;
}



export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 px-6 md:px-16 lg:px-24 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black mb-4">
            Selected Works.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl">
            A showcase of engineered solutions designed to optimize workflows, secure data, and drive operational efficiency.
          </p>
        </motion.div>

        <div className="flex flex-col gap-32">
          {PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center group`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[4/3] w-full transition-transform duration-500 group-hover:-translate-y-1">
                    <TiltedCard
                      imageSrc={project.image}
                      altText={project.title}
                      captionText={project.title}
                      containerHeight="100%"
                      containerWidth="100%"
                      imageHeight="100%"
                      imageWidth="100%"
                      rotateAmplitude={14}
                      scaleOnHover={1.02}
                      showMobileWarning={false}
                      showTooltip={true}
                      displayOverlayContent={true}
                      overlayContent={
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors duration-500 rounded-[15px]" />
                      }
                    />
                  </div>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-3">
                    {project.role}
                  </span>

                  <h3 className="text-3xl md:text-4xl font-bold text-black mb-4">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 text-lg leading-relaxed mb-10">
                    {project.description}
                  </p>

                  <div className="flex flex-col border-l-2 border-black pl-6 mb-10">
                    <span className="text-sm text-gray-500 mb-1">{project.metricLabel}</span>
                    <div className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-2">
                      <AnimatedNumber value={project.metricNumber} />
                      {project.metricSuffix}
                    </div>
                    <span className="text-sm font-medium text-gray-600">{project.metricContext}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
