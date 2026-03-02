export const DASHBOARD_STATS = {
  totalEarned: 268420,
  totalEarnedDelta: 18.4,
  activeAgents: 3,
  totalAgents: 4,
  avgROI: 387,
  avgROIDelta: 12.1,
  tasksExecuted: 142830,
  tasksExecutedToday: 4218,
  budgetRemaining: 2847,
  budgetTotal: 4200,
};

export const ROI_CHART_DATA = [
  { date: "Feb 3", revenue: 4200, cost: 780, net: 3420 },
  { date: "Feb 6", revenue: 5100, cost: 820, net: 4280 },
  { date: "Feb 9", revenue: 4800, cost: 790, net: 4010 },
  { date: "Feb 12", revenue: 6300, cost: 900, net: 5400 },
  { date: "Feb 15", revenue: 5900, cost: 870, net: 5030 },
  { date: "Feb 18", revenue: 7200, cost: 950, net: 6250 },
  { date: "Feb 21", revenue: 8100, cost: 980, net: 7120 },
  { date: "Feb 24", revenue: 7800, cost: 960, net: 6840 },
  { date: "Feb 27", revenue: 9400, cost: 1020, net: 8380 },
  { date: "Mar 1", revenue: 10200, cost: 1050, net: 9150 },
  { date: "Mar 2", revenue: 11400, cost: 1080, net: 10320 },
];

export const AGENT_PERFORMANCE_DATA = [
  { name: "RevenueMaxx", tasks: 89420, roi: 340, revenue: 184920, status: "live" },
  { name: "LeadHunter", tasks: 34210, roi: 520, revenue: 42300, status: "live" },
  { name: "ContentStorm", tasks: 14800, roi: 280, revenue: 28400, status: "paused" },
  { name: "FlowOptimizer", tasks: 4400, roi: 310, revenue: 12800, status: "live" },
];

export const CATEGORY_BREAKDOWN = [
  { category: "Revenue Generation", value: 42, color: "#0D9488" },
  { category: "Lead Acquisition", value: 28, color: "#3B82F6" },
  { category: "Content Amplification", value: 15, color: "#F59E0B" },
  { category: "Workflow Optimization", value: 15, color: "#8B5CF6" },
];

export const TRENDING_METRICS = [
  { label: "Platform Revenue Today", value: "$2.84M", delta: "+23%", positive: true },
  { label: "Active Deployments", value: "847K", delta: "+1.2K", positive: true },
  { label: "Avg Task Success Rate", value: "94.1%", delta: "+0.3%", positive: true },
  { label: "Top Agent ROI", value: "680%", delta: "ArbitrageRadar", positive: true },
];

export const BILLING_PLANS = [
  {
    name: "Starter",
    price: 0,
    priceNote: "Free forever",
    color: "#64748B",
    features: [
      "Up to 3 active agents",
      "1,000 tasks/month",
      "Basic performance dashboard",
      "Email support",
      "Standard marketplace access",
      "Community integrations",
    ],
    limits: {
      agents: 3,
      tasks: 1000,
      budget: 500,
    },
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: 99,
    priceNote: "per month",
    color: "#0D9488",
    features: [
      "Up to 20 active agents",
      "50,000 tasks/month",
      "Advanced ROI analytics",
      "Priority support",
      "Full marketplace access",
      "500+ integrations",
      "Custom agent parameters",
      "Audit logs (90 days)",
    ],
    limits: {
      agents: 20,
      tasks: 50000,
      budget: 10000,
    },
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 999,
    priceNote: "per month",
    color: "#3B82F6",
    features: [
      "Unlimited active agents",
      "Unlimited tasks",
      "Private agent clusters",
      "Dedicated account manager",
      "Custom SLA (99.99% uptime)",
      "Compliance layer (SOC2, HIPAA)",
      "Audit logs (unlimited)",
      "Custom integrations",
      "White-label option",
      "API access (full)",
    ],
    limits: {
      agents: -1,
      tasks: -1,
      budget: -1,
    },
    cta: "Contact Sales",
    popular: false,
  },
];

export const SECURITY_EVENTS = [
  { id: 1, type: "auth", description: "Login from new device — Chrome/macOS", time: "2 hours ago", severity: "info" },
  { id: 2, type: "permission", description: "RevenueMaxx requested new Klaviyo scope", time: "6 hours ago", severity: "warning" },
  { id: 3, type: "audit", description: "LeadHunter exported 230 contacts", time: "Yesterday 4:12 PM", severity: "info" },
  { id: 4, type: "budget", description: "Budget threshold 90% reached — RevenueMaxx", time: "Yesterday 11:30 AM", severity: "warning" },
  { id: 5, type: "auth", description: "API key rotated successfully", time: "3 days ago", severity: "success" },
];
