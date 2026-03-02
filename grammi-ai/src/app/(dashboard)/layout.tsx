import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      <Sidebar />
      <main style={{ marginLeft: 224, minHeight: "100vh", color: "#fff" }}>
        {children}
      </main>
    </div>
  );
}
