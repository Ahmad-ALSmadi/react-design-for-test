import { Download, FileText } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Layout } from "../components/Layout";
import { emotionTrendData, alertsByWeekData, sessionsPerDayData } from "../data/mockData";

const summaryCards = [
  { label: "Total Sessions", value: "142", icon: "📋", color: "#1A6B8A", bg: "#EBF5FB" },
  { label: "Avg Session Duration", value: "47 min", icon: "⏱", color: "#2ECC71", bg: "#EAFAF1" },
  { label: "Most Common Emotion", value: "Anxious", icon: "😟", color: "#E67E22", bg: "#FEF5E7" },
  { label: "Alerts Triggered", value: "23", icon: "🔔", color: "#E74C3C", bg: "#FDEDEC" },
  { label: "Patients Monitored", value: "38", icon: "👤", color: "#9B59B6", bg: "#F5EEF8" },
];

const pieData = [
  { name: "Happy", value: 28, color: "#2ECC71" },
  { name: "Neutral", value: 22, color: "#95A5A6" },
  { name: "Anxious", value: 25, color: "#E67E22" },
  { name: "Sad", value: 13, color: "#3498DB" },
  { name: "Angry", value: 7, color: "#E74C3C" },
  { name: "Fearful", value: 5, color: "#9B59B6" },
];

const topDistressed = [
  { rank: 1, patient: "Ahmed Al-Rashidi", sessions: 8, emotion: "Anxious", alerts: 4 },
  { rank: 2, patient: "Fatima Al-Zahra", sessions: 6, emotion: "Fearful", alerts: 3 },
  { rank: 3, patient: "Nora Al-Qahtani", sessions: 5, emotion: "Angry", alerts: 2 },
  { rank: 4, patient: "Khalid Ibrahim", sessions: 7, emotion: "Sad", alerts: 1 },
  { rank: 5, patient: "Layla Al-Amri", sessions: 4, emotion: "Anxious", alerts: 1 },
];

const emotionColors: Record<string, string> = {
  Happy: "#2ECC71", Neutral: "#95A5A6", Sad: "#3498DB",
  Anxious: "#E67E22", Angry: "#E74C3C", Fearful: "#9B59B6",
};

export function Reports() {
  return (
    <Layout title="Reports & Analytics">
      <div className="p-6 space-y-5">
        {/* Top Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
            <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>From:</span>
            <input type="date" defaultValue="2026-04-01" style={{ border: "none", outline: "none", fontSize: 13, color: "#374151", backgroundColor: "transparent" }} />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
            <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>To:</span>
            <input type="date" defaultValue="2026-04-10" style={{ border: "none", outline: "none", fontSize: 13, color: "#374151", backgroundColor: "transparent" }} />
          </div>
          <select style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13, color: "#374151", backgroundColor: "#FFFFFF", outline: "none" }}>
            <option>All Patients</option>
            <option>Ahmed Al-Rashidi</option>
            <option>Sara Mohammed</option>
          </select>
          <div className="flex gap-2 ml-auto">
            <button style={{
              display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 8,
              backgroundColor: "#E74C3C", color: "white", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>
              <Download size={14} /> Export PDF
            </button>
            <button style={{
              display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 8,
              backgroundColor: "#FFFFFF", color: "#374151", border: "1px solid #E5E7EB", fontSize: 13, fontWeight: 500, cursor: "pointer",
            }}>
              <FileText size={14} /> Export CSV
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
          {summaryCards.map((card) => (
            <div key={card.label} style={{
              backgroundColor: "#FFFFFF", borderRadius: 10, padding: "16px 18px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB",
            }}>
              <div className="flex items-center gap-2 mb-2">
                <span style={{ fontSize: 22 }}>{card.icon}</span>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: card.color }} />
              </div>
              <p style={{ fontSize: 22, fontWeight: 700, color: "#1A1A2E", margin: 0 }}>{card.value}</p>
              <p style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>{card.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {/* Emotion Trends */}
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, padding: "18px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A1A2E", marginBottom: 14 }}>Emotion Trends Over Time</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={emotionTrendData} margin={{ left: -20, right: 10 }}>
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #E5E7EB" }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="Happy" stroke="#2ECC71" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Anxious" stroke="#E67E22" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Neutral" stroke="#95A5A6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Sad" stroke="#3498DB" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Angry" stroke="#E74C3C" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Emotion Distribution Donut */}
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, padding: "18px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A1A2E", marginBottom: 14 }}>Emotion Distribution</h3>
            <div className="flex items-center gap-4">
              <div style={{ height: 200, flex: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={2}>
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v, n) => [`${v}%`, n]} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {pieData.map((e) => (
                  <div key={e.name} className="flex items-center gap-2">
                    <div className="rounded-full" style={{ width: 10, height: 10, backgroundColor: e.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "#374151" }}>{e.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#1A1A2E" }}>{e.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {/* Alerts by Severity */}
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, padding: "18px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A1A2E", marginBottom: 14 }}>Alerts by Severity (By Week)</h3>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={alertsByWeekData} barSize={16} margin={{ left: -20 }}>
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #E5E7EB" }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="Critical" fill="#E74C3C" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="High" fill="#E67E22" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="Medium" fill="#F1C40F" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="Low" fill="#3498DB" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sessions per Day */}
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, padding: "18px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A1A2E", marginBottom: 14 }}>Sessions per Day</h3>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sessionsPerDayData} barSize={18} margin={{ left: -20 }}>
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #E5E7EB" }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="Completed" fill="#2ECC71" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="Cancelled" fill="#E74C3C" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="InProgress" fill="#F39C12" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Distressed Patients Table */}
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #E5E7EB" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A1A2E" }}>Top Distressed Patients This Week</h3>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#F9FAFB" }}>
                {["Rank", "Patient", "Sessions", "Dominant Emotion", "Alert Count", "Action"].map((col) => (
                  <th key={col} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topDistressed.map((row) => (
                <tr key={row.rank} style={{ borderBottom: "1px solid #F3F4F6" }}>
                  <td style={{ padding: "12px 16px" }}>
                    <div className="flex items-center justify-center rounded-full font-bold"
                      style={{ width: 28, height: 28, backgroundColor: row.rank === 1 ? "#FEF5E7" : "#F3F4F6", color: row.rank === 1 ? "#E67E22" : "#6B7280", fontSize: 13 }}>
                      {row.rank}
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>{row.patient}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "#374151" }}>{row.sessions}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{
                      fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 4,
                      backgroundColor: (emotionColors[row.emotion] || "#95A5A6") + "18",
                      color: emotionColors[row.emotion] || "#95A5A6",
                    }}>
                      {row.emotion}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{
                      fontSize: 12, fontWeight: 700, padding: "3px 8px", borderRadius: 4,
                      backgroundColor: row.alerts >= 3 ? "#FDEDEC" : "#FEF5E7",
                      color: row.alerts >= 3 ? "#E74C3C" : "#E67E22",
                    }}>
                      {row.alerts} {row.alerts === 1 ? "alert" : "alerts"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <button style={{ fontSize: 12, color: "#1A6B8A", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>
                      View Profile →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
