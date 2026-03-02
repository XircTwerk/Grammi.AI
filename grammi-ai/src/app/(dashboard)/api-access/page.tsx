"use client";
import { useState } from "react";
import { Code2, Copy, RefreshCw, Eye, EyeOff, Plus, CheckCircle2, Terminal, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_KEYS = [
  { id: "key-1", name: "Production", key: "gai_pk_live_8x4k9mXzQ...Tf8p", created: "Jan 15, 2026", lastUsed: "2 mins ago", scope: "Full access", active: true },
  { id: "key-2", name: "Development", key: "gai_pk_test_3nRpV7wYb...Kj2m", created: "Feb 2, 2026", lastUsed: "3 days ago", scope: "Read-only", active: true },
];

const ENDPOINTS = [
  { method: "GET", path: "/v1/agents", description: "List all available agents" },
  { method: "POST", path: "/v1/agents/deploy", description: "Deploy an agent programmatically" },
  { method: "GET", path: "/v1/deployments/{id}", description: "Get deployment status and metrics" },
  { method: "DELETE", path: "/v1/deployments/{id}", description: "Stop and remove a deployment" },
  { method: "GET", path: "/v1/audit-logs", description: "Retrieve full audit trail" },
  { method: "GET", path: "/v1/metrics", description: "Get aggregated performance metrics" },
  { method: "POST", path: "/v1/webhooks", description: "Register event webhooks" },
];

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-blue-500/15 text-blue-300 border-blue-500/25",
  POST: "bg-teal-500/15 text-teal-300 border-teal-500/25",
  DELETE: "bg-red-500/15 text-red-400 border-red-500/25",
  PUT: "bg-amber-500/15 text-amber-300 border-amber-500/25",
};

const CODE_EXAMPLE = `import grammi from "@grammi/sdk";

const client = new grammi.Client({
  apiKey: process.env.GRAMMI_API_KEY,
});

// Deploy an agent
const deployment = await client.agents.deploy({
  agentId: "ag-001",           // RevenueMaxx
  integrations: ["shopify", "google-ads"],
  objective: "Increase revenue by 30%",
  budget: {
    dailyCap: 200,             // USD per day
    totalLimit: 2000,          // Hard stop
  },
  constraints: {
    successRateFloor: 0.80,    // Pause if drops below
  },
});

console.log(deployment.id);    // dep_a7x9...
console.log(deployment.status); // "live"

// Monitor real-time
client.deployments.stream(deployment.id, (event) => {
  console.log(event.type, event.result, event.revenue);
});`;

export default function ApiAccessPage() {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState("");

  const copyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">API Access</h1>
        <p className="text-sm text-slate-400 mt-1">Programmatic access to deploy and manage agents. Full developer SDK.</p>
      </div>

      {/* SDK callout */}
      <div className="glass-teal rounded-2xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shrink-0">
          <Terminal className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white mb-1">Grammi SDK — Full Programmatic Control</h3>
          <p className="text-sm text-teal-300/80 mb-3">Deploy agents, monitor execution, stream live results, and build autonomous workflows — all in code.</p>
          <div className="flex gap-3">
            <code className="text-xs bg-slate-900/60 text-teal-300 px-3 py-2 rounded-xl border border-teal-500/20">npm install @grammi/sdk</code>
            <code className="text-xs bg-slate-900/60 text-teal-300 px-3 py-2 rounded-xl border border-teal-500/20">pip install grammi</code>
          </div>
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-white">API Keys</h2>
          <Button size="sm">
            <Plus className="w-3.5 h-3.5" />
            New Key
          </Button>
        </div>
        <div className="space-y-3">
          {API_KEYS.map(k => (
            <div key={k.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-700/30 group">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-white">{k.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-blue-500/15 text-blue-300 border border-blue-500/25">{k.scope}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <code className="font-mono">{showKeys[k.id] ? k.key.replace("...", "_x8k2p9") : k.key}</code>
                  <span>·</span>
                  <span>Created {k.created}</span>
                  <span>·</span>
                  <span>Used {k.lastUsed}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setShowKeys(p => ({ ...p, [k.id]: !p[k.id] }))}
                  className="p-1.5 rounded-lg hover:bg-slate-700/40 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                >
                  {showKeys[k.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => copyCode(k.key, k.id)}
                  className="p-1.5 rounded-lg hover:bg-slate-700/40 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                >
                  {copied === k.id ? <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button className="p-1.5 rounded-lg hover:bg-slate-700/40 text-slate-400 hover:text-red-400 transition-colors cursor-pointer">
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code example */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-white">Quick Start Example</h2>
          <button
            onClick={() => copyCode(CODE_EXAMPLE, "code")}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            {copied === "code" ? <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied === "code" ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="bg-slate-950/60 rounded-xl p-5 text-xs text-slate-300 font-mono overflow-x-auto border border-slate-800/60 leading-relaxed">
          {CODE_EXAMPLE}
        </pre>
      </div>

      {/* Endpoints */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
        <h2 className="text-base font-semibold text-white mb-2">API Endpoints</h2>
        <p className="text-xs text-slate-500 mb-5">Base URL: <code className="text-teal-400">https://api.grammi.ai</code></p>
        <div className="space-y-2">
          {ENDPOINTS.map(ep => (
            <div key={ep.path} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-700/20 hover:border-slate-600/40 transition-all">
              <span className={`text-[10px] px-2 py-1 rounded-md border font-bold mono shrink-0 ${METHOD_COLORS[ep.method]}`}>
                {ep.method}
              </span>
              <code className="text-sm text-slate-300 font-mono flex-1">{ep.path}</code>
              <span className="text-xs text-slate-500 shrink-0 hidden md:block">{ep.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rate limits */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
        <h2 className="text-base font-semibold text-white mb-4">Rate Limits (Pro Plan)</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "API Calls/minute", value: "1,000", used: "42" },
            { label: "Deployments/day", value: "100", used: "3" },
            { label: "Concurrent agents", value: "20", used: "4" },
          ].map(({ label, value, used }) => (
            <div key={label} className="p-4 rounded-xl bg-slate-900/40 border border-slate-700/30">
              <div className="text-xs text-slate-500 mb-1">{label}</div>
              <div className="text-xl font-bold text-white">{used}</div>
              <div className="text-xs text-slate-600">of {value} limit</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
