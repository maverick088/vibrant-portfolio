import { Mail, MapPin, ExternalLink, User } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ExperienceCarousel from "@/components/ExperienceCarousel";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import type { Experience, Skill, ProjectCard } from "@shared/schema";


// Typing Animation Component
function TypingAnimation({ text, delay = 200, onComplete }: { text: string; delay?: number; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      // Animation complete for first time
      setIsComplete(true);
      if (onComplete) onComplete();
      
      // Start loop after 2 seconds
      const loopTimeout = setTimeout(() => {
        setDisplayedText("");
        setCurrentIndex(0);
        setIsComplete(false);
      }, 2000);

      return () => clearTimeout(loopTimeout);
    }
  }, [currentIndex, text, delay, onComplete, isComplete]);

  // Cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span>
      {displayedText}
      <span className={`inline-block w-1 h-16 md:h-20 lg:h-24 bg-primary ml-2 transition-opacity duration-200 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
    </span>
  );
}



export default function Home() {
  // Fetch data from APIs
  const { data: experiences = [], isLoading: experiencesLoading } = useQuery<Experience[]>({
    queryKey: ['/api/experiences'],
  });

  const { data: skills = [], isLoading: skillsLoading } = useQuery<Skill[]>({
    queryKey: ['/api/skills'],
  });

  const { data: projectCards = [], isLoading: projectCardsLoading } = useQuery<ProjectCard[]>({
    queryKey: ['/api/project-cards'],
  });

  // Show loading state
  if (experiencesLoading || skillsLoading || projectCardsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading portfolio data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-black text-xl">
              A
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="flex items-center gap-2 px-4 py-2 hover:bg-secondary rounded-full transition-colors"
              data-testid="nav-about"
            >
              <User className="w-4 h-4" />
              <span className="font-medium">About</span>
            </Link>
            <a
              href="mailto:ianujsingh088@gmail.com"
              className="btn-primary"
              data-testid="nav-cta"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-muted-foreground uppercase tracking-widest text-sm mb-4">
              New Delhi, India
            </p>
            <a
              href="mailto:ianujsingh088@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
              data-testid="email-link"
            >
              ianujsingh088@gmail.com
            </a>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl heading-bold text-center mb-8 animate-fade-in" data-testid="hero-name">
            <TypingAnimation text="ANUJ SINGH" delay={200} />
          </h1>

          {/* Colorful skill cards row */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["React", "TypeScript", "Svelte", "Node.js"].map(
              (skill, index) => {
                const colors = [
                  "card-green",
                  "card-blue",
                  "card-coral",
                  "card-purple",
                ];
                return (
                  <div
                    key={skill}
                    className={`${colors[index]} px-6 py-3 rounded-2xl font-semibold`}
                    data-testid={`hero-skill-${skill.toLowerCase()}`}
                  >
                    {skill}
                  </div>
                );
              },
            )}
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl heading-bold text-center text-primary mb-12">
            FRONTEND ENGINEER &<br />
            PERFORMANCE SPECIALIST
          </h2>

          <div className="text-center mb-16">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Building scalable web applications with modern technologies.
              Specialized in React, Svelte, and performance optimization.
            </p>
          </div>

          {/* Clients Include */}
          <div className="text-center">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Companies I've Worked With
            </p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              <span className="text-lg font-semibold">AngelOne</span>
              <span className="text-lg font-semibold">Innovaccer</span>
              <span className="text-lg font-semibold">Internshala</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section with Carousel */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl md:text-5xl heading-bold mb-4">
            Featured Work
          </h3>
          <p className="text-muted-foreground mb-12">
            Select recent and notable experiences
          </p>

          <ExperienceCarousel experiences={experiences} />
        </div>
      </section>

      {/* More Work Section - Grid of colorful cards */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl md:text-5xl heading-bold mb-4">
            Key Achievements
          </h3>
          <p className="text-muted-foreground mb-12">
            Take a scroll, stay a while
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectCards.map((project, index) => (
              <div
                key={index}
                className={`card-minimal ${project.color} p-8 text-center`}
                data-testid={`achievement-${index}`}
              >
                <div className="text-4xl mb-4">{project.icon}</div>
                <h4 className="font-black text-xl mb-2">{project.title}</h4>
                <p className="text-2xl font-bold">{project.metric}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl md:text-5xl heading-bold mb-12">
            Technical Skills
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center justify-between p-4 bg-card rounded-2xl"
                data-testid={`skill-${skill.name.toLowerCase()}`}
              >
                <span className="font-semibold text-lg">{skill.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000"
                      style={{ width: `${skill.rating}%` }}
                    />
                  </div>
                  <span className="font-black text-xl text-primary">
                    {skill.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl heading-bold mb-8">
            Let's Work Together
          </h3>
          <p className="text-xl text-muted-foreground mb-12">
            Ready to discuss your next project or explore collaboration
            opportunities
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="mailto:ianujsingh088@gmail.com"
              className="btn-primary inline-flex items-center gap-2"
              data-testid="contact-email"
            >
              <Mail className="w-5 h-5" />
              Email Me
            </a>
            <a
              href="https://linkedin.com/in/anuj-singh-3a71b3146/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary text-foreground px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
              data-testid="contact-linkedin"
            >
              <ExternalLink className="w-5 h-5" />
              LinkedIn Profile
            </a>
          </div>

          {/* Education Card */}
          <div className="card-minimal card-yellow p-8 max-w-md mx-auto">
            <h4 className="font-black text-xl mb-3">Education</h4>
            <p className="font-semibold">B.Tech in ECE</p>
            <p className="text-sm opacity-80">
              Maharaja Agrasen Institute of Technology
            </p>
            <p className="text-sm opacity-80">CGPA: 8.3 | 2015-2019</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center">
        <p className="text-muted-foreground text-sm">
          © 2024 Anuj Singh • Crafted with passion for exceptional web
          experiences
        </p>
      </footer>

      {/* Floating CTA Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <a
          href="mailto:ianujsingh088@gmail.com"
          className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
          data-testid="floating-cta"
        >
          <Mail className="w-6 h-6" />
        </a>
      </div>

      {/* Theme Switcher */}
      <ThemeSwitcher />
    </div>
  );
}
