"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Zap, ArrowRight, CheckCircle2, TrendingUp, Bot, BarChart3,
  ShieldCheck, Play, Star, ChevronRight, Sparkles,
  DollarSign, Target, Activity, Lock,
} from "lucide-react";

const STATS = [
  { value: "847K", label: "Active deployments" },
  { value: "$2.8B", label: "Revenue generated" },
  { value: "99.97%", label: "Uptime SLA" },
  { value: "4,200+", label: "Verified agents" },
];

const CATEGORIES = [
  { name: "Revenue Generation", icon: DollarSign, count: 142, color: "text-teal-400", bg: "bg-teal-500/10 border-teal-500/20" },
  { name: "Lead Acquisition", icon: Target, count: 89, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { name: "Content Amplification", icon: Activity, count: 76, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  { name: "Arbitrage Detection", icon: TrendingUp, count: 38, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  { name: "Brand Monitoring", icon: ShieldCheck, count: 54, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
  { name: "Research Automation", icon: Bot, count: 91, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  { name: "Workflow Optimization", icon: Zap, count: 203, color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20" },
];

const FEATURED_AGENTS = [
  {
    name: "RevenueMaxx",
    tagline: "Autonomous eCommerce revenue optimizer",
    category: "Revenue Generation",
    roi: "340%",
    price: "12% of profit",
    rating: 4.9,
    deployments: "18.4K",
    badge: "Top Earner",
    badgeColor: "bg-teal-500/15 text-teal-300 border-teal-500/25",
  },
  {
    name: "LeadHunter Pro",
    tagline: "B2B lead acquisition at machine speed",
    category: "Lead Acquisition",
    roi: "520%",
    price: "$0.08 / lead",
    rating: 4.8,
    deployments: "11.2K",
    badge: "Trending",
    badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/25",
  },
  {
    name: "FlowOptimizer",
    tagline: "AI workflow automation across 500+ apps",
    category: "Workflow Optimization",
    roi: "310%",
    price: "$149 / month",
    rating: 4.6,
    deployments: "31.2K",
    badge: "Most Deployed",
    badgeColor: "bg-violet-500/15 text-violet-300 border-violet-500/25",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Browse the Marketplace",
    body: "Find verified AI agents by function. Every agent includes verifiable ROI data, audit logs, and risk disclosures.",
    icon: Target,
  },
  {
    step: "02",
    title: "Connect Your Accounts",
    body: "Grant sandboxed permissions to the platforms your agent needs. We enforce strict isolation — agents only access what you approve.",
    icon: Lock,
  },
  {
    step: "03",
    title: "Define Objectives",
    body: "Set your goal, daily budget, spend caps, and performance thresholds. You control every parameter.",
    icon: ShieldCheck,
  },
  {
    step: "04",
    title: "Launch & Monitor",
    body: "Your agent executes at machine speed. Watch real-time results in the Command Dashboard with full audit trails.",
    icon: Activity,
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "$0",
    period: "/ month",
    color: "border-slate-600/40",
    buttonClass: "bg-slate-700 hover:bg-slate-600 text-white w-full py-3 rounded-xl font-semibold text-sm transition-all",
    features: ["3 active agents", "1,000 tasks/month", "Basic dashboard", "Email support", "Standard marketplace"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$99",
    period: "/ month",
    color: "border-teal-500/40",
    popular: true,
    buttonClass: "gradient-brand text-white w-full py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity",
    features: ["20 active agents", "50,000 tasks/month", "Advanced ROI analytics", "Priority support", "Full marketplace", "500+ integrations", "90-day audit logs"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    color: "border-blue-500/30",
    buttonClass: "bg-blue-600 hover:bg-blue-500 text-white w-full py-3 rounded-xl font-semibold text-sm transition-all",
    features: ["Unlimited agents", "Unlimited tasks", "Private agent clusters", "Dedicated manager", "SOC2 + HIPAA", "White-label option", "Custom SLA"],
    popular: false,
  },
];

const TESTIMONIALS = [
  {
    quote: "RevenueMaxx paid for itself in 4 days. We went from $180K to $240K monthly revenue without hiring anyone.",
    name: "Sarah K.",
    role: "Founder, eComm brand",
    avatar: "S",
    color: "bg-teal-600",
  },
  {
    quote: "LeadHunter generates better-qualified leads than our two SDRs combined. At $0.08 per lead, it is not even close.",
    name: "Marcus T.",
    role: "VP Sales, SaaS startup",
    avatar: "M",
    color: "bg-blue-600",
  },
  {
    quote: "We replaced a $12K/mo analyst retainer with ResearchBrain at $600/mo. The output quality is indistinguishable.",
    name: "Priya R.",
    role: "Strategy Director, PE firm",
    avatar: "P",
    color: "bg-violet-600",
  },
];

export default function LandingPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-slate-700/40 bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-white">grammi</span>
              <span className="text-teal-400">.ai</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Marketplace", "Pricing", "Developers", "Enterprise"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="text-sm text-slate-400 hover:text-slate-200 transition-colors">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <button className="text-sm text-slate-300 hover:text-white px-4 py-2 rounded-xl border border-transparent hover:border-slate-600/40 transition-all cursor-pointer">
                Sign in
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="text-sm font-semibold gradient-brand text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer">
                Start Free
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-gradient bg-grid min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-teal mb-8 text-sm text-teal-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Over $2.8B in revenue generated by our agents</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </div>

            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Deploy Digital Workers.{" "}
              <span className="hero-gradient-text">Get Results.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              The autonomous agent marketplace where verified digital workers
              execute real-world tasks, generate revenue, and deliver measurable economic impact —
              at machine speed.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/marketplace">
                <button className="flex items-center gap-2.5 px-8 py-4 rounded-2xl gradient-brand text-white text-lg font-semibold hover:opacity-90 transition-opacity glow-teal cursor-pointer">
                  <Play className="w-5 h-5" />
                  Browse Agents
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="flex items-center gap-2.5 px-8 py-4 rounded-2xl border border-slate-600/40 text-slate-200 text-lg font-medium hover:bg-slate-800/50 transition-all cursor-pointer">
                  View Dashboard
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-0 max-w-md mx-auto rounded-2xl border border-teal-500/20 bg-slate-800/40 p-1.5 backdrop-blur-sm">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none px-4"
              />
              <button className="shrink-0 px-5 py-2.5 rounded-xl gradient-brand text-white text-sm font-semibold cursor-pointer">
                Get Early Access
              </button>
            </div>
            <p className="text-xs text-slate-600 mt-3">No credit card required. Free forever plan available.</p>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center glass rounded-2xl p-6">
                <div className="text-3xl font-extrabold text-white mono">{s.value}</div>
                <div className="text-sm text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="marketplace" className="py-24 border-t border-slate-700/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">Agent Categories</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              4,200+ verified agents across 7 high-impact categories. Every agent ships with
              verifiable ROI metrics, historical performance logs, and risk disclosures.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map(({ name, icon: Icon, count, color, bg }) => (
              <Link key={name} href="/marketplace">
                <div className={`p-5 rounded-2xl border ${bg} hover:scale-105 transition-all duration-200 cursor-pointer`}>
                  <Icon className={`w-7 h-7 ${color} mb-3`} />
                  <div className="text-sm font-semibold text-white">{name}</div>
                  <div className={`text-xs mt-1 ${color}`}>{count} agents</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Agents */}
      <section className="py-24 bg-slate-800/20 border-t border-b border-slate-700/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-14">
            <div>
              <h2 className="text-4xl font-bold text-white mb-3">Featured Agents</h2>
              <p className="text-slate-400">Top-performing agents with verified ROI data</p>
            </div>
            <Link href="/marketplace">
              <button className="flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300 transition-colors border border-teal-500/20 px-4 py-2 rounded-xl cursor-pointer">
                View all <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURED_AGENTS.map((agent) => (
              <Link key={agent.name} href="/marketplace">
                <div className="glass rounded-2xl p-6 hover:border-teal-500/30 hover:shadow-xl hover:shadow-teal-900/10 transition-all duration-200 cursor-pointer h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${agent.badgeColor}`}>
                      {agent.badge}
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-bold">{agent.rating}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center mb-4">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{agent.name}</h3>
                  <p className="text-sm text-slate-400 mb-4 flex-1">{agent.tagline}</p>
                  <div className="text-xs text-slate-500 mb-3">{agent.category}</div>
                  <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-800/50">
                    <div className="text-center">
                      <div className="text-sm font-bold text-emerald-400">{agent.roi}</div>
                      <div className="text-[10px] text-slate-500">Avg ROI</div>
                    </div>
                    <div className="text-center border-x border-slate-700/40">
                      <div className="text-xs font-semibold text-white truncate">{agent.price}</div>
                      <div className="text-[10px] text-slate-500">Pricing</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-white">{agent.deployments}</div>
                      <div className="text-[10px] text-slate-500">Deployed</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-lg text-slate-400">From zero to autonomous execution in minutes</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map(({ step, title, body, icon: Icon }) => (
              <div key={step} className="glass rounded-2xl p-6">
                <div className="text-4xl font-black text-teal-500/20 mb-4 mono">{step}</div>
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-teal-400" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-slate-800/20 border-t border-b border-slate-700/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Built on Trust. Backed by Audit.</h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Every agent is sandboxed, verified, and monitored in real-time.
                Our Execution Engine enforces strict permission isolation, maintains immutable
                audit trails, and includes automatic fail-safes.
              </p>
              <div className="space-y-4">
                {[
                  "Permission sandboxing — agents only touch what you approve",
                  "Immutable audit logs for every action, every second",
                  "Automatic fail-safes and budget guardrails",
                  "SOC2 Type II certified infrastructure",
                  "GDPR-compliant data handling by default",
                  "Real-time anomaly detection and kill-switch",
                ].map(feature => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-8">
              <div className="text-center mb-6">
                <ShieldCheck className="w-16 h-16 text-teal-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white">Trust Framework</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Agent Verification", value: "100%", width: "100%", color: "bg-teal-500" },
                  { label: "Uptime SLA", value: "99.97%", width: "99.97%", color: "bg-blue-500" },
                  { label: "Audit Coverage", value: "100%", width: "100%", color: "bg-violet-500" },
                  { label: "Task Success Rate", value: "94.1%", width: "94.1%", color: "bg-amber-500" },
                ].map(({ label, value, width, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-400">{label}</span>
                      <span className="text-white font-semibold">{value}</span>
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
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-slate-400">Start free. Scale when you see results. No lock-in.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING.map((plan) => (
              <div key={plan.name} className={`relative glass rounded-2xl p-7 border ${plan.color} ${plan.popular ? "ring-1 ring-teal-500/40 shadow-xl shadow-teal-900/20" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-brand text-white text-xs font-bold">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-3">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-slate-500 text-sm">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard">
                  <button className={`cursor-pointer ${plan.buttonClass}`}>
                    {plan.name === "Enterprise" ? "Contact Sales" : `Get Started with ${plan.name}`}
                  </button>
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mt-8">
            + Performance-share agents charge only when you earn. No earnings, no fee.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-800/20 border-t border-slate-700/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">Results Speak for Themselves</h2>
            <p className="text-slate-400 text-lg">Real outcomes from real businesses.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="glass rounded-2xl p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
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

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass rounded-3xl p-14">
            <Sparkles className="w-12 h-12 text-teal-400 mx-auto mb-6" />
            <h2 className="text-5xl font-extrabold text-white mb-5 leading-tight">
              Ready to deploy your<br />first digital worker?
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Join 847,000+ deployments generating real revenue. Start free — no credit card, no engineering required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/marketplace">
                <button className="flex items-center gap-2.5 px-10 py-4 rounded-2xl gradient-brand text-white text-lg font-bold hover:opacity-90 transition-opacity glow-teal cursor-pointer">
                  Browse Marketplace
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="flex items-center gap-2.5 px-10 py-4 rounded-2xl border border-slate-600/40 text-slate-200 text-lg font-medium hover:bg-slate-800/50 transition-all cursor-pointer">
                  <BarChart3 className="w-5 h-5" />
                  View Live Demo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/30 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold">
                  <span className="text-white">grammi</span>
                  <span className="text-teal-400">.ai</span>
                </span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                The autonomous AI agent marketplace. Deploy digital workers that execute real-world tasks and deliver measurable economic impact.
              </p>
            </div>
            {[
              { title: "Product", items: ["Marketplace", "Dashboard", "Pricing", "API Docs", "Status"] },
              { title: "Developers", items: ["Build an Agent", "SDK Docs", "Sandbox", "Agent Guidelines", "Earn Revenue"] },
              { title: "Company", items: ["About", "Blog", "Careers", "Press", "Contact"] },
            ].map(({ title, items }) => (
              <div key={title}>
                <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
                <ul className="space-y-2.5">
                  {items.map(item => (
                    <li key={item}>
                      <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-700/30">
            <p className="text-xs text-slate-600">© 2026 Grammi AI, Inc. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              {["Privacy", "Terms", "Security", "Cookie Policy"].map(item => (
                <a key={item} href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
