"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Bot, Library, Clock, CreditCard, Settings, LogOut, Zap, ChevronRight,
} from "lucide-react";

const NAV = [
  { href: "/dashboard",   label: "Home",          icon: LayoutDashboard, sub: "Usage & overview" },
  { href: "/my-agents",   label: "My Agents",     icon: Bot,             sub: "Configured agents" },
  { href: "/marketplace", label: "Agent Library",  icon: Library,         sub: "Browse & add" },
  { href: "/performance", label: "Task History",   icon: Clock,           sub: "All runs" },
  { href: "/billing",     label: "Billing",        icon: CreditCard,      sub: "Plan & usage" },
];

export function Sidebar() {
  const path = usePathname();

  return (
    <aside style={{
      position: "fixed", left: 0, top: 0, height: "100vh", width: 224,
      background: "#0d0d0d", borderRight: "1px solid rgba(255,255,255,0.07)",
      display: "flex", flexDirection: "column", zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "18px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Zap size={15} color="#000" strokeWidth={2.5} />
        </div>
        <div>
          <span style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>grammi</span>
          <span style={{ fontWeight: 700, fontSize: 14, color: "#10B981" }}>.ai</span>
          <div style={{ fontSize: 10, color: "#444", marginTop: -1 }}>Browser AI</div>
        </div>
      </div>

      {/* Start a task */}
      <div style={{ padding: "10px 10px 4px" }}>
        <Link href="/my-agents" style={{
          display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: 8,
          background: "#10B981", textDecoration: "none",
        }}>
          <Zap size={14} color="#000" strokeWidth={2.5} />
          <span style={{ fontSize: 13, fontWeight: 700, color: "#000", flex: 1 }}>Start a task</span>
          <ChevronRight size={13} color="#000" />
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "6px 8px", overflowY: "auto" }}>
        {NAV.map(({ href, label, icon: Icon, sub }) => {
          const active = path === href || (href !== "/dashboard" && path.startsWith(href));
          return (
            <Link key={href} href={href} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8,
              marginBottom: 2, textDecoration: "none",
              background: active ? "rgba(16,185,129,0.1)" : "transparent",
              border: `1px solid ${active ? "rgba(16,185,129,0.2)" : "transparent"}`,
            }}>
              <Icon size={15} color={active ? "#10B981" : "#555"} />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: active ? "#10B981" : "#bbb", lineHeight: 1.3 }}>{label}</div>
                <div style={{ fontSize: 10, color: "#444" }}>{sub}</div>
              </div>
              {active && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#10B981", flexShrink: 0 }} />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "8px 8px 12px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <Link href="/security" style={{
          display: "flex", alignItems: "center", gap: 9, padding: "7px 10px", borderRadius: 8,
          textDecoration: "none", marginBottom: 4,
        }}>
          <Settings size={14} color="#444" />
          <span style={{ fontSize: 13, color: "#555" }}>Settings</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 10px" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#000" }}>A</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#ccc", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Alex</div>
            <div style={{ fontSize: 10, color: "#444" }}>Free plan · 7/20 tasks</div>
          </div>
          <LogOut size={13} color="#333" style={{ cursor: "pointer", flexShrink: 0 }} />
        </div>
      </div>
    </aside>
  );
}
