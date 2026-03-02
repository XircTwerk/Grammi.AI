"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Zap, ArrowRight, CheckCircle2, TrendingUp, Bot, BarChart3,
  ShieldCheck, Play, Star, ChevronRight, Sparkles,
  DollarSign, Target, Activity, Lock, Users, Globe,
} from "lucide-react";

const NAV_LINKS = ["Marketplace", "Pricing", "Developers", "Enterprise"];

const STATS = [
  { value: "1,240+", label: "Active deployments", icon: Globe },
  { value: "$840K+", label: "Revenue generated", icon: TrendingUp },
  { value: "99.7%", label: "Platform uptime", icon: Activity },
  { value: "47", label: "Verified agents", icon: Bot },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Verified & Audited",
    body: "Every agent passes a technical review before listing. Performance metrics, access requirements, and risk disclosures are public.",
    color: "text-teal-400",
    bg: "bg-teal-500/10 border-teal-500/20",
  },
  {
    icon: Lock,
    title: "Permission Sandboxing",
    body: "Agents only touch the systems you explicitly approve. Fine-grained permissions with a real-time kill-switch from your dashboard.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: BarChart3,
    title: "Measurable ROI",
    body: "Every agent reports what it did, what it earned, and what it cost — in plain numbers. No black boxes, no vague 'efficiency gains'.",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
];

const FEATURED_AGENTS = [
  {
    name: "RevenueMaxx",
    tagline: "Autonomous eCommerce optimizer that reprices SKUs, triggers upsell flows, and recovers abandoned carts.",
    category: "Revenue Generation",
    stat1: { value: "34%", label: "avg revenue lift" },
    stat2: { value: "280", label: "deployed" },
    price: "12% of profit generated",
    rating: 4.9,
    reviews: 61,
    badge: "Top Earner",
    badgeColor: "bg-teal-500/15 text-teal-300 border-teal-500/30",
    accentColor: "border-teal-500/20",
    iconColor: "from-teal-500 to-teal-700",
  },
  {
    name: "LeadHunter Pro",
    tagline: "Crawls LinkedIn, Apollo, and company databases to find, enrich, and score high-intent B2B buyers.",
    category: "Lead Acquisition",
    stat1: { value: "$0.08", label: "per verified lead" },
    stat2: { value: "142", label: "deployed" },
    price: "Usage-based",
    rating: 4.8,
    reviews: 44,
    badge: "Trending",
    badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    accentColor: "border-blue-500/20",
    iconColor: "from-blue-500 to-blue-700",
  },
  {
    name: "FlowOptimizer",
    tagline: "Maps your existing workflows, identifies bottlenecks, and builds automations across 500+ integrations.",
    category: "Workflow Automation",
    stat1: { value: "6 hrs", label: "saved per week" },
    stat2: { value: "390", label: "deployed" },
    price: "$149 / month",
    rating: 4.7,
    reviews: 88,
    badge: "Most Deployed",
    badgeColor: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    accentColor: "border-violet-500/20",
    iconColor: "from-violet-500 to-violet-700",
  },
];

const CATEGORIES = [
  { name: "Revenue Generation", icon: DollarSign, count: 12, color: "text-teal-400", ring: "ring-teal-500/20 hover:ring-teal-500/40" },
  { name: "Lead Acquisition", icon: Target, count: 8, color: "text-blue-400", ring: "ring-blue-500/20 hover:ring-blue-500/40" },
  { name: "Content & Growth", icon: Activity, count: 7, color: "text-amber-400", ring: "ring-amber-500/20 hover:ring-amber-500/40" },
  { name: "Research & Intel", icon: TrendingUp, count: 6, color: "text-orange-400", ring: "ring-orange-500/20 hover:ring-orange-500/40" },
  { name: "Brand Monitoring", icon: ShieldCheck, count: 5, color: "text-violet-400", ring: "ring-violet-500/20 hover:ring-violet-500/40" },
  { name: "Workflow Automation", icon: Zap, count: 5, color: "text-pink-400", ring: "ring-pink-500/20 hover:ring-pink-500/40" },
  { name: "Market Research", icon: Bot, count: 4, color: "text-cyan-400", ring: "ring-cyan-500/20 hover:ring-cyan-500/40" },
];

const STEPS = [
  { n: "01", title: "Browse the Marketplace", body: "Find agents by use case. Every listing shows real performance data, integration requirements, and what access it needs.", icon: Target },
  { n: "02", title: "Grant Permissions", body: "Connect only the platforms your agent needs. Permissions are sandboxed and revocable at any time from your dashboard.", icon: Lock },
  { n: "03", title: "Set Your Objective", body: "Define a goal, daily budget cap, and performance floor. Your agent works within those constraints — always.", icon: ShieldCheck },
  { n: "04", title: "Launch & Track", body: "Watch it run in real time. Full audit log of every action taken, every dollar touched, every decision made.", icon: Activity },
];

const PRICING = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    highlight: false,
    cta: "Start for free",
    features: ["3 active agents", "1,000 tasks / month", "Standard marketplace access", "Basic analytics dashboard", "Email support"],
  },
  {
    name: "Pro",
    price: "$99",
    period: "/mo",
    highlight: true,
    cta: "Get started",
    features: ["20 active agents", "50,000 tasks / month", "Full marketplace + early access", "ROI analytics & audit logs", "Priority support", "500+ integrations", "90-day history"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    highlight: false,
    cta: "Talk to sales",
    features: ["Unlimited agents & tasks", "Private agent clusters", "Dedicated success manager", "SOC2 Type II + HIPAA", "White-label option", "Custom SLA & uptime guarantee"],
  },
];

const TESTIMONIALS = [
  {
    quote: "RevenueMaxx paid for itself inside the first week. Revenue is up 28% and I haven't touched pricing manually since I deployed it.",
    name: "Sarah K.", role: "Shopify store owner", avatar: "S", bg: "bg-teal-600",
  },
  {
    quote: "LeadHunter fills my CRM with better-qualified leads than my previous agency did — for a fraction of the cost per lead.",
    name: "Marcus T.", role: "Founder, B2B SaaS", avatar: "M", bg: "bg-blue-600",
  },
  {
    quote: "FlowOptimizer connected our CRM, billing, and Slack in a single afternoon. That would have taken a developer two weeks.",
    name: "Priya R.", role: "Head of Operations", avatar: "P", bg: "bg-violet-600",
  },
];

export default function LandingPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100">

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0F172A]/90 backdrop-blur-xl">
        <div className="page-wrap flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold">
              <span className="text-white">grammi</span>
              <span className="text-teal-400">.ai</span>
            </span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="text-sm text-slate-400 hover:text-white transition-colors">
                {l}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <button className="hidden sm:block text-sm text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                Sign in
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="gradient-brand text-white text-sm font-semibold px-4 py-1.5 rounded-lg flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer">
                Start Free <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero-gradient bg-grid pt-32 pb-24">
        <div className="page-wrap text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-teal text-sm text-teal-300 mb-8">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Now in early access — 47 verified agents live</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6">
            Deploy Digital Workers.
            <br />
            <span className="hero-gradient-text">Get Real Results.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Grammi AI is the marketplace for verified autonomous agents that execute
            real-world tasks — generating revenue, capturing leads, and automating workflows
            while you sleep.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Link href="/marketplace">
              <button className="gradient-brand glow-teal text-white font-semibold px-7 py-3.5 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer text-base">
                <Play className="w-4 h-4" /> Browse Agents
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="border border-slate-600/60 text-slate-200 font-medium px-7 py-3.5 rounded-xl flex items-center gap-2 hover:bg-slate-800/60 hover:border-slate-500/60 transition-all cursor-pointer text-base">
                View Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Email capture */}
          <div className="flex items-center max-w-md mx-auto rounded-xl border border-teal-500/25 bg-slate-800/60 p-1.5 mb-3">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none px-3 min-w-0"
            />
            <button className="shrink-0 gradient-brand text-white text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
              Get Early Access
            </button>
          </div>
          <p className="text-xs text-slate-600">No credit card required. Free plan available.</p>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="glass rounded-xl p-5 text-center">
                <Icon className="w-4 h-4 text-teal-400 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-extrabold text-white mono">{value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Grammi AI ── */}
      <section className="py-24 border-t border-white/5">
        <div className="page-wrap">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Not just another AI toy
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Every agent on this platform has to prove it works before it can be deployed.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, body, color, bg }) => (
              <div key={title} className={`glass rounded-2xl p-7 border ${bg}`}>
                <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center mb-5`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Agents ── */}
      <section id="marketplace" className="py-24 bg-slate-800/20 border-t border-white/5">
        <div className="page-wrap">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-2">Marketplace</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Featured Agents</h2>
              <p className="text-slate-400 mt-2">Our highest-performing agents with verified results</p>
            </div>
            <Link href="/marketplace">
              <button className="hidden sm:flex items-center gap-1.5 text-sm text-slate-300 hover:text-white border border-slate-600/50 hover:border-slate-500 px-4 py-2 rounded-lg transition-all cursor-pointer">
                See all 47 agents <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {FEATURED_AGENTS.map((a) => (
              <Link key={a.name} href="/marketplace">
                <div className={`glass rounded-2xl p-6 border ${a.accentColor} hover:border-opacity-60 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer h-full flex flex-col`}>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${a.badgeColor}`}>
                      {a.badge}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-sm font-bold text-white">{a.rating}</span>
                      <span className="text-xs text-slate-500">({a.reviews})</span>
                    </div>
                  </div>

                  {/* Agent icon + name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${a.iconColor} flex items-center justify-center shrink-0`}>
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{a.name}</h3>
                      <p className="text-xs text-slate-500">{a.category}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-5">{a.tagline}</p>

                  {/* Stats bar */}
                  <div className="grid grid-cols-3 gap-3 bg-slate-900/50 rounded-xl p-3 border border-white/5">
                    <div className="text-center">
                      <div className="text-base font-bold text-emerald-400">{a.stat1.value}</div>
                      <div className="text-[10px] text-slate-500 leading-snug">{a.stat1.label}</div>
                    </div>
                    <div className="text-center border-x border-white/5">
                      <div className="text-base font-bold text-white">{a.stat2.value}</div>
                      <div className="text-[10px] text-slate-500">{a.stat2.label}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-semibold text-slate-300 leading-snug">{a.price}</div>
                      <div className="text-[10px] text-slate-500">pricing</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Category pills */}
          <div className="mt-10 flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map(({ name, icon: Icon, count, color, ring }) => (
              <Link key={name} href="/marketplace">
                <button className={`flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 ring-1 ${ring} hover:bg-slate-700/40 transition-all cursor-pointer text-sm`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span className="text-slate-300">{name}</span>
                  <span className={`text-xs ${color} font-semibold`}>{count}</span>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 border-t border-white/5">
        <div className="page-wrap">
          <div className="text-center mb-14">
            <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-2">Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Up and running in minutes</h2>
            <p className="text-slate-400 text-lg">No code. No setup scripts. No DevOps.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map(({ n, title, body, icon: Icon }, i) => (
              <div key={n} className="relative">
                {/* Connector line (desktop) */}
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%+0.625rem)] w-5 h-px bg-gradient-to-r from-slate-600 to-transparent z-10" />
                )}
                <div className="glass rounded-2xl p-6 h-full">
                  <div className="text-4xl font-black text-teal-500/15 mono mb-4 leading-none">{n}</div>
                  <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4 text-teal-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2 text-sm">{title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust ── */}
      <section className="py-24 bg-slate-800/20 border-t border-b border-white/5">
        <div className="page-wrap">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-3">Trust & Security</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
                Built on trust.<br />Backed by audit.
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Every agent is sandboxed, verified, and monitored continuously.
                Our Execution Engine enforces strict permission isolation, maintains
                immutable audit trails, and includes automatic fail-safes at every step.
              </p>
              <ul className="space-y-3">
                {[
                  "Permission sandboxing — agents only touch what you approve",
                  "Immutable audit log for every single action",
                  "Budget guardrails enforced at the infrastructure level",
                  "Real-time anomaly detection with instant kill-switch",
                  "GDPR-compliant data handling by default",
                ].map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — Trust card */}
            <div className="glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <p className="font-bold text-white">Platform Trust Metrics</p>
                  <p className="text-xs text-slate-500">Live — updated continuously</p>
                </div>
              </div>
              <div className="space-y-5">
                {[
                  { label: "Agent Verification Rate", value: "100%", pct: 100, color: "bg-teal-500" },
                  { label: "Current Uptime", value: "99.7%", pct: 99.7, color: "bg-blue-500" },
                  { label: "Audit Log Coverage", value: "100%", pct: 100, color: "bg-violet-500" },
                  { label: "Average Task Success Rate", value: "91.4%", pct: 91.4, color: "bg-amber-500" },
                ].map(({ label, value, pct, color }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs text-slate-400">{label}</span>
                      <span className="text-xs font-bold text-white">{value}</span>
                    </div>
                    <div className="h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <p className="text-xs text-slate-500">All systems operational</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 border-t border-white/5">
        <div className="page-wrap">
          <div className="text-center mb-12">
            <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-2">Beta Users</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Early results</h2>
            <p className="text-slate-400">From our first wave of beta deployments</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="glass rounded-2xl p-6 flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" />)}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className={`w-8 h-8 rounded-full ${t.bg} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 bg-slate-800/20 border-t border-b border-white/5">
        <div className="page-wrap">
          <div className="text-center mb-12">
            <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-2">Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Simple, transparent pricing</h2>
            <p className="text-slate-400 text-lg">Start free. Scale when you see results. No lock-in.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {PRICING.map(plan => (
              <div key={plan.name}
                className={`relative glass rounded-2xl p-7 flex flex-col ${plan.highlight ? "border-teal-500/40 ring-1 ring-teal-500/30 shadow-2xl shadow-teal-900/20" : "border-white/5"}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
                    <span className="gradient-brand text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-base font-bold text-white mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    {plan.period && <span className="text-slate-500 text-sm">{plan.period}</span>}
                  </div>
                </div>
                <ul className="space-y-3 mb-7 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard">
                  <button className={`w-full py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all ${
                    plan.highlight
                      ? "gradient-brand text-white hover:opacity-90"
                      : plan.name === "Enterprise"
                        ? "bg-blue-600/70 hover:bg-blue-600 text-white"
                        : "bg-slate-700 hover:bg-slate-600 text-white"
                  }`}>
                    {plan.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-600 mt-6">
            Performance-share agents charge only when you earn — no results, no fee.
          </p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24">
        <div className="page-wrap">
          <div className="relative glass rounded-3xl overflow-hidden p-12 sm:p-16 text-center">
            {/* Background glow */}
            <div className="absolute inset-0 hero-gradient opacity-60 pointer-events-none" />
            <div className="relative z-10">
              <Sparkles className="w-10 h-10 text-teal-400 mx-auto mb-5" />
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
                Deploy your first<br />digital worker today.
              </h2>
              <p className="text-lg text-slate-400 mb-8 max-w-lg mx-auto">
                Free plan. No credit card. No engineering required. Results visible from day one.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/marketplace">
                  <button className="gradient-brand glow-teal text-white font-bold px-8 py-3.5 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer text-base">
                    Browse Marketplace <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="/dashboard">
                  <button className="border border-slate-600/60 text-slate-200 font-medium px-8 py-3.5 rounded-xl flex items-center gap-2 hover:bg-slate-800/60 hover:border-slate-500 transition-all cursor-pointer text-base">
                    <Users className="w-4 h-4" /> View Demo Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-12">
        <div className="page-wrap">
          <div className="grid sm:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-white">grammi<span className="text-teal-400">.ai</span></span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                The autonomous AI agent marketplace. Verified digital workers delivering measurable economic impact.
              </p>
            </div>
            {[
              { title: "Product", items: ["Marketplace", "Dashboard", "Pricing", "API Docs", "Status"] },
              { title: "Developers", items: ["Build an Agent", "SDK Docs", "Sandbox", "Agent Guidelines", "Earn Revenue"] },
              { title: "Company", items: ["About", "Blog", "Careers", "Press", "Contact"] },
            ].map(({ title, items }) => (
              <div key={title}>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{title}</h4>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item}>
                      <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
            <p className="text-xs text-slate-600">© 2026 Grammi AI, Inc. All rights reserved.</p>
            <div className="flex items-center gap-5">
              {["Privacy", "Terms", "Security", "Cookies"].map(item => (
                <a key={item} href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
