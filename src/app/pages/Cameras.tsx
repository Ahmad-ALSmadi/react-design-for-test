import { useState } from "react";
import { Search, Plus, Settings2, Tv2, MoreVertical, CameraOff, RefreshCw } from "lucide-react";
import { Layout } from "../components/Layout";
import { cameras } from "../data/mockData";

export function Cameras() {
  const [search, setSearch] = useState("");
  const [cameraList, setCameraList] = useState(cameras);

  const filtered = cameraList.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleReconnect = (id: string) => {
    setCameraList((prev) =>
      prev.map((c) => c.id === id ? { ...c, status: "Online", patientsToday: 0, alertsTriggered: 0 } : c)
    );
  };

  return (
    <Layout title="Camera Management">
      <div className="p-6">
        {/* Action Bar */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative" style={{ maxWidth: 280 }}>
            <Search size={14} color="#9CA3AF" className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cameras..."
              style={{
                width: 280, paddingLeft: 34, paddingRight: 12, height: 38, borderRadius: 8,
                border: "1px solid #E5E7EB", fontSize: 13, color: "#1A1A2E", outline: "none", backgroundColor: "#FFFFFF",
              }}
            />
          </div>
          <button style={{
            display: "flex", alignItems: "center", gap: 6, marginLeft: "auto",
            padding: "9px 16px", borderRadius: 8, backgroundColor: "#1A6B8A", color: "white",
            border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>
            <Plus size={15} /> Add New Camera
          </button>
        </div>

        {/* Stats Summary */}
        <div className="flex gap-4 mb-5">
          {[
            { label: "Total Cameras", value: cameraList.length, color: "#1A6B8A" },
            { label: "Online", value: cameraList.filter(c => c.status === "Online").length, color: "#2ECC71" },
            { label: "Offline", value: cameraList.filter(c => c.status === "Offline").length, color: "#E74C3C" },
            { label: "Patients Today", value: cameraList.reduce((s, c) => s + c.patientsToday, 0), color: "#6B7280" },
          ].map((s) => (
            <div key={s.label} style={{
              backgroundColor: "#FFFFFF", borderRadius: 8, padding: "12px 18px",
              border: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</span>
              <span style={{ fontSize: 12, color: "#6B7280" }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Camera Grid */}
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          {filtered.map((cam) => {
            const isOnline = cam.status === "Online";
            return (
              <div key={cam.id} style={{
                backgroundColor: "#FFFFFF", borderRadius: 10,
                boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB",
                overflow: "hidden", opacity: isOnline ? 1 : 0.85,
              }}>
                {/* Feed Placeholder */}
                <div className="relative" style={{ backgroundColor: "#1a1a1a", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {isOnline ? (
                    <>
                      {/* Camera grid overlay */}
                      <div className="absolute inset-0" style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                      }} />
                      <Tv2 size={40} color="rgba(255,255,255,0.08)" />
                      {/* Live Indicator */}
                      <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-lg" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
                        <div className="rounded-full animate-pulse" style={{ width: 7, height: 7, backgroundColor: "#E74C3C" }} />
                        <span style={{ fontSize: 10, color: "white", fontWeight: 700 }}>LIVE</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <CameraOff size={48} color="rgba(255,255,255,0.15)" />
                      <p style={{ position: "absolute", bottom: 12, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Last seen: {cam.lastSeen || "N/A"}</p>
                    </>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4,
                      backgroundColor: isOnline ? "#2ECC71" : "#E74C3C",
                      color: "white",
                    }}>
                      {cam.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 700, color: "#1A1A2E" }}>{cam.name}</p>
                      <p style={{ fontSize: 12, color: "#6B7280", marginTop: 1 }}>{cam.location}</p>
                    </div>
                    <span style={{ fontSize: 11, color: "#9CA3AF", backgroundColor: "#F9FAFB", padding: "2px 8px", borderRadius: 4, border: "1px solid #E5E7EB" }}>
                      {cam.id}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4 mb-4">
                    <div>
                      <p style={{ fontSize: 11, color: "#9CA3AF" }}>Patients Today</p>
                      <p style={{ fontSize: 16, fontWeight: 700, color: "#1A6B8A" }}>{cam.patientsToday}</p>
                    </div>
                    <div style={{ width: 1, backgroundColor: "#E5E7EB" }} />
                    <div>
                      <p style={{ fontSize: 11, color: "#9CA3AF" }}>Alerts Triggered</p>
                      <p style={{ fontSize: 16, fontWeight: 700, color: cam.alertsTriggered > 0 ? "#E74C3C" : "#2ECC71" }}>
                        {cam.alertsTriggered}
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    {isOnline ? (
                      <>
                        <button style={{
                          display: "flex", alignItems: "center", gap: 5, padding: "7px 14px",
                          borderRadius: 7, border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB",
                          cursor: "pointer", fontSize: 12, fontWeight: 500, color: "#374151",
                        }}>
                          <Settings2 size={13} /> Configure
                        </button>
                        <button style={{
                          display: "flex", alignItems: "center", gap: 5, padding: "7px 14px",
                          borderRadius: 7, border: "none", backgroundColor: "#1A6B8A",
                          cursor: "pointer", fontSize: 12, fontWeight: 600, color: "white",
                        }}>
                          <Tv2 size={13} /> View Feed
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleReconnect(cam.id)}
                        style={{
                          display: "flex", alignItems: "center", gap: 5, padding: "7px 16px",
                          borderRadius: 7, border: "none", backgroundColor: "#E67E22",
                          cursor: "pointer", fontSize: 12, fontWeight: 600, color: "white",
                        }}
                      >
                        <RefreshCw size={13} /> Reconnect
                      </button>
                    )}
                    <button style={{
                      marginLeft: "auto", padding: "7px 9px",
                      borderRadius: 7, border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB",
                      cursor: "pointer",
                    }}>
                      <MoreVertical size={14} color="#6B7280" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
