interface AchievementCardProps {
  value: string;
  title: string;
  description: string;
  color: string;
}

export default function AchievementCard({ value, title, description, color }: AchievementCardProps) {
  return (
    <div className="ultimate-card rounded-2xl p-8 text-center card-glow transform hover:scale-[1.05] transition-all duration-300">
      <div className={`text-4xl font-bold mb-4 ${color}`} data-testid={`achievement-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        {value}
      </div>
      <h3 className="text-xl font-semibold mb-2" data-testid={`achievement-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        {title}
      </h3>
      <p className="text-muted-foreground" data-testid={`achievement-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        {description}
      </p>
    </div>
  );
}
