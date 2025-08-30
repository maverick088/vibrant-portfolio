import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function About() {
  const newsItems = [
    {
      title: "AngelOne Platform",
      description: "Trading Analytics Platform",
      detail: "Built for 190K+ monthly active users",
      color: "card-coral"
    },
    {
      title: "Performance Expert",
      description: "Core Web Vitals",
      detail: "41% improvement in FCP, LCP, CRP",
      color: "card-blue"
    },
    {
      title: "AI Integration",
      description: "Smart Assist Feature",
      detail: "18% increase in user engagement",
      color: "card-green"
    },
    {
      title: "Team Leadership",
      description: "Mentorship & Guidance",
      detail: "Led and mentored 2 developers",
      color: "card-purple"
    }
  ];

  const projects = [
    { name: "AngelOne Trading Platform", period: "2024", link: "#" },
    { name: "Patient Relations Management", period: "2023", link: "#" },
    { name: "Smart Assist AI", period: "2022", link: "#" },
    { name: "Job Oriented Specialization", period: "2021", link: "#" },
    { name: "Micro Frontend Architecture", period: "2022", link: "#" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity" data-testid="back-home">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Home</span>
          </Link>
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-black text-xl">A</span>
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
              <div className="card-minimal p-8">
                <h3 className="text-2xl font-black mb-4">Expertise</h3>
                <ul className="space-y-2">
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
              {newsItems.map((item, index) => (
                <div 
                  key={index}
                  className={`card-minimal ${item.color} p-6 text-center`}
                  data-testid={`achievement-${index}`}
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
              {projects.map((project, index) => (
                <div 
                  key={index}
                  className="p-4 bg-card rounded-2xl"
                  data-testid={`project-${index}`}
                >
                  <div>
                    <h3 className="font-semibold">{project.name}</h3>
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
    </div>
  );
}