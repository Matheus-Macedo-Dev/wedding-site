import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NAV_ITEMS } from '@/utils/constants.js';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Determine if page has white background (all pages except home)
  const hasWhiteBackground = location.pathname !== '/';

  useEffect(() => {
    const handleScroll = () => {
      // Show white header after scrolling past viewport height (hero section)
      setIsScrolled(window.scrollY > window.innerHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Use black logo when: scrolled on home page OR on any other page
  const useBlackLogo = isScrolled || hasWhiteBackground;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || hasWhiteBackground
            ? 'bg-white shadow-md'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo/Brand */}
            <Link
              to="/"
              className="flex items-center"
            >
              <img 
                src={useBlackLogo ? "/images/logo-black.png" : "/images/logo.png"}
                alt="Alana & Matheus" 
                className={`h-16 md:h-14 w-auto transition-all duration-300 ${
                  useBlackLogo ? 'opacity-100' : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                }`}
                onError={(e) => {
                  console.error('Logo failed to load from:', e.target.src);
                  // Try alternative extensions
                  if (e.target.src.includes('logo-black')) {
                    if (e.target.src.endsWith('.png')) {
                      e.target.src = '/images/logo-black.jpg';
                    } else if (e.target.src.endsWith('.jpg')) {
                      e.target.src = '/images/logo-black.jpeg';
                    }
                  } else {
                    if (e.target.src.endsWith('.png')) {
                      e.target.src = '/images/logo.jpg';
                    } else if (e.target.src.endsWith('.jpg')) {
                      e.target.src = '/images/logo.jpeg';
                    }
                  }
                }}
              />
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
              {NAV_ITEMS.map((item) => {
                if (item.external) {
                  return (
                    <a
                      key={item.name}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm font-medium transition-all duration-300 hover:text-accent ${
                        useBlackLogo
                          ? 'text-text-dark' 
                          : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                      }`}
                    >
                      {item.name}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-sm font-medium transition-all duration-300 hover:text-accent ${
                      isActive(item.path)
                        ? 'text-accent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                        : useBlackLogo
                        ? 'text-text-dark'
                        : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Spacer for logo balance on desktop */}
            <div className="hidden md:block w-24"></div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
              } ${
                useBlackLogo
                  ? 'text-text-dark' 
                  : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
              }`}
              aria-label="Toggle menu"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-text-dark hover:text-accent transition-colors"
                aria-label="Close menu"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex flex-col px-4 py-2 space-y-1">
              {NAV_ITEMS.map((item) => {
                if (item.external) {
                  return (
                    <a
                      key={item.name}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 text-base font-medium text-text-dark hover:bg-secondary hover:text-accent rounded-lg transition-colors"
                    >
                      {item.name}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-secondary text-accent'
                        : 'text-text-dark hover:bg-secondary hover:text-accent'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
