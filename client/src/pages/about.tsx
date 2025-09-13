import { Link } from 'wouter';
import { ArrowLeft, Mail, User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import type { NewsItem, Project } from '@shared/schema';

export default function About() {
  const { data: newsItems = [], isLoading: newsLoading } = useQuery<NewsItem[]>({
    queryKey: ['/api/news-items'],
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  if (newsLoading || projectsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity" data-testid="back-home">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Home</span>
          </Link>
          <div className="flex items-center gap-4">
            <a
              href="mailto:ianujsingh088@gmail.com"
              className="btn-primary"
              data-testid="nav-cta"
            >
              Get In Touch
            </a>
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-black text-xl">A</span>
            </div>
          </div>
        </div>
      </nav>

      {/* About Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl heading-bold mb-8">ABOUT</h1>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="space-y-6 text-lg">
              <p className="text-2xl font-semibold">
                Anuj Singh is a Frontend Engineer and Performance Specialist based in New Delhi, India.
              </p>
              <p>
                His work is characterized by scalable architectures, performance optimization, and creating 
                user experiences that serve hundreds of thousands of users daily.
              </p>
              <p>
                With expertise in React, Svelte, and modern web technologies, Anuj has delivered 
                enterprise-scale solutions for companies including AngelOne, Innovaccer, and Internshala.
              </p>
              <p>
                Specialized in improving Core Web Vitals, building real-time features, and integrating 
                AI-powered functionalities that enhance user engagement and business metrics.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="card-minimal bg-card text-card-foreground p-8">
                <h3 className="text-2xl font-black mb-4 text-card-foreground">Expertise</h3>
                <ul className="space-y-2 text-card-foreground">
                  <li>• Frontend Architecture & Development</li>
                  <li>• Performance Optimization</li>
                  <li>• React & Svelte Frameworks</li>
                  <li>• Real-time Applications</li>
                  <li>• AI Integration</li>
                  <li>• Team Leadership & Mentorship</li>
                </ul>
              </div>
            </div>
          </div>

          {/* News/Achievements Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl heading-bold mb-8">Key Achievements</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newsItems.map((item) => (
                <div 
                  key={item.id}
                  className={`card-minimal ${item.color} p-6 text-center`}
                  data-testid={`achievement-${item.id}`}
                >
                  <h3 className="font-black text-lg mb-2">{item.title}</h3>
                  <p className="text-sm font-semibold mb-1 opacity-90">{item.description}</p>
                  <p className="text-xs opacity-75">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <h2 className="text-3xl md:text-4xl heading-bold mb-8">Notable Projects</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <div 
                  key={project.id}
                  className="p-4 bg-card text-card-foreground rounded-2xl"
                  data-testid={`project-${project.id}`}
                >
                  <div>
                    <h3 className="font-semibold text-card-foreground">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl md:text-4xl heading-bold mb-8">Get In Touch</h2>
            <a 
              href="mailto:ianujsingh088@gmail.com"
              className="text-xl hover:text-primary transition-colors"
              data-testid="email-contact"
            >
              ianujsingh088@gmail.com
            </a>
            <p className="text-muted-foreground mt-2">New Delhi, India</p>
          </div>
        </div>
      </section>
      
      {/* Floating Theme Switcher */}
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeSwitcher />
      </div>
      
      {/* Floating Email Button */}
      <div className="fixed bottom-6 right-20 z-50">
        <a
          href="mailto:ianujsingh088@gmail.com"
          className="w-16 h-16 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          data-testid="floating-email"
        >
          <Mail className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}