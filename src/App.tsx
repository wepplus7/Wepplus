import { useEffect } from 'react';
import { useRouter } from '@/store/useRouter';
import { useAuth } from '@/store/useAuth';
import { PublicSite } from '@/components/public/PublicSite';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

function App() {
  const { route } = useRouter();
  const { isAuthenticated } = useAuth();

  // Scroll to top on route change
  useEffect(() => {
    if (route !== 'home') window.scrollTo(0, 0);
  }, [route]);

  if (route === 'admin-login') {
    if (isAuthenticated) {
      window.location.hash = 'admin/dashboard';
      return null;
    }
    return <AdminLogin />;
  }

  if (route === 'admin-dashboard') {
    if (!isAuthenticated) {
      window.location.hash = 'admin';
      return null;
    }
    return <AdminDashboard />;
  }

  return <PublicSite />;
}

export default App;
