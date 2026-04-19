import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-6">
      <h1 className="text-8xl md:text-9xl font-extrabold tracking-tight mb-4 text-center">
        404
      </h1>
      
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center">
        Page Not Found.
      </h2>
      
      <p className="text-lg text-gray-500 mb-10 text-center max-w-md">
        The route you are looking for doesn't exist or has been moved. Let's get you back to safety.
      </p>

      <Link 
        href="/"
        className="px-8 py-4 bg-black text-white text-sm font-medium tracking-wide hover:bg-gray-900 transition-all shadow-lg hover:-translate-y-1"
      >
        Return to Home
      </Link>
    </div>
  );
}