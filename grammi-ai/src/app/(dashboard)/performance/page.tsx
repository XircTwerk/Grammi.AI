"use client";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import { TrendingUp, DollarSign, Activity, Clock } from "lucide-react";
import { ROI_CHART_DATA, AGENT_PERFORMANCE_DATA } from "@/lib/data/metrics";
import { formatCurrency, formatNumber } from "@/lib/utils";

const MONTHLY_DATA = [
  { month: "Sep 25", revenue: 48000, tasks: 42000, agents: 2 },
  { month: "Oct 25", revenue: 62000, tasks: 58000, agents: 2 },
  { month: "Nov 25", revenue: 85000, tasks: 74000, agents: 3 },
  { month: "Dec 25", revenue: 110000, tasks: 96000, agents: 3 },
  { month: "Jan 26", revenue: 148000, tasks: 122000, agents: 4 },
  { month: "Feb 26", revenue: 192000, tasks: 142000, agents: 4 },
  { month: "Mar 26", revenue: 268420, tasks: 158000, agents: 4 },
];

const CUSTOM_TIP = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string; color: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl p-3 text-xs border border-slate-600/40">
      <div className="text-slate-400 mb-1.5">{label}</div>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2 mb-0.5">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-300 capitalize">{p.name}:</span>
          <span className="text-white font-semibold">
            {p.name === "revenue" ? formatCurrency(p.value) : formatNumber(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function PerformancePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Performance Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">Full ROI breakdown and agent performance history</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Revenue Generated", value: "$268,420", delta: "+39.9%", icon: DollarSign, ic: "text-teal-400", bg: "bg-teal-500/10 border-teal-500/20" },
          { label: "Total Tasks Executed", value: "142,830", delta: "+29.8%", icon: Activity, ic: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
          { label: "Best Single Day", value: "$11,400", delta: "Mar 2, 2026", icon: TrendingUp, ic: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
          { label: "Avg Task Duration", value: "1.4s", delta: "-12% vs last month", icon: Clock, ic: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
        ].map(({ label, value, delta, icon: Icon, ic, bg }) => (
          <div key={label} className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-4">
            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center mb-3 ${bg}`}>
              <Icon className={`w-4 h-4 ${ic}`} />
            </div>
            <div className="text-2xl font-bold text-white mono">{value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{label}</div>
            <div className="text-xs text-emerald-400 mt-1">{delta}</div>
          </div>
        ))}
      </div>

      {/* Revenue over time */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
        <h2 className="text-base font-semibold text-white mb-1">Revenue Over Time</h2>
        <p className="text-xs text-slate-500 mb-5">7-month cumulative view from agent inception</p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={MONTHLY_DATA}>
            <defs>
              <linearGradient id="perfRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0D9488" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,135,180,0.06)" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
            <Tooltip content={<CUSTOM_TIP />} />
            <Area type="monotone" dataKey="revenue" stroke="#0D9488" strokeWidth={2.5} fill="url(#perfRev)" name="revenue" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Tasks + Revenue detail */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
          <h2 className="text-base font-semibold text-white mb-1">Daily Revenue & Net (Feb–Mar)</h2>
          <p className="text-xs text-slate-500 mb-5">Revenue vs. net after agent costs</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={ROI_CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,135,180,0.06)" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip content={<CUSTOM_TIP />} />
              <Line type="monotone" dataKey="revenue" stroke="#0D9488" strokeWidth={2} dot={false} name="revenue" />
              <Line type="monotone" dataKey="net" stroke="#3B82F6" strokeWidth={2} dot={false} name="net" />
              <Line type="monotone" dataKey="cost" stroke="#64748B" strokeWidth={1.5} dot={false} strokeDasharray="4 4" name="cost" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
          <h2 className="text-base font-semibold text-white mb-1">Agent Revenue Comparison</h2>
          <p className="text-xs text-slate-500 mb-5">Earnings by agent (cumulative)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={AGENT_PERFORMANCE_DATA} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,135,180,0.06)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} width={80} />
              <Tooltip content={<CUSTOM_TIP />} />
              <Bar dataKey="revenue" fill="#0D9488" radius={[0, 4, 4, 0]} name="revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Agent performance table */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
        <h2 className="text-base font-semibold text-white mb-5">Agent Performance Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-700/40">
                {["Agent", "Status", "Tasks Executed", "Avg ROI", "Revenue Earned", "Trend"].map(col => (
                  <th key={col} className="pb-3 text-xs text-slate-500 font-medium">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/20">
              {AGENT_PERFORMANCE_DATA.map((agent) => (
                <tr key={agent.name} className="hover:bg-slate-700/10 transition-colors">
                  <td className="py-4 font-semibold text-white">{agent.name}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full border ${
                      agent.status === "live" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                      "bg-amber-500/10 border-amber-500/20 text-amber-400"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${agent.status === "live" ? "bg-emerald-400" : "bg-amber-400"}`} />
                      {agent.status}
                    </span>
                  </td>
                  <td className="py-4 text-slate-300 mono">{formatNumber(agent.tasks)}</td>
                  <td className="py-4 text-teal-400 font-semibold">{agent.roi}%</td>
                  <td className="py-4 text-emerald-400 font-bold mono">{formatCurrency(agent.revenue)}</td>
                  <td className="py-4">
                    <div className="w-20 h-8">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[{v:280},{v:310},{v:340},{v:330},{v:360}]}>
                          <Line type="monotone" dataKey="v" stroke="#0D9488" strokeWidth={1.5} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
