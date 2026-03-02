"use client";
import Link from "next/link";
import { Bot, Zap, Play, Pause, Square, Settings, TrendingUp, Clock, DollarSign, Activity, BarChart3 } from "lucide-react";
import { MY_AGENTS } from "@/lib/data/agents";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatNumber, getStatusColor, getCategoryColor } from "@/lib/utils";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

export default function MyAgentsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Agents</h1>
          <p className="text-sm text-slate-400 mt-1">{MY_AGENTS.filter(a => a.status === "live").length} live · {MY_AGENTS.length} total</p>
        </div>
        <Link href="/launch">
          <Button>
            <Zap className="w-4 h-4" />
            Launch New Agent
          </Button>
        </Link>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Earned", value: formatCurrency(MY_AGENTS.reduce((s, a) => s + a.totalEarned, 0)), icon: DollarSign, color: "text-teal-400" },
          { label: "Active Now", value: `${MY_AGENTS.filter(a => a.status === "live").length} agents`, icon: Activity, color: "text-emerald-400" },
          { label: "Tasks Today", value: formatNumber(4218), icon: BarChart3, color: "text-blue-400" },
          { label: "Avg Uptime", value: "99.94%", icon: Clock, color: "text-violet-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon className={`w-4 h-4 ${color}`} />
              <span className="text-xs text-slate-400">{label}</span>
            </div>
            <div className="text-xl font-bold text-white mono">{value}</div>
          </div>
        ))}
      </div>

      {/* Agent Cards */}
      <div className="space-y-4">
        {MY_AGENTS.map((agent) => (
          <div key={agent.id} className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5 hover:border-slate-600/50 transition-all">
            <div className="flex items-start gap-4">
              {/* Avatar + status */}
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-800 ${getStatusColor(agent.status)} ${agent.status === "live" ? "animate-pulse-glow" : ""}`} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white">{agent.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${getCategoryColor(agent.category)}`}>
                      {agent.category}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium capitalize ${
                      agent.status === "live" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                      agent.status === "paused" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" :
                      "bg-red-500/10 border-red-500/20 text-red-400"
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {agent.status === "live" ? (
                      <button className="p-2 rounded-xl hover:bg-slate-700/40 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer border border-transparent hover:border-slate-600/40">
                        <Pause className="w-4 h-4" />
                      </button>
                    ) : (
                      <button className="p-2 rounded-xl hover:bg-slate-700/40 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer border border-transparent hover:border-slate-600/40">
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-2 rounded-xl hover:bg-slate-700/40 text-slate-400 hover:text-red-400 transition-colors cursor-pointer border border-transparent hover:border-slate-600/40">
                      <Square className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-xl hover:bg-slate-700/40 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer border border-transparent hover:border-slate-600/40">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-slate-400 mb-4">{agent.tagline}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">Total Earned</div>
                    <div className="text-sm font-bold text-emerald-400 mono">{formatCurrency(agent.totalEarned)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">Running</div>
                    <div className="text-sm font-bold text-white">{agent.runningDays} days</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">Daily Budget</div>
                    <div className="text-sm font-bold text-white">{formatCurrency(agent.dailyBudget)}/day</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">Avg ROI</div>
                    <div className="text-sm font-bold text-teal-400">{agent.avgROI}%</div>
                  </div>
                </div>

                {/* Budget bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                    <span>Daily budget used</span>
                    <span>{formatCurrency(agent.budgetUsed)} / {formatCurrency(agent.dailyBudget)}</span>
                  </div>
                  <div className="h-2 bg-slate-900/60 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        (agent.budgetUsed / agent.dailyBudget) > 0.9 ? "bg-amber-500" : "bg-teal-500"
                      }`}
                      style={{ width: `${(agent.budgetUsed / agent.dailyBudget) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Mini chart */}
                <div className="h-12">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={agent.historicalROI}>
                      <defs>
                        <linearGradient id={`ag-${agent.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0D9488" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="roi" stroke="#0D9488" strokeWidth={1.5} fill={`url(#ag-${agent.id})`} dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
