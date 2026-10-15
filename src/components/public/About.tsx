import { CheckCircle2 } from 'lucide-react';
import type { SiteSettings } from '@/types';

interface AboutProps {
  settings: SiteSettings;
}

export function About({ settings }: AboutProps) {
  const features = [
    'فريق محترف من المصممين والمطورين',
    'تصاميم عصرية متجاوبة مع جميع الأجهزة',
    'دعم فني مستمر بعد إطلاق المشروع',
    'تسليم المشاريع في الوقت المحدد',
  ];

  return (
    <section id="about" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">{settings.aboutTitle}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
              شريكك الرقمي نحو النجاح
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-4">
              {settings.aboutText}
            </p>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              {settings.aboutText2}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-white/80 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {settings.stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all hover:scale-105"
              >
                <div className="text-4xl sm:text-5xl font-bold text-cyan-400 mb-2">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
