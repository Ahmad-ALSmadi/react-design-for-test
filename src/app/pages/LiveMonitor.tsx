import { useState } from "react";
import {
  Camera, Maximize2, Pause, Image, RefreshCw,
  Bell, FileText, BarChart2, Plus, User
} from "lucide-react";
import { Layout } from "../components/Layout";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const cameras = [
  { id: 1, label: "Camera 1 — Waiting Room" },
  { id: 2, label: "Camera 2 — Hall" },
];

const emotionBreakdown = [
  { name: "Anxious", value: 87, color: "#E67E22" },
  { name: "Neutral", value: 8, color: "#95A5A6" },
  { name: "Sad", value: 5, color: "#3498DB" },
];

const bodyLanguage = [
  { label: "Posture", value: "Tense", color: "#E74C3C" },
  { label: "Movement", value: "Restless", color: "#E67E22" },
  { label: "Eye Contact", value: "Avoidant", color: "#9B59B6" },
];

const recentHistory = [
  { time: "14:32", emotion: "Anxious", pct: 87 },
  { time: "14:30", emotion: "Anxious", pct: 82 },
  { time: "14:28", emotion: "Neutral", pct: 61 },
  { time: "14:26", emotion: "Anxious", pct: 75 },
  { time: "14:24", emotion: "Sad", pct: 58 },
  { time: "14:22", emotion: "Neutral", pct: 70 },
  { time: "14:20", emotion: "Anxious", pct: 90 },
  { time: "14:18", emotion: "Fearful", pct: 65 },
];

const emotionColors: Record<string, string> = {
  Anxious: "#E67E22", Neutral: "#95A5A6", Sad: "#3498DB",
  Happy: "#2ECC71", Angry: "#E74C3C", Fearful: "#9B59B6", Disgusted: "#8B4513",
};

const detectedPatients = [
  { name: "Ahmed Al-Rashidi", emotion: "Anxious", initials: "AA" },
  { name: "Sara Mohammed", emotion: "Neutral", initials: "SM" },
];

export function LiveMonitor() {
  const [activeCamera, setActiveCamera] = useState(1);
  const [alertTriggered, setAlertTriggered] = useState(false);

  return (
    <Layout>
      <div className="flex flex-col" style={{ height: "calc(100vh - 60px)" }}>
        {/* Camera Tabs */}
        <div className="flex items-center gap-1 px-5 pt-4 pb-0" style={{ borderBottom: "1px solid #E5E7EB", backgroundColor: "#FFFFFF" }}>
          {cameras.map((cam) => (
            <button
              key={cam.id}
              onClick={() => setActiveCamera(cam.id)}
              style={{
                padding: "10px 18px",
                fontSize: 13,
                fontWeight: 600,
                borderRadius: "8px 8px 0 0",
                border: "none",
                cursor: "pointer",
                borderBottom: activeCamera === cam.id ? "2px solid #1A6B8A" : "2px solid transparent",
                color: activeCamera === cam.id ? "#1A6B8A" : "#6B7280",
                backgroundColor: activeCamera === cam.id ? "#EBF5FB" : "transparent",
              }}
            >
              {cam.label}
            </button>
          ))}
          <button style={{
            display: "flex", alignItems: "center", gap: 6, padding: "10px 14px",
            fontSize: 13, fontWeight: 500, borderRadius: "8px 8px 0 0",
            border: "none", cursor: "pointer", color: "#1A6B8A", backgroundColor: "transparent",
          }}>
            <Plus size={14} /> Add Camera
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 gap-4 p-5 overflow-hidden">
          {/* LEFT — Video Feed */}
          <div className="flex flex-col" style={{ flex: "0 0 65%" }}>
            {/* Video Feed */}
            <div className="relative rounded-xl overflow-hidden" style={{ backgroundColor: "#1a1a1a", aspectRatio: "16/9" }}>
              {/* Camera feed placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera size={64} color="rgba(255,255,255,0.08)" />
              </div>

              {/* Grid overlay */}
              <div className="absolute inset-0" style={{
                backgroundImage: "linear-gradient(rgba(26,107,138,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,107,138,0.05) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }} />

              {/* Face detection box */}
              <div className="absolute" style={{ top: "25%", left: "35%", width: 160, height: 200, border: "2px solid #2ECC71", borderRadius: 4 }}>
                {/* Patient name tag */}
                <div className="absolute -top-7 left-0 flex items-center gap-1.5 px-2 py-1 rounded" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
                  <User size={11} color="#2ECC71" />
                  <span style={{ fontSize: 11, color: "white", fontWeight: 600, whiteSpace: "nowrap" }}>Ahmed Al-Rashidi</span>
                </div>
                {/* Emotion badge */}
                <div className="absolute -bottom-8 left-0">
                  <span style={{
                    fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 4,
                    backgroundColor: "#E67E22", color: "white", whiteSpace: "nowrap",
                  }}>
                    ANXIOUS 87%
                  </span>
                </div>
                {/* Corner dots */}
                {[["top-0 left-0", "-translate-x-0.5 -translate-y-0.5"], ["top-0 right-0", "translate-x-0.5 -translate-y-0.5"], ["bottom-0 left-0", "-translate-x-0.5 translate-y-0.5"], ["bottom-0 right-0", "translate-x-0.5 translate-y-0.5"]].map(([pos], i) => (
                  <div key={i} className={`absolute ${pos} rounded-full`} style={{ width: 8, height: 8, backgroundColor: "#2ECC71" }} />
                ))}
              </div>

              {/* Body skeleton lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.25 }}>
                <line x1="52%" y1="45%" x2="52%" y2="75%" stroke="#2ECC71" strokeWidth="1.5" />
                <line x1="40%" y1="55%" x2="64%" y2="55%" stroke="#2ECC71" strokeWidth="1.5" />
                <line x1="52%" y1="75%" x2="45%" y2="95%" stroke="#2ECC71" strokeWidth="1.5" />
                <line x1="52%" y1="75%" x2="59%" y2="95%" stroke="#2ECC71" strokeWidth="1.5" />
                <line x1="40%" y1="55%" x2="34%" y2="70%" stroke="#2ECC71" strokeWidth="1.5" />
                <line x1="64%" y1="55%" x2="70%" y2="70%" stroke="#2ECC71" strokeWidth="1.5" />
              </svg>

              {/* Live indicator */}
              <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: "rgba(0,0,0,0.65)" }}>
                <div className="rounded-full animate-pulse" style={{ width: 8, height: 8, backgroundColor: "#E74C3C" }} />
                <span style={{ fontSize: 11, color: "white", fontWeight: 600 }}>LIVE</span>
              </div>

              {/* Timestamp */}
              <div className="absolute top-3 right-3 px-2 py-1 rounded" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
                <span style={{ fontSize: 11, color: "white", fontFamily: "monospace" }}>14:32:47</span>
              </div>
            </div>

            {/* Camera Controls */}
            <div className="flex items-center justify-between mt-3 p-3 rounded-lg" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
              <div className="flex items-center gap-2">
                <Camera size={16} color="#6B7280" />
                <div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>Camera 1 — Waiting Room</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="rounded-full animate-pulse" style={{ width: 7, height: 7, backgroundColor: "#2ECC71" }} />
                    <span style={{ fontSize: 11, color: "#2ECC71", fontWeight: 500 }}>Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {[{ icon: Image, label: "Snapshot" }, { icon: Pause, label: "Pause" }, { icon: Maximize2, label: "Fullscreen" }].map(({ icon: Icon, label }) => (
                  <button key={label} title={label} style={{
                    display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 6,
                    border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB", cursor: "pointer", fontSize: 12, color: "#374151", fontWeight: 500,
                  }}>
                    <Icon size={14} /> {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Detected Patients Row */}
            <div className="mt-3">
              <p style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", marginBottom: 8 }}>Detected Patients in Frame</p>
              <div className="flex gap-3">
                {detectedPatients.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", minWidth: 160 }}>
                    <div className="flex items-center justify-center rounded-full text-white flex-shrink-0" style={{ width: 36, height: 36, backgroundColor: "#1A6B8A", fontSize: 12, fontWeight: 700 }}>
                      {p.initials}
                    </div>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 600, color: "#1A1A2E" }}>{p.name}</p>
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: "1px 7px", borderRadius: 4,
                        backgroundColor: emotionColors[p.emotion] + "22",
                        color: emotionColors[p.emotion],
                      }}>
                        {p.emotion}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Analysis Panel */}
          <div className="flex flex-col gap-3 overflow-y-auto" style={{ flex: "0 0 35%" }}>
            {/* Current Patient Analysis */}
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, padding: 16, border: "1px solid #E5E7EB" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 12 }}>Current Patient Analysis</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center rounded-full text-white flex-shrink-0" style={{ width: 56, height: 56, backgroundColor: "#1A6B8A", fontSize: 16, fontWeight: 700 }}>
                  AA
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E" }}>Ahmed Al-Rashidi</p>
                  <p style={{ fontSize: 12, color: "#6B7280" }}>Patient ID: P-001</p>
                </div>
              </div>

              {/* Current Emotion Badge */}
              <div className="flex items-center justify-between mb-3">
                <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>Current Emotion</span>
                <span style={{
                  fontSize: 16, fontWeight: 700, padding: "4px 14px", borderRadius: 6,
                  backgroundColor: "#FEF5E7", color: "#E67E22", border: "1px solid #E67E22",
                }}>
                  ANXIOUS
                </span>
              </div>

              {/* Confidence */}
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span style={{ fontSize: 12, color: "#6B7280" }}>Confidence Score</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#E67E22" }}>87%</span>
                </div>
                <div style={{ height: 6, backgroundColor: "#F3F4F6", borderRadius: 3 }}>
                  <div style={{ height: "100%", width: "87%", backgroundColor: "#E67E22", borderRadius: 3 }} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <RefreshCw size={12} color="#9CA3AF" />
                <span style={{ fontSize: 11, color: "#9CA3AF" }}>Last updated: 2 seconds ago</span>
              </div>
            </div>

            {/* Emotion Breakdown */}
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, padding: 16, border: "1px solid #E5E7EB" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 12 }}>Emotion Breakdown</h3>
              <div style={{ height: 140 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={emotionBreakdown} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" startAngle={90} endAngle={-270}>
                      {emotionBreakdown.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => [`${v}%`, ""]} contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-1">
                {emotionBreakdown.map((e) => (
                  <div key={e.name} className="flex items-center gap-2">
                    <div className="rounded-full" style={{ width: 8, height: 8, backgroundColor: e.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "#374151", flex: 1 }}>{e.name}</span>
                    <div style={{ flex: 2, height: 5, backgroundColor: "#F3F4F6", borderRadius: 3 }}>
                      <div style={{ height: "100%", width: `${e.value}%`, backgroundColor: e.color, borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#374151", width: 30, textAlign: "right" }}>{e.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Body Language */}
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, padding: 16, border: "1px solid #E5E7EB" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 10 }}>Body Language</h3>
              <div className="space-y-2.5">
                {bodyLanguage.map((b) => (
                  <div key={b.label} className="flex items-center justify-between">
                    <span style={{ fontSize: 13, color: "#6B7280" }}>{b.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, padding: "2px 10px", borderRadius: 4, backgroundColor: b.color + "18", color: b.color }}>
                      {b.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => setAlertTriggered(true)}
                style={{
                  width: "100%", padding: "10px", borderRadius: 8, border: "none", cursor: "pointer",
                  backgroundColor: alertTriggered ? "#B91C1C" : "#E74C3C", color: "white", fontSize: 13, fontWeight: 600,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                <Bell size={15} /> {alertTriggered ? "Alert Triggered!" : "Trigger Alert"}
              </button>
              <button style={{
                width: "100%", padding: "10px", borderRadius: 8, cursor: "pointer",
                backgroundColor: "transparent", color: "#1A6B8A", fontSize: 13, fontWeight: 600,
                border: "1.5px solid #1A6B8A", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}>
                <FileText size={15} /> Add Note
              </button>
              <button style={{
                width: "100%", padding: "6px", borderRadius: 8, border: "none", cursor: "pointer",
                backgroundColor: "transparent", color: "#6B7280", fontSize: 13,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}>
                <BarChart2 size={14} /> View Full Report
              </button>
            </div>

            {/* Recent Emotion History */}
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, padding: 16, border: "1px solid #E5E7EB" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 10 }}>Emotion History (Last 10 min)</h3>
              <div className="space-y-1.5">
                {recentHistory.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 py-1">
                    <span style={{ fontSize: 11, color: "#9CA3AF", width: 36, flexShrink: 0, fontFamily: "monospace" }}>{h.time}</span>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: "1px 7px", borderRadius: 3,
                      backgroundColor: (emotionColors[h.emotion] || "#95A5A6") + "22",
                      color: emotionColors[h.emotion] || "#95A5A6",
                    }}>
                      {h.emotion}
                    </span>
                    <div style={{ flex: 1, height: 4, backgroundColor: "#F3F4F6", borderRadius: 2 }}>
                      <div style={{ height: "100%", width: `${h.pct}%`, backgroundColor: emotionColors[h.emotion] || "#95A5A6", borderRadius: 2 }} />
                    </div>
                    <span style={{ fontSize: 11, color: "#6B7280", width: 28, textAlign: "right" }}>{h.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
