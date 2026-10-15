import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save, Search } from 'lucide-react';
import { useAppData } from '@/store/useAppData';
import type { Project } from '@/types';

const emptyProject: Omit<Project, 'id'> = {
  title: '', category: '', description: '', image: '', url: '',
};

export function AdminProjects() {
  const { data, addProject, updateProject, deleteProject } = useAppData();
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<Project, 'id'>>(emptyProject);
  const [search, setSearch] = useState('');

  const filtered = data.projects.filter((p) =>
    p.title.includes(search) || p.category.includes(search)
  );

  const startAdd = () => {
    setForm(emptyProject);
    setEditing(null);
    setShowForm(true);
  };

  const startEdit = (project: Project) => {
    setForm({ title: project.title, category: project.category, description: project.description, image: project.image, url: project.url });
    setEditing(project.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.title || !form.category) return;
    if (editing) {
      updateProject(editing, form);
    } else {
      addProject(form);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) deleteProject(id);
  };

  const inputClass = 'w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-slate-900 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all';
  const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pr-12 pl-4 text-slate-900 focus:outline-none focus:border-cyan-500 transition-all"
            placeholder="ابحث عن مشروع..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={startAdd}
          className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-cyan-500/30 whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          إضافة مشروع
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">{editing ? 'تعديل مشروع' : 'إضافة مشروع جديد'}</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>عنوان المشروع</label>
                  <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>التصنيف</label>
                  <input className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="مثال: متجر إلكتروني" />
                </div>
              </div>
              <div>
                <label className={labelClass}>الوصف</label>
                <textarea className={`${inputClass} min-h-[80px] resize-y`} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>رابط الصورة</label>
                <input className={inputClass} dir="ltr" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
              </div>
              {form.image && (
                <img src={form.image} alt="preview" className="w-full h-48 object-cover rounded-xl" />
              )}
              <div>
                <label className={labelClass}>رابط المشروع (اختياري)</label>
                <input className={inputClass} dir="ltr" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..." />
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

      {/* Projects grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project) => (
          <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
            <div className="relative aspect-video overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3">
                <span className="bg-white/90 backdrop-blur-sm text-slate-700 text-xs px-3 py-1 rounded-full font-medium">
                  {project.category}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-slate-900 mb-1">{project.title}</h4>
              <p className="text-sm text-slate-500 line-clamp-2 mb-4">{project.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(project)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-cyan-50 text-slate-600 hover:text-cyan-600 py-2.5 rounded-xl text-sm font-medium transition-all"
                >
                  <Edit2 className="w-4 h-4" /> تعديل
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-red-50 text-slate-600 hover:text-red-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <p className="text-lg">لا توجد مشاريع</p>
        </div>
      )}
    </div>
  );
}
