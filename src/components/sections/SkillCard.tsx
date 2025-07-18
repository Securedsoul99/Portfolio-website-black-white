import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type SkillCardProps = {
  category: string;
  icon?: React.ReactNode;
  skills: string[];
};

const SkillCard = ({ category, icon, skills }: SkillCardProps) => (
  <Card className="unified-card min-w-[280px] max-w-xs mx-2 border border-border/60 shadow-md hover:shadow-xl transition-shadow flex-shrink-0">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="flex items-center gap-2 text-base font-bold text-primary">
        {icon && <span className="text-lg text-primary">{icon}</span>}
        {category}
      </CardTitle>
      <span className="w-3 h-3 rounded-full bg-primary/80 border border-primary" />
    </CardHeader>
    <CardContent>
      <div className="flex flex-col gap-2 py-2">
        {skills.map(skill => (
          <Badge key={skill} className="w-fit bg-muted/60 text-white font-medium px-3 py-1.5 rounded shadow text-xs">
            {skill}
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default SkillCard;