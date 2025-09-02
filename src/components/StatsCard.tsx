import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  color?: 'primary' | 'success' | 'warning' | 'destructive';
}
const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  color = 'primary'
}: StatsCardProps) => {
  const colorClasses = {
    primary: 'from-primary to-primary-dark',
    success: 'from-success to-green-600',
    warning: 'from-warning to-orange-600',
    destructive: 'from-destructive to-red-600'
  };
  return (
    <Card className="stats-card animate-fade-in hover-glow">
      <div className="p-6 bg-gradient-card relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 animate-pulse" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg animate-float`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            {trend && (
              <div className="text-right space-y-1">
                <p className={`text-xs font-medium px-2 py-1 rounded-full ${
                  trend.value >= 0 
                    ? 'text-success bg-success/10' 
                    : 'text-destructive bg-destructive/10'
                }`}>
                  {trend.value >= 0 ? '+' : ''}{trend.value}%
                </p>
                <p className="text-xs text-muted-foreground">{trend.label}</p>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground tracking-wide">
              {title}
            </h3>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-foreground">{value}</p>
              {trend && (
                <div className="flex items-center text-xs">
                  <div className={`w-2 h-2 rounded-full mr-1 ${
                    trend.value >= 0 ? 'bg-success' : 'bg-destructive'
                  } animate-pulse`} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default StatsCard;