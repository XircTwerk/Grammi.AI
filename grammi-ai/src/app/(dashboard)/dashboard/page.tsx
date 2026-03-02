"use client";
import Link from "next/link";
import { BookOpen, FileText, DollarSign, Search, CheckCircle2, ArrowRight, Download, Zap } from "lucide-react";

const PLAN = { name: "Free", tasksToday: 7, taskLimitDay: 20, tasksMonth: 42, taskLimitMonth: 600 };

const MY_AGENTS = [
  { id: "study",   name: "Study Agent",     icon: BookOpen,   color: "#8B5CF6", tasksRun: 24, lastUsed: "2 hours ago" },
  { id: "finance", name: "Finance Tracker", icon: DollarSign, color: "#10B981", tasksRun: 11, lastUsed: "yesterday" },
  { id: "forms",   name: "Form Filler",     icon: FileText,   color: "#3B82F6", tasksRun: 7,  lastUsed: "3 days ago" },
];

const RECENT_TASKS = [
  { agent: "Study Agent",     color: "#8B5CF6", task: "Summarize lecture on neural networks",      time: "2h ago",    dur: "14s" },
  { agent: "Study Agent",     color: "#8B5CF6", task: "Generate flashcards from chapter 4",        time: "2h ago",    dur: "8s"  },
  { agent: "Finance Tracker", color: "#10B981", task: "Categorize last month's transactions",      time: "yesterday", dur: "21s" },
  { agent: "Form Filler",     color: "#3B82F6", task: "Fill job application at greenhouse.io",     time: "3 days ago",dur: "6s"  },
  { agent: "Finance Tracker", color: "#10B981", task: "Identify recurring subscriptions",          time: "4 days ago",dur: "9s"  },
  { agent: "Study Agent",     color: "#8B5CF6", task: "Quiz me on calculus derivatives",           time: "5 days ago",dur: "32s" },
  { agent: "Finance Tracker", color: "#10B981", task: "How much did I spend on food last month?",  time: "6 days ago",dur: "7s"  },
];

const QUICK = [
  { label: "Summarize this page",  agent: "Study Agent",    icon: BookOpen,   color: "#8B5CF6" },
  { label: "Fill this form",       agent: "Form Filler",    icon: FileText,   color: "#3B82F6" },
  { label: "Research this topic",  agent: "Research Agent", icon: Search,     color: "#F59E0B" },
  { label: "Analyze my finances",  agent: "Finance Tracker",icon: DollarSign, color: "#10B981" },
];

function Tag({ color, text }: { color: string; text: string }) {
  return <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 20, background: `${color}18`, color, border: `1px solid ${color}28` }}>{text}</span>;
}

export default function DashboardPage() {
  const todayPct = Math.round((PLAN.tasksToday  / PLAN.taskLimitDay)  * 100);
  const monthPct = Math.round((PLAN.tasksMonth  / PLAN.taskLimitMonth) * 100);

  return (
    <div style={{ padding: 28, maxWidth: 900 }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Good morning, Alex</h1>
        <p style={{ fontSize: 14, color: "#666" }}>You&apos;ve run {PLAN.tasksMonth} tasks this month across {MY_AGENTS.length} agents.</p>
      </div>

      {/* Install banner */}
      <div style={{ background: "#111", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 12, padding: "14px 18px", marginBottom: 22, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Download size={17} color="#000" strokeWidth={2.5} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 2 }}>Install the browser extension</p>
          <p style={{ fontSize: 12, color: "#666" }}>The extension lets agents see your open tabs and take actions. Takes 30 seconds.</p>
        </div>
        <button style={{ background: "#10B981", color: "#000", fontWeight: 700, fontSize: 13, padding: "8px 14px", borderRadius: 8, cursor: "pointer", border: "none", flexShrink: 0, display: "flex", alignItems: "center", gap: 6 }}>
          <Zap size={13} strokeWidth={2.5} /> Add to Chrome
        </button>
      </div>

      {/* Usage + Agents */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 22 }}>

        {/* Usage card */}
        <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Usage</span>
            <Tag color="#888" text="Free plan" />
          </div>
          {[
            { label: "Today",      used: PLAN.tasksToday, limit: PLAN.taskLimitDay,   pct: todayPct, bar: "#10B981" },
            { label: "This month", used: PLAN.tasksMonth, limit: PLAN.taskLimitMonth, pct: monthPct, bar: "#3B82F6" },
          ].map(r => (
            <div key={r.label} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: "#666" }}>{r.label}</span>
                <span style={{ fontSize: 12, color: "#888" }}>{r.used} / {r.limit} tasks</span>
              </div>
              <div style={{ height: 5, background: "#1a1a1a", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${r.pct}%`, height: "100%", background: r.bar, borderRadius: 3 }} />
              </div>
            </div>
          ))}
          <Link href="/billing" style={{ textDecoration: "none" }}>
            <button style={{ width: "100%", padding: 8, borderRadius: 8, fontSize: 12, fontWeight: 600, border: "1px solid rgba(16,185,129,0.3)", background: "transparent", color: "#10B981", cursor: "pointer" }}>
              Upgrade for more tasks →
            </button>
          </Link>
        </div>

        {/* Active agents */}
        <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Active agents</span>
            <Link href="/marketplace" style={{ fontSize: 12, color: "#10B981", textDecoration: "none" }}>+ Add</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {MY_AGENTS.map(({ id, name, icon: Icon, color, tasksRun, lastUsed }) => (
              <Link key={id} href="/my-agents" style={{ textDecoration: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: "#0d0d0d" }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: `${color}15`, border: `1px solid ${color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={14} color={color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#ddd" }}>{name}</div>
                    <div style={{ fontSize: 11, color: "#444" }}>{tasksRun} tasks · {lastUsed}</div>
                  </div>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", flexShrink: 0 }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Quick tasks */}
      <div style={{ marginBottom: 22 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 10 }}>Quick tasks</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {QUICK.map(({ label, agent, icon: Icon, color }) => (
            <Link key={label} href="/my-agents" style={{ textDecoration: "none" }}>
              <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "14px 12px", cursor: "pointer", textAlign: "center" }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${color}14`, border: `1px solid ${color}22`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                  <Icon size={15} color={color} />
                </div>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#ccc", marginBottom: 3, lineHeight: 1.3 }}>{label}</p>
                <p style={{ fontSize: 10, color: "#444" }}>{agent}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent tasks */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Recent tasks</p>
          <Link href="/performance" style={{ fontSize: 12, color: "#555", textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>
            View all <ArrowRight size={11} />
          </Link>
        </div>
        <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
          {RECENT_TASKS.map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", borderBottom: i < RECENT_TASKS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <CheckCircle2 size={13} color="#10B981" style={{ flexShrink: 0 }} />
              <p style={{ flex: 1, fontSize: 13, color: "#bbb", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>{t.task}</p>
              <Tag color={t.color} text={t.agent} />
              <span style={{ fontSize: 11, color: "#444", flexShrink: 0 }}>{t.dur}</span>
              <span style={{ fontSize: 11, color: "#333", flexShrink: 0, minWidth: 70, textAlign: "right" }}>{t.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
