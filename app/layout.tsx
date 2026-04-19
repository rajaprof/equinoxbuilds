import Navbar from '@/components/Navbar';
import FloatingEstimator from '@/components/Estimator/FloatingEstimator';
import ClickSpark from '@/components/ClickSpark';
import './globals.css';

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
