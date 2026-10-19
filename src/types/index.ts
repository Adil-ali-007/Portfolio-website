export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack' | 'Creative 3D' | 'Systems & AI';
  description: string;
  longDescription: string;
  tags: string[];
  features: string[];
  architectureNotes: string[];
  liveUrl?: string;
  githubUrl?: string;
  accentColor: string;
  status: 'Production' | 'Featured' | 'Prototype' | 'Case Study';
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: Array<{
    name: string;
    level: string; // e.g. "Advanced", "Proficient", "Core"
    note: string;
  }>;
}

export interface JourneyMilestone {
  period: string;
  title: string;
  role: string;
  summary: string;
  takeaways: string[];
  techStack: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  fullDates: string;
  type: string;
  description: string;
}

export interface VideoConfig {
  sourceUrl: string;
  isCustom: boolean;
  isPlaying: boolean;
  muted: boolean;
  loop: boolean;
  reducedMotion: boolean;
  mode: '3d-hybrid' | 'video-pure' | '3d-pure';
  scrollScrub: boolean; // Play/seek video scroll by scroll
  scrubRange: 'hero-story' | 'full-page'; // Range for scroll scrub
}
