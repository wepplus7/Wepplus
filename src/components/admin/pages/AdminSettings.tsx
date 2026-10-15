import { useState } from 'react';
import { Save, Check } from 'lucide-react';
import { useAppData } from '@/store/useAppData';
import type { SiteSettings } from '@/types';

export function AdminSettings() {
  const { data, updateSettings, resetData } = useAppData();
  const [form, setForm] = useState<SiteSettings>(data.settings);
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass = 'w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-slate-900 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all';
  const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

  return (
    <div className="max-w-4xl space-y-6">
      {/* Company info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">معلومات الشركة</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>اسم الشركة</label>
            <input className={inputClass} value={form.companyName} onChange={(e) => update('companyName', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>الشعار النصي</label>
            <input className={inputClass} value={form.tagline} onChange={(e) => update('tagline', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Hero section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">القسم الرئيسي</h3>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>العنوان الرئيسي</label>
            <input className={inputClass} value={form.heroTitle} onChange={(e) => update('heroTitle', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>النص الفرعي</label>
            <textarea className={`${inputClass} min-h-[100px] resize-y`} value={form.heroSubtitle} onChange={(e) => update('heroSubtitle', e.target.value)} />
          </div>
        </div>
      </div>

      {/* About section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">قسم من نحن</h3>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>عنوان القسم</label>
            <input className={inputClass} value={form.aboutTitle} onChange={(e) => update('aboutTitle', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>النص الأول</label>
            <textarea className={`${inputClass} min-h-[100px] resize-y`} value={form.aboutText} onChange={(e) => update('aboutText', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>النص الثاني</label>
            <textarea className={`${inputClass} min-h-[100px] resize-y`} value={form.aboutText2} onChange={(e) => update('aboutText2', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">الإحصائيات</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {form.stats.map((stat, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="flex-1">
                <label className={labelClass}>القيمة</label>
                <input className={inputClass} value={stat.value} onChange={(e) => {
                  const stats = [...form.stats];
                  stats[idx] = { ...stat, value: e.target.value };
                  update('stats', stats);
                }} />
              </div>
              <div className="flex-1">
                <label className={labelClass}>الوصف</label>
                <input className={inputClass} value={stat.label} onChange={(e) => {
                  const stats = [...form.stats];
                  stats[idx] = { ...stat, label: e.target.value };
                  update('stats', stats);
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">معلومات التواصل</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelClass}>رابط واتس اب</label>
            <input className={inputClass} dir="ltr" value={form.whatsappLink} onChange={(e) => update('whatsappLink', e.target.value)} placeholder="https://wa.me/9665XXXXXXXX" />
          </div>
          <div>
            <label className={labelClass}>الهاتف</label>
            <input className={inputClass} dir="ltr" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>البريد الإلكتروني</label>
            <input className={inputClass} dir="ltr" value={form.email} onChange={(e) => update('email', e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>العنوان</label>
            <input className={inputClass} value={form.address} onChange={(e) => update('address', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Social links */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">روابط التواصل الاجتماعي</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>فيسبوك</label>
            <input className={inputClass} dir="ltr" value={form.socialLinks.facebook} onChange={(e) => update('socialLinks', { ...form.socialLinks, facebook: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>تويتر</label>
            <input className={inputClass} dir="ltr" value={form.socialLinks.twitter} onChange={(e) => update('socialLinks', { ...form.socialLinks, twitter: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>انستغرام</label>
            <input className={inputClass} dir="ltr" value={form.socialLinks.instagram} onChange={(e) => update('socialLinks', { ...form.socialLinks, instagram: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>لينكدإن</label>
            <input className={inputClass} dir="ltr" value={form.socialLinks.linkedin} onChange={(e) => update('socialLinks', { ...form.socialLinks, linkedin: e.target.value })} />
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-4 flex items-center justify-between shadow-lg">
        <button
          onClick={() => { if (confirm('هل أنت متأكد من إعادة جميع البيانات للوضع الافتراضي؟')) resetData(); }}
          className="text-sm text-red-500 hover:text-red-600 font-medium"
        >
          إعادة للوضع الافتراضي
        </button>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            saved ? 'bg-green-500 text-white' : 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/30'
          }`}
        >
          {saved ? <><Check className="w-5 h-5" /> تم الحفظ</> : <><Save className="w-5 h-5" /> حفظ التغييرات</>}
        </button>
      </div>
    </div>
  );
}
