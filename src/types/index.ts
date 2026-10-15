export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  url: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutText: string;
  aboutText2: string;
  whatsappLink: string;
  phone: string;
  email: string;
  address: string;
  stats: { value: string; label: string }[];
  socialLinks: { facebook: string; twitter: string; instagram: string; linkedin: string };
}

export interface AdminUser {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'editor';
  createdAt: string;
}

export interface AppData {
  settings: SiteSettings;
  projects: Project[];
  services: Service[];
  users: AdminUser[];
}
