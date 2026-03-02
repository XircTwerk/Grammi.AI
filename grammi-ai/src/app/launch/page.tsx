"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Zap, CheckCircle2, Bot, Link2, Target, DollarSign, Play,
  BarChart3, ChevronRight, ShieldCheck, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AGENTS } from "@/lib/data/agents";
import { getCategoryColor, getPricingLabel } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Select Agent", icon: Bot, description: "Choose from the marketplace" },
  { id: 2, label: "Connect Accounts", icon: Link2, description: "Grant sandboxed permissions" },
  { id: 3, label: "Define Objective", icon: Target, description: "Set your goals and targets" },
  { id: 4, label: "Set Budget", icon: DollarSign, description: "Budget and constraints" },
  { id: 5, label: "Launch", icon: Play, description: "Review and deploy" },
];

const INTEGRATIONS = [
  { name: "Shopify", icon: "🛍️", connected: true },
  { name: "Stripe", icon: "💳", connected: true },
  { name: "HubSpot", icon: "🟠", connected: false },
  { name: "Salesforce", icon: "☁️", connected: false },
  { name: "LinkedIn", icon: "🔗", connected: false },
  { name: "Google Ads", icon: "📊", connected: true },
  { name: "Meta Ads", icon: "📘", connected: false },
  { name: "Klaviyo", icon: "📧", connected: false },
];

export default function LaunchPage() {
  const [step, setStep] = useState(1);
  const [selectedAgent, setSelectedAgent] = useState<typeof AGENTS[0] | null>(null);
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>(["Shopify", "Stripe", "Google Ads"]);
  const [objective, setObjective] = useState("");
  const [targetMetric, setTargetMetric] = useState("revenue");
  const [targetValue, setTargetValue] = useState("");
  const [dailyBudget, setDailyBudget] = useState("200");
  const [maxSpend, setMaxSpend] = useState("2000");
  const [launched, setLaunched] = useState(false);

  const canAdvance = () => {
    if (step === 1) return selectedAgent !== null;
    if (step === 2) return connectedIntegrations.length > 0;
    if (step === 3) return objective.trim().length > 0;
    if (step === 4) return dailyBudget !== "" && maxSpend !== "";
    return true;
  };

  const toggleIntegration = (name: string) => {
    setConnectedIntegrations(prev =>
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  if (launched) {
    return (
      <div className="min-h-screen bg-[#0F172A] bg-grid flex items-center justify-center">
        <div className="text-center max-w-lg px-6">
          <div className="w-20 h-20 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">Agent Deployed!</h1>
          <p className="text-lg text-slate-400 mb-8">
            <span className="text-teal-400 font-semibold">{selectedAgent?.name}</span> is now running.
            Real-time results will appear in your dashboard within minutes.
          </p>

          <div className="glass-teal rounded-2xl p-6 mb-8 text-left">
            <div className="text-sm font-semibold text-teal-300 mb-4">Deployment Summary</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Agent</span>
                <span className="text-white font-medium">{selectedAgent?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Objective</span>
                <span className="text-white font-medium truncate ml-4">{objective || "Maximize revenue"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Daily Budget</span>
                <span className="text-white font-medium">${dailyBudget}/day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Max Spend</span>
                <span className="text-white font-medium">${maxSpend} total</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Integrations</span>
                <span className="text-white font-medium">{connectedIntegrations.length} connected</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard" className="flex-1">
              <Button className="w-full" size="lg">
                <BarChart3 className="w-5 h-5" />
                Monitor in Dashboard
              </Button>
            </Link>
            <Link href="/marketplace" className="flex-1">
              <Button variant="secondary" className="w-full" size="lg">
                <Bot className="w-5 h-5" />
                Deploy Another
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] bg-grid">
      {/* Nav */}
      <div className="fixed top-0 inset-x-0 z-50 border-b border-slate-700/40 bg-slate-900/80 backdrop-blur-xl h-14 flex items-center px-6 gap-4">
        <Link href="/marketplace">
          <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </button>
        </Link>
        <div className="flex items-center gap-2.5 ml-auto">
          <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-bold">
            <span className="text-white">grammi</span>
            <span className="text-teal-400">.ai</span>
          </span>
        </div>
      </div>

      <div className="pt-14 max-w-5xl mx-auto px-6 py-10">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-12">
          {STEPS.map((s, i) => {
            const done = step > s.id;
            const active = step === s.id;
            const Icon = s.icon;
            return (
              <div key={s.id} className="flex items-center flex-1">
                <div className={`flex items-center gap-3 ${active ? "opacity-100" : done ? "opacity-70" : "opacity-30"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0 transition-all ${
                    done ? "gradient-brand border-transparent" :
                    active ? "border-teal-400 bg-teal-500/10" :
                    "border-slate-600 bg-slate-800"
                  }`}>
                    {done ? <CheckCircle2 className="w-5 h-5 text-white" /> : <Icon className={`w-5 h-5 ${active ? "text-teal-400" : "text-slate-600"}`} />}
                  </div>
                  <div className="hidden md:block">
                    <div className={`text-xs font-semibold ${active ? "text-white" : "text-slate-500"}`}>{s.label}</div>
                    <div className="text-[10px] text-slate-600">{s.description}</div>
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-px mx-4 ${done ? "bg-teal-500/40" : "bg-slate-700/40"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="glass rounded-3xl p-8">
          {/* Step 1: Select Agent */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Select an Agent</h2>
              <p className="text-slate-400 mb-8">Choose the autonomous agent you want to deploy. All agents are verified with real performance data.</p>
              <div className="grid md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1">
                {AGENTS.map(agent => (
                  <div
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                      selectedAgent?.id === agent.id
                        ? "border-teal-500/50 bg-teal-500/5 shadow-lg shadow-teal-900/10"
                        : "border-slate-700/40 hover:border-slate-600/60 bg-slate-800/40"
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{agent.name}</span>
                          {selectedAgent?.id === agent.id && <CheckCircle2 className="w-4 h-4 text-teal-400" />}
                        </div>
                        <div className={`text-[10px] mt-0.5 px-1.5 py-0.5 rounded-full border inline-block ${getCategoryColor(agent.category)}`}>
                          {agent.category}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mb-3 line-clamp-2">{agent.tagline}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-emerald-400 font-semibold">{agent.avgROI}% ROI</span>
                      <span className="text-slate-500">{agent.successRate}% success</span>
                      <span className="text-slate-400 ml-auto">{getPricingLabel(agent)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Connect Accounts */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Connect Your Accounts</h2>
              <p className="text-slate-400 mb-3">
                Grant <span className="text-teal-400">{selectedAgent?.name}</span> access to the platforms it needs.
                All permissions are sandboxed and revocable at any time.
              </p>
              <div className="glass-teal rounded-xl p-4 mb-8 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div className="text-sm text-teal-300">
                  Agents operate in strict permission isolation. They can only access exactly what you approve below — nothing more.
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {INTEGRATIONS.map(integration => {
                  const isConnected = connectedIntegrations.includes(integration.name);
                  const required = selectedAgent?.integrations.includes(integration.name);
                  return (
                    <div
                      key={integration.name}
                      onClick={() => toggleIntegration(integration.name)}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        isConnected
                          ? "border-teal-500/40 bg-teal-500/5"
                          : "border-slate-700/40 bg-slate-800/40 hover:border-slate-600/60"
                      }`}
                    >
                      <span className="text-2xl">{integration.icon}</span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white">{integration.name}</div>
                        {required && <div className="text-[10px] text-teal-400">Recommended for this agent</div>}
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        isConnected ? "gradient-brand border-transparent" : "border-slate-600"
                      }`}>
                        {isConnected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-slate-600 mt-4">{connectedIntegrations.length} platform(s) connected. You can add or remove at any time from Security settings.</p>
            </div>
          )}

          {/* Step 3: Define Objective */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Define Your Objective</h2>
              <p className="text-slate-400 mb-8">Tell <span className="text-teal-400">{selectedAgent?.name}</span> exactly what you want to achieve. Be specific — the agent will optimize for this goal.</p>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Primary Objective</label>
                  <textarea
                    value={objective}
                    onChange={e => setObjective(e.target.value)}
                    placeholder="e.g. Increase monthly revenue by 30% while maintaining profit margins above 40%..."
                    className="w-full rounded-xl border border-slate-700/40 bg-slate-800/50 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 resize-none"
                    rows={4}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Target Metric</label>
                    <select
                      value={targetMetric}
                      onChange={e => setTargetMetric(e.target.value)}
                      className="w-full rounded-xl border border-slate-700/40 bg-slate-800/50 text-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500/50"
                    >
                      <option value="revenue">Revenue ($)</option>
                      <option value="leads">Leads (#)</option>
                      <option value="roi">ROI (%)</option>
                      <option value="engagement">Engagement rate</option>
                      <option value="cost_savings">Cost savings ($)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Target Value</label>
                    <input
                      type="text"
                      value={targetValue}
                      onChange={e => setTargetValue(e.target.value)}
                      placeholder="e.g. 50000"
                      className="w-full rounded-xl border border-slate-700/40 bg-slate-800/50 text-slate-200 placeholder-slate-500 px-4 py-3 text-sm outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Success Timeframe</label>
                  <div className="flex gap-2 flex-wrap">
                    {["7 days", "30 days", "60 days", "90 days", "Ongoing"].map(t => (
                      <button
                        key={t}
                        className="px-4 py-2 rounded-xl border border-slate-700/40 text-sm text-slate-400 hover:border-teal-500/40 hover:text-teal-300 transition-all cursor-pointer"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Set Budget */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Set Budget & Constraints</h2>
              <p className="text-slate-400 mb-8">Define hard limits. The agent will never exceed these parameters without your explicit approval.</p>

              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Daily Budget Cap</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                      <input
                        type="number"
                        value={dailyBudget}
                        onChange={e => setDailyBudget(e.target.value)}
                        className="w-full rounded-xl border border-slate-700/40 bg-slate-800/50 text-slate-200 pl-8 pr-4 py-3 text-sm outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20"
                      />
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">Agent stops spending after this daily limit</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Total Spend Limit</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                      <input
                        type="number"
                        value={maxSpend}
                        onChange={e => setMaxSpend(e.target.value)}
                        className="w-full rounded-xl border border-slate-700/40 bg-slate-800/50 text-slate-200 pl-8 pr-4 py-3 text-sm outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20"
                      />
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">Hard stop across all time</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3">Fail-Safe Triggers (Auto-pause agent if:)</label>
                  <div className="space-y-2">
                    {[
                      "Success rate drops below 80% for 24 hours",
                      "Daily budget exceeded by any amount",
                      "Unusual API access pattern detected",
                      "Manual kill-switch activated from dashboard",
                    ].map(trigger => (
                      <div key={trigger} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/30">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                        <span className="text-sm text-slate-300">{trigger}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-teal rounded-xl p-4">
                  <div className="text-sm font-semibold text-teal-300 mb-2">Pricing for {selectedAgent?.name}</div>
                  <div className="text-sm text-teal-200">
                    {selectedAgent && getPricingLabel(selectedAgent)}
                    {selectedAgent?.pricingModel === "performance-share" && (
                      <span className="text-teal-300/70 ml-2">— you only pay when you earn</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Launch */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Review & Launch</h2>
              <p className="text-slate-400 mb-8">Everything looks good. Your agent is ready to execute autonomously. Review the summary below and deploy.</p>

              <div className="space-y-4 mb-8">
                {[
                  { label: "Agent", value: selectedAgent?.name, icon: Bot },
                  { label: "Category", value: selectedAgent?.category, icon: Target },
                  { label: "Objective", value: objective || "Maximize revenue", icon: Target },
                  { label: "Integrations", value: `${connectedIntegrations.join(", ")}`, icon: Link2 },
                  { label: "Daily Budget", value: `$${dailyBudget}/day`, icon: DollarSign },
                  { label: "Total Limit", value: `$${maxSpend}`, icon: DollarSign },
                  { label: "Pricing", value: selectedAgent ? getPricingLabel(selectedAgent) : "", icon: DollarSign },
                  { label: "Expected ROI", value: `${selectedAgent?.avgROI}% avg in ${selectedAgent?.avgROITimeframe}`, icon: TrendingUp },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/30">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-teal-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-slate-500">{label}</div>
                      <div className="text-sm font-semibold text-white truncate">{value}</div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  </div>
                ))}
              </div>

              <div className="glass-teal rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div className="text-sm text-teal-300 leading-relaxed">
                    By deploying, you confirm you have read and accepted the agent risk disclosures.
                    You can pause or stop this agent at any time from your dashboard.
                    All actions are fully logged with immutable audit trails.
                  </div>
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={() => setLaunched(true)}>
                <Zap className="w-5 h-5" />
                Deploy {selectedAgent?.name} Now
              </Button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/30">
            <Button
              variant="ghost"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="text-xs text-slate-500">Step {step} of {STEPS.length}</div>
            {step < 5 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canAdvance()}
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

// Need to import TrendingUp for step 5 summary
function TrendingUp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
