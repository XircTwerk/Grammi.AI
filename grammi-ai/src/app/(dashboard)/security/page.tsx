"use client";
import { ShieldCheck, Key, AlertTriangle, Eye, CheckCircle2, Lock, Smartphone, Globe, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SECURITY_EVENTS } from "@/lib/data/metrics";

const PERMISSIONS = [
  { app: "Shopify", icon: "🛍️", scope: ["Read products", "Update pricing", "Read orders"], granted: "Jan 15, 2026", agent: "RevenueMaxx" },
  { app: "HubSpot", icon: "🟠", scope: ["Read contacts", "Create contacts", "Read deals"], granted: "Feb 3, 2026", agent: "LeadHunter Pro" },
  { app: "Google Ads", icon: "📊", scope: ["Read campaigns", "Update bids"], granted: "Jan 15, 2026", agent: "RevenueMaxx" },
];

const SEVERITY_STYLES: Record<string, string> = {
  info: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  warning: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  success: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  error: "text-red-400 bg-red-500/10 border-red-500/20",
};

const SEVERITY_ICONS: Record<string, React.ReactNode> = {
  info: <Eye className="w-3.5 h-3.5" />,
  warning: <AlertTriangle className="w-3.5 h-3.5" />,
  success: <CheckCircle2 className="w-3.5 h-3.5" />,
  error: <AlertTriangle className="w-3.5 h-3.5" />,
};

export default function SecurityPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Security & Trust</h1>
        <p className="text-sm text-slate-400 mt-1">Audit logs, permission management, and account security</p>
      </div>

      {/* Security score */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-6">
          <div className="relative w-20 h-20 shrink-0">
            <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(99,135,180,0.1)" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#0D9488" strokeWidth="3"
                strokeDasharray="91 100" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xl font-black text-white">91</div>
                <div className="text-[8px] text-slate-500">/ 100</div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Security Score: Excellent</h2>
            <p className="text-sm text-slate-400 mb-3">Your account has strong security settings. Enable MFA to reach 100.</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "2FA enabled", done: true },
                { label: "API key rotation", done: true },
                { label: "Audit logging", done: true },
                { label: "MFA on all agents", done: false },
              ].map(({ label, done }) => (
                <div key={label} className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${done ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-amber-500/10 border-amber-500/20 text-amber-400"}`}>
                  {done ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust framework */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            icon: Lock,
            title: "Permission Isolation",
            body: "Every agent operates in a strict sandbox. Agents can only access exactly the permissions you grant — nothing more, ever.",
            color: "teal",
          },
          {
            icon: Eye,
            title: "Immutable Audit Logs",
            body: "Every action taken by every agent is logged with timestamp, agent ID, outcome, and data accessed. Logs cannot be modified.",
            color: "blue",
          },
          {
            icon: ShieldCheck,
            title: "Automatic Fail-Safes",
            body: "Agents automatically pause on anomaly detection, budget breach, or success rate drops. You can kill any agent instantly.",
            color: "violet",
          },
        ].map(({ icon: Icon, title, body, color }) => (
          <div key={title} className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
            <div className={`w-10 h-10 rounded-xl bg-${color}-500/10 border border-${color}-500/20 flex items-center justify-center mb-4`}>
              <Icon className={`w-5 h-5 text-${color}-400`} />
            </div>
            <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      {/* Agent Permissions */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-semibold text-white">Active Permissions</h2>
            <p className="text-xs text-slate-500 mt-0.5">Permissions granted to your active agents</p>
          </div>
          <Button variant="ghost" size="sm">
            <RefreshCw className="w-3.5 h-3.5" />
            Audit All
          </Button>
        </div>
        <div className="space-y-4">
          {PERMISSIONS.map(perm => (
            <div key={perm.app} className="p-4 rounded-xl bg-slate-900/40 border border-slate-700/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{perm.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-white">{perm.app}</div>
                    <div className="text-[11px] text-slate-500">Used by {perm.agent} · Granted {perm.granted}</div>
                  </div>
                </div>
                <button className="text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer border border-red-500/20 px-3 py-1 rounded-lg hover:bg-red-500/10">
                  Revoke
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {perm.scope.map(s => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/60 border border-slate-700/30 text-slate-400">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Log */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-semibold text-white">Security Event Log</h2>
            <p className="text-xs text-slate-500 mt-0.5">Immutable audit trail — retained 90 days on Pro plan</p>
          </div>
          <Button variant="secondary" size="sm">
            Export Logs
          </Button>
        </div>
        <div className="space-y-2.5">
          {SECURITY_EVENTS.map(event => (
            <div key={event.id} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/40 border border-slate-700/20">
              <div className={`p-1.5 rounded-lg border ${SEVERITY_STYLES[event.severity]}`}>
                {SEVERITY_ICONS[event.severity]}
              </div>
              <div className="flex-1">
                <div className="text-sm text-slate-200">{event.description}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${SEVERITY_STYLES[event.severity]}`}>
                    {event.type}
                  </span>
                  <span className="text-[10px] text-slate-600">{event.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account security */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
          <h2 className="text-base font-semibold text-white mb-4">Account Security</h2>
          <div className="space-y-3">
            {[
              { label: "Two-Factor Authentication", status: "Enabled", icon: Smartphone, done: true },
              { label: "Login Alerts", status: "Enabled", icon: AlertTriangle, done: true },
              { label: "Trusted Devices", status: "2 devices", icon: Globe, done: true },
              { label: "API Key Rotation", status: "Every 90 days", icon: Key, done: true },
            ].map(({ label, status, icon: Icon, done }) => (
              <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-700/20">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${done ? "bg-teal-500/10 border border-teal-500/20" : "bg-amber-500/10 border border-amber-500/20"}`}>
                  <Icon className={`w-4 h-4 ${done ? "text-teal-400" : "text-amber-400"}`} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{label}</div>
                  <div className="text-xs text-slate-500">{status}</div>
                </div>
                {done && <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
          <h2 className="text-base font-semibold text-white mb-4">Compliance & Certifications</h2>
          <div className="space-y-3">
            {[
              { cert: "SOC 2 Type II", status: "Certified", valid: "Until Dec 2026", color: "teal" },
              { cert: "GDPR Compliant", status: "Active", valid: "Data processed in EU regions", color: "blue" },
              { cert: "ISO 27001", status: "In Progress", valid: "Expected Q3 2026", color: "amber" },
              { cert: "HIPAA Ready", status: "Enterprise only", valid: "Available on Enterprise plan", color: "violet" },
            ].map(({ cert, status, valid, color }) => (
              <div key={cert} className={`p-3 rounded-xl bg-${color}-500/5 border border-${color}-500/15`}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm font-semibold text-white">{cert}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full bg-${color}-500/15 text-${color}-400 border border-${color}-500/25 font-semibold`}>
                    {status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">{valid}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
