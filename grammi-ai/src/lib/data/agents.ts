export type AgentCategory =
  | "Revenue Generation"
  | "Lead Acquisition"
  | "Content Amplification"
  | "Arbitrage Detection"
  | "Brand Monitoring"
  | "Research Automation"
  | "Workflow Optimization";

export type PricingModel = "subscription" | "usage" | "performance-share";
export type AgentStatus = "live" | "paused" | "error" | "pending";
export type RiskLevel = "low" | "medium" | "high";

export interface Agent {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: AgentCategory;
  developer: string;
  developerVerified: boolean;
  rating: number;
  reviewCount: number;
  deployments: number;
  pricingModel: PricingModel;
  price: number;
  priceUnit: string;
  performanceShare?: number;
  avgROI: number;
  avgROITimeframe: string;
  successRate: number;
  uptime: number;
  riskLevel: RiskLevel;
  integrations: string[];
  tags: string[];
  featured: boolean;
  auditedAt: string;
  lastUpdated: string;
  historicalROI: { month: string; roi: number }[];
  permissions: string[];
  riskDisclosures: string[];
}

export const AGENTS: Agent[] = [
  {
    id: "ag-001",
    name: "RevenueMaxx",
    tagline: "Autonomous eCommerce revenue optimizer",
    description: "RevenueMaxx continuously monitors your Shopify/WooCommerce store, dynamically reprices SKUs, predicts low-stock scenarios, and executes upsell sequences — all without human intervention. Averages 34% revenue lift in 30 days.",
    category: "Revenue Generation",
    developer: "NeuralCommerce Labs",
    developerVerified: true,
    rating: 4.9,
    reviewCount: 2847,
    deployments: 18420,
    pricingModel: "performance-share",
    price: 0,
    priceUnit: "",
    performanceShare: 12,
    avgROI: 340,
    avgROITimeframe: "30 days",
    successRate: 94.2,
    uptime: 99.97,
    riskLevel: "low",
    integrations: ["Shopify", "WooCommerce", "Stripe", "Google Ads", "Meta Ads", "Klaviyo"],
    tags: ["ecommerce", "revenue", "repricing", "automation"],
    featured: true,
    auditedAt: "2026-02-15",
    lastUpdated: "2026-02-28",
    historicalROI: [
      { month: "Sep", roi: 280 }, { month: "Oct", roi: 295 },
      { month: "Nov", roi: 380 }, { month: "Dec", roi: 420 },
      { month: "Jan", roi: 310 }, { month: "Feb", roi: 340 },
    ],
    permissions: ["Read product catalog", "Update pricing", "Read order history", "Send marketing emails"],
    riskDisclosures: [
      "Agent cannot create new products or delete inventory.",
      "Pricing changes are bounded by user-defined min/max constraints.",
      "All actions are logged and reversible within 24 hours."
    ],
  },
  {
    id: "ag-002",
    name: "LeadHunter Pro",
    tagline: "B2B lead acquisition at machine speed",
    description: "LeadHunter Pro crawls LinkedIn, job boards, and company databases to identify high-intent buyers matching your ICP. Auto-enriches contacts, scores leads, and pushes qualified prospects directly into your CRM with personalized outreach drafted.",
    category: "Lead Acquisition",
    developer: "Apex Growth Systems",
    developerVerified: true,
    rating: 4.8,
    reviewCount: 1923,
    deployments: 11250,
    pricingModel: "usage",
    price: 0.08,
    priceUnit: "per verified lead",
    avgROI: 520,
    avgROITimeframe: "60 days",
    successRate: 91.7,
    uptime: 99.89,
    riskLevel: "low",
    integrations: ["Salesforce", "HubSpot", "LinkedIn", "Apollo", "ZoomInfo", "Outreach"],
    tags: ["b2b", "leads", "crm", "outreach", "linkedin"],
    featured: true,
    auditedAt: "2026-01-22",
    lastUpdated: "2026-02-20",
    historicalROI: [
      { month: "Sep", roi: 440 }, { month: "Oct", roi: 470 },
      { month: "Nov", roi: 500 }, { month: "Dec", roi: 490 },
      { month: "Jan", roi: 510 }, { month: "Feb", roi: 520 },
    ],
    permissions: ["Search LinkedIn profiles", "Read CRM contacts", "Create CRM records", "Draft email sequences"],
    riskDisclosures: [
      "Agent respects LinkedIn rate limits and ToS compliance windows.",
      "No messaging sent without explicit user approval.",
      "GDPR-compliant data handling with auto-deletion options."
    ],
  },
  {
    id: "ag-003",
    name: "ContentStorm",
    tagline: "Multi-platform content amplification engine",
    description: "ContentStorm generates, schedules, and publishes high-performing content across Twitter/X, LinkedIn, Instagram, and TikTok. Uses trend analysis to post at peak engagement windows. A/B tests copy variants and reinvests budget into top performers.",
    category: "Content Amplification",
    developer: "Viral Systems Inc.",
    developerVerified: true,
    rating: 4.7,
    reviewCount: 3412,
    deployments: 24100,
    pricingModel: "subscription",
    price: 299,
    priceUnit: "/ month",
    avgROI: 280,
    avgROITimeframe: "45 days",
    successRate: 88.5,
    uptime: 99.95,
    riskLevel: "low",
    integrations: ["Twitter/X", "LinkedIn", "Instagram", "TikTok", "Buffer", "Canva API"],
    tags: ["content", "social media", "scheduling", "viral", "branding"],
    featured: true,
    auditedAt: "2026-02-01",
    lastUpdated: "2026-02-25",
    historicalROI: [
      { month: "Sep", roi: 220 }, { month: "Oct", roi: 240 },
      { month: "Nov", roi: 260 }, { month: "Dec", roi: 310 },
      { month: "Jan", roi: 270 }, { month: "Feb", roi: 280 },
    ],
    permissions: ["Post to social accounts", "Read analytics", "Manage ad spend up to defined limit", "Generate image assets"],
    riskDisclosures: [
      "Agent posts only within approved content guidelines.",
      "Ad spend capped at user-defined daily limit.",
      "All posts logged and removable via dashboard."
    ],
  },
  {
    id: "ag-004",
    name: "ArbitrageRadar",
    tagline: "Real-time pricing arbitrage across 200+ markets",
    description: "ArbitrageRadar monitors price differentials across Amazon, eBay, Etsy, Walmart, and wholesale suppliers in real-time. Flags profitable arbitrage windows, calculates net margin after fees, and executes purchase orders within defined risk parameters.",
    category: "Arbitrage Detection",
    developer: "Quantex AI",
    developerVerified: true,
    rating: 4.6,
    reviewCount: 892,
    deployments: 4320,
    pricingModel: "performance-share",
    price: 0,
    priceUnit: "",
    performanceShare: 18,
    avgROI: 680,
    avgROITimeframe: "30 days",
    successRate: 86.3,
    uptime: 99.92,
    riskLevel: "medium",
    integrations: ["Amazon Seller Central", "eBay API", "Walmart Marketplace", "Keepa", "Stripe"],
    tags: ["arbitrage", "ecommerce", "pricing", "retail", "profit"],
    featured: false,
    auditedAt: "2025-12-10",
    lastUpdated: "2026-02-18",
    historicalROI: [
      { month: "Sep", roi: 580 }, { month: "Oct", roi: 620 },
      { month: "Nov", roi: 750 }, { month: "Dec", roi: 820 },
      { month: "Jan", roi: 660 }, { month: "Feb", roi: 680 },
    ],
    permissions: ["Read marketplace prices", "Place purchase orders up to defined limit", "Access supplier catalogs", "Manage inventory"],
    riskDisclosures: [
      "Purchase orders capped at user-defined budget per transaction.",
      "Agent cannot transfer funds between external accounts.",
      "Market volatility may reduce arbitrage margins.",
      "Medium risk: rapid price movements can reduce profitability."
    ],
  },
  {
    id: "ag-005",
    name: "BrandSentinel",
    tagline: "24/7 brand monitoring and reputation defense",
    description: "BrandSentinel watches Twitter/X, Reddit, news outlets, review platforms, and dark web forums for brand mentions. Classifies sentiment in real-time, escalates crises, auto-drafts response templates, and tracks competitor narrative shifts.",
    category: "Brand Monitoring",
    developer: "SentinelAI Corp",
    developerVerified: true,
    rating: 4.8,
    reviewCount: 1456,
    deployments: 9870,
    pricingModel: "subscription",
    price: 199,
    priceUnit: "/ month",
    avgROI: 190,
    avgROITimeframe: "90 days",
    successRate: 96.1,
    uptime: 99.99,
    riskLevel: "low",
    integrations: ["Twitter/X", "Reddit", "Google News", "Trustpilot", "Glassdoor", "Slack"],
    tags: ["brand", "monitoring", "sentiment", "reputation", "alerts"],
    featured: false,
    auditedAt: "2026-01-05",
    lastUpdated: "2026-02-22",
    historicalROI: [
      { month: "Sep", roi: 160 }, { month: "Oct", roi: 170 },
      { month: "Nov", roi: 185 }, { month: "Dec", roi: 210 },
      { month: "Jan", roi: 195 }, { month: "Feb", roi: 190 },
    ],
    permissions: ["Read public mentions", "Send Slack/email alerts", "Draft response templates", "Read competitor profiles"],
    riskDisclosures: [
      "Agent only reads public data; no account access to third-party platforms.",
      "Crisis escalation requires human approval before any public response."
    ],
  },
  {
    id: "ag-006",
    name: "ResearchBrain",
    tagline: "Autonomous deep research and competitive intelligence",
    description: "ResearchBrain conducts deep research across academic databases, patents, news, filings, and web sources. Produces structured reports, competitive landscape analyses, and market sizing documents. Delivers in hours what analysts take weeks to produce.",
    category: "Research Automation",
    developer: "Cognify Research",
    developerVerified: true,
    rating: 4.7,
    reviewCount: 2103,
    deployments: 15670,
    pricingModel: "usage",
    price: 12,
    priceUnit: "per report",
    avgROI: 420,
    avgROITimeframe: "immediate",
    successRate: 93.8,
    uptime: 99.94,
    riskLevel: "low",
    integrations: ["Notion", "Google Docs", "Slack", "PubMed", "USPTO", "SEC EDGAR"],
    tags: ["research", "intelligence", "reports", "competitive", "analysis"],
    featured: false,
    auditedAt: "2026-02-10",
    lastUpdated: "2026-03-01",
    historicalROI: [
      { month: "Sep", roi: 380 }, { month: "Oct", roi: 400 },
      { month: "Nov", roi: 415 }, { month: "Dec", roi: 440 },
      { month: "Jan", roi: 430 }, { month: "Feb", roi: 420 },
    ],
    permissions: ["Search web and databases", "Write to Notion/Docs", "Send Slack summaries"],
    riskDisclosures: [
      "Agent accesses only publicly available data sources.",
      "Reports are AI-generated and should be verified for critical decisions."
    ],
  },
  {
    id: "ag-007",
    name: "FlowOptimizer",
    tagline: "AI workflow automation across 500+ apps",
    description: "FlowOptimizer analyzes your existing workflows, identifies bottlenecks, builds automation bridges between apps, and continuously improves processes based on outcome data. Connects any combination of your existing tools without custom code.",
    category: "Workflow Optimization",
    developer: "Automate Collective",
    developerVerified: true,
    rating: 4.6,
    reviewCount: 4231,
    deployments: 31200,
    pricingModel: "subscription",
    price: 149,
    priceUnit: "/ month",
    avgROI: 310,
    avgROITimeframe: "30 days",
    successRate: 97.2,
    uptime: 99.96,
    riskLevel: "low",
    integrations: ["Zapier", "Make", "Salesforce", "HubSpot", "Jira", "Slack", "Notion", "Airtable"],
    tags: ["workflow", "automation", "productivity", "integration", "ops"],
    featured: true,
    auditedAt: "2026-01-30",
    lastUpdated: "2026-02-27",
    historicalROI: [
      { month: "Sep", roi: 270 }, { month: "Oct", roi: 285 },
      { month: "Nov", roi: 300 }, { month: "Dec", roi: 330 },
      { month: "Jan", roi: 315 }, { month: "Feb", roi: 310 },
    ],
    permissions: ["Read and write to connected apps", "Trigger webhooks", "Manage automation flows"],
    riskDisclosures: [
      "Agent actions are sandboxed per connected app.",
      "All automations logged with full rollback capability.",
      "Data never leaves user-defined cloud regions."
    ],
  },
];

export const MY_AGENTS: (Agent & { status: AgentStatus; runningDays: number; totalEarned: number; dailyBudget: number; budgetUsed: number })[] = [
  {
    ...AGENTS[0],
    status: "live",
    runningDays: 47,
    totalEarned: 184920,
    dailyBudget: 500,
    budgetUsed: 312,
  },
  {
    ...AGENTS[1],
    status: "live",
    runningDays: 23,
    totalEarned: 42300,
    dailyBudget: 200,
    budgetUsed: 176,
  },
  {
    ...AGENTS[2],
    status: "paused",
    runningDays: 61,
    totalEarned: 28400,
    dailyBudget: 299,
    budgetUsed: 0,
  },
  {
    ...AGENTS[6],
    status: "live",
    runningDays: 14,
    totalEarned: 12800,
    dailyBudget: 149,
    budgetUsed: 149,
  },
];

export const LIVE_FEED_EVENTS = [
  { id: 1, agent: "RevenueMaxx", action: "Repriced 847 SKUs", result: "+$2,340 projected revenue", time: "2s ago", type: "revenue" },
  { id: 2, agent: "LeadHunter Pro", action: "Qualified 23 new leads", result: "Pushed to HubSpot", time: "14s ago", type: "lead" },
  { id: 3, agent: "FlowOptimizer", action: "Automated invoice workflow", result: "Saved 3.2 hrs/week", time: "38s ago", type: "workflow" },
  { id: 4, agent: "RevenueMaxx", action: "Triggered upsell sequence", result: "142 emails sent", time: "1m ago", type: "revenue" },
  { id: 5, agent: "LeadHunter Pro", action: "Enriched 156 contacts", result: "87% match rate", time: "2m ago", type: "lead" },
  { id: 6, agent: "RevenueMaxx", action: "Detected low-stock alert", result: "Reorder drafted", time: "3m ago", type: "alert" },
  { id: 7, agent: "FlowOptimizer", action: "Synced CRM + Slack", result: "12 deals updated", time: "4m ago", type: "workflow" },
  { id: 8, agent: "LeadHunter Pro", action: "Sourced 8 enterprise leads", result: "Est. $240K pipeline", time: "6m ago", type: "lead" },
];
