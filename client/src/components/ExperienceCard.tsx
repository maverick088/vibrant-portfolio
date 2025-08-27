import { cn } from "@/lib/utils";

interface ExperienceCardProps {
  rating: number;
  title: string;
  company: string;
  location: string;
  period: string;
  level: "senior" | "advanced" | "intermediate";
  achievements: string[];
  levelDisplay: string;
  roleType: string;
}

const levelConfig = {
  senior: {
    bgClass: "experience-senior",
    ratingColor: "bg-green-500",
    levelColor: "text-green-600"
  },
  advanced: {
    bgClass: "experience-advanced", 
    ratingColor: "bg-blue-500",
    levelColor: "text-blue-600"
  },
  intermediate: {
    bgClass: "experience-intermediate",
    ratingColor: "bg-amber-500", 
    levelColor: "text-amber-600"
  }
};

export default function ExperienceCard({
  rating,
  title,
  company,
  location,
  period,
  level,
  achievements,
  levelDisplay,
  roleType
}: ExperienceCardProps) {
  const config = levelConfig[level];

  return (
    <div className={cn(
      "ultimate-card rounded-2xl p-8 lg:p-10 card-glow transform hover:scale-[1.02] transition-all duration-300",
      config.bgClass
    )}>
      <div className="flex flex-col lg:flex-row items-start gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className={cn(
              "text-white text-2xl font-bold px-4 py-2 rounded-lg",
              config.ratingColor
            )}>
              {rating}
            </div>
            <div>
              <h3 className="text-2xl font-bold" data-testid={`experience-title-${company.toLowerCase()}`}>
                {title}
              </h3>
              <p className="text-lg text-muted-foreground" data-testid={`experience-company-${company.toLowerCase()}`}>
                {company} · {location} · {period}
              </p>
            </div>
          </div>
          <div className="space-y-3 text-card-foreground">
            {achievements.map((achievement, index) => (
              <p key={index} data-testid={`achievement-${company.toLowerCase()}-${index}`}>
                • {achievement}
              </p>
            ))}
          </div>
        </div>
        <div className="text-center lg:text-right">
          <div className="text-sm text-muted-foreground mb-2">Experience Level</div>
          <div className={cn("text-3xl font-bold", config.levelColor)} data-testid={`experience-level-${company.toLowerCase()}`}>
            {levelDisplay}
          </div>
          <div className="text-sm text-muted-foreground mt-2">{roleType}</div>
        </div>
      </div>
    </div>
  );
}
