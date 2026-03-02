"use client";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "gold";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variants = {
  primary: "bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-900/30 border border-teal-500/30",
  secondary: "bg-slate-700/60 hover:bg-slate-600/60 text-slate-200 border border-slate-600/40",
  ghost: "hover:bg-slate-700/40 text-slate-300 hover:text-white border border-transparent hover:border-slate-600/30",
  danger: "bg-red-600/80 hover:bg-red-500 text-white border border-red-500/30",
  gold: "bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold border border-amber-400/30 shadow-lg shadow-amber-900/20",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2.5",
};

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
