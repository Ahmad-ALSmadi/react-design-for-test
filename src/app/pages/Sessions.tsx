import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Camera, FileText, StopCircle } from "lucide-react";
import { Layout } from "../components/Layout";
import { sessions, emotionColors } from "../data/mockData";
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from "recharts";

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const emotionResultsData = [
  { time: "10:31", emotion: "Sad", confidence: 72 },
  { time: "10:33", emotion: "Sad", confidence: 68 },
  { time: "10:35", emotion: "Neutral", confidence: 61 },
  { time: "10:37", emotion: "Sad", confidence: 75 },
  { time: "10:39", emotion: "Sad", confidence: 80 },
];

const gaugeData = [{ name: "Sad", value: 75, fill: "#3498DB" }];

export function Sessions() {
  const [selectedSession, setSelectedSession] = useState(sessions[2]);
  const [notes, setNotes] = useState("Patient seems more withdrawn today. Mentioned trouble sleeping. Follow up on medication review.");
  const [dateLabel] = useState("Friday, April 10, 2026");

  const getSessionStyle = (status: string) => {
    if (status === "In Progress") return { bg: "#EAFAF1", border: "#A9DFBF", color: "#27AE60" };
    if (status === "Done") return { bg: "#F9FAFB", border: "#E5E7EB", color: "#9CA3AF" };
    if (status === "Cancelled") return { bg: "#FFF5F5", border: "#FECACA", color: "#E74C3C" };
    return { bg: "#EBF5FB", border: "#BEE3F8", color: "#3498DB" };
  };

  return (
    <Layout title="Sessions Management">
      <div className="p-6">
        {/* Date Navigation */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <button style={{ padding: "7px 12px", borderRadius: 7, border: "1px solid #E5E7EB", backgroundColor: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center" }}>
              <ChevronLeft size={16} color="#6B7280" />
            </button>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
              <Calendar size={14} color="#1A6B8A" />
              <span style={{ fontSize: 14, fontWeight: 600, color: "#1A1A2E" }}>{dateLabel}</span>
            </div>
            <button style={{ padding: "6px 12px", borderRadius: 7, border: "none", backgroundColor: "#1A6B8A", color: "white", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>
              Today
            </button>
            <button style={{ padding: "7px 12px", borderRadius: 7, border: "1px solid #E5E7EB", backgroundColor: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center" }}>
              <ChevronRight size={16} color="#6B7280" />
            </button>
          </div>
          <button style={{
            padding: "9px 16px", borderRadius: 8, backgroundColor: "#1A6B8A", color: "white",
            border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
          }}>
            <Calendar size={14} /> Schedule New Session
          </button>
        </div>

        {/* Two Columns */}
        <div className="flex gap-4" style={{ height: "calc(100vh - 230px)" }}>
          {/* LEFT — Timeline */}
          <div style={{ flex: "0 0 35%", backgroundColor: "#FFFFFF", borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #E5E7EB" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E" }}>Today's Schedule</h3>
              <p style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{sessions.length} sessions • 1 in progress</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {timeSlots.map((slot) => {
                const slotHour = parseInt(slot.split(":")[0]);
                const sessionInSlot = sessions.find((s) => {
                  const h = parseInt(s.time.split(":")[0]);
                  return h === slotHour;
                });
                return (
                  <div key={slot} className="flex gap-3 mb-1" style={{ minHeight: 48 }}>
                    <div style={{ width: 40, flexShrink: 0, paddingTop: 12 }}>
                      <span style={{ fontSize: 11, color: "#9CA3AF", fontFamily: "monospace" }}>{slot}</span>
                    </div>
                    <div className="flex-1" style={{ borderLeft: "1px dashed #E5E7EB", paddingLeft: 12 }}>
                      {sessionInSlot ? (() => {
                        const style = getSessionStyle(sessionInSlot.status);
                        return (
                          <div
                            onClick={() => setSelectedSession(sessionInSlot)}
                            className="rounded-lg p-2.5 cursor-pointer transition-all"
                            style={{
                              backgroundColor: style.bg,
                              border: `1px solid ${selectedSession?.id === sessionInSlot.id ? "#1A6B8A" : style.border}`,
                              outline: selectedSession?.id === sessionInSlot.id ? "2px solid #1A6B8A20" : "none",
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <p style={{ fontSize: 12, fontWeight: 700, color: "#1A1A2E" }}>{sessionInSlot.patient}</p>
                              <span style={{ fontSize: 10, fontWeight: 600, color: style.color }}>
                                {sessionInSlot.status === "In Progress" ? "● " : ""}{sessionInSlot.status}
                              </span>
                            </div>
                            <p style={{ fontSize: 11, color: "#6B7280", marginTop: 1 }}>{sessionInSlot.doctor}</p>
                            <p style={{ fontSize: 10, color: "#9CA3AF" }}>{sessionInSlot.time} – {sessionInSlot.endTime}</p>
                          </div>
                        );
                      })() : (
                        <div style={{ height: 4 }} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Session Detail */}
          {selectedSession ? (
            <div style={{ flex: 1, backgroundColor: "#FFFFFF", borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              {/* Session Header */}
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #E5E7EB" }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1A1A2E" }}>{selectedSession.patient}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span style={{ fontSize: 12, color: "#6B7280" }}>{selectedSession.time} – {selectedSession.endTime}</span>
                    <span style={{ fontSize: 12, color: "#6B7280" }}>•</span>
                    <span style={{ fontSize: 12, color: "#6B7280" }}>{selectedSession.doctor}</span>
                    <div className="flex items-center gap-1.5">
                      <Camera size={12} color="#6B7280" />
                      <span style={{ fontSize: 12, color: "#6B7280" }}>Camera 1</span>
                    </div>
                  </div>
                </div>
                <span style={{
                  fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 6,
                  backgroundColor: getSessionStyle(selectedSession.status).bg,
                  color: getSessionStyle(selectedSession.status).color,
                  border: `1px solid ${getSessionStyle(selectedSession.status).border}`,
                }}>
                  {selectedSession.status}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {/* Emotion Gauge */}
                {selectedSession.status === "In Progress" && (
                  <div style={{ backgroundColor: "#F9FAFB", borderRadius: 8, padding: 16, border: "1px solid #E5E7EB" }}>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1A1A2E", marginBottom: 12 }}>Live Emotion Feed</h4>
                    <div className="flex items-center gap-6">
                      <div style={{ height: 120, width: 120 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={gaugeData} startAngle={180} endAngle={0}>
                            <RadialBar dataKey="value" fill="#3498DB" background={{ fill: "#E5E7EB" }} />
                            <Tooltip formatter={(v) => [`${v}%`, "Sad"]} />
                          </RadialBarChart>
                        </ResponsiveContainer>
                      </div>
                      <div>
                        <p style={{ fontSize: 11, color: "#6B7280" }}>Dominant Emotion</p>
                        <span style={{
                          fontSize: 20, fontWeight: 700, padding: "4px 14px", borderRadius: 6,
                          backgroundColor: "#EBF5FB", color: "#3498DB", display: "inline-block",
                        }}>
                          SAD — 75%
                        </span>
                        <div className="flex items-center gap-1.5 mt-2">
                          <div className="rounded-full animate-pulse" style={{ width: 8, height: 8, backgroundColor: "#2ECC71" }} />
                          <span style={{ fontSize: 11, color: "#2ECC71", fontWeight: 600 }}>Live Monitoring Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Session Notes */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={14} color="#6B7280" />
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1A1A2E" }}>Session Notes</h4>
                  </div>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 8,
                      border: "1px solid #E5E7EB", fontSize: 13, color: "#374151",
                      resize: "vertical", outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Emotion Results Table */}
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1A1A2E", marginBottom: 10 }}>Emotion Readings</h4>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ backgroundColor: "#F9FAFB" }}>
                        {["Timestamp", "Emotion", "Confidence"].map((c) => (
                          <th key={c} style={{ padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {emotionResultsData.map((row, i) => (
                        <tr key={i} style={{ borderBottom: "1px solid #F3F4F6" }}>
                          <td style={{ padding: "8px 12px", fontSize: 12, color: "#374151", fontFamily: "monospace" }}>{row.time}</td>
                          <td style={{ padding: "8px 12px" }}>
                            <span style={{
                              fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4,
                              backgroundColor: (emotionColors[row.emotion] || "#95A5A6") + "18",
                              color: emotionColors[row.emotion] || "#95A5A6",
                            }}>
                              {row.emotion}
                            </span>
                          </td>
                          <td style={{ padding: "8px 12px" }}>
                            <div className="flex items-center gap-2">
                              <div style={{ flex: 1, height: 5, backgroundColor: "#F3F4F6", borderRadius: 3 }}>
                                <div style={{ height: "100%", width: `${row.confidence}%`, backgroundColor: emotionColors[row.emotion] || "#95A5A6", borderRadius: 3 }} />
                              </div>
                              <span style={{ fontSize: 12, fontWeight: 600, color: "#374151", width: 32 }}>{row.confidence}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 px-5 py-4" style={{ borderTop: "1px solid #E5E7EB" }}>
                {selectedSession.status === "In Progress" && (
                  <button style={{
                    display: "flex", alignItems: "center", gap: 7, padding: "9px 18px",
                    borderRadius: 8, backgroundColor: "#E74C3C", color: "white", border: "none",
                    fontSize: 13, fontWeight: 600, cursor: "pointer",
                  }}>
                    <StopCircle size={15} /> End Session
                  </button>
                )}
                <button style={{
                  display: "flex", alignItems: "center", gap: 7, padding: "9px 18px",
                  borderRadius: 8, backgroundColor: "#1A6B8A", color: "white", border: "none",
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                }}>
                  Generate Report
                </button>
                <button style={{
                  padding: "9px 18px", borderRadius: 8, backgroundColor: "transparent",
                  color: "#6B7280", border: "1px solid #E5E7EB", fontSize: 13, fontWeight: 500, cursor: "pointer",
                }}>
                  Save Notes
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: "#FFFFFF", borderRadius: 10, border: "1px solid #E5E7EB" }}>
              <p style={{ fontSize: 14, color: "#9CA3AF" }}>Select a session to view details</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
