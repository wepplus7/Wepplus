import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import type { SiteSettings } from '@/types';

interface ContactProps {
  settings: SiteSettings;
}

export function Contact({ settings }: ContactProps) {
  const contactItems = [
    { icon: Phone, label: 'الهاتف', value: settings.phone },
    { icon: Mail, label: 'البريد الإلكتروني', value: settings.email },
    { icon: MapPin, label: 'العنوان', value: settings.address },
  ];

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">تواصل معنا</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
            جاهزون لبدء مشروعك
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            تواصل معنا اليوم ودعنا نحوّل فكرتك إلى واقع رقمي متميز
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contactItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-cyan-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-500 mb-1">{item.label}</h3>
              <p className="text-slate-900 font-medium" dir="ltr">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={settings.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all shadow-xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105"
          >
            <MessageCircle className="w-6 h-6" />
            تواصل معنا عبر واتس اب
          </a>
        </div>
      </div>
    </section>
  );
}
