interface SkillCardProps {
  title: string;
  skills: {
    name: string;
    rating: number;
  }[];
}

export default function SkillCard({ title, skills }: SkillCardProps) {
  return (
    <div className="ultimate-card rounded-2xl p-8 card-glow">
      <h3 className="text-2xl font-bold mb-6 text-center" data-testid={`skill-category-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        {title}
      </h3>
      <div className="space-y-6">
        {skills.map((skill, index) => (
          <div key={index} data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold" data-testid={`skill-name-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                {skill.name}
              </span>
              <span className="text-2xl font-bold text-primary" data-testid={`skill-rating-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                {skill.rating}
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="skill-bar h-full rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${skill.rating}%` }}
                data-testid={`skill-bar-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
