"use client";
import { useState } from "react";
import { BookOpen, FileText, DollarSign, Search, Video, Zap, MessageSquare, CheckCircle2, RotateCcw } from "lucide-react";

type AgentId = "study" | "finance" | "forms" | "research" | "video" | "automation";

const ALL_AGENTS = [
  { id: "study"      as AgentId, name: "Study Agent",     icon: BookOpen,   color: "#8B5CF6", description: "Summarizes pages and videos, makes flashcards, explains concepts, quizzes you.", tasks: 24, lastUsed: "2 hours ago", enabled: true  },
  { id: "finance"    as AgentId, name: "Finance Tracker", icon: DollarSign, color: "#10B981", description: "Reads your bank/brokerage pages and answers questions about your money.",           tasks: 11, lastUsed: "yesterday",   enabled: true  },
  { id: "forms"      as AgentId, name: "Form Filler",     icon: FileText,   color: "#3B82F6", description: "Reads form fields and tells you exactly what to write in each one.",               tasks: 7,  lastUsed: "3 days ago",  enabled: true  },
  { id: "research"   as AgentId, name: "Research Agent",  icon: Search,     color: "#F59E0B", description: "Researches topics across pages you open and compiles organized summaries.",         tasks: 0,  lastUsed: "never",       enabled: false },
  { id: "video"      as AgentId, name: "Video Agent",     icon: Video,      color: "#EC4899", description: "Reads video captions to give you summaries, notes, and answers.",                  tasks: 0,  lastUsed: "never",       enabled: false },
  { id: "automation" as AgentId, name: "Task Automator",  icon: Zap,        color: "#64748B", description: "Handles repetitive browser tasks like timesheets, orders, and form submissions.",  tasks: 0,  lastUsed: "never",       enabled: false },
];

const SAMPLE_CHATS: Record<AgentId, { role: "user" | "agent"; text: string }[]> = {
  study: [
    { role: "user",  text: "Summarize this lecture for me." },
    { role: "agent", text: "Here are the key points:\n\n• Backpropagation calculates gradients via the chain rule\n• Error flows backwards through each layer\n• Gradient descent updates weights to reduce loss\n\nWant flashcards from this?" },
  ],
  finance: [
    { role: "user",  text: "How much did I spend on food last month?" },
    { role: "agent", text: "Based on what's visible on this page:\n\n• Groceries: $312.40\n• Restaurants: $184.20\n• Coffee: $47.80\n\nTotal: $544.40 — up 12% from February." },
  ],
  forms: [
    { role: "user",  text: "Fill out this job application." },
    { role: "agent", text: "I can see the fields. Here's what to put in each:\n\n• Full name: Alex Morgan\n• Email: your email\n• LinkedIn: your profile URL\n\nI need your years of experience to finish. What is it?" },
  ],
  research: [
    { role: "user",  text: "Compare the top budgeting apps in 2026." },
    { role: "agent", text: "Open these tabs and I'll read and compare them:\n\n1. Search \"YNAB vs Copilot vs Monarch 2026\"\n2. Search \"best budgeting app reddit 2026\"\n\nOnce you open them, I'll synthesize the results." },
  ],
  video: [
    { role: "user",  text: "Give me notes from this video." },
    { role: "agent", text: "Notes — \"How the Fed Controls Interest Rates\":\n\n1. Fed sets overnight rate → cascades to consumer rates\n2. Raising rates → less borrowing → lower inflation\n3. Lowering rates → economic stimulus\n\nWant flashcards?" },
  ],
  automation: [
    { role: "user",  text: "Fill my weekly timesheet from my calendar." },
    { role: "agent", text: "To do this:\n\n1. Open your calendar tab\n2. Open your timesheet tab\n3. Tell me your project categories\n\nI'll read both and walk you through each entry." },
  ],
};

export default function MyAgentsPage() {
  const [agents, setAgents] = useState(ALL_AGENTS);
  const [activeChat, setActiveChat] = useState<AgentId | null>(null);

  const toggle = (id: AgentId) =>
    setAgents(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));

  const enabled  = agents.filter(a => a.enabled);
  const disabled = agents.filter(a => !a.enabled);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>

      {/* Agent list */}
      <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>My Agents</h1>
          <p style={{ fontSize: 14, color: "#666" }}>Enabled agents appear in your extension on every tab.</p>
        </div>

        {/* Enabled */}
        <p style={{ fontSize: 11, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>Enabled ({enabled.length})</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
          {enabled.map(agent => {
            const Icon = agent.icon;
            const chatOpen = activeChat === agent.id;
            return (
              <div key={agent.id} style={{ background: "#111", border: `1px solid ${chatOpen ? `${agent.color}35` : "rgba(255,255,255,0.07)"}`, borderRadius: 12, padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: `${agent.color}14`, border: `1px solid ${agent.color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={17} color={agent.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{agent.name}</span>
                      <span style={{ fontSize: 10, color: "#10B981", fontWeight: 600 }}>● Active</span>
                    </div>
                    <p style={{ fontSize: 12, color: "#666" }}>{agent.description}</p>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0, alignItems: "center" }}>
                    <div style={{ textAlign: "right", minWidth: 40 }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{agent.tasks}</p>
                      <p style={{ fontSize: 10, color: "#444" }}>tasks</p>
                    </div>
                    <button onClick={() => setActiveChat(chatOpen ? null : agent.id)}
                      style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 11px", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none", background: chatOpen ? `${agent.color}20` : "rgba(255,255,255,0.06)", color: chatOpen ? agent.color : "#888" }}>
                      <MessageSquare size={12} /> Try it
                    </button>
                    <button onClick={() => toggle(agent.id)}
                      style={{ padding: "6px 10px", borderRadius: 7, fontSize: 12, cursor: "pointer", border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "#555" }}>
                      Disable
                    </button>
                  </div>
                </div>

                {/* Sample chat */}
                {chatOpen && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ background: "#0d0d0d", borderRadius: 10, padding: 14, marginBottom: 10, maxHeight: 200, overflowY: "auto" }}>
                      {SAMPLE_CHATS[agent.id]?.map((msg, i) => (
                        <div key={i} style={{ marginBottom: 10 }}>
                          <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 3, color: msg.role === "user" ? "#666" : agent.color }}>
                            {msg.role === "user" ? "You" : agent.name}
                          </p>
                          <p style={{ fontSize: 12, color: msg.role === "user" ? "#aaa" : "#ddd", lineHeight: 1.6, whiteSpace: "pre-line" }}>{msg.text}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <input placeholder={`Ask ${agent.name} something…`}
                        style={{ flex: 1, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#fff", outline: "none" }} />
                      <button style={{ background: agent.color, color: "#000", fontWeight: 700, fontSize: 12, padding: "8px 14px", borderRadius: 8, cursor: "pointer", border: "none" }}>
                        Send
                      </button>
                    </div>
                    <p style={{ fontSize: 11, color: "#444", marginTop: 5 }}>Live AI requires GROQ_API_KEY — see .env.local.example</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Disabled */}
        {disabled.length > 0 && (
          <>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>Not enabled ({disabled.length})</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {disabled.map(agent => {
                const Icon = agent.icon;
                return (
                  <div key={agent.id} style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, opacity: 0.6 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={15} color="#555" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#888" }}>{agent.name}</span>
                      <p style={{ fontSize: 11, color: "#444", marginTop: 1 }}>{agent.description}</p>
                    </div>
                    <button onClick={() => toggle(agent.id)}
                      style={{ padding: "6px 12px", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1px solid rgba(16,185,129,0.3)", background: "transparent", color: "#10B981" }}>
                      Enable
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Stats panel */}
      <div style={{ width: 210, flexShrink: 0, borderLeft: "1px solid rgba(255,255,255,0.07)", background: "#0d0d0d", padding: 20, overflowY: "auto" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>This week</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {enabled.map(agent => {
            const Icon = agent.icon;
            return (
              <div key={agent.id} style={{ display: "flex", gap: 9, alignItems: "center" }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: `${agent.color}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={12} color={agent.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: "#888", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{agent.name}</div>
                  <div style={{ fontSize: 10, color: "#444" }}>{agent.tasks} tasks</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
            <span style={{ fontSize: 12, color: "#555" }}>Total tasks</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{agents.reduce((s, a) => s + a.tasks, 0)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: "#555" }}>Active agents</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{enabled.length} / 6</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
            <CheckCircle2 size={11} color="#10B981" />
            <span style={{ fontSize: 11, color: "#444" }}>Extension connected</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <RotateCcw size={11} color="#555" />
            <span style={{ fontSize: 11, color: "#444" }}>Syncs automatically</span>
          </div>
        </div>
      </div>
    </div>
  );
}
