import { useState, useEffect, useCallback } from 'react';
import type { AdminUser } from '@/types';

const AUTH_KEY = 'wepplus_auth_v1';

const listeners = new Set<() => void>();
let currentUser: AdminUser | null = null;

function loadAuth(): AdminUser | null {
  if (currentUser) return currentUser;
  try {
    const raw = sessionStorage.getItem(AUTH_KEY);
    if (raw) currentUser = JSON.parse(raw) as AdminUser;
  } catch {
    // ignore
  }
  return currentUser;
}

function setAuth(user: AdminUser | null) {
  currentUser = user;
  if (user) {
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
  } else {
    sessionStorage.removeItem(AUTH_KEY);
  }
  listeners.forEach((l) => l());
}

export function useAuth() {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const listener = () => forceUpdate({});
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  const user = loadAuth();

  const login = useCallback((username: string, password: string, users: AdminUser[]): boolean => {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setAuth(found);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setAuth(null);
  }, []);

  return { user, login, logout, isAuthenticated: !!user };
}
