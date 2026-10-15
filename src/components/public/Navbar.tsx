import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import type { SiteSettings } from '@/types';

interface NavbarProps {
  settings: SiteSettings;
}

export function Navbar({ settings }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#home', label: 'الرئيسية' },
    { href: '#services', label: 'خدماتنا' },
    { href: '#portfolio', label: 'مشاريعنا' },
    { href: '#about', label: 'من نحن' },
    { href: '#contact', label: 'تواصل معنا' },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
            scrolled ? 'bg-slate-900' : 'bg-white/10 backdrop-blur-md'
          }`}>
            <Globe className={`w-5 h-5 ${scrolled ? 'text-white' : 'text-white'}`} />
          </div>
          <span className={`text-xl font-bold ${scrolled ? 'text-slate-900' : 'text-white'}`}>
            {settings.companyName}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`text-sm font-medium transition-colors hover:text-cyan-500 ${
                scrolled ? 'text-slate-700' : 'text-white/90'
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            href={settings.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105"
          >
            واتس اب
          </a>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className={`w-6 h-6 ${scrolled ? 'text-slate-900' : 'text-white'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${scrolled ? 'text-slate-900' : 'text-white'}`} />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white shadow-xl absolute top-full left-0 right-0">
          <div className="flex flex-col p-4 gap-2">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-right py-3 px-4 text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
            <a
              href={settings.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-500 text-white py-3 px-4 rounded-xl text-center font-semibold mt-2"
            >
              تواصل عبر واتس اب
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
