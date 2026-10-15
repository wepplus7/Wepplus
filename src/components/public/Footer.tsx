import { Globe, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import type { SiteSettings } from '@/types';

interface FooterProps {
  settings: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const socialIcons = [
    { icon: Facebook, url: settings.socialLinks.facebook },
    { icon: Twitter, url: settings.socialLinks.twitter },
    { icon: Instagram, url: settings.socialLinks.instagram },
    { icon: Linkedin, url: settings.socialLinks.linkedin },
  ];

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">{settings.companyName}</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              {settings.tagline} - شركة متخصصة في تصميم وتطوير المواقع الإلكترونية الحديثة
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">روابط سريعة</h4>
            <div className="flex flex-col gap-2">
              {[
                { href: '#home', label: 'الرئيسية' },
                { href: '#services', label: 'خدماتنا' },
                { href: '#portfolio', label: 'مشاريعنا' },
                { href: '#about', label: 'من نحن' },
                { href: '#contact', label: 'تواصل معنا' },
              ].map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-white/60 hover:text-cyan-400 text-sm transition-colors text-right"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">تابعنا</h4>
            <div className="flex gap-3">
              {socialIcons.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-cyan-500 flex items-center justify-center transition-all hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-white/50 text-sm mt-4" dir="ltr">{settings.email}</p>
            <p className="text-white/50 text-sm mt-1" dir="ltr">{settings.phone}</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} {settings.companyName}. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
