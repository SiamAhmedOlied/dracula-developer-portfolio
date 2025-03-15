export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  role?: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  image?: string;
}

export interface Tool {
  id: number;
  name: string;
  icon: string;
  category: 'security' | 'development' | 'design' | 'other';
}

export interface Skill {
  id: number;
  name: string;
  category: 'language' | 'framework' | 'tool' | 'soft';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Blog {
  id: number | string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  image?: string;
  tags: string[];
  featured?: boolean;
  slug?: string;
}
