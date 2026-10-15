import { FolderKanban, Briefcase, Users, Settings, TrendingUp, Eye } from 'lucide-react';
import { useAppData } from '@/store/useAppData';

interface AdminOverviewProps {
  onNavigate: (page: 'overview' | 'settings' | 'projects' | 'services' | 'users') => void;
}

export function AdminOverview({ onNavigate }: AdminOverviewProps) {
  const { data } = useAppData();

  const cards = [
    { label: 'المشاريع', value: data.projects.length, icon: FolderKanban, color: 'from-cyan-500 to-teal-500', page: 'projects' as const },
    { label: 'الخدمات', value: data.services.length, icon: Briefcase, color: 'from-blue-500 to-indigo-500', page: 'services' as const },
    { label: 'المستخدمون', value: data.users.length, icon: Users, color: 'from-orange-500 to-red-500', page: 'users' as const },
    { label: 'الإعدادات', value: 'مُعدة', icon: Settings, color: 'from-green-500 to-emerald-500', page: 'settings' as const },
  ];

  const recentProjects = data.projects.slice(-3).reverse();

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-l from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="relative">
          <h2 className="text-2xl font-bold mb-2">مرحباً بك في لوحة التحكم</h2>
          <p className="text-white/60">إدارة كاملة لمحتوى موقع WepPlus من مكان واحد</p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <button
            key={idx}
            onClick={() => onNavigate(card.page)}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 text-right"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{card.value}</div>
            <div className="text-sm text-slate-500">{card.label}</div>
          </button>
        ))}
      </div>

      {/* Recent projects */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">أحدث المشاريع</h3>
          <button
            onClick={() => onNavigate('projects')}
            className="text-cyan-600 text-sm font-medium hover:text-cyan-700"
          >
            عرض الكل
          </button>
        </div>
        <div className="space-y-3">
          {recentProjects.map((project) => (
            <div key={project.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <img src={project.image} alt={project.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 truncate">{project.title}</h4>
                <p className="text-sm text-slate-500 truncate">{project.category}</p>
              </div>
              <span className="text-xs text-slate-400 bg-gray-100 px-3 py-1 rounded-full">{project.category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigate('settings')}
          className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex items-center gap-4 text-right"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Settings className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">تعديل إعدادات الموقع</h4>
            <p className="text-sm text-slate-500">النصوص، التواصل، الروابط</p>
          </div>
        </button>
        <button
          onClick={() => onNavigate('projects')}
          className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex items-center gap-4 text-right"
        >
          <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-cyan-600" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">إضافة مشروع جديد</h4>
            <p className="text-sm text-slate-500">أضف عملاً لمعرض المشاريع</p>
          </div>
        </button>
        <button
          onClick={() => onNavigate('users')}
          className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex items-center gap-4 text-right"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
            <Eye className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">إدارة المستخدمين</h4>
            <p className="text-sm text-slate-500">أضف أو احذف مستخدم لوحة التحكم</p>
          </div>
        </button>
      </div>
    </div>
  );
}
