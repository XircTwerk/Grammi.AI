"use client";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export function Input({ className, icon, ...props }: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        className={cn(
          "w-full rounded-xl border border-slate-700/40 bg-slate-800/50 text-slate-200 placeholder-slate-500",
          "px-4 py-2.5 text-sm outline-none transition-all duration-200",
          "focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20",
          icon && "pl-10",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "rounded-xl border border-slate-700/40 bg-slate-800/50 text-slate-200",
        "px-3 py-2.5 text-sm outline-none transition-all duration-200",
        "focus:border-teal-500/50 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
