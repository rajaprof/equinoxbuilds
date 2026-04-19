import Navbar from '@/components/Navbar';
import FloatingEstimator from '@/components/Estimator/FloatingEstimator';
import ClickSpark from '@/components/ClickSpark';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://equinoxbuilds.vercel.app'),
  title: 'Equinox Builds | End-to-End Digital Engineering',
  description: 'Equinox Builds specializes in high-performance digital solutions, from UI/UX architecture to seamless cloud deployment.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Equinox Builds',
    description: 'Engineering excellence from design to deployment.',
    url: 'https://equinoxbuilds.vercel.app',
    siteName: 'Equinox Builds',
    type: 'website',
  },
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
