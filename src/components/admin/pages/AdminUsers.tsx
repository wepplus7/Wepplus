import { useState } from 'react';
import { Plus, Trash2, X, Save, User, Shield, Calendar } from 'lucide-react';
import { useAppData } from '@/store/useAppData';
import { useAuth } from '@/store/useAuth';
import type { AdminUser } from '@/types';

export function AdminUsers() {
  const { data, addUser, deleteUser } = useAppData();
  const { user: currentUser } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'editor'>('editor');
  const [error, setError] = useState('');

  const handleAdd = () => {
    setError('');
    if (!username || !password) {
      setError('يرجى ملء جميع الحقول');
      return;
    }
    if (data.users.some((u) => u.username === username)) {
      setError('اسم المستخدم موجود مسبقاً');
      return;
    }
    addUser({ username, password, role });
    setUsername('');
    setPassword('');
    setRole('editor');
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (id === currentUser?.id) {
      alert('لا يمكنك حذف حسابك الحالي');
      return;
    }
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) deleteUser(id);
  };

  const inputClass = 'w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-slate-900 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all';
  const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-slate-600 text-sm">إدارة مستخدمي لوحة التحكم</p>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-cyan-500/30"
        >
          <Plus className="w-5 h-5" /> إضافة مستخدم
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">إضافة مستخدم جديد</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>اسم المستخدم</label>
                <input className={inputClass} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="أدخل اسم المستخدم" />
              </div>
              <div>
                <label className={labelClass}>كلمة المرور</label>
                <input className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="أدخل كلمة المرور" type="password" />
              </div>
              <div>
                <label className={labelClass}>الصلاحية</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setRole('admin')}
                    className={`py-3 rounded-xl text-sm font-medium transition-all ${
                      role === 'admin' ? 'bg-cyan-500 text-white' : 'bg-gray-50 text-slate-600 hover:bg-gray-100'
                    }`}
                  >
                    مدير عام
                  </button>
                  <button
                    onClick={() => setRole('editor')}
                    className={`py-3 rounded-xl text-sm font-medium transition-all ${
                      role === 'editor' ? 'bg-cyan-500 text-white' : 'bg-gray-50 text-slate-600 hover:bg-gray-100'
                    }`}
                  >
                    محرر
                  </button>
                </div>
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl py-2.5 px-4 text-red-600 text-sm text-center">
                  {error}
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleAdd} className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                <Save className="w-5 h-5" /> إضافة
              </button>
              <button onClick={() => setShowForm(false)} className="px-6 bg-gray-100 hover:bg-gray-200 text-slate-700 py-3 rounded-xl font-medium">
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-500">المستخدم</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-500">الصلاحية</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-500 hidden sm:table-cell">تاريخ الإضافة</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-500">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((u: AdminUser) => (
                <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white font-semibold text-sm">
                        {u.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{u.username}</p>
                        {u.id === currentUser?.id && (
                          <span className="text-xs text-cyan-600">(الحساب الحالي)</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${
                      u.role === 'admin' ? 'bg-cyan-50 text-cyan-700' : 'bg-orange-50 text-orange-700'
                    }`}>
                      {u.role === 'admin' ? <Shield className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                      {u.role === 'admin' ? 'مدير عام' : 'محرر'}
                    </span>
                  </td>
                  <td className="py-4 px-6 hidden sm:table-cell">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(u.createdAt).toLocaleDateString('ar-SA')}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {u.id !== currentUser?.id && (
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
