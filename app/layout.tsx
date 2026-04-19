import Navbar from '@/components/Navbar';
import FloatingEstimator from '@/components/Estimator/FloatingEstimator';
import ClickSpark from '@/components/ClickSpark';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Equinox Builds | High-Performance Digital Solutions',
  description: 'Equinox Builds specializes in engineering digital solutions that eliminate friction. From high-performance web applications to custom data-processing architecture.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-white text-black">
        <ClickSpark sparkColor="#000" sparkSize={12} sparkRadius={20} sparkCount={6} duration={400}>
          <Navbar />
          {children}
          <FloatingEstimator />
        </ClickSpark>
      </body>
    </html>
  );
}
