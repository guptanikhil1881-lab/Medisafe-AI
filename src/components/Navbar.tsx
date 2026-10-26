import React, { useState } from 'react';
import { Pill, Sparkles, Shield, Menu, X, ArrowRight, Activity, BookOpen, HelpCircle, Mail, Info, Share2 } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  hasGeminiKey: boolean;
  onOpenShare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection, hasGeminiKey, onOpenShare }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'checker', label: 'Checker', icon: Activity },
    { id: 'features', label: 'Features', icon: Sparkles },
    { id: 'library', label: 'Drug Library', icon: BookOpen },
    { id: 'how-it-works', label: 'How It Works', icon: Shield },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'about', label: 'About Project', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-teal-500 to-indigo-600 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              {/* Custom Capsule + AI icon combination */}
              <div className="relative flex items-center justify-center">
                <Pill className="w-6 h-6 text-white rotate-45 transform" />
                <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  MediSafe<span className="text-teal-600"> AI</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-blue-100 text-blue-800 rounded">
                  B.Pharm
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Clinical Drug Interaction Checker
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-75" />
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Header Badges, Share & CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Status indicator */}
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                hasGeminiKey
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
              title={
                hasGeminiKey
                  ? 'Gemini 3.8 Flash Clinical AI Engine Connected'
                  : 'Verified Clinical Reference Database (Offline Mode)'
              }
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  hasGeminiKey ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'
                }`}
              />
              <span className="hidden md:inline">{hasGeminiKey ? 'Gemini AI Active' : 'Clinical DB Mode'}</span>
            </div>

            {/* Share Icon Button */}
            <button
              onClick={onOpenShare}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all active:scale-95"
              title="Share MediSafe AI with classmates, professors, or patients"
            >
              <Share2 className="w-4 h-4 text-blue-600" />
              <span>Share</span>
            </button>

            {/* Main CTA */}
            <button
              onClick={() => handleNavClick('checker')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 shadow-sm shadow-blue-500/25 hover:shadow-md transition-all active:scale-95"
            >
              <span>Check Interactions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Right Bar: Share + Menu */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={onOpenShare}
              className="p-2 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors flex items-center gap-1"
              aria-label="Share website"
              title="Share website"
            >
              <Share2 className="w-5 h-5 text-blue-600" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 shadow-lg animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                <Icon className="w-4 h-4 text-slate-500" />
                {link.label}
              </button>
            );
          })}
          
          {/* Mobile Share Option */}
          <button
            onClick={() => {
              onOpenShare();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 transition-colors"
          >
            <Share2 className="w-4 h-4 text-blue-600" />
            <span>Share MediSafe AI Website</span>
          </button>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <div className="text-xs text-slate-500 flex items-center justify-between px-2">
              <span>Engine Status:</span>
              <span className="font-semibold text-teal-700">
                {hasGeminiKey ? 'Gemini AI Live' : 'Verified Reference DB'}
              </span>
            </div>
            <button
              onClick={() => handleNavClick('checker')}
              className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 text-center"
            >
              Check Interactions Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
