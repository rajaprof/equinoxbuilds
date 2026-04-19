export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-10">
          <div className="max-w-sm">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Ready to eliminate friction?
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Equinox Builds is available for freelance consulting, architecture design, and full-stack development. Let us build something that scales.
            </p>
            <a
              href="mailto:time.to.get.rich.com@gmail.com"
              className="inline-block border-b border-gray-600 pb-1 text-sm font-medium hover:text-gray-300 hover:border-gray-300 transition-colors"
            >
              Initiate Contact
            </a>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:gap-24">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Navigation</span>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#portfolio" className="text-sm text-gray-300 hover:text-white transition-colors">Selected Works</a>
              <a href="#estimate" className="text-sm text-gray-300 hover:text-white transition-colors">Project Estimator</a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Connect</span>
              <a href="https://www.linkedin.com/in/k-maharaja-bca" target="_blank" rel="noreferrer" className="text-sm text-gray-300 hover:text-white transition-colors">LinkedIn</a>
              <a href="mailto:time.to.get.rich.com@gmail.com" className="text-sm text-gray-300 hover:text-white transition-colors">Email</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-800 text-xs text-gray-500">
          <p>&copy; {currentYear} Equinox Builds. All rights reserved.</p>

          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span>Based in Tamil Nadu, India</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
            <span>Operating Globally</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
