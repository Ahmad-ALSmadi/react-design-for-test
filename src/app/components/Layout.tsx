import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard, Users, Camera, CalendarDays, Bell, BarChart2,
  Video, UserCog, Settings, LogOut, ChevronRight, Brain
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Patients", icon: Users, path: "/patients" },
  { label: "Live Monitor", icon: Camera, path: "/live-monitor", badge: "LIVE" },
  { label: "Sessions", icon: CalendarDays, path: "/sessions" },
  { label: "Alerts", icon: Bell, path: "/alerts", badge: "3" },
  { label: "Reports", icon: BarChart2, path: "/reports" },
  { label: "Cameras", icon: Video, path: "/cameras" },
  { label: "Staff", icon: UserCog, path: "/staff" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

const breadcrumbMap: Record<string, string[]> = {
  "/dashboard": ["Dashboard"],
  "/patients": ["Patients", "Patient List"],
  "/patients/profile": ["Patients", "Patient Profile"],
  "/live-monitor": ["Live Monitor"],
  "/sessions": ["Sessions"],
  "/alerts": ["Alerts Center"],
  "/reports": ["Reports & Analytics"],
  "/cameras": ["Camera Management"],
  "/staff": ["Staff Management"],
  "/settings": ["Settings"],
};

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [, setHoveredItem] = useState<string | null>(null);

  const pathKey = Object.keys(breadcrumbMap).find(key => location.pathname.startsWith(key)) || "/dashboard";
  const breadcrumbs = breadcrumbMap[pathKey] || ["Dashboard"];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {/* Sidebar */}
      <aside className="flex flex-col flex-shrink-0 overflow-y-auto" style={{ width: 240, backgroundColor: "#0F2B3D" }}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-4" style={{ height: 72, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center justify-center rounded-xl" style={{ width: 44, height: 44, backgroundColor: "#1A6B8A" }}>
            <Brain size={24} color="white" />
          </div>
          <div>
            <div className="text-white" style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.2 }}>MindWatch</div>
            <div style={{ fontSize: 11, color: "#7BA8C4", fontWeight: 500 }}>Clinic System</div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-3 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== "/dashboard" && location.pathname.startsWith(item.path));
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 8,
                  marginBottom: 2,
                  textDecoration: "none",
                  position: "relative",
                  backgroundColor: isActive ? "rgba(26, 107, 138, 0.2)" : "transparent",
                  borderLeft: isActive ? "3px solid #1A6B8A" : "3px solid transparent",
                  transition: "all 0.15s ease",
                }}
                className="group"
              >
                <Icon
                  size={18}
                  color={isActive ? "#1A6B8A" : "#7BA8C4"}
                  style={{ flexShrink: 0 }}
                />
                <span style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: isActive ? "#E8F4F8" : "#94B8CC",
                  flex: 1,
                }}>
                  {item.label}
                </span>
                {item.badge === "LIVE" && (
                  <span style={{
                    fontSize: 9,
                    fontWeight: 700,
                    backgroundColor: "#2ECC71",
                    color: "white",
                    padding: "2px 5px",
                    borderRadius: 4,
                    letterSpacing: "0.5px",
                  }}>
                    LIVE
                  </span>
                )}
                {item.badge && item.badge !== "LIVE" && (
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    backgroundColor: "#E74C3C",
                    color: "white",
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom user section */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "16px 12px" }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center rounded-full text-white text-sm font-semibold flex-shrink-0"
              style={{ width: 36, height: 36, backgroundColor: "#1A6B8A" }}>
              HA
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white truncate" style={{ fontSize: 13, fontWeight: 600 }}>Hind Al-Shamrani</div>
              <div style={{ fontSize: 11, color: "#7BA8C4" }}>System Admin</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full rounded-lg px-3 py-2 transition-all"
            style={{ backgroundColor: "rgba(231,76,60,0.1)", border: "1px solid rgba(231,76,60,0.2)" }}
          >
            <LogOut size={14} color="#E74C3C" />
            <span style={{ fontSize: 13, color: "#E74C3C", fontWeight: 500 }}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-6 flex-shrink-0"
          style={{ height: 60, backgroundColor: "#FFFFFF", borderBottom: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            {breadcrumbs.map((crumb, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {idx > 0 && <ChevronRight size={14} color="#9CA3AF" />}
                <span style={{
                  fontSize: 14,
                  color: idx === breadcrumbs.length - 1 ? "#1A1A2E" : "#6B7280",
                  fontWeight: idx === breadcrumbs.length - 1 ? 600 : 400,
                }}>
                  {crumb}
                </span>
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: "#F5F7FA", border: "1px solid #E5E7EB" }}>
              <div className="rounded-full animate-pulse" style={{ width: 8, height: 8, backgroundColor: "#2ECC71" }} />
              <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>4/5 Cameras Online</span>
            </div>
            <div className="relative">
              <Bell size={18} color="#6B7280" />
              <span className="absolute -top-1 -right-1 flex items-center justify-center rounded-full text-white"
                style={{ width: 16, height: 16, backgroundColor: "#E74C3C", fontSize: 10, fontWeight: 700 }}>3</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-full text-white text-xs font-semibold"
                style={{ width: 32, height: 32, backgroundColor: "#1A6B8A" }}>
                HA
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#1A1A2E" }}>Hind Al-Shamrani</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto" style={{ backgroundColor: "#F5F7FA" }}>
          {title && (
            <div className="px-6 pt-5 pb-0">
              <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1A1A2E" }}>{title}</h1>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
