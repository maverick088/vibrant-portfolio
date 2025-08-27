import Navigation from "@/components/Navigation";
import ExperienceCard from "@/components/ExperienceCard";
import SkillCard from "@/components/SkillCard";
import AchievementCard from "@/components/AchievementCard";
import { Mail, MapPin, ExternalLink } from "lucide-react";

const experienceData = [
  {
    rating: 95,
    title: "Software Development Engineer 2",
    company: "AngelOne",
    location: "Remote",
    period: "May 2024 - Present",
    level: "senior" as const,
    levelDisplay: "SENIOR",
    roleType: "Frontend Specialist",
    achievements: [
      "Enhanced Core Web Vitals for MTF and Stock Pledge modules, elevating FCP, LCP, and CRP by 41%",
      "Built trading analytics platform serving 190K+ monthly active users with interactive charts",
      "Delivered real-time chat features with custom rich text editor and live polling",
      "Led Svelte 5 migration for 10+ modules with successful production deployment"
    ]
  },
  {
    rating: 88,
    title: "Software Development Engineer 2",
    company: "Innovaccer",
    location: "Noida",
    period: "Dec 2021 - May 2024",
    level: "advanced" as const,
    levelDisplay: "ADVANCED",
    roleType: "Team Lead",
    achievements: [
      "Led development of Patient Relations Management (PRM) tool for 2 clients end-to-end",
      "Built Smart Assist with OpenAI APIs, increasing user engagement by 18%",
      "Mentored 2 new developers with comprehensive code reviews and training",
      "Modernized 4 web apps with micro frontend architecture"
    ]
  },
  {
    rating: 82,
    title: "Software Developer",
    company: "Internshala",
    location: "Gurugram",
    period: "Sep 2020 - Nov 2021",
    level: "intermediate" as const,
    levelDisplay: "GROWTH",
    roleType: "Developer",
    achievements: [
      "Developed Job Oriented Specialization (JOS) product contributing 5% monthly revenue",
      "Enhanced UI/UX increasing enrollment rates by 22.56% with React migration",
      "Boosted social shares of certificates from 30.55% to 45.62%",
      "Successfully coordinated between teams to deliver projects ahead of schedule"
    ]
  }
];

const frontendSkills = [
  { name: "JavaScript", rating: 95 },
  { name: "ReactJS", rating: 93 },
  { name: "Svelte", rating: 90 },
  { name: "Redux", rating: 88 },
  { name: "HTML/CSS", rating: 94 }
];

const backendSkills = [
  { name: "NodeJS", rating: 85 },
  { name: "Webpack", rating: 82 },
  { name: "Testing (Jest/RTL)", rating: 87 },
  { name: "CI/CD & Git", rating: 89 },
  { name: "REST APIs", rating: 91 }
];

const achievements = [
  {
    value: "190K+",
    title: "Monthly Active Users",
    description: "Trading analytics platform serving enterprise-scale user base",
    color: "text-primary"
  },
  {
    value: "41%",
    title: "Performance Boost",
    description: "Core Web Vitals improvement through optimization techniques",
    color: "text-green-600"
  },
  {
    value: "22.56%",
    title: "Enrollment Increase",
    description: "UI/UX enhancement driving significant user engagement growth",
    color: "text-blue-600"
  },
  {
    value: "18%",
    title: "User Engagement",
    description: "Smart Assist AI integration boosting user interaction rates",
    color: "text-purple-600"
  },
  {
    value: "10+",
    title: "Module Migrations",
    description: "Successful Svelte 5 upgrades with zero production issues",
    color: "text-orange-600"
  },
  {
    value: "5%",
    title: "Revenue Impact",
    description: "Direct contribution to monthly revenue through product development",
    color: "text-red-600"
  }
];

export default function Home() {
  return (
    <div className="bg-background text-foreground antialiased">
      <Navigation />

      {/* Hero Section */}
      <section id="about" className="pt-24 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="relative inline-block mb-8 animate-float">
              <div className="gradient-border">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400" 
                  alt="Professional headshot of Anuj Singh" 
                  className="w-48 h-48 rounded-2xl object-cover"
                  data-testid="profile-image"
                />
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-in-up" data-testid="hero-title">
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Frontend Engineer
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed text-balance" data-testid="hero-description">
              Crafting exceptional digital experiences with modern web technologies. 
              Specialized in React, Svelte, and performance optimization.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 text-muted-foreground" data-testid="location-info">
                <MapPin className="w-5 h-5" />
                New Delhi, India
              </div>
              <div className="flex items-center gap-2 text-muted-foreground" data-testid="email-info">
                <Mail className="w-5 h-5" />
                ianujsingh088@gmail.com
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4" data-testid="experience-section-title">
              Professional Journey
            </h2>
            <p className="text-xl text-muted-foreground">
              Career progression through Ultimate Team-style experience cards
            </p>
          </div>

          <div className="grid gap-8 lg:gap-12">
            {experienceData.map((experience, index) => (
              <ExperienceCard key={index} {...experience} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4" data-testid="skills-section-title">
              Technical Arsenal
            </h2>
            <p className="text-xl text-muted-foreground">
              Skill ratings based on real-world experience and project impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <SkillCard title="Frontend Skills" skills={frontendSkills} />
            <SkillCard title="Backend & Tools" skills={backendSkills} />
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4" data-testid="achievements-section-title">
              Key Achievements
            </h2>
            <p className="text-xl text-muted-foreground">
              Impactful contributions across different organizations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <AchievementCard key={index} {...achievement} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8" data-testid="contact-section-title">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Ready to discuss your next project or explore collaboration opportunities
          </p>
          
          <div className="mb-12">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&h=600" 
              alt="Clean modern workspace with Apple devices and minimalist setup" 
              className="rounded-2xl shadow-2xl w-full h-auto"
              data-testid="workspace-image"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <a 
              href="mailto:ianujsingh088@gmail.com" 
              className="flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.05]"
              data-testid="email-button"
            >
              <Mail className="w-5 h-5" />
              Email Me
            </a>
            
            <a 
              href="https://linkedin.com/in/anuj-singh-3a71b3146/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-border px-8 py-4 rounded-xl hover:bg-accent transition-all duration-300 transform hover:scale-[1.05]"
              data-testid="linkedin-button"
            >
              <ExternalLink className="w-5 h-5" />
              LinkedIn
            </a>
          </div>

          <div className="ultimate-card rounded-2xl p-8 max-w-2xl mx-auto" data-testid="education-card">
            <h3 className="text-2xl font-bold mb-4">Education</h3>
            <div className="text-left">
              <h4 className="font-semibold text-lg" data-testid="education-degree">
                Bachelor of Technology (B.Tech in ECE)
              </h4>
              <p className="text-muted-foreground" data-testid="education-institution">
                Maharaja Agrasen Institute of Technology, New Delhi
              </p>
              <p className="text-muted-foreground" data-testid="education-details">
                CGPA: 8.3 · Jul 2015 - Jun 2019
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground" data-testid="footer-text">
            © 2024 Anuj Singh. Crafted with passion for exceptional web experiences.
          </p>
        </div>
      </footer>
    </div>
  );
}
