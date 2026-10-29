import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Search } from 'lucide-react';
import { CHAPTER_CONFIG } from '../../data/chapterData';

interface NavbarProps {
  onOpenCommand: () => void;
  onNavigateToRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommand, onNavigateToRegister }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Pathways', href: '#pathways' },
    { name: 'Activities', href: '#activities' },
    { name: 'Events', href: '#events' },
    { name: 'Team', href: '#team' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-nexus-950/85 backdrop-blur-md border-b border-cyan-500/15 py-3 shadow-glass'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand & Creator Identity */}
          <a
            href="#"
            className="group flex items-center gap-3 focus:outline-none"
            aria-label="ACM NEXUS Home"
          >
            {/* Visual Icon Node */}
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-nexus-800 border border-cyan-400/30 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-glow-cyan">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  ACM NEXUS
                </span>
                <span className="tech-badge px-1.5 py-0.5 rounded text-[10px] bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                  2K26
                </span>
              </div>
              
              {/* Creator signature in navigation */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>ABES Community</span>
                <span className="text-slate-600">·</span>
                <span className="text-cyan-400/90 font-medium tracking-wide">
                  By {CHAPTER_CONFIG.creator.name}
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/40 rounded-md transition-all font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Quick Command Palette Button */}
            <button
              type="button"
              onClick={onOpenCommand}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono text-slate-400 bg-slate-900/60 border border-slate-700/60 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors focus:outline-none"
              title="Open Navigation Search (Ctrl+K)"
              aria-label="Open Navigation Search"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 rounded border border-slate-700 text-slate-300">
                ⌘K
              </kbd>
            </button>

            {/* Register Action CTA */}
            <button
              type="button"
              onClick={onNavigateToRegister}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-nexus-950 hover:from-cyan-400 hover:to-blue-500 shadow-glow-cyan transition-all transform active:scale-95 focus:outline-none"
            >
              <Calendar className="w-4 h-4 text-nexus-950" />
              <span>Register Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenCommand}
              className="p-2 rounded-md text-slate-300 hover:text-white bg-slate-900/60 border border-slate-800"
              aria-label="Search site"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/60 border border-slate-700/60 focus:outline-none"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden bg-nexus-950/95 backdrop-blur-xl border-b border-cyan-500/20 px-4 pt-4 pb-6 transition-all"
        >
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:text-cyan-300 hover:bg-slate-800/60 transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  handleLinkClick();
                  onNavigateToRegister();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-nexus-950 font-semibold shadow-glow-cyan"
              >
                <Calendar className="w-4 h-4" />
                <span>Register for an Event</span>
              </button>

              <div className="text-center pt-2 text-xs text-slate-400">
                Created & Engineered by <span className="text-cyan-400 font-medium">{CHAPTER_CONFIG.creator.name}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
