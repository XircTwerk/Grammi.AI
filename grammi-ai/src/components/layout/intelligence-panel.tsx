"use client";
import { TrendingUp, Bell, Zap, ChevronUp, ChevronDown, AlertTriangle } from "lucide-react";
import { TRENDING_METRICS } from "@/lib/data/metrics";

const ALERTS = [
  { id: 1, type: "warning", message: "RevenueMaxx budget at 88% for today", time: "12m ago" },
  { id: 2, type: "info", message: "LeadHunter found 8 enterprise leads", time: "28m ago" },
  { id: 3, type: "success", message: "FlowOptimizer saved 3.2 hrs this week", time: "1h ago" },
];

const SUGGESTIONS = [
  { title: "Enable ArbitrageRadar", body: "Similar users earn +$4.2K/mo", cta: "View Agent" },
  { title: "Increase Lead Budget", body: "Your cost-per-lead is down 18%", cta: "Adjust" },
  { title: "A/B Test Content", body: "ContentStorm variant B has 2× CTR", cta: "Review" },
];

export function IntelligencePanel() {
  return (
    <aside className="fixed right-0 top-0 h-screen w-72 border-l border-slate-700/40 bg-slate-900/80 backdrop-blur-xl z-40 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="px-5 py-5 border-b border-slate-700/30">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-semibold text-white">Intelligence Panel</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5">Live insights & optimization</p>
      </div>

      {/* Platform Trending */}
      <div className="px-4 py-4 border-b border-slate-700/20">
        <div className="flex items-center gap-1.5 mb-3">
          <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Platform Trending</span>
        </div>
        <div className="space-y-2.5">
          {TRENDING_METRICS.map((metric) => (
            <div key={metric.label} className="flex items-start justify-between">
              <div>
                <div className="text-[11px] text-slate-500">{metric.label}</div>
                <div className="text-sm font-bold text-white mono">{metric.value}</div>
              </div>
              <div className={`flex items-center gap-0.5 text-[11px] font-semibold ${metric.positive ? "text-emerald-400" : "text-red-400"}`}>
                {metric.positive ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {metric.delta}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="px-4 py-4 border-b border-slate-700/20">
        <div className="flex items-center gap-1.5 mb-3">
          <Bell className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Alerts</span>
          <span className="ml-auto bg-amber-500/20 text-amber-400 text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
            {ALERTS.filter(a => a.type === "warning").length}
          </span>
        </div>
        <div className="space-y-2">
          {ALERTS.map((alert) => (
            <div key={alert.id} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/30">
              <div className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                alert.type === "warning" ? "bg-amber-400 animate-pulse-glow" :
                alert.type === "success" ? "bg-emerald-400" : "bg-blue-400"
              }`} />
              <div>
                <p className="text-[11px] text-slate-300 leading-relaxed">{alert.message}</p>
                <p className="text-[10px] text-slate-600 mt-0.5">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimization Suggestions */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-1.5 mb-3">
          <AlertTriangle className="w-3.5 h-3.5 text-teal-400" />
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Optimize</span>
        </div>
        <div className="space-y-2">
          {SUGGESTIONS.map((s) => (
            <div key={s.title} className="p-3 rounded-xl glass-teal">
              <div className="text-xs font-semibold text-teal-300 mb-0.5">{s.title}</div>
              <div className="text-[11px] text-slate-400 mb-2">{s.body}</div>
              <button className="text-[11px] font-semibold text-teal-400 hover:text-teal-300 transition-colors">
                {s.cta} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
