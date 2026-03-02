"use client";
import { CheckCircle2, CreditCard, Zap, TrendingUp, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BILLING_PLANS } from "@/lib/data/metrics";
import { formatCurrency } from "@/lib/utils";

const INVOICES = [
  { id: "INV-2026-031", date: "Mar 1, 2026", amount: 99, status: "paid", items: "Pro Plan + 2 performance-share agents" },
  { id: "INV-2026-024", date: "Feb 1, 2026", amount: 99, status: "paid", items: "Pro Plan + 2 performance-share agents" },
  { id: "INV-2026-016", date: "Jan 1, 2026", amount: 99, status: "paid", items: "Pro Plan" },
  { id: "INV-2025-048", date: "Dec 1, 2025", amount: 99, status: "paid", items: "Pro Plan" },
];

const USAGE = [
  { label: "Active Agents", used: 4, max: 20, pct: 20 },
  { label: "Tasks This Month", used: 42830, max: 50000, pct: 86 },
  { label: "API Calls", used: 8420, max: 100000, pct: 8 },
  { label: "Budget Allocation", used: 3210, max: 10000, pct: 32 },
];

export default function BillingPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Billing & Plans</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your subscription, usage, and payment methods</p>
      </div>

      {/* Current plan */}
      <div className="glass-teal rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Zap className="w-5 h-5 text-teal-400" />
              <span className="text-lg font-bold text-white">Pro Plan</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 font-semibold">Active</span>
            </div>
            <p className="text-sm text-teal-300/70">$99/month · Renews April 1, 2026</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-extrabold text-white">$99</div>
            <div className="text-xs text-slate-400">/ month</div>
          </div>
        </div>
      </div>

      {/* Usage meters */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
        <h2 className="text-base font-semibold text-white mb-5">Current Month Usage</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {USAGE.map(({ label, used, max, pct }) => (
            <div key={label}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">{label}</span>
                <span className="text-white font-medium">
                  {typeof used === "number" && used > 999
                    ? `${(used / 1000).toFixed(1)}K / ${(max / 1000).toFixed(0)}K`
                    : `${used} / ${max}`}
                </span>
              </div>
              <div className="h-2 bg-slate-900/60 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${pct > 85 ? "bg-amber-500" : pct > 95 ? "bg-red-500" : "bg-teal-500"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-600 mt-1">{pct}% used</div>
            </div>
          ))}
        </div>
        {USAGE[1].pct > 85 && (
          <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-sm text-amber-300">
            ⚠ You are at 86% of your monthly task limit. Consider upgrading to Enterprise for unlimited tasks.
          </div>
        )}
      </div>

      {/* Plans */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Available Plans</h2>
        <div className="grid lg:grid-cols-3 gap-5">
          {BILLING_PLANS.map((plan) => (
            <div key={plan.name} className={`relative bg-slate-800/50 rounded-2xl border p-6 transition-all ${
              plan.name === "Pro"
                ? "border-teal-500/40 ring-1 ring-teal-500/20 shadow-xl shadow-teal-900/10"
                : "border-slate-700/40"
            }`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-brand text-white text-xs font-bold">
                  Current Plan
                </div>
              )}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  <div className="w-3 h-3 rounded-full" style={{ background: plan.color }} />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">{plan.price === 0 ? "Free" : plan.price === 999 ? "$999" : `$${plan.price}`}</span>
                  {plan.price > 0 && plan.price !== 999 && <span className="text-slate-500 text-sm">/ month</span>}
                  {plan.price === 999 && <span className="text-slate-500 text-sm">/ month</span>}
                </div>
              </div>

              <ul className="space-y-2.5 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {plan.name === "Pro" ? (
                <button className="w-full py-3 rounded-xl bg-slate-700/60 text-slate-400 text-sm font-semibold cursor-default border border-slate-600/40">
                  Current Plan
                </button>
              ) : plan.name === "Enterprise" ? (
                <Button className="w-full" variant="secondary">
                  Contact Sales <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button className="w-full" variant="ghost">
                  Downgrade to Starter
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Performance share breakdown */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
        <h2 className="text-base font-semibold text-white mb-4">Performance-Share Billing</h2>
        <p className="text-sm text-slate-400 mb-5">Agents on performance-share pricing charge a percentage of the incremental revenue they generate. You only pay when you earn.</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { agent: "RevenueMaxx", share: "12%", earned: 184920, fee: 22190 },
            { agent: "ArbitrageRadar", share: "18%", earned: 0, fee: 0 },
          ].map(({ agent, share, earned, fee }) => (
            <div key={agent} className="p-4 rounded-xl bg-slate-900/40 border border-slate-700/30">
              <div className="text-sm font-semibold text-white mb-1">{agent}</div>
              <div className="text-xs text-slate-500 mb-3">{share} performance share</div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Agent earned you</span>
                  <span className="text-emerald-400 font-semibold">{formatCurrency(earned)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Your fee</span>
                  <span className="text-white">{formatCurrency(fee)}</span>
                </div>
                <div className="flex justify-between text-xs border-t border-slate-700/30 pt-1">
                  <span className="text-slate-400">Your net</span>
                  <span className="text-emerald-400 font-bold">{formatCurrency(earned - fee)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment method + invoices */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
          <h2 className="text-base font-semibold text-white mb-4">Payment Method</h2>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-700/30 mb-4">
            <CreditCard className="w-6 h-6 text-slate-400" />
            <div>
              <div className="text-sm font-semibold text-white">•••• •••• •••• 4242</div>
              <div className="text-xs text-slate-500">Visa · Expires 08/27</div>
            </div>
            <span className="ml-auto text-xs text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full">Primary</span>
          </div>
          <Button variant="secondary" size="sm">
            <CreditCard className="w-3.5 h-3.5" />
            Update Payment
          </Button>
        </div>

        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/40 p-5">
          <h2 className="text-base font-semibold text-white mb-4">Invoice History</h2>
          <div className="space-y-2.5">
            {INVOICES.map(inv => (
              <div key={inv.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-slate-700/20 hover:border-slate-600/40 transition-all group">
                <div className="min-w-0">
                  <div className="text-xs font-medium text-white">{inv.id}</div>
                  <div className="text-[10px] text-slate-500 truncate">{inv.date} · {inv.items}</div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-2">
                  <span className="text-sm font-bold text-white">{formatCurrency(inv.amount)}</span>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Download className="w-3.5 h-3.5 text-slate-400 hover:text-slate-200" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
