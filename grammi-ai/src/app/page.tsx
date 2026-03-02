"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Zap, Play, BookOpen, DollarSign, FileText, Search, Video } from "lucide-react";

/* ─────────────────────────────────────────── */
/*  Browser + extension mockup (hero visual)   */
/* ─────────────────────────────────────────── */
function BrowserMockup() {
  return (
    <div style={{
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
      maxWidth: 840,
      margin: "0 auto",
    }}>
      {/* Browser chrome */}
      <div style={{
        background: "#161616",
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          {["#ff5f57","#febc2e","#28c840"].map(c => (
            <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{
          flex: 1, background: "#0f0f0f", borderRadius: 6,
          padding: "5px 12px", fontSize: 12, color: "#444",
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          coursera.org/learn/machine-learning/lecture/4
        </div>
        {/* Extension icon — active/green */}
        <div style={{
          width: 26, height: 26, borderRadius: 7,
          background: "#10B981",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", flexShrink: 0,
        }}>
          <Zap size={13} color="#000" strokeWidth={2.5} />
        </div>
      </div>

      {/* Tab content */}
      <div style={{ display: "flex", height: 320 }}>
        {/* Page being browsed */}
        <div style={{ flex: 1, background: "#0c0c0c", padding: 18, overflow: "hidden" }}>
          {/* Fake video player */}
          <div style={{
            background: "#111", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)",
            aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 14, position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#0a1a12 0%,#0a0a1a 100%)" }} />
            <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
              <div style={{
                width: 0, height: 0,
                borderLeft: "22px solid rgba(255,255,255,0.35)",
                borderTop: "13px solid transparent",
                borderBottom: "13px solid transparent",
                margin: "0 auto 8px",
              }} />
              <p style={{ fontSize: 10, color: "#333", margin: 0 }}>Neural Networks – Week 3</p>
            </div>
            {/* progress bar */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "#1a1a1a" }}>
              <div style={{ width: "38%", height: "100%", background: "#10B981" }} />
            </div>
          </div>
          {/* Fake text below video */}
          {[100, 75, 88, 55].map((w, i) => (
            <div key={i} style={{ height: 7, background: "#1a1a1a", borderRadius: 3, marginBottom: 7, width: `${w}%` }} />
          ))}
        </div>

        {/* Grammi sidebar */}
        <div style={{
          width: 248, background: "#111",
          borderLeft: "1px solid rgba(255,255,255,0.07)",
          display: "flex", flexDirection: "column",
          fontSize: 12,
        }}>
          {/* Sidebar header */}
          <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: "#10B981", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={11} color="#000" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 700, color: "#fff" }}>grammi.ai</span>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} className="animate-live-dot" />
              <span style={{ color: "#10B981", fontSize: 10, fontWeight: 600 }}>Active</span>
            </div>
          </div>

          {/* Agent status */}
          <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={{ color: "#555", fontSize: 10, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.07em" }}>Running agent</p>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "#1a2a1a", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BookOpen size={13} color="#10B981" />
              </div>
              <div>
                <p style={{ color: "#fff", fontWeight: 600, margin: 0 }}>Study Agent</p>
                <p style={{ color: "#555", margin: 0, fontSize: 10 }}>Watching + taking notes</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div style={{ flex: 1, padding: "10px 14px", overflow: "hidden" }}>
            <p style={{ color: "#444", fontSize: 10, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.07em" }}>Notes generated</p>
            {[
              "Backpropagation computes gradients via chain rule",
              "Loss function: cross-entropy for classification",
              "ReLU avoids vanishing gradient vs. sigmoid",
              "Learning rate controls step size in gradient descent",
            ].map((note, i) => (
              <div key={i} style={{ paddingBottom: 7, marginBottom: 7, borderBottom: "1px solid rgba(255,255,255,0.04)", color: "#777", lineHeight: 1.45 }}>
                {note}
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ background: "#0d0d0d", borderRadius: 8, padding: "8px 10px", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ flex: 1, color: "#444", fontSize: 11 }}>Ask about this video…</span>
              <ArrowRight size={12} color="#333" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
const USE_CASES = [
  {
    icon: BookOpen,
    title: "Study & learn",
    body: "Point it at a lecture video or article. It watches alongside you, takes notes, answers your questions, and quizzes you after.",
    example: '"Summarize this lecture and make flashcards"',
  },
  {
    icon: FileText,
    title: "Fill out forms",
    body: "Job applications, government forms, checkout pages, sign-up flows. Tell it what info to use. It fills everything in.",
    example: '"Fill this application with my resume info"',
  },
  {
    icon: DollarSign,
    title: "Finance tasks",
    body: "Open your bank or brokerage tab. It reads your statements, categorizes transactions, flags anomalies, and answers questions.",
    example: '"How much did I spend on food last month?"',
  },
  {
    icon: Search,
    title: "Research",
    body: "Give it a question. It opens tabs, reads pages, and comes back with a summary — not just links, actual answers with sources.",
    example: '"Compare these three mortgage lenders"',
  },
  {
    icon: Video,
    title: "Watch videos",
    body: "YouTube, Coursera, Netflix (subtitles) — it follows what's happening and can summarize, translate, or explain on demand.",
    example: '"Give me a TL;DR of this documentary"',
  },
  {
    icon: Zap,
    title: "Automate repetitive work",
    body: "Anything you do the same way more than once — ordering supplies, logging hours, updating spreadsheets — it can handle.",
    example: '"Do my weekly timesheet from my calendar"',
  },
];

const STEPS = [
  {
    n: "01",
    title: "Add to Chrome",
    body: "Install the grammi.ai extension. Takes 30 seconds.",
  },
  {
    n: "02",
    title: "Open any tab",
    body: "A lecture, a form, your bank, a YouTube video. Anything.",
  },
  {
    n: "03",
    title: "Pick an agent and tell it what to do",
    body: "Choose the right agent for the task — study, forms, finance, research — and describe what you need.",
  },
  {
    n: "04",
    title: "It handles it",
    body: "The agent reads the page, watches the video, fills the form, or pulls the numbers. You just review the output.",
  },
];

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "",
    desc: "One agent. See what it can do.",
    features: [
      "1 active agent at a time",
      "20 tasks per day",
      "Standard speed",
      "Study, forms, and research agents",
    ],
    cta: "Add to Chrome — free",
    highlight: false,
    note: "",
  },
  {
    name: "Pro",
    price: "$12",
    period: "/mo",
    desc: "For people who use it every day.",
    features: [
      "5 active agents",
      "200 tasks per day",
      "Faster responses",
      "All agents + early access to new ones",
      "Task history",
    ],
    cta: "Get Pro",
    highlight: true,
    note: "",
  },
  {
    name: "Unlimited",
    price: "$29",
    period: "/mo",
    desc: "No limits.",
    features: [
      "Unlimited active agents",
      "Unlimited tasks",
      "Priority speed",
      "All agents",
      "API access",
    ],
    cta: "Get Unlimited",
    highlight: false,
    note: "",
  },
];

/* ─────────────────────────────────────────── */
export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a", color: "#fff" }}>

      {/* ── Nav ─────────────────────────────────────── */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(10,10,10,0.9)" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
        <div className="page-wrap flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg btn-accent flex items-center justify-center">
              <Zap className="w-4 h-4" style={{ color: "#000" }} />
            </div>
            <span className="font-bold">grammi<span className="text-accent">.ai</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {[["#use-cases","Use cases"],["#how-it-works","How it works"],["#pricing","Pricing"]].map(([href, label]) => (
              <a key={href} href={href} className="text-sm transition-colors"
                style={{ color: "#666" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#666")}>
                {label}
              </a>
            ))}
          </div>

          <a href="#waitlist">
            <button className="btn-accent text-sm px-4 py-1.5 cursor-pointer flex items-center gap-1.5">
              Join waitlist <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </a>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────── */}
      <section className="hero-glow pt-36 pb-20">
        <div className="page-wrap">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6"
              style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#10B981" }}>
              <span className="animate-live-dot inline-block w-1.5 h-1.5 rounded-full bg-current" />
              In development — join the waitlist
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-5"
              style={{ letterSpacing: "-0.04em", lineHeight: 1.04 }}>
              AI agents that live<br />
              <span className="text-accent">inside your browser.</span>
            </h1>

            <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8"
              style={{ color: "#777", lineHeight: 1.65 }}>
              Install the extension, open any tab — a lecture, a form, your bank account, a YouTube video —
              pick an agent, and tell it what to do. It reads the page, watches the video, fills the form,
              or pulls the numbers. You just review.
            </p>

            <a href="#waitlist">
              <button className="btn-accent px-8 py-3.5 text-base cursor-pointer inline-flex items-center gap-2 mx-auto">
                Get early access <ArrowRight className="w-4 h-4" />
              </button>
            </a>
          </div>

          {/* Browser mockup */}
          <BrowserMockup />
        </div>
      </section>

      {/* ── Use cases ───────────────────────────────── */}
      <section id="use-cases" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} className="py-24">
        <div className="page-wrap">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ letterSpacing: "-0.02em" }}>
            What it can do
          </h2>
          <p className="mb-12 text-lg" style={{ color: "#666" }}>
            One extension. Works on any website or web app you already use.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {USE_CASES.map(({ icon: Icon, title, body, example }) => (
              <div key={title} className="card p-6">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <Icon className="w-4 h-4 text-accent" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm mb-4" style={{ color: "#666", lineHeight: 1.65 }}>{body}</p>
                <p className="text-xs font-mono px-3 py-2 rounded-lg"
                  style={{ background: "#0d0d0d", color: "#10B981", border: "1px solid rgba(16,185,129,0.12)" }}>
                  {example}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────── */}
      <section id="how-it-works" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} className="py-24"
        aria-labelledby="hiw-heading">
        <div className="page-wrap">
          <h2 id="hiw-heading" className="text-3xl sm:text-4xl font-bold mb-3" style={{ letterSpacing: "-0.02em" }}>
            How it works
          </h2>
          <p className="mb-14 text-lg" style={{ color: "#666" }}>No setup. No API keys. No configuration.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map(({ n, title, body }) => (
              <div key={n}>
                <div className="text-5xl font-black mb-4 mono select-none" style={{ color: "rgba(255,255,255,0.05)", lineHeight: 1 }}>
                  {n}
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm" style={{ color: "#666", lineHeight: 1.65 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────── */}
      <section id="pricing" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} className="py-24">
        <div className="page-wrap">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ letterSpacing: "-0.02em" }}>Pricing</h2>
          <p className="mb-12 text-lg" style={{ color: "#666" }}>Start free. Upgrade when you need more.</p>

          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {PLANS.map(plan => (
              <div key={plan.name} className="card p-6 flex flex-col"
                style={plan.highlight ? { borderColor: "rgba(16,185,129,0.3)", boxShadow: "0 0 40px rgba(16,185,129,0.06)" } : {}}>

                {plan.highlight && (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full self-start mb-3"
                    style={{ background: "rgba(16,185,129,0.1)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" }}>
                    Most popular
                  </span>
                )}

                <p className="font-bold text-white">{plan.name}</p>
                <p className="text-xs mb-4 mt-0.5" style={{ color: "#555" }}>{plan.desc}</p>

                <div className="flex items-baseline gap-0.5 mb-6">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  {plan.period && <span className="text-sm" style={{ color: "#555" }}>{plan.period}</span>}
                </div>

                <ul className="space-y-2.5 mb-7 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "#888" }}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a href="#waitlist">
                  <button className={`w-full py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-all ${plan.highlight ? "btn-accent" : ""}`}
                    style={!plan.highlight ? { border: "1px solid rgba(255,255,255,0.1)", color: "#888", background: "transparent" } : {}}>
                    {plan.cta}
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Waitlist ─────────────────────────────────── */}
      <section id="waitlist" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} className="py-24">
        <div className="page-wrap">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ letterSpacing: "-0.03em" }}>
              Get early access.
            </h2>
            <p className="mb-8" style={{ color: "#666", lineHeight: 1.6 }}>
              We&apos;re building this now. Drop your email and we&apos;ll let you know
              when the extension is ready to install. Free plan, no credit card.
            </p>

            {submitted ? (
              <div className="card p-5 flex items-center justify-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <p className="font-semibold text-white">You&apos;re on the list. We&apos;ll be in touch.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-lg text-sm text-white outline-none"
                  style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.4)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                />
                <button type="submit" className="btn-accent px-5 py-3 text-sm cursor-pointer shrink-0">
                  Join waitlist
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} className="py-8">
        <div className="page-wrap flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md btn-accent flex items-center justify-center">
              <Zap size={12} color="#000" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-sm">grammi<span className="text-accent">.ai</span></span>
          </div>
          <p className="text-xs" style={{ color: "#333" }}>© 2026 Grammi AI, Inc. — Early stage. Building in public.</p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Contact"].map(l => (
              <a key={l} href="#" className="text-xs transition-colors"
                style={{ color: "#444" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#888")}
                onMouseLeave={e => (e.currentTarget.style.color = "#444")}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
