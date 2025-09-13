import { type User, type InsertUser, type Experience, type Skill, type ProjectCard, type NewsItem, type Project } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Portfolio data methods
  getExperiences(): Promise<Experience[]>;
  getSkills(): Promise<Skill[]>;
  getProjectCards(): Promise<ProjectCard[]>;
  getNewsItems(): Promise<NewsItem[]>;
  getProjects(): Promise<Project[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  
  // Portfolio data
  private experiences: Experience[] = [
    {
      id: 1,
      company: "AngelOne",
      role: "Software Engineer 2",
      period: "2024 - Present",
      rating: 95,
      highlights: [
        "Built analytics platform for 190K+ users",
        "Improved Core Web Vitals by 41%",
        "Led Svelte 5 migration for 10+ modules",
      ],
      index: 0,
    },
    {
      id: 2,
      company: "Innovaccer",
      role: "Software Engineer 2",
      period: "2021 - 2024",
      rating: 88,
      highlights: [
        "Led PRM tool development end-to-end",
        "Built Smart Assist with OpenAI APIs",
        "Mentored 2 developers with comprehensive training",
      ],
      index: 1,
    },
    {
      id: 3,
      company: "Internshala",
      role: "Software Developer",
      period: "2020 - 2021",
      rating: 82,
      highlights: [
        "Developed JOS product contributing 5% revenue",
        "Increased enrollment rates by 22.56%",
        "Boosted certificate shares from 30% to 45.62%",
      ],
      index: 2,
    },
  ];
  
  private skills: Skill[] = [
    { id: 1, name: "React", rating: 93, category: "frontend" },
    { id: 2, name: "JavaScript", rating: 95, category: "frontend" },
    { id: 3, name: "Svelte", rating: 90, category: "frontend" },
    { id: 4, name: "TypeScript", rating: 88, category: "frontend" },
    { id: 5, name: "Node.js", rating: 85, category: "backend" },
    { id: 6, name: "CSS/Tailwind", rating: 92, category: "frontend" },
  ];
  
  private projectCards: ProjectCard[] = [
    { id: 1, title: "Trading Analytics", metric: "190K+ Users", color: "card-mint", icon: "📊" },
    { id: 2, title: "Performance Boost", metric: "41% Faster", color: "card-yellow", icon: "🚀" },
    { id: 3, title: "Smart Assist AI", metric: "18% Engagement", color: "card-purple", icon: "🤖" },
    { id: 4, title: "Enrollment Growth", metric: "22.56% Increase", color: "card-coral", icon: "📈" },
    { id: 5, title: "Module Migration", metric: "10+ Modules", color: "card-blue", icon: "🔄" },
    { id: 6, title: "Revenue Impact", metric: "5% Monthly", color: "card-green", icon: "💰" },
  ];
  
  private newsItems: NewsItem[] = [
    {
      id: 1,
      title: "AngelOne Platform",
      description: "Trading Analytics Platform",
      detail: "Built for 190K+ monthly active users",
      color: "card-coral"
    },
    {
      id: 2,
      title: "Performance Expert",
      description: "Core Web Vitals",
      detail: "41% improvement in FCP, LCP, CRP",
      color: "card-blue"
    },
    {
      id: 3,
      title: "AI Integration",
      description: "Smart Assist Feature",
      detail: "18% increase in user engagement",
      color: "card-green"
    },
    {
      id: 4,
      title: "Team Leadership",
      description: "Mentorship & Guidance",
      detail: "Led and mentored 2 developers",
      color: "card-purple"
    }
  ];
  
  private projects: Project[] = [
    { id: 1, name: "AngelOne Trading Platform", period: "2024", link: "#" },
    { id: 2, name: "Patient Relations Management", period: "2023", link: "#" },
    { id: 3, name: "Smart Assist AI", period: "2022", link: "#" },
    { id: 4, name: "Job Oriented Specialization", period: "2021", link: "#" },
    { id: 5, name: "Micro Frontend Architecture", period: "2022", link: "#" }
  ];

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Portfolio data methods
  async getExperiences(): Promise<Experience[]> {
    return this.experiences;
  }
  
  async getSkills(): Promise<Skill[]> {
    return this.skills;
  }
  
  async getProjectCards(): Promise<ProjectCard[]> {
    return this.projectCards;
  }
  
  async getNewsItems(): Promise<NewsItem[]> {
    return this.newsItems;
  }
  
  async getProjects(): Promise<Project[]> {
    return this.projects;
  }
}

export const storage = new MemStorage();
