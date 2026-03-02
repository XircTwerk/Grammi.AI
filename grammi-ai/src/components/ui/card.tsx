"use client";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function Card({ children, className, hover, glow }: CardProps) {
  return (
    <div className={cn(
      "rounded-2xl border bg-slate-800/50 backdrop-blur-sm",
      "border-slate-700/40",
      hover && "hover:border-teal-500/30 hover:bg-slate-800/70 transition-all duration-200 cursor-pointer",
      glow && "hover:shadow-lg hover:shadow-teal-900/20",
      className
    )}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-5 pb-0", className)}>{children}</div>;
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-5", className)}>{children}</div>;
}

export function StatCard({
  label,
  value,
  delta,
  positive,
  icon,
  className,
}: {
  label: string;
  value: string;
  delta?: string;
  positive?: boolean;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("p-5", className)}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-slate-400">{label}</p>
        {icon && <div className="text-teal-400">{icon}</div>}
      </div>
      <p className="text-2xl font-bold text-white mono">{value}</p>
      {delta && (
        <p className={cn(
          "text-xs mt-1 font-medium",
          positive ? "text-emerald-400" : "text-red-400"
        )}>
          {positive ? "↑" : "↓"} {delta}
        </p>
      )}
    </Card>
  );
}
