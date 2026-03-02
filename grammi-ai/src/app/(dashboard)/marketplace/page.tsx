"use client";
import { useState } from "react";
import { BookOpen, FileText, DollarSign, Search, Video, Zap, CheckCircle2, ShieldCheck, Plus } from "lucide-react";

const AGENTS = [
  {
    id: "study",
    name: "Study Agent",
    icon: BookOpen,
    color: "#8B5CF6",
    tagline: "Learn faster from anything you&apos;re reading or watching.",
    description: "Open any webpage, article, PDF, or lecture video and Study Agent will summarize it, answer your questions, make flashcards, quiz you, or explain difficult sections in plain language. Works on Coursera, YouTube, Khan Academy, PDFs, anything.",
    examples: ["Summarize this lecture", "Make flashcards from this chapter", "Quiz me on this material", "Explain this concept simply"],
    needs: ["Read text on current tab", "Read video captions"],
    category: "Learning",
    added: true,
  },
  {
    id: "forms",
    name: "Form Filler",
    icon: FileText,
    color: "#3B82F6",
    tagline: "Fill out applications, forms, and registrations automatically.",
    description: "Set up a profile with your personal info once. Then open any web form — job application, government form, checkout page, account registration — and Form Filler reads the fields and tells you exactly what to put in each one. You review and confirm.",
    examples: ["Fill this job application", "Complete this registration", "Fill billing info at checkout", "Fill out this government form"],
    needs: ["Read form fields on current tab", "Your stored profile info"],
    category: "Productivity",
    added: true,
  },
  {
    id: "finance",
    name: "Finance Tracker",
    icon: DollarSign,
    color: "#10B981",
    tagline: "Understand your money by asking questions about your accounts.",
    description: "Open your bank, credit card, or brokerage page and ask Finance Tracker anything about your data. It reads what's on the page — not your credentials, just the displayed numbers — and answers: how much did I spend on X, what are my recurring subscriptions, where's my money going?",
    examples: ["Categorize my transactions", "How much did I spend on food?", "Find all my subscriptions", "Compare this month to last month"],
    needs: ["Read page content (display only, no credentials)"],
    category: "Finance",
    added: true,
  },
  {
    id: "research",
    name: "Research Agent",
    icon: Search,
    color: "#F59E0B",
    tagline: "Research any topic across multiple sources and get a real answer.",
    description: "Give Research Agent a question or topic. It helps you search, suggests what to look for and where, reads the pages you open, and compiles a structured summary with key points and comparisons. Better than Googling — it synthesizes instead of just linking.",
    examples: ["Compare these mortgage lenders", "Research this company before I interview", "Summarize research on this topic", "What are the pros and cons of X?"],
    needs: ["Read page content on current and new tabs"],
    category: "Research",
    added: false,
  },
  {
    id: "video",
    name: "Video Agent",
    icon: Video,
    color: "#EC4899",
    tagline: "Get notes and answers from any video without watching the whole thing.",
    description: "Point Video Agent at any YouTube, Coursera, Vimeo, or streaming page. It reads the video captions and gives you: a full summary, structured notes, key timestamps, action items, or answers to specific questions — all without you watching the whole thing.",
    examples: ["Give me a TL;DR of this video", "Pull the key points from this lecture", "What does this documentary say about X?", "Make notes from this tutorial"],
    needs: ["Read video captions on current tab"],
    category: "Learning",
    added: false,
  },
  {
    id: "automation",
    name: "Task Automator",
    icon: Zap,
    color: "#64748B",
    tagline: "Handle repetitive browser tasks so you don&apos;t have to.",
    description: "Anything you do the same way more than once — updating a spreadsheet, submitting a weekly report, ordering regular supplies, logging hours from your calendar — Task Automator helps you map the steps and execute them. You stay in control; it handles the tedium.",
    examples: ["Fill in my weekly timesheet", "Order my usual supplies", "Log today's work from my calendar", "Submit this report"],
    needs: ["Read and interact with current tab", "Varies by task"],
    category: "Automation",
    added: false,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Learning: "#8B5CF6", Productivity: "#3B82F6", Finance: "#10B981",
  Research: "#F59E0B", Automation: "#64748B",
};

export default function MarketplacePage() {
  const [selected, setSelected] = useState<typeof AGENTS[0] | null>(null);
  const [added, setAdded] = useState<Record<string, boolean>>(
    Object.fromEntries(AGENTS.filter(a => a.added).map(a => [a.id, true]))
  );

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>

      {/* Main list */}
      <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>
        <div style={{ maxWidth: 760, marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Agent Library</h1>
          <p style={{ fontSize: 14, color: "#666" }}>Add agents to your extension. Each one does a specific job on whatever tab you&apos;re on.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 760 }}>
          {AGENTS.map(agent => {
            const Icon = agent.icon;
            const isAdded = added[agent.id];
            const isSelected = selected?.id === agent.id;

            return (
              <div key={agent.id}
                onClick={() => setSelected(isSelected ? null : agent)}
                style={{
                  background: "#111",
                  border: `1px solid ${isSelected ? `${agent.color}40` : "rgba(255,255,255,0.07)"}`,
                  borderRadius: 12, padding: "16px 18px",
                  cursor: "pointer",
                  transition: "border-color 0.15s",
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  {/* Icon */}
                  <div style={{ width: 42, height: 42, borderRadius: 11, background: `${agent.color}14`, border: `1px solid ${agent.color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={19} color={agent.color} />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{agent.name}</span>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 20, background: `${CATEGORY_COLORS[agent.category]}14`, color: CATEGORY_COLORS[agent.category], border: `1px solid ${CATEGORY_COLORS[agent.category]}25` }}>
                        {agent.category}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: "#666" }} dangerouslySetInnerHTML={{ __html: agent.tagline }} />
                  </div>

                  {/* Add / Added button */}
                  <button
                    onClick={e => { e.stopPropagation(); setAdded(prev => ({ ...prev, [agent.id]: !prev[agent.id] })); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "7px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                      cursor: "pointer", flexShrink: 0, border: "none",
                      background: isAdded ? "rgba(16,185,129,0.12)" : "#10B981",
                      color: isAdded ? "#10B981" : "#000",
                      ...(isAdded ? { border: "1px solid rgba(16,185,129,0.3)" } : {}),
                    }}>
                    {isAdded ? <><CheckCircle2 size={13} /> Added</> : <><Plus size={13} /> Add</>}
                  </button>
                </div>

                {/* Expanded examples */}
                {isSelected && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <p style={{ fontSize: 13, color: "#888", lineHeight: 1.65, marginBottom: 14 }} dangerouslySetInnerHTML={{ __html: agent.description }} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                      <div>
                        <p style={{ fontSize: 11, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Example commands</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                          {agent.examples.map(ex => (
                            <div key={ex} style={{ fontSize: 12, color: "#10B981", fontFamily: "monospace", background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.12)", padding: "5px 10px", borderRadius: 6 }}>
                              &quot;{ex}&quot;
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p style={{ fontSize: 11, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>What it accesses</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                          {agent.needs.map(n => (
                            <div key={n} style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                              <ShieldCheck size={13} color="#10B981" style={{ flexShrink: 0, marginTop: 1 }} />
                              <span style={{ fontSize: 12, color: "#888" }}>{n}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: summary of what you've added */}
      <div style={{ width: 240, flexShrink: 0, borderLeft: "1px solid rgba(255,255,255,0.07)", background: "#0d0d0d", padding: 20, overflowY: "auto" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>Your agents</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {AGENTS.filter(a => added[a.id]).map(a => {
            const Icon = a.icon;
            return (
              <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", borderRadius: 8, background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: `${a.color}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={12} color={a.color} />
                </div>
                <span style={{ fontSize: 12, color: "#ccc", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.name}</span>
                <CheckCircle2 size={12} color="#10B981" />
              </div>
            );
          })}
          {Object.values(added).filter(Boolean).length === 0 && (
            <p style={{ fontSize: 12, color: "#444", lineHeight: 1.5 }}>Add agents from the list to enable them in your extension.</p>
          )}
        </div>
        <div style={{ marginTop: 20 }}>
          <p style={{ fontSize: 11, color: "#444", lineHeight: 1.6 }}>Changes sync to your extension automatically.</p>
        </div>
      </div>
    </div>
  );
}
