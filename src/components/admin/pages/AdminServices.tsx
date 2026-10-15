import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useAppData } from '@/store/useAppData';
import type { Service } from '@/types';

const emptyService: Omit<Service, 'id'> = {
  icon: 'Monitor', title: '', description: '',
};

const iconOptions = ['Monitor', 'ShoppingCart', 'Smartphone', 'Search', 'Palette', 'Headphones', 'Code', 'Database', 'Cloud', 'Zap', 'PenTool', 'Layout', 'Globe', 'Image', 'Video', 'FileCode'];

export function AdminServices() {
  const { data, addService, updateService, deleteService } = useAppData();
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<Service, 'id'>>(emptyService);

  const startAdd = () => { setForm(emptyService); setEditing(null); setShowForm(true); };
  const startEdit = (service: Service) => {
    setForm({ icon: service.icon, title: service.title, description: service.description });
    setEditing(service.id);
    setShowForm(true);
  };
  const handleSave = () => {
    if (!form.title) return;
    if (editing) updateService(editing, form);
    else addService(form);
    setShowForm(false);
    setEditing(null);
  };
  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) deleteService(id);
  };

  const inputClass = 'w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-slate-900 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all';
  const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-slate-600 text-sm">إدارة الخدمات المعروضة في الموقع</p>
        <button
          onClick={startAdd}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-cyan-500/30"
        >
          <Plus className="w-5 h-5" /> إضافة خدمة
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">{editing ? 'تعديل خدمة' : 'إضافة خدمة جديدة'}</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>الأيقونة</label>
                <div className="grid grid-cols-8 gap-2">
                  {iconOptions.map((iconName) => {
                    const IconComp = (Icons as unknown as Record<string, Icons.LucideIcon>)[iconName] || Icons.Monitor;
                    return (
                      <button
                        key={iconName}
                        onClick={() => setForm({ ...form, icon: iconName })}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          form.icon === iconName ? 'bg-cyan-500 text-white' : 'bg-gray-50 text-slate-400 hover:bg-gray-100'
                        }`}
                      >
                        <IconComp className="w-5 h-5" />
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className={labelClass}>عنوان الخدمة</label>
                <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>الوصف</label>
                <textarea className={`${inputClass} min-h-[80px] resize-y`} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                <Save className="w-5 h-5" /> حفظ
              </button>
              <button onClick={() => setShowForm(false)} className="px-6 bg-gray-100 hover:bg-gray-200 text-slate-700 py-3 rounded-xl font-medium">
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Services list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.services.map((service) => {
          const IconComp = (Icons as unknown as Record<string, Icons.LucideIcon>)[service.icon] || Icons.Monitor;
          return (
            <div key={service.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                  <IconComp className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 mb-1">{service.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{service.description}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => startEdit(service)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-cyan-50 text-slate-600 hover:text-cyan-600 py-2.5 rounded-xl text-sm font-medium transition-all"
                >
                  <Edit2 className="w-4 h-4" /> تعديل
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="flex items-center justify-center bg-gray-50 hover:bg-red-50 text-slate-600 hover:text-red-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {data.services.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <p className="text-lg">لا توجد خدمات</p>
        </div>
      )}
    </div>
  );
}
