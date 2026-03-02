"use client";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "success" | "warning" | "error" | "info";
}

const variants = {
  default: "bg-slate-700/60 text-slate-300 border-slate-600/40",
  success: "bg-emerald-500/12 text-emerald-400 border-emerald-500/25",
  warning: "bg-amber-500/12 text-amber-400 border-amber-500/25",
  error: "bg-red-500/12 text-red-400 border-red-500/25",
  info: "bg-blue-500/12 text-blue-400 border-blue-500/25",
};

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
