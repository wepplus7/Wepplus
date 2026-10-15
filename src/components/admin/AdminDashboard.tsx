import { useState } from 'react';
import {
  LayoutDashboard, Settings, FolderKanban, Briefcase, Users,
  LogOut, Globe, Menu, X, Home
} from 'lucide-react';
import { useAuth } from '@/store/useAuth';
import { useRouter } from '@/store/useRouter';
import { AdminSettings } from './pages/AdminSettings';
import { AdminProjects } from './pages/AdminProjects';
import { AdminServices } from './pages/AdminServices';
import { AdminUsers } from './pages/AdminUsers';
import { AdminOverview } from './pages/AdminOverview';

type Page = 'overview' | 'settings' | 'projects' | 'services' | 'users';

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const { navigate } = useRouter();
  const [page, setPage] = useState<Page>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
    { id: 'overview', label: 'لوحة المعلومات', icon: LayoutDashboard },
    { id: 'settings', label: 'إعدادات الموقع', icon: Settings },
    { id: 'projects', label: 'المشاريع', icon: FolderKanban },
    { id: 'services', label: 'الخدمات', icon: Briefcase },
    { id: 'users', label: 'المستخدمون', icon: Users },
  ];

  const handleLogout = () => {
    logout();
    navigate('admin');
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 right-0 w-72 bg-slate-900 text-white z-50 transition-transform duration-300 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg">WepPlus</h2>
              <p className="text-white/40 text-xs">لوحة التحكم</p>
            </div>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setPage(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-right ${
                page === item.id
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-white/10 space-y-1">
          <div className="px-4 py-2 mb-2">
            <p className="text-white/40 text-xs">مرحباً</p>
            <p className="text-white font-medium">{user?.username}</p>
          </div>
          <button
            onClick={() => navigate('')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all"
          >
            <Home className="w-5 h-5" />
            <span>عرض الموقع</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6 text-slate-700" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900">
              {menuItems.find((m) => m.id === page)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white font-semibold text-sm">
              {user?.username.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {page === 'overview' && <AdminOverview onNavigate={setPage} />}
          {page === 'settings' && <AdminSettings />}
          {page === 'projects' && <AdminProjects />}
          {page === 'services' && <AdminServices />}
          {page === 'users' && <AdminUsers />}
        </main>
      </div>
    </div>
  );
}
