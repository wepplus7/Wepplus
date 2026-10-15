import { useState, useEffect } from 'react';

export type Route = 'home' | 'admin-login' | 'admin-dashboard';

export function useRouter() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const route: Route = (() => {
    const h = hash.replace(/^#\/?/, '');
    if (h === 'admin') return 'admin-login';
    if (h.startsWith('admin/dashboard')) return 'admin-dashboard';
    return 'home';
  })();

  const navigate = (to: string) => {
    window.location.hash = to;
  };

  return { route, navigate };
}
