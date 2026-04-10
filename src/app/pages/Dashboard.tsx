import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Users, Activity, Bell, Camera, Eye, ChevronRight
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { Layout } from "../components/Layout";
import { emotionChartData, alerts, sessions, patients, emotionColors, emotionBgColors } from "../data/mockData";

const statCards = [
  {
    label: "Total Patients Today",
    value: "24",
    icon: Users,
    accent: "#1A6B8A",
    lightBg: "#EBF5FB",
    delta: "+3 from yesterday",
  },
  {
    label: "Active Sessions",
    value: "3",
    icon: Activity,
    accent: "#2ECC71",
    lightBg: "#EAFAF1",
    delta: "1 in progress now",
    pulse: true,
  },
  {
    label: "Pending Alerts",
    value: "2",
    icon: Bell,
    accent: "#E74C3C",
    lightBg: "#FDEDEC",
    delta: "Requires attention",
    urgent: true,
  },
  {
    label: "Cameras Online",
    value: "4/5",
    icon: Camera,
    accent: "#3498DB",
    lightBg: "#EBF5FB",
    delta: "1 offline",
  },
];

const statusBadge = (status: string) => {
  const styles: Record<string, { bg: string; color: string }> = {
    "Done": { bg: "#F3F4F6", color: "#6B7280" },
    "In Progress": { bg: "#EAFAF1", color: "#2ECC71" },
    "Scheduled": { bg: "#EBF5FB", color: "#3498DB" },
    "Cancelled": { bg: "#FDEDEC", color: "#E74C3C" },
  };
  const s = styles[status] || styles["Scheduled"];
  return (
    <span style={{
      fontSize: 11,
      fontWeight: 600,
      padding: "2px 8px",
      borderRadius: 4,
      backgroundColor: s.bg,
      color: s.color,
    }}>
      {status}
    </span>
  );
};

export function Dashboard() {
  const navigate = useNavigate();
  const [emotionFilter, setEmotionFilter] = useState("Today");

  const pendingAlerts = alerts.filter(a => a.status === "Triggered");
  const highDistressPatients = patients.filter(p => p.hasAlert);

  return (
    <Layout>
      <div className="p-6 space-y-5">
        {/* Stats Row */}
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 10,
                padding: "20px 20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                border: "1px solid #E5E7EB",
              }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p style={{ fontSize: 12, color: "#6B7280", fontWeight: 500, marginBottom: 4 }}>{card.label}</p>
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: 32, fontWeight: 700, color: "#1A1A2E", lineHeight: 1 }}>{card.value}</span>
                      {card.pulse && (
                        <span className="animate-pulse rounded-full" style={{ width: 10, height: 10, backgroundColor: "#2ECC71", display: "inline-block" }} />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-center rounded-xl" style={{ width: 44, height: 44, backgroundColor: card.lightBg }}>
                    <Icon size={20} color={card.accent} />
                  </div>
                </div>
                <p style={{ fontSize: 12, color: card.urgent ? "#E74C3C" : "#6B7280" }}>{card.delta}</p>
              </div>
            );
          })}
        </div>

        {/* Middle Row */}
        <div className="grid gap-4" style={{ gridTemplateColumns: "3fr 2fr" }}>
          {/* Emotion Overview */}
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB" }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1A1A2E" }}>Today's Emotion Overview</h2>
                <p style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>Emotion distribution across all patients</p>
              </div>
              <select
                value={emotionFilter}
                onChange={(e) => setEmotionFilter(e.target.value)}
                style={{ fontSize: 12, padding: "6px 10px", borderRadius: 6, border: "1px solid #E5E7EB", color: "#374151", backgroundColor: "#F9FAFB", outline: "none" }}
              >
                <option>Today</option>
                <option>This Week</option>
              </select>
            </div>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={emotionChartData} layout="vertical" barSize={20} margin={{ left: 10, right: 30 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="emotion" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} width={60} />
                  <Tooltip
                    formatter={(value: number, name: string, props: any) => [`${props.payload.percentage}% — ${value} patients`, ""]}
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    labelStyle={{ display: "none" }}
                  />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                    {emotionChartData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
              {emotionChartData.map((e) => (
                <div key={e.emotion} className="flex items-center gap-1.5">
                  <div className="rounded-full" style={{ width: 8, height: 8, backgroundColor: e.color }} />
                  <span style={{ fontSize: 11, color: "#6B7280" }}>{e.emotion} {e.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Alerts */}
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1A1A2E" }}>Recent Alerts</h2>
              <span style={{ fontSize: 11, backgroundColor: "#FDEDEC", color: "#E74C3C", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>
                {pendingAlerts.length} Active
              </span>
            </div>
            <div className="space-y-3">
              {alerts.slice(0, 4).map((alert) => {
                const severityColors: Record<string, string> = {
                  Critical: "#E74C3C", High: "#E67E22", Medium: "#F1C40F", Low: "#3498DB"
                };
                return (
                  <div key={alert.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: "#F9FAFB", border: "1px solid #F3F4F6" }}>
                    <div className="rounded-full flex-shrink-0 animate-pulse" style={{ width: 10, height: 10, backgroundColor: severityColors[alert.severity] }} />
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>{alert.patient}</p>
                      <p style={{ fontSize: 11, color: "#6B7280" }}>{alert.emotion}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span style={{ fontSize: 10, color: "#9CA3AF" }}>{alert.time}</span>
                      <button
                        onClick={() => navigate("/alerts")}
                        style={{ fontSize: 11, color: "#1A6B8A", padding: "2px 8px", borderRadius: 4, border: "1px solid #1A6B8A", backgroundColor: "transparent", cursor: "pointer", fontWeight: 500 }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => navigate("/alerts")}
              className="flex items-center gap-1 mt-4"
              style={{ fontSize: 13, color: "#1A6B8A", fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              View All Alerts <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {/* Upcoming Sessions */}
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1A1A2E" }}>Upcoming Sessions Today</h2>
              <button onClick={() => navigate("/sessions")} style={{ fontSize: 12, color: "#1A6B8A", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>
                View All
              </button>
            </div>
            <div className="space-y-2.5">
              {sessions.map((s) => (
                <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: "#F9FAFB" }}>
                  <div className="text-center flex-shrink-0" style={{ width: 40 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#1A6B8A" }}>{s.time}</p>
                  </div>
                  <div
                    className="flex-shrink-0 rounded-full"
                    style={{ width: 6, height: 6, backgroundColor: s.status === "In Progress" ? "#2ECC71" : s.status === "Done" ? "#9CA3AF" : "#3498DB" }}
                  />
                  <div className="flex-1">
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>{s.patient}</p>
                    <p style={{ fontSize: 11, color: "#6B7280" }}>{s.doctor}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full" style={{ width: 8, height: 8, backgroundColor: emotionColors[s.emotion] || "#95A5A6" }} />
                    {statusBadge(s.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patients Requiring Attention */}
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1A1A2E" }}>Patients Requiring Attention</h2>
              <span style={{ fontSize: 11, color: "#E74C3C", fontWeight: 600 }}>AI Flagged</span>
            </div>
            <div className="space-y-3">
              {highDistressPatients.map((p) => (
                <div key={p.id} className="flex items-center gap-3 p-3 rounded-lg"
                  style={{ backgroundColor: "#FFF5F5", border: "1px solid #FECACA" }}>
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0 text-white"
                    style={{ width: 40, height: 40, backgroundColor: "#1A6B8A", fontSize: 13, fontWeight: 700 }}
                  >
                    {p.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>{p.name}</p>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "1px 8px",
                      borderRadius: 4,
                      backgroundColor: emotionBgColors[p.lastEmotion] || "#FEF5E7",
                      color: emotionColors[p.lastEmotion] || "#E67E22",
                    }}>
                      {p.lastEmotion}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/patients/${p.id}`)}
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "6px 12px",
                      borderRadius: 6,
                      backgroundColor: "#E74C3C",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Prioritize
                  </button>
                </div>
              ))}
              {highDistressPatients.length === 0 && (
                <div className="text-center py-6">
                  <p style={{ fontSize: 14, color: "#6B7280" }}>No patients flagged</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
