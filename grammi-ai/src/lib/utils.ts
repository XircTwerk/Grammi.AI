import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(value: number, compact = false): string {
  if (compact && value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (compact && value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, compact = false): string {
  if (compact && value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (compact && value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatPercent(value: number): string {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

export function getRiskColor(risk: string): string {
  switch (risk) {
    case "low": return "text-emerald-400";
    case "medium": return "text-amber-400";
    case "high": return "text-red-400";
    default: return "text-slate-400";
  }
}

export function getRiskBg(risk: string): string {
  switch (risk) {
    case "low": return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
    case "medium": return "bg-amber-500/10 border-amber-500/20 text-amber-400";
    case "high": return "bg-red-500/10 border-red-500/20 text-red-400";
    default: return "bg-slate-500/10 border-slate-500/20 text-slate-400";
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "live": return "bg-emerald-500";
    case "paused": return "bg-amber-500";
    case "error": return "bg-red-500";
    case "pending": return "bg-violet-500";
    default: return "bg-slate-500";
  }
}

export function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    "Revenue Generation": "bg-teal-500/10 border-teal-500/20 text-teal-400",
    "Lead Acquisition": "bg-blue-500/10 border-blue-500/20 text-blue-400",
    "Content Amplification": "bg-amber-500/10 border-amber-500/20 text-amber-400",
    "Arbitrage Detection": "bg-orange-500/10 border-orange-500/20 text-orange-400",
    "Brand Monitoring": "bg-violet-500/10 border-violet-500/20 text-violet-400",
    "Research Automation": "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    "Workflow Optimization": "bg-pink-500/10 border-pink-500/20 text-pink-400",
  };
  return map[category] || "bg-slate-500/10 border-slate-500/20 text-slate-400";
}

export function getPricingLabel(agent: { pricingModel: string; price: number; priceUnit: string; performanceShare?: number }): string {
  if (agent.pricingModel === "performance-share") {
    return `${agent.performanceShare}% of profit`;
  }
  if (agent.pricingModel === "subscription") {
    return `$${agent.price}${agent.priceUnit}`;
  }
  return `$${agent.price} ${agent.priceUnit}`;
}
