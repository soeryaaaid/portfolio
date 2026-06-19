import localData from '@/data/portfolio.json';

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string[];
}

export interface ProjectItem {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  grade: string;
  details: string[];
}

export interface ContactData {
  email: string;
  linkedin: string;
  github: string;
}

export interface PortfolioData {
  name: string;
  nickname: string;
  headline: string;
  about: string;
  skills: string[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  contact: ContactData;
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const gistUrl = process.env.NEXT_PUBLIC_GIST_URL;

  if (!gistUrl) {
    return localData as PortfolioData;
  }

  try {
    const res = await fetch(gistUrl, {
      next: { revalidate: 3600 }, // ISR: Cache for 1 hour
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch from Gist: ${res.statusText}`);
    }
    const data = await res.json();
    return data as PortfolioData;
  } catch (error) {
    console.error('Error fetching dynamic portfolio data, falling back to local data:', error);
    return localData as PortfolioData;
  }
}
