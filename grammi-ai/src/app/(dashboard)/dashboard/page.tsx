"use client";
import { useState, useEffect } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";
import { Zap, Bot, DollarSign, Activity, TrendingUp, Play, Pause, Square, RefreshCw } from "lucide-react";
import { StatCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DASHBOARD_STATS, ROI_CHART_DATA, AGENT_PERFORMANCE_DATA, CATEGORY_BREAKDOWN } from "@/lib/data/metrics";
import { LIVE_FEED_EVENTS, MY_AGENTS } from "@/lib/data/agents";
import { formatCurrency, formatNumber, getStatusColor } from "@/lib/utils";

const FEED_TYPE_COLORS: Record<string, string> = {
  revenue: "text-teal-400 bg-teal-500/10",
  lead: "text-blue-400 bg-blue-500/10",
  workflow: "text-violet-400 bg-violet-500/10",
  alert: "text-amber-400 bg-amber-500/10",
};

const CUSTOM_TOOLTIP = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string; color: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl p-3 text-sm border border-slate-600/40">
      <div className="text-slate-400 mb-2 text-xs">{label}</div>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-300 capitalize">{p.name}:</span>
          <span className="text-white font-semibold">{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

export default function DashboardPage() {
  const [feedEvents, setFeedEvents] = useState(LIVE_FEED_EVENTS);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const budgetPct = Math.round((DASHBOARD_STATS.budgetRemaining / DASHBOARD_STATS.budgetTotal) * 100);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Command Dashboard</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-live-dot" />
            <span className="text-sm text-slate-400">Live · Last updated just now</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </Button>
          <Button size="sm">
            <Zap className="w-3.5 h-3.5" />
            Launch Agent
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Revenue Generated"
          value={formatCurrency(DASHBOARD_STATS.totalEarned)}
          delta={`${DASHBOARD_STATS.totalEarnedDelta}% this month`}
          positive
          icon={<DollarSign className="w-4 h-4" />}
        />
        <StatCard
          label="Active Agents"
          value={`${DASHBOARD_STATS.activeAgents}/${DASHBOARD_STATS.totalAgents}`}
          delta="All running healthy"
          positive
          icon={<Bot className="w-4 h-4" />}
        />
        <StatCard
          label="Average ROI"
          value={`${DASHBOARD_STATS.avgROI}%`}
          delta={`${DASHBOARD_STATS.avgROIDelta}% vs last month`}
          positive
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <StatCard
          label="Tasks Executed Today"
          value={formatNumber(DASHBOARD_STATS.tasksExecutedToday)}
          delta={`${formatNumber(DASHBOARD_STATS.tasksExecuted)} total`}
          positive
          icon={<Activity className="w-4 h-4" />}
        />
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* ROI Chart - 2/3 */}
        <div className="lg:col-span-2 bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-white">Revenue & ROI Over Time</h2>
              <p className="text-xs text-slate-500">Net revenue after agent costs</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-teal-400"><span className="w-2 h-2 rounded-full bg-teal-400" />Revenue</span>
              <span className="flex items-center gap-1.5 text-blue-400"><span className="w-2 h-2 rounded-full bg-blue-400" />Net</span>
              <span className="flex items-center gap-1.5 text-slate-500"><span className="w-2 h-2 rounded-full bg-slate-500" />Cost</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={ROI_CHART_DATA}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0D9488" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip content={<CUSTOM_TOOLTIP />} />
              <Area type="monotone" dataKey="revenue" stroke="#0D9488" strokeWidth={2} fill="url(#revGrad)" name="revenue" />
              <Area type="monotone" dataKey="net" stroke="#3B82F6" strokeWidth={2} fill="url(#netGrad)" name="net" />
              <Area type="monotone" dataKey="cost" stroke="#64748B" strokeWidth={1.5} fill="transparent" name="cost" strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
          <h2 className="text-base font-semibold text-white mb-1">Category Breakdown</h2>
          <p className="text-xs text-slate-500 mb-4">Revenue by agent type</p>
          <div className="flex justify-center">
            <PieChart width={160} height={160}>
              <Pie data={CATEGORY_BREAKDOWN} cx={80} cy={80} innerRadius={48} outerRadius={72} dataKey="value" strokeWidth={0}>
                {CATEGORY_BREAKDOWN.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="space-y-2 mt-2">
            {CATEGORY_BREAKDOWN.map((c) => (
              <div key={c.category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                  <span className="text-xs text-slate-400">{c.category}</span>
                </div>
                <span className="text-xs font-semibold text-white">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* My Agents + Live Feed */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* My Active Agents */}
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">My Agents</h2>
            <span className="text-xs text-slate-500">{MY_AGENTS.length} total</span>
          </div>
          <div className="space-y-3">
            {MY_AGENTS.map((agent) => (
              <div key={agent.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-700/30 hover:border-slate-600/40 transition-all">
                <div className={`w-2 h-2 rounded-full shrink-0 ${getStatusColor(agent.status)} ${agent.status === "live" ? "animate-pulse-glow" : ""}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white truncate">{agent.name}</span>
                    <span className="text-[10px] text-slate-500 shrink-0">{agent.runningDays}d</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="h-1 flex-1 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-500 rounded-full"
                        style={{ width: `${(agent.budgetUsed / agent.dailyBudget) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 shrink-0">{Math.round((agent.budgetUsed / agent.dailyBudget) * 100)}% budget</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-emerald-400">{formatCurrency(agent.totalEarned, true)}</div>
                  <div className="text-[10px] text-slate-500">earned</div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {agent.status === "live" ? (
                    <button className="p-1.5 rounded-lg hover:bg-slate-700/40 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer">
                      <Pause className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button className="p-1.5 rounded-lg hover:bg-slate-700/40 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer">
                      <Play className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button className="p-1.5 rounded-lg hover:bg-slate-700/40 text-slate-400 hover:text-red-400 transition-colors cursor-pointer">
                    <Square className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Feed */}
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">Live Activity Feed</h2>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-live-dot" />
              Live
            </div>
          </div>
          <div className="space-y-2.5 max-h-80 overflow-y-auto">
            {feedEvents.map((event, i) => (
              <div key={event.id} className={`flex items-start gap-3 p-3 rounded-xl border border-slate-700/20 animate-fade-up`}
                style={{ animationDelay: `${i * 50}ms` }}>
                <div className={`text-xs px-2 py-0.5 rounded-md shrink-0 font-medium ${FEED_TYPE_COLORS[event.type] || "text-slate-400 bg-slate-700/40"}`}>
                  {event.type}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-300">{event.agent}</div>
                  <div className="text-xs text-slate-400 truncate">{event.action}</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">{event.result}</div>
                </div>
                <div className="text-[10px] text-slate-600 shrink-0">{event.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-white">Daily Budget Overview</h2>
          <span className="text-xs text-slate-500">{formatCurrency(DASHBOARD_STATS.budgetRemaining)} remaining of {formatCurrency(DASHBOARD_STATS.budgetTotal)}</span>
        </div>
        <div className="h-3 bg-slate-900/60 rounded-full overflow-hidden mb-2">
          <div className="h-full gradient-brand rounded-full transition-all duration-500" style={{ width: `${budgetPct}%` }} />
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Used: {formatCurrency(DASHBOARD_STATS.budgetTotal - DASHBOARD_STATS.budgetRemaining)}</span>
          <span>{budgetPct}% remaining</span>
          <span>Limit: {formatCurrency(DASHBOARD_STATS.budgetTotal)}</span>
        </div>
      </div>
    </div>
  );
}
