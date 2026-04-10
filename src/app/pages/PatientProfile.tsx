import { useNavigate, useParams } from "react-router";
import { ArrowLeft, CheckCircle, XCircle, Calendar, ExternalLink } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { Layout } from "../components/Layout";
import { patients, emotionColors, emotionTrendData } from "../data/mockData";

const patientSessions = [
  { date: "Apr 10, 2026", time: "08:30 – 09:15", status: "Completed", emotion: "Anxious", report: true },
  { date: "Apr 7, 2026", time: "10:00 – 10:45", status: "Completed", emotion: "Neutral", report: true },
  { date: "Apr 3, 2026", time: "14:00 – 14:45", status: "Completed", emotion: "Sad", report: true },
  { date: "Mar 28, 2026", time: "09:30 – 10:15", status: "Cancelled", emotion: "—", report: false },
  { date: "Mar 24, 2026", time: "11:00 – 11:45", status: "Completed", emotion: "Anxious", report: true },
];

const patientAlerts = [
  { date: "Apr 10", time: "14:32", severity: "Critical", emotion: "Extreme Anxiety", status: "Triggered" },
  { date: "Apr 7", time: "10:18", severity: "High", emotion: "Anxiety", status: "Resolved" },
  { date: "Mar 28", time: "09:45", severity: "Medium", emotion: "Sadness", status: "Resolved" },
];

const severityColors: Record<string, string> = {
  Critical: "#E74C3C", High: "#E67E22", Medium: "#F1C40F", Low: "#3498DB",
};

export function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const patient = patients.find((p) => p.id === id) || patients[0];

  return (
    <Layout>
      <div className="p-6">
        {/* Back button */}
        <button
          onClick={() => navigate("/patients")}
          className="flex items-center gap-2 mb-4"
          style={{ fontSize: 13, color: "#6B7280", background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 500 }}
        >
          <ArrowLeft size={15} /> Back to Patients
        </button>

        {/* Patient Header Card */}
        <div style={{
          backgroundColor: "#FFFFFF", borderRadius: 10, padding: "20px 24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB", marginBottom: 16,
        }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center rounded-full text-white flex-shrink-0"
                style={{ width: 80, height: 80, backgroundColor: "#1A6B8A", fontSize: 24, fontWeight: 700 }}
              >
                {patient.initials}
              </div>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1A1A2E", margin: 0 }}>{patient.name}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <span style={{ fontSize: 13, color: "#6B7280" }}>ID: <strong style={{ color: "#1A6B8A" }}>{patient.id}</strong></span>
                  <span style={{ color: "#E5E7EB" }}>|</span>
                  <span style={{ fontSize: 13, color: "#6B7280" }}>Age: <strong style={{ color: "#374151" }}>{patient.age}</strong></span>
                  <span style={{ color: "#E5E7EB" }}>|</span>
                  <span style={{ fontSize: 13, color: "#6B7280" }}>{patient.phone}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end gap-2">
                <span style={{
                  fontSize: 15, fontWeight: 700, padding: "5px 16px", borderRadius: 6,
                  backgroundColor: (emotionColors[patient.lastEmotion] || "#95A5A6") + "18",
                  color: emotionColors[patient.lastEmotion] || "#95A5A6",
                  border: `1px solid ${emotionColors[patient.lastEmotion] || "#95A5A6"}`,
                }}>
                  {patient.lastEmotion}
                </span>
                <span style={{ fontSize: 12, color: patient.status === "Active" ? "#2ECC71" : "#9CA3AF", fontWeight: 600 }}>
                  ● {patient.status === "Active" ? "In Session" : "Not in Session"}
                </span>
              </div>
              <button style={{
                padding: "10px 18px", borderRadius: 8, backgroundColor: "#1A6B8A", color: "white",
                border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>
                Start Session
              </button>
            </div>
          </div>
        </div>

        {/* 3 Column Layout */}
        <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: "3fr 4fr 3fr" }}>
          {/* LEFT — Patient Info */}
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, padding: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB" }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 14 }}>Patient Information</h3>
            <div className="space-y-3">
              {[
                { label: "Full Name", value: patient.name },
                { label: "Date of Birth", value: "Mar 15, 1992" },
                { label: "Phone", value: patient.phone },
                { label: "Status", value: patient.status },
                { label: "Assigned Doctor", value: "Dr. Rania Haddad" },
                { label: "Registration Date", value: "Jan 10, 2025" },
              ].map(({ label, value }) => (
                <div key={label} style={{ borderBottom: "1px solid #F3F4F6", paddingBottom: 10 }}>
                  <p style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500, marginBottom: 2 }}>{label}</p>
                  <p style={{ fontSize: 13, color: "#1A1A2E", fontWeight: 500 }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Face Enrollment */}
            <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: "#EAFAF1", border: "1px solid #A9DFBF" }}>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} color="#2ECC71" />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#27AE60" }}>Face Registered</span>
              </div>
              <p style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>Enrolled on Feb 3, 2025</p>
            </div>
          </div>

          {/* MIDDLE — Emotion History Chart */}
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, padding: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E" }}>Emotion History</h3>
              <div className="flex gap-1">
                {["7 Days", "30 Days"].map((opt) => (
                  <button
                    key={opt}
                    style={{
                      padding: "4px 10px", borderRadius: 6, border: "1px solid #E5E7EB",
                      fontSize: 11, fontWeight: 500, cursor: "pointer",
                      backgroundColor: opt === "7 Days" ? "#1A6B8A" : "#F9FAFB",
                      color: opt === "7 Days" ? "white" : "#6B7280",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={emotionTrendData} margin={{ left: -20, right: 10 }}>
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #E5E7EB" }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="Anxious" stroke="#E67E22" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Happy" stroke="#2ECC71" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Neutral" stroke="#95A5A6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Sad" stroke="#3498DB" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: "#FEF5E7", border: "1px solid #F9D5A0" }}>
              <p style={{ fontSize: 12, color: "#6B7280" }}>Most frequent this week:</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#E67E22" }}>Anxious — 38% of sessions</p>
            </div>
          </div>

          {/* RIGHT — Sessions List */}
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, padding: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB", overflow: "hidden" }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 12 }}>Past Sessions</h3>
            <div className="space-y-3" style={{ maxHeight: 320, overflowY: "auto" }}>
              {patientSessions.map((s, i) => (
                <div key={i} style={{ borderBottom: "1px solid #F3F4F6", paddingBottom: 12 }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Calendar size={11} color="#9CA3AF" />
                        <p style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{s.date}</p>
                      </div>
                      <p style={{ fontSize: 11, color: "#9CA3AF" }}>{s.time}</p>
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 4,
                      backgroundColor: s.status === "Completed" ? "#EAFAF1" : "#FDEDEC",
                      color: s.status === "Completed" ? "#2ECC71" : "#E74C3C",
                    }}>
                      {s.status}
                    </span>
                  </div>
                  {s.emotion !== "—" && (
                    <span style={{
                      display: "inline-block", marginTop: 6, fontSize: 11, fontWeight: 600,
                      padding: "2px 7px", borderRadius: 4,
                      backgroundColor: (emotionColors[s.emotion] || "#95A5A6") + "18",
                      color: emotionColors[s.emotion] || "#95A5A6",
                    }}>
                      {s.emotion}
                    </span>
                  )}
                  {s.report && (
                    <button style={{
                      display: "flex", alignItems: "center", gap: 4, marginTop: 6,
                      fontSize: 11, color: "#1A6B8A", background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 500,
                    }}>
                      <ExternalLink size={11} /> View Report
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alert History Table */}
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #E5E7EB" }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E" }}>Alert History</h3>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#F9FAFB" }}>
                {["Date", "Time", "Severity", "Detected Emotion", "Status", "Action"].map((col) => (
                  <th key={col} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {patientAlerts.map((a, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #F3F4F6" }}>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "#374151" }}>{a.date}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "#374151", fontFamily: "monospace" }}>{a.time}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 4,
                      backgroundColor: (severityColors[a.severity] || "#3498DB") + "18",
                      color: severityColors[a.severity] || "#3498DB",
                    }}>
                      {a.severity}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "#374151" }}>{a.emotion}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 4,
                      backgroundColor: a.status === "Resolved" ? "#EAFAF1" : "#FDEDEC",
                      color: a.status === "Resolved" ? "#2ECC71" : "#E74C3C",
                    }}>
                      {a.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <button style={{ fontSize: 12, color: "#1A6B8A", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>
                      View Details
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
