"use client";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Bot, Zap } from "lucide-react";

// Three real agents with honest descriptions and honest pricing
const AGENTS = [
  {
    name: "RevenueMaxx",
    what: "Monitors your Shopify store and adjusts product prices automatically based on inventory levels, competitor pricing, and demand signals. No manual repricing.",
    price: "12% of verified revenue lift",
    priceNote: "You pay nothing if it doesn't make you more money.",
    tag: "eCommerce",
  },
  {
    name: "LeadHunter",
    what: "Takes your ideal customer profile, searches LinkedIn and company databases, enriches the matches with contact data, and pushes qualified leads straight into your CRM.",
    price: "$0.12 per qualified lead",
    priceNote: "Only counts leads that match your defined criteria.",
    tag: "Lead generation",
  },
  {
    name: "FlowOptimizer",
    what: "Connects your existing tools — CRM, billing, support, Slack — and automates the handoffs between them. Tell it what should trigger what, it handles the plumbing.",
    price: "$49 / month",
    priceNote: "Flat rate. Unlimited runs.",
    tag: "Automation",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Browse agents",
    body: "Every agent has a clear description of what it does, what accounts it needs access to, and how it charges.",
  },
  {
    n: "2",
    title: "Connect your accounts",
    body: "Grant the agent access to only the specific platforms it needs. You can revoke access at any time.",
  },
  {
    n: "3",
    title: "Set your goal and budget",
    body: "Define what success looks like and set a spending cap. The agent works within those limits.",
  },
  {
    n: "4",
    title: "Watch it run",
    body: "See every action the agent takes in your dashboard. Full log, no black boxes.",
  },
];

const PLANS = [
  {
    name: "Free",
    price: "$0",
    desc: "Try it out",
    features: ["2 active agents", "200 tasks / month", "Basic dashboard", "Community support"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    desc: "For growing businesses",
    features: ["10 active agents", "5,000 tasks / month", "Full analytics", "Email support", "API access"],
    cta: "Get started",
    highlight: true,
  },
  {
    name: "Scale",
    price: "$79",
    period: "/mo",
    desc: "For high-volume use",
    features: ["Unlimited agents", "Unlimited tasks", "Priority support", "Custom integrations", "Dedicated onboarding"],
    cta: "Get started",
    highlight: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a", color: "#fff" }}>

      {/* Nav */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        aria-label="Main navigation">
        <div className="page-wrap flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg btn-accent flex items-center justify-center">
              <Zap className="w-4 h-4" style={{ color: "#000" }} />
            </div>
            <span className="font-bold text-white">grammi<span className="text-accent">.ai</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#agents" className="text-sm" style={{ color: "#888" }}>Agents</a>
            <a href="#how-it-works" className="text-sm" style={{ color: "#888" }}>How it works</a>
            <a href="#pricing" className="text-sm" style={{ color: "#888" }}>Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <button className="text-sm px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                style={{ color: "#888" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#888")}>
                Sign in
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="btn-accent text-sm px-4 py-1.5 cursor-pointer flex items-center gap-1.5">
                Get started <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-glow pt-36 pb-28">
        <div className="page-wrap text-center">
          <p className="text-sm font-medium text-accent mb-5 tracking-wide">Early access — 47 agents available</p>

          <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-bold tracking-tight leading-[1.05] mb-6"
            style={{ letterSpacing: "-0.03em" }}>
            AI agents for hire.
          </h1>

          <p className="text-lg sm:text-xl max-w-xl mx-auto mb-10" style={{ color: "#888", lineHeight: 1.6 }}>
            Browse specialized AI agents, deploy them to your business accounts,
            and pay only for what they actually deliver.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/marketplace">
              <button className="btn-accent px-7 py-3 text-base cursor-pointer flex items-center gap-2">
                Browse agents <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="px-7 py-3 text-base cursor-pointer rounded-lg transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#aaa" }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.color = "#aaa";
                }}>
                View dashboard
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Agents */}
      <section id="agents" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} className="py-24">
        <div className="page-wrap">
          <h2 className="text-3xl font-bold mb-3">Available agents</h2>
          <p className="mb-12" style={{ color: "#888" }}>What each agent actually does, and exactly what it costs.</p>

          <div className="grid sm:grid-cols-3 gap-4">
            {AGENTS.map(a => (
              <Link key={a.name} href="/marketplace">
                <div className="card p-6 h-full flex flex-col cursor-pointer transition-all"
                  style={{ minHeight: 280 }}>
                  {/* Tag */}
                  <span className="text-xs font-semibold px-2 py-0.5 rounded mb-4 self-start"
                    style={{ background: "rgba(16,185,129,0.1)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" }}>
                    {a.tag}
                  </span>

                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <Bot className="w-4 h-4 text-accent" />
                    </div>
                    <h3 className="font-bold text-white text-lg">{a.name}</h3>
                  </div>

                  {/* What it does */}
                  <p className="text-sm flex-1 mb-6" style={{ color: "#888", lineHeight: 1.7 }}>{a.what}</p>

                  {/* Pricing */}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1rem" }}>
                    <p className="font-bold text-white text-sm">{a.price}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#555" }}>{a.priceNote}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/marketplace">
              <button className="text-sm cursor-pointer transition-colors"
                style={{ color: "#555" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#555")}>
                See all 47 agents →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} className="py-24">
        <div className="page-wrap">
          <h2 className="text-3xl font-bold mb-3">How it works</h2>
          <p className="mb-14" style={{ color: "#888" }}>No code. No setup scripts. Takes about 10 minutes.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map(s => (
              <div key={s.n}>
                <div className="text-5xl font-black mb-4 mono" style={{ color: "rgba(255,255,255,0.06)" }}>
                  {s.n}
                </div>
                <h3 className="font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm" style={{ color: "#666", lineHeight: 1.65 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} className="py-24">
        <div className="page-wrap">
          <h2 className="text-3xl font-bold mb-3">Pricing</h2>
          <p className="mb-12" style={{ color: "#888" }}>Performance-share agents only charge when you earn — no results, no fee.</p>

          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {PLANS.map(plan => (
              <div key={plan.name}
                className="card p-7 flex flex-col"
                style={plan.highlight ? { borderColor: "rgba(16,185,129,0.35)", boxShadow: "0 0 40px rgba(16,185,129,0.08)" } : {}}>

                {plan.highlight && (
                  <span className="text-xs font-bold px-3 py-0.5 rounded-full self-start mb-4"
                    style={{ background: "rgba(16,185,129,0.12)", color: "#10B981", border: "1px solid rgba(16,185,129,0.25)" }}>
                    Most popular
                  </span>
                )}

                <p className="font-bold text-white mb-1">{plan.name}</p>
                <p className="text-xs mb-4" style={{ color: "#555" }}>{plan.desc}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  {plan.period && <span className="text-sm" style={{ color: "#555" }}>{plan.period}</span>}
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "#888" }}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href="/dashboard">
                  <button className={`w-full py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-all ${
                    plan.highlight ? "btn-accent" : ""
                  }`}
                  style={!plan.highlight ? {
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#888",
                    background: "transparent",
                  } : {}}>
                    {plan.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} className="py-24">
        <div className="page-wrap text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-5" style={{ letterSpacing: "-0.02em" }}>
            Try it for free.
          </h2>
          <p className="text-lg mb-8" style={{ color: "#888" }}>
            No credit card. Deploy your first agent in under 10 minutes.
          </p>
          <Link href="/marketplace">
            <button className="btn-accent px-8 py-3.5 text-base cursor-pointer flex items-center gap-2 mx-auto">
              Browse agents <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} className="py-10">
        <div className="page-wrap flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold text-white text-sm">grammi<span className="text-accent">.ai</span></span>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Contact"].map(item => (
              <a key={item} href="#" className="text-xs transition-colors"
                style={{ color: "#444" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#888")}
                onMouseLeave={e => (e.currentTarget.style.color = "#444")}>
                {item}
              </a>
            ))}
          </div>
          <p className="text-xs" style={{ color: "#333" }}>© 2026 Grammi AI, Inc.</p>
        </div>
      </footer>
    </div>
  );
}
