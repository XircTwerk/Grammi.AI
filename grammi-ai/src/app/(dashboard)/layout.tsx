import { Sidebar } from "@/components/layout/sidebar";
import { IntelligencePanel } from "@/components/layout/intelligence-panel";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0F172A] bg-grid">
      <Sidebar />
      <IntelligencePanel />
      <main className="ml-60 mr-72 min-h-screen">
        {children}
      </main>
    </div>
  );
}
