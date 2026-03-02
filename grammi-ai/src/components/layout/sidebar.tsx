"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Store, Bot, BarChart3, CreditCard, Code2, ShieldCheck,
  LayoutDashboard, Zap, ChevronRight, Settings, LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/marketplace", label: "Marketplace", icon: Store, description: "Browse agents" },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, description: "Live overview" },
  { href: "/my-agents", label: "My Agents", icon: Bot, description: "Manage agents" },
  { href: "/performance", label: "Performance", icon: BarChart3, description: "ROI & analytics" },
  { href: "/billing", label: "Billing", icon: CreditCard, description: "Plans & usage" },
  { href: "/api-access", label: "API", icon: Code2, description: "Developer tools" },
  { href: "/security", label: "Security", icon: ShieldCheck, description: "Audit & trust" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 flex flex-col border-r border-slate-700/40 bg-slate-900/80 backdrop-blur-xl z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-700/30">
        <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-lg shadow-teal-900/30">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="text-base font-bold text-white tracking-tight">grammi</span>
          <span className="text-base font-bold text-teal-400 tracking-tight">.ai</span>
          <div className="text-[10px] text-slate-500 -mt-0.5">Digital Labor Platform</div>
        </div>
      </div>

      {/* Quick launch */}
      <div className="px-3 py-3 border-b border-slate-700/20">
        <Link href="/launch">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl gradient-brand cursor-pointer group">
            <Zap className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">Launch Agent</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/70 ml-auto group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon, description }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link key={href} href={href}>
              <div className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group cursor-pointer",
                active
                  ? "bg-teal-500/12 border border-teal-500/20 text-teal-400"
                  : "text-slate-400 hover:bg-slate-700/30 hover:text-slate-200 border border-transparent"
              )}>
                <Icon className={cn("w-4 h-4 shrink-0", active ? "text-teal-400" : "text-slate-500 group-hover:text-slate-300")} />
                <div className="min-w-0">
                  <div className={cn("text-sm font-medium truncate", active ? "text-teal-300" : "")}>{label}</div>
                  <div className="text-[10px] text-slate-600 truncate">{description}</div>
                </div>
                {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400" />}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-slate-700/30 space-y-0.5">
        <Link href="/settings">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:bg-slate-700/30 hover:text-slate-200 cursor-pointer transition-all">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </div>
        </Link>
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl">
          <div className="w-7 h-7 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-bold">A</div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-medium text-slate-200 truncate">Alex Morgan</div>
            <div className="text-[10px] text-slate-500 truncate">Pro Plan</div>
          </div>
          <LogOut className="w-3.5 h-3.5 text-slate-600 hover:text-slate-400 cursor-pointer transition-colors" />
        </div>
      </div>
    </aside>
  );
}
