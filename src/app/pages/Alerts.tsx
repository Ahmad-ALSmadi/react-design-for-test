import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, ShieldAlert, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Layout } from "../components/Layout";
import { alerts, severityColors } from "../data/mockData";

const statusTabs = ["All", "Triggered", "Acknowledged", "Resolved"];
const severities = ["All", "Critical", "High", "Medium", "Low"];

const severityIcons: Record<string, React.ReactNode> = {
  Critical: <ShieldAlert size={18} color="#E74C3C" />,
  High: <ShieldAlert size={18} color="#E67E22" />,
  Medium: <ShieldAlert size={18} color="#F1C40F" />,
  Low: <ShieldAlert size={18} color="#3498DB" />,
};

const emotionEmoji: Record<string, string> = {
  "Extreme Anxiety": "😰",
  "Fearfulness": "😨",
  "Anger": "😡",
  "Sadness": "😢",
  "Anxiety": "😟",
};

export function Alerts() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [alertStatuses, setAlertStatuses] = useState<Record<number, string>>(
    Object.fromEntries(alerts.map((a) => [a.id, a.status]))
  );

  const filtered = alerts.filter((a) => {
    const matchTab = activeTab === "All" || alertStatuses[a.id] === activeTab;
    const matchSeverity = severityFilter === "All" || a.severity === severityFilter;
    const matchSearch = search === "" || a.patient.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSeverity && matchSearch;
  });

  const handleAcknowledge = (id: number) => {
    setAlertStatuses((prev) => ({ ...prev, [id]: "Acknowledged" }));
  };

  const handleResolve = (id: number) => {
    setAlertStatuses((prev) => ({ ...prev, [id]: "Resolved" }));
  };

  return (
    <Layout title="Alerts Center">
      <div className="p-6">
        {/* Filter Bar */}
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, padding: "16px 18px", marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB" }}>
          <div className="flex items-center gap-4 flex-wrap">
            {/* Status Tabs */}
            <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: "#F5F7FA" }}>
              {statusTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "6px 14px", borderRadius: 6, border: "none", cursor: "pointer",
                    fontSize: 13, fontWeight: 500,
                    backgroundColor: activeTab === tab ? "#1A6B8A" : "transparent",
                    color: activeTab === tab ? "white" : "#6B7280",
                    transition: "all 0.15s",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Severity */}
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13, color: "#374151", backgroundColor: "#FFFFFF", outline: "none" }}
            >
              {severities.map((s) => <option key={s}>{s === "All" ? "All Severities" : s}</option>)}
            </select>

            {/* Date Range */}
            <input
              type="date"
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13, color: "#374151", backgroundColor: "#FFFFFF", outline: "none" }}
            />

            {/* Search */}
            <div className="relative ml-auto">
              <Search size={14} color="#9CA3AF" className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patient..."
                style={{
                  paddingLeft: 32, paddingRight: 12, height: 38, borderRadius: 8,
                  border: "1px solid #E5E7EB", fontSize: 13, color: "#1A1A2E", outline: "none", backgroundColor: "#FFFFFF",
                }}
              />
            </div>
          </div>
        </div>

        {/* Alert Cards */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24" style={{ backgroundColor: "#FFFFFF", borderRadius: 10, border: "1px solid #E5E7EB" }}>
            <div className="flex items-center justify-center rounded-full mb-4" style={{ width: 80, height: 80, backgroundColor: "#EAFAF1" }}>
              <CheckCircle2 size={40} color="#2ECC71" />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1A1A2E", margin: 0 }}>No Active Alerts</h3>
            <p style={{ fontSize: 14, color: "#6B7280", marginTop: 6 }}>All patients are stable. No alerts to display.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((alert) => {
              const status = alertStatuses[alert.id];
              const color = severityColors[alert.severity] || "#3498DB";
              return (
                <div
                  key={alert.id}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 10,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                    border: "1px solid #E5E7EB",
                    borderLeft: `4px solid ${color}`,
                    display: "flex",
                    overflow: "hidden",
                    opacity: status === "Resolved" ? 0.65 : 1,
                    transition: "opacity 0.2s",
                  }}
                >
                  {/* Content */}
                  <div className="flex-1 p-5">
                    {/* Row 1 */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {severityIcons[alert.severity]}
                        <span style={{
                          fontSize: 12, fontWeight: 700, padding: "2px 8px", borderRadius: 4,
                          backgroundColor: color + "18", color,
                        }}>
                          {alert.severity.toUpperCase()}
                        </span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E" }}>
                          {alert.severity.toUpperCase()} ALERT
                        </span>
                      </div>
                      <span style={{ fontSize: 12, color: "#9CA3AF" }}>{alert.time}</span>
                    </div>

                    {/* Row 2 */}
                    <div className="flex items-center gap-3 mb-2">
                      <button
                        onClick={() => navigate(`/patients/${alert.patientId}`)}
                        style={{ fontSize: 14, fontWeight: 600, color: "#1A6B8A", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                      >
                        {alert.patient}
                      </button>
                      <span style={{ fontSize: 12, color: "#9CA3AF" }}>•</span>
                      <span style={{ fontSize: 13, color: "#6B7280" }}>{alert.camera}</span>
                    </div>

                    {/* Row 3 */}
                    <div className="flex items-center gap-2 mb-3">
                      <span style={{ fontSize: 22 }}>{emotionEmoji[alert.emotion] || "⚠️"}</span>
                      <span style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E" }}>{alert.emotion}</span>
                      <span style={{ fontSize: 14, color: "#6B7280" }}>—</span>
                      <span style={{ fontSize: 15, fontWeight: 700, color }}>
                        {alert.percentage}%
                      </span>
                    </div>

                    {/* Row 4 — Breakdown chips */}
                    <div className="flex gap-2">
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, backgroundColor: "#FEF5E7", color: "#E67E22", fontWeight: 500 }}>
                        Anxious {alert.percentage}%
                      </span>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, backgroundColor: "#F2F3F4", color: "#6B7280", fontWeight: 500 }}>
                        Neutral {Math.max(0, 100 - alert.percentage - 5)}%
                      </span>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, backgroundColor: "#EBF5FB", color: "#3498DB", fontWeight: 500 }}>
                        Sad 5%
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 justify-center p-4" style={{ borderLeft: "1px solid #F3F4F6", minWidth: 140 }}>
                    {status === "Triggered" && (
                      <button
                        onClick={() => handleAcknowledge(alert.id)}
                        style={{
                          padding: "8px 14px", borderRadius: 7, cursor: "pointer",
                          backgroundColor: "transparent", color: "#1A6B8A", fontSize: 12, fontWeight: 600,
                          border: "1.5px solid #1A6B8A",
                        }}
                      >
                        Acknowledge
                      </button>
                    )}
                    {status !== "Resolved" && (
                      <button
                        onClick={() => handleResolve(alert.id)}
                        style={{
                          padding: "8px 14px", borderRadius: 7, cursor: "pointer",
                          backgroundColor: "#2ECC71", color: "white", fontSize: 12, fontWeight: 600, border: "none",
                        }}
                      >
                        Resolve
                      </button>
                    )}
                    {status === "Resolved" && (
                      <div className="flex items-center gap-1.5" style={{ color: "#2ECC71" }}>
                        <CheckCircle2 size={14} />
                        <span style={{ fontSize: 12, fontWeight: 600 }}>Resolved</span>
                      </div>
                    )}
                    <button
                      onClick={() => navigate(`/patients/${alert.patientId}`)}
                      style={{
                        padding: "6px 14px", borderRadius: 7, cursor: "pointer",
                        backgroundColor: "transparent", color: "#6B7280", fontSize: 12, fontWeight: 500, border: "none",
                      }}
                    >
                      View Patient
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
