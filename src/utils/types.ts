import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

export interface SkillItem {
  name: string;
  level: number;
  color: string;
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  description: string;
  skills: SkillItem[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: any;
  mobileImage?: any;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  category: string;
  seoBadge?: string;
}

export interface JourneyStep {
  year: string;
  title: string;
  company: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface Passion {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SocialLink {
  name: string;
  icon: IconType | LucideIcon;
  url: string;
  color: string;
  bgColor: string;
}

export interface ContactInfo {
  icon: LucideIcon;
  label: string;
  value: string;
  link: string;
}

export interface Stat {
  number: string;
  label: string;
}
