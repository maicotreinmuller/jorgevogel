import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  className?: string;
  iconClassName?: string;
}

const DashboardCard = ({ 
  title, 
  value, 
  icon: Icon, 
  description,
  className,
  iconClassName
}: DashboardCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-lg md:rounded-xl border shadow-sm p-4 md:p-6 transition-all duration-200 hover:shadow-md relative",
      className
    )}>
      <div className={cn(
        "p-1.5 md:p-2 rounded-full bg-white/80 shadow-sm absolute top-3 right-3 md:top-4 md:right-4",
        iconClassName
      )}>
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
      </div>
      <div>
        <h3 className="text-xs md:text-sm font-medium text-gray-600">{title}</h3>
        <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1 md:mt-2">{value}</p>
        {description && (
          <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2">{description}</p>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;