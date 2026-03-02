import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grammi AI — Deploy Digital Workers. Get Results.",
  description: "The autonomous AI agent marketplace. Deploy digital workers that execute real-world tasks, generate revenue, and deliver measurable economic impact.",
  keywords: ["AI agents", "autonomous agents", "digital workers", "agent marketplace", "AI automation"],
  openGraph: {
    title: "Grammi AI",
    description: "Deploy Digital Workers. Get Results.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0F172A] text-slate-100" style={{ fontFamily: "'Inter', 'DM Sans', system-ui, -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
