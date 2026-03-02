"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, Star, Users, TrendingUp, Filter, ShieldCheck, Zap, Bot, ChevronRight, ExternalLink } from "lucide-react";
import { AGENTS, type AgentCategory } from "@/lib/data/agents";
import { getCategoryColor, getRiskBg, getPricingLabel, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const CATEGORIES: AgentCategory[] = [
  "Revenue Generation",
  "Lead Acquisition",
  "Content Amplification",
  "Arbitrage Detection",
  "Brand Monitoring",
  "Research Automation",
  "Workflow Optimization",
];

function MiniChart({ data, color = "#0D9488" }: { data: { roi: number }[]; color?: string }) {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`mini-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="roi" stroke={color} strokeWidth={1.5} fill={`url(#mini-${color})`} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<AgentCategory | "All">("All");
  const [pricing, setPricing] = useState("all");
  const [selectedAgent, setSelectedAgent] = useState<typeof AGENTS[0] | null>(null);

  const filtered = AGENTS.filter(a => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== "All" && a.category !== category) return false;
    if (pricing !== "all" && a.pricingModel !== pricing) return false;
    return true;
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main */}
      <div className={`flex-1 overflow-y-auto p-6 space-y-6 ${selectedAgent ? "mr-0" : ""}`}>
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Agent Marketplace</h1>
          <p className="text-sm text-slate-400">4,200+ verified agents. Verifiable ROI. Measurable impact.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <Input
            icon={<Search className="w-4 h-4" />}
            placeholder="Search agents..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-64"
          />
          <Select value={category} onChange={e => setCategory(e.target.value as AgentCategory | "All")}>
            <option value="All">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </Select>
          <Select value={pricing} onChange={e => setPricing(e.target.value)}>
            <option value="all">All Pricing</option>
            <option value="subscription">Subscription</option>
            <option value="usage">Usage-Based</option>
            <option value="performance-share">Performance Share</option>
          </Select>
          <div className="ml-auto flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            {filtered.length} results
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap">
          {["All", ...CATEGORIES].map(c => (
            <button
              key={c}
              onClick={() => setCategory(c as AgentCategory | "All")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                category === c
                  ? "gradient-brand text-white border-transparent"
                  : "border-slate-700/40 text-slate-400 hover:border-slate-600/60 hover:text-slate-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured banner */}
        {category === "All" && !search && (
          <div className="glass-teal rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Featured this week: RevenueMaxx</div>
              <div className="text-xs text-teal-300">18,420 deployments · 340% avg ROI · Top Earner on platform</div>
            </div>
            <button
              onClick={() => setSelectedAgent(AGENTS[0])}
              className="ml-auto flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 transition-colors cursor-pointer"
            >
              View <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Agent Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((agent) => (
            <div
              key={agent.id}
              onClick={() => setSelectedAgent(selectedAgent?.id === agent.id ? null : agent)}
              className={`bg-slate-800/50 rounded-2xl border p-5 cursor-pointer transition-all duration-200 hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-900/10 ${
                selectedAgent?.id === agent.id ? "border-teal-500/40 shadow-lg shadow-teal-900/10" : "border-slate-700/40"
              }`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{agent.name}</span>
                      {agent.developerVerified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-teal-400" aria-label="Verified developer" />
                      )}
                      {agent.featured && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25 font-semibold">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{agent.developer}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-400 shrink-0">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-xs font-bold">{agent.rating}</span>
                  <span className="text-[10px] text-slate-500">({formatNumber(agent.reviewCount)})</span>
                </div>
              </div>

              {/* Category + risk */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${getCategoryColor(agent.category)}`}>
                  {agent.category}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${getRiskBg(agent.riskLevel)}`}>
                  {agent.riskLevel} risk
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-4 leading-relaxed line-clamp-2">{agent.tagline}</p>

              {/* Mini chart */}
              <div className="mb-3 -mx-1">
                <MiniChart data={agent.historicalROI} />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="text-center p-2 rounded-lg bg-slate-900/40">
                  <div className="text-xs font-bold text-emerald-400">{agent.avgROI}%</div>
                  <div className="text-[9px] text-slate-500">Avg ROI</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-slate-900/40">
                  <div className="text-xs font-bold text-white">{agent.successRate}%</div>
                  <div className="text-[9px] text-slate-500">Success</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-slate-900/40">
                  <div className="text-xs font-bold text-white">{agent.uptime}%</div>
                  <div className="text-[9px] text-slate-500">Uptime</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-slate-900/40">
                  <div className="text-xs font-bold text-white">{formatNumber(agent.deployments, true)}</div>
                  <div className="text-[9px] text-slate-500">Deployed</div>
                </div>
              </div>

              {/* Integrations */}
              <div className="flex flex-wrap gap-1 mb-4">
                {agent.integrations.slice(0, 4).map(i => (
                  <span key={i} className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-700/40 text-slate-400 border border-slate-700/30">
                    {i}
                  </span>
                ))}
                {agent.integrations.length > 4 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-700/40 text-slate-500">
                    +{agent.integrations.length - 4}
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-700/30">
                <div>
                  <div className="text-xs font-bold text-white">{getPricingLabel(agent)}</div>
                  <div className="text-[10px] text-slate-500">{agent.pricingModel.replace("-", " ")}</div>
                </div>
                <Link href="/launch">
                  <Button size="sm" onClick={e => e.stopPropagation()}>
                    <Zap className="w-3 h-3" />
                    Deploy
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Detail Panel */}
      {selectedAgent && (
        <div className="w-80 shrink-0 border-l border-slate-700/40 bg-slate-900/80 backdrop-blur-xl overflow-y-auto animate-slide-in">
          <div className="p-5 space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <button onClick={() => setSelectedAgent(null)} className="text-slate-500 hover:text-slate-300 text-xs cursor-pointer">✕ Close</button>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">{selectedAgent.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{selectedAgent.tagline}</p>
            </div>

            {/* ROI highlight */}
            <div className="glass-teal rounded-xl p-4 text-center">
              <div className="text-3xl font-extrabold text-teal-400">{selectedAgent.avgROI}%</div>
              <div className="text-xs text-teal-300/70">Avg ROI in {selectedAgent.avgROITimeframe}</div>
            </div>

            {/* Full description */}
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">About</div>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedAgent.description}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Success Rate", value: `${selectedAgent.successRate}%` },
                { label: "Uptime", value: `${selectedAgent.uptime}%` },
                { label: "Deployments", value: formatNumber(selectedAgent.deployments, true) },
                { label: "Reviews", value: formatNumber(selectedAgent.reviewCount, true) },
              ].map(({ label, value }) => (
                <div key={label} className="p-2.5 rounded-xl bg-slate-800/50">
                  <div className="text-xs font-bold text-white">{value}</div>
                  <div className="text-[10px] text-slate-500">{label}</div>
                </div>
              ))}
            </div>

            {/* Historical chart */}
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">ROI History</div>
              <ResponsiveContainer width="100%" height={80}>
                <AreaChart data={selectedAgent.historicalROI}>
                  <defs>
                    <linearGradient id="detailGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0D9488" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="roi" stroke="#0D9488" strokeWidth={2} fill="url(#detailGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Permissions */}
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Permissions Required</div>
              <ul className="space-y-1.5">
                {selectedAgent.permissions.map(p => (
                  <li key={p} className="flex items-start gap-2 text-[11px] text-slate-300">
                    <ShieldCheck className="w-3 h-3 text-teal-400 mt-0.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Risk */}
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Risk Disclosures</div>
              <ul className="space-y-1.5">
                {selectedAgent.riskDisclosures.map(r => (
                  <li key={r} className="text-[10px] text-slate-400 leading-relaxed border-l-2 border-amber-500/30 pl-2.5">
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Integrations */}
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Integrations</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedAgent.integrations.map(i => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/60 text-slate-400 border border-slate-700/30">{i}</span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link href="/launch">
              <Button className="w-full" size="lg">
                <Zap className="w-4 h-4" />
                Deploy {selectedAgent.name}
              </Button>
            </Link>

            <div className="text-center">
              <div className="text-[11px] text-slate-500">Audited {selectedAgent.auditedAt} · Last updated {selectedAgent.lastUpdated}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
