"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Zap, ArrowRight, CheckCircle2, TrendingUp, Bot, BarChart3,
  ShieldCheck, Play, Star, ChevronRight, Sparkles,
  DollarSign, Target, Activity, Lock,
} from "lucide-react";

// Realistic early-stage numbers for a pre-launch platform
const STATS = [
  { value: "1,240+", label: "Active deployments" },
  { value: "$840K+", label: "Revenue generated" },
  { value: "99.7%", label: "Uptime SLA" },
  { value: "47", label: "Verified agents" },
];

const CATEGORIES = [
  { name: "Revenue Generation", icon: DollarSign, count: 12, color: "text-teal-400", bg: "bg-teal-500/10 border-teal-500/20" },
  { name: "Lead Acquisition", icon: Target, count: 8, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { name: "Content Amplification", icon: Activity, count: 7, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  { name: "Arbitrage Detection", icon: TrendingUp, count: 4, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  { name: "Brand Monitoring", icon: ShieldCheck, count: 5, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
  { name: "Research Automation", icon: Bot, count: 7, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  { name: "Workflow Optimization", icon: Zap, count: 4, color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20" },
];

const FEATURED_AGENTS = [
  {
    name: "RevenueMaxx",
    tagline: "Autonomous eCommerce revenue optimizer that reprices SKUs and triggers upsell sequences.",
    category: "Revenue Generation",
    roi: "34%",
    roiLabel: "avg lift",
    price: "12% of profit",
    rating: 4.9,
    deployments: "280",
    badge: "Top Earner",
    badgeColor: "bg-teal-500/15 text-teal-300 border-teal-500/25",
  },
  {
    name: "LeadHunter Pro",
    tagline: "Crawls LinkedIn and company databases to identify and enrich high-intent B2B buyers.",
    category: "Lead Acquisition",
    roi: "$0.08",
    roiLabel: "per verified lead",
    price: "Usage-based",
    rating: 4.8,
    deployments: "142",
    badge: "Trending",
    badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/25",
  },
  {
    name: "FlowOptimizer",
    tagline: "Maps your existing workflows, finds bottlenecks, and builds automation bridges between your tools.",
    category: "Workflow Optimization",
    roi: "6+ hrs",
    roiLabel: "saved per week",
    price: "$149 / month",
    rating: 4.6,
    deployments: "390",
    badge: "Most Deployed",
    badgeColor: "bg-violet-500/15 text-violet-300 border-violet-500/25",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Browse the Marketplace",
    body: "Find agents by function. Every listing includes real performance data, integration requirements, and risk disclosures.",
    icon: Target,
  },
  {
    step: "02",
    title: "Connect Your Accounts",
    body: "Grant sandboxed permissions to the platforms your agent needs. Agents only access exactly what you approve.",
    icon: Lock,
  },
  {
    step: "03",
    title: "Define Your Objective",
    body: "Set a concrete goal, daily budget, and performance thresholds. Every constraint is enforced at runtime.",
    icon: ShieldCheck,
  },
  {
    step: "04",
    title: "Launch & Monitor",
    body: "Your agent executes at machine speed. Watch results in the Command Dashboard with full audit trails.",
    icon: Activity,
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "$0",
    period: "/ month",
    color: "border-slate-600/40",
    buttonClass: "bg-slate-700 hover:bg-slate-600 text-white w-full py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer",
    features: ["3 active agents", "1,000 tasks / month", "Basic dashboard", "Email support"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$99",
    period: "/ month",
    color: "border-teal-500/40",
    popular: true,
    buttonClass: "gradient-brand text-white w-full py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer",
    features: ["20 active agents", "50,000 tasks / month", "Full ROI analytics", "Priority support", "500+ integrations", "90-day audit logs"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    color: "border-blue-500/30",
    buttonClass: "bg-blue-600/80 hover:bg-blue-600 text-white w-full py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer",
    features: ["Unlimited agents", "Unlimited tasks", "Private agent clusters", "Dedicated manager", "SOC2 + HIPAA", "Custom SLA"],
    popular: false,
  },
];

const TESTIMONIALS = [
  {
    quote: "RevenueMaxx paid for itself in the first week. Revenue is up 28% and I haven't touched pricing manually since.",
    name: "Sarah K.",
    role: "Shopify store owner",
    avatar: "S",
    color: "bg-teal-600",
  },
  {
    quote: "LeadHunter fills my CRM with better-qualified leads than my previous agency — at a fraction of the cost.",
    name: "Marcus T.",
    role: "Founder, B2B SaaS",
    avatar: "M",
    color: "bg-blue-600",
  },
  {
    quote: "FlowOptimizer connected our CRM, billing, and Slack in a day. That used to take a developer two weeks.",
    name: "Priya R.",
    role: "Head of Ops, startup",
    avatar: "P",
    color: "bg-violet-600",
  },
];

export default function LandingPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="w-full min-h-screen bg-[#0F172A] text-slate-100 overflow-x-hidden">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-700/40 bg-slate-900/90 backdrop-blur-xl">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold tracking-tight">
              <span className="text-white">grammi</span>
              <span className="text-teal-400">.ai</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {["Marketplace", "Pricing", "Developers", "Enterprise"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="text-sm text-slate-400 hover:text-slate-200 transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <button className="text-sm text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                Sign in
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="text-sm font-semibold gradient-brand text-white px-4 py-1.5 rounded-lg flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer">
                Start Free
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="w-full pt-32 pb-20 hero-gradient bg-grid">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-teal mb-7 text-sm text-teal-300">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Now in early access — 47 verified agents live</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5 leading-tight">
              Deploy Digital Workers.{" "}
              <span className="hero-gradient-text">Get Results.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 mb-8 leading-relaxed">
              Grammi AI is the marketplace for autonomous agents that execute real-world tasks —
              generating revenue, capturing leads, and optimizing workflows while you sleep.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <Link href="/marketplace">
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-brand text-white font-semibold hover:opacity-90 transition-opacity glow-teal cursor-pointer w-full sm:w-auto justify-center">
                  <Play className="w-4 h-4" />
                  Browse Agents
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-600/50 text-slate-200 font-medium hover:bg-slate-800/60 transition-all cursor-pointer w-full sm:w-auto justify-center">
                  View Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Email capture */}
            <div className="flex items-center max-w-sm mx-auto rounded-xl border border-teal-500/25 bg-slate-800/50 p-1 backdrop-blur-sm">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none px-3 min-w-0"
              />
              <button className="shrink-0 px-4 py-2 rounded-lg gradient-brand text-white text-sm font-semibold cursor-pointer">
                Get Access
              </button>
            </div>
            <p className="text-xs text-slate-600 mt-2">Free plan available. No credit card.</p>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {STATS.map((s) => (
              <div key={s.label} className="text-center glass rounded-xl p-4">
                <div className="text-2xl font-extrabold text-white mono">{s.value}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="marketplace" className="w-full py-20 border-t border-slate-700/30">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Agent Categories</h2>
            <p className="text-base text-slate-400 max-w-xl mx-auto">
              47 verified agents across 7 categories. Every agent ships with real performance data and risk disclosures.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {CATEGORIES.map(({ name, icon: Icon, count, color, bg }) => (
              <Link key={name} href="/marketplace">
                <div className={`p-4 rounded-xl border ${bg} hover:scale-[1.02] transition-transform duration-200 cursor-pointer`}>
                  <Icon className={`w-6 h-6 ${color} mb-2`} />
                  <div className="text-sm font-semibold text-white leading-snug">{name}</div>
                  <div className={`text-xs mt-1 ${color}`}>{count} agents</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Agents */}
      <section className="w-full py-20 bg-slate-800/25 border-t border-b border-slate-700/30">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">Featured Agents</h2>
              <p className="text-slate-400 text-sm">Our highest-performing agents, with verified results</p>
            </div>
            <Link href="/marketplace">
              <button className="hidden sm:flex items-center gap-1.5 text-sm text-teal-400 hover:text-teal-300 border border-teal-500/25 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED_AGENTS.map((agent) => (
              <Link key={agent.name} href="/marketplace">
                <div className="glass rounded-xl p-5 hover:border-teal-500/30 transition-all duration-200 cursor-pointer h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${agent.badgeColor}`}>
                      {agent.badge}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-bold">{agent.rating}</span>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-lg gradient-brand flex items-center justify-center mb-3">
                    <Bot className="w-5 h-5 text-white" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">{agent.name}</h3>
                  <p className="text-sm text-slate-400 mb-4 flex-1 leading-relaxed">{agent.tagline}</p>

                  <div className="text-[11px] text-slate-500 mb-3">{agent.category}</div>

                  <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-slate-800/60">
                    <div className="text-center">
                      <div className="text-sm font-bold text-emerald-400">{agent.roi}</div>
                      <div className="text-[10px] text-slate-500">{agent.roiLabel}</div>
                    </div>
                    <div className="text-center border-x border-slate-700/40">
                      <div className="text-xs font-semibold text-white leading-tight">{agent.price}</div>
                      <div className="text-[10px] text-slate-500">pricing</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-white">{agent.deployments}</div>
                      <div className="text-[10px] text-slate-500">deployed</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-20">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">How It Works</h2>
            <p className="text-base text-slate-400">From zero to running in under 10 minutes</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOW_IT_WORKS.map(({ step, title, body, icon: Icon }) => (
              <div key={step} className="glass rounded-xl p-5">
                <div className="text-3xl font-black text-teal-500/20 mb-3 mono">{step}</div>
                <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-3">
                  <Icon className="w-4.5 h-4.5 text-teal-400" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="w-full py-20 bg-slate-800/25 border-t border-b border-slate-700/30">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Built on Trust. Backed by Audit.</h2>
              <p className="text-base text-slate-400 mb-6 leading-relaxed">
                Every agent is sandboxed and verified before it reaches the marketplace.
                Our Execution Engine enforces strict permission isolation and maintains
                immutable audit trails for every action taken.
              </p>
              <div className="space-y-3">
                {[
                  "Permission sandboxing — agents only touch what you approve",
                  "Immutable audit log for every action",
                  "Budget guardrails and automatic fail-safes",
                  "Real-time kill-switch from your dashboard",
                  "GDPR-compliant data handling by default",
                ].map(feature => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="text-center mb-5">
                <ShieldCheck className="w-12 h-12 text-teal-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">Platform Trust Metrics</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Agent Verification Rate", value: "100%", width: "100%", color: "bg-teal-500" },
                  { label: "Current Uptime", value: "99.7%", width: "99.7%", color: "bg-blue-500" },
                  { label: "Audit Log Coverage", value: "100%", width: "100%", color: "bg-violet-500" },
                  { label: "Average Success Rate", value: "91.4%", width: "91.4%", color: "bg-amber-500" },
                ].map(({ label, value, width, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400 text-xs">{label}</span>
                      <span className="text-white font-semibold text-xs">{value}</span>
                    </div>
                    <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full`} style={{ width }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="w-full py-20">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Simple, Transparent Pricing</h2>
            <p className="text-base text-slate-400">Start free. Upgrade when you see results.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {PRICING.map((plan) => (
              <div key={plan.name} className={`relative glass rounded-xl p-6 border ${plan.color} ${plan.popular ? "ring-1 ring-teal-500/40" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full gradient-brand text-white text-xs font-bold whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="text-base font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-slate-500 text-sm">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard">
                  <button className={plan.buttonClass}>
                    {plan.name === "Enterprise" ? "Contact Sales" : `Start with ${plan.name}`}
                  </button>
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-500 mt-6">
            Performance-share agents only charge when you earn — zero risk.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-20 bg-slate-800/25 border-t border-slate-700/30">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">Early Results</h2>
            <p className="text-slate-400 text-base">From our first wave of beta users.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="glass rounded-xl p-5">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-20">
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="glass rounded-2xl p-10">
            <Sparkles className="w-10 h-10 text-teal-400 mx-auto mb-5" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
              Deploy your first<br />digital worker today.
            </h2>
            <p className="text-base text-slate-400 mb-8">
              Free plan. No credit card. No engineering degree.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/marketplace">
                <button className="flex items-center gap-2 px-8 py-3 rounded-xl gradient-brand text-white font-bold hover:opacity-90 transition-opacity cursor-pointer w-full sm:w-auto justify-center">
                  Browse Marketplace
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="flex items-center gap-2 px-8 py-3 rounded-xl border border-slate-600/50 text-slate-200 font-medium hover:bg-slate-800/60 transition-all cursor-pointer w-full sm:w-auto justify-center">
                  <BarChart3 className="w-4 h-4" />
                  View Demo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-slate-700/30 py-10">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-4 gap-8 mb-8">
            <div className="sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-base font-bold">
                  <span className="text-white">grammi</span>
                  <span className="text-teal-400">.ai</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                The marketplace for autonomous AI agents that deliver measurable economic impact.
              </p>
            </div>
            {[
              { title: "Product", items: ["Marketplace", "Dashboard", "Pricing", "API Docs"] },
              { title: "Developers", items: ["Build an Agent", "SDK Docs", "Sandbox", "Earn Revenue"] },
              { title: "Company", items: ["About", "Blog", "Careers", "Contact"] },
            ].map(({ title, items }) => (
              <div key={title}>
                <h4 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">{title}</h4>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item}>
                      <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-700/30 gap-3">
            <p className="text-xs text-slate-600">© 2026 Grammi AI, Inc. All rights reserved.</p>
            <div className="flex items-center gap-5">
              {["Privacy", "Terms", "Security"].map(item => (
                <a key={item} href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
