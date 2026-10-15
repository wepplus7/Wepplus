import { useState, useEffect, useCallback } from 'react';
import type { AppData, Project, Service, SiteSettings, AdminUser } from '@/types';
import { seedData } from '@/data/seed';

const STORAGE_KEY = 'wepplus_data_v1';

function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AppData;
  } catch {
    // ignore
  }
  return seedData;
}

function saveData(data: AppData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function genId(prefix: string): string {
  return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

// Global subscription so all components stay in sync
const listeners = new Set<() => void>();
let currentData: AppData | null = null;

function getData(): AppData {
  if (!currentData) currentData = loadData();
  return currentData;
}

function setData(updater: (prev: AppData) => AppData) {
  currentData = updater(getData());
  saveData(currentData);
  listeners.forEach((l) => l());
}

export function useAppData() {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const listener = () => forceUpdate({});
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  const data = getData();

  const updateSettings = useCallback((settings: SiteSettings) => {
    setData((prev) => ({ ...prev, settings }));
  }, []);

  const addProject = useCallback((project: Omit<Project, 'id'>) => {
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...project, id: genId('p') }],
    }));
  }, []);

  const updateProject = useCallback((id: string, project: Omit<Project, 'id'>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...project, id } : p)),
    }));
  }, []);

  const deleteProject = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  }, []);

  const addService = useCallback((service: Omit<Service, 'id'>) => {
    setData((prev) => ({
      ...prev,
      services: [...prev.services, { ...service, id: genId('s') }],
    }));
  }, []);

  const updateService = useCallback((id: string, service: Omit<Service, 'id'>) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...service, id } : s)),
    }));
  }, []);

  const deleteService = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
  }, []);

  const addUser = useCallback((user: Omit<AdminUser, 'id' | 'createdAt'>) => {
    setData((prev) => ({
      ...prev,
      users: [...prev.users, { ...user, id: genId('u'), createdAt: new Date().toISOString() }],
    }));
  }, []);

  const deleteUser = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      users: prev.users.filter((u) => u.id !== id),
    }));
  }, []);

  const resetData = useCallback(() => {
    currentData = seedData;
    saveData(seedData);
    listeners.forEach((l) => l());
  }, []);

  return {
    data,
    updateSettings,
    addProject,
    updateProject,
    deleteProject,
    addService,
    updateService,
    deleteService,
    addUser,
    deleteUser,
    resetData,
  };
}
