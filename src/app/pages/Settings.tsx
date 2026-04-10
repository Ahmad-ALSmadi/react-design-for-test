import { useState } from "react";
import { Layout } from "../components/Layout";

const navTabs = ["General", "Account", "Notifications", "Camera Settings", "AI Model", "Security", "System"];

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        width: 44, height: 24, borderRadius: 12, position: "relative",
        backgroundColor: checked ? "#1A6B8A" : "#D1D5DB",
        border: "none", cursor: "pointer", transition: "background-color 0.2s", flexShrink: 0,
      }}
    >
      <div style={{
        position: "absolute", top: 3, left: checked ? 22 : 3,
        width: 18, height: 18, borderRadius: "50%", backgroundColor: "white",
        transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
      }} />
    </button>
  );
}

function SliderInput({ value, onChange, min = 0, max = 100, label }: { value: number; onChange: (v: number) => void; min?: number; max?: number; label: string }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span style={{ fontSize: 13, color: "#374151" }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#1A6B8A" }}>{value}{max === 100 ? "%" : ""}</span>
      </div>
      <input
        type="range" min={min} max={max} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#1A6B8A" }}
      />
    </div>
  );
}

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4" style={{ borderBottom: "1px solid #F3F4F6" }}>
      <div>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>{label}</p>
        {description && <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{description}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB", marginBottom: 16, overflow: "hidden" }}>
      <div style={{ padding: "14px 20px", borderBottom: "1px solid #E5E7EB" }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E" }}>{title}</h3>
      </div>
      <div style={{ padding: "0 20px" }}>{children}</div>
    </div>
  );
}

const loginHistory = [
  { date: "Apr 10, 2026", time: "08:12 AM", device: "Windows 11 / Chrome", ip: "192.168.1.10", status: "Success" },
  { date: "Apr 9, 2026", time: "07:55 AM", device: "Windows 11 / Chrome", ip: "192.168.1.10", status: "Success" },
  { date: "Apr 8, 2026", time: "11:30 PM", device: "Unknown Device", ip: "203.0.113.42", status: "Failed" },
  { date: "Apr 7, 2026", time: "08:02 AM", device: "Windows 11 / Chrome", ip: "192.168.1.10", status: "Success" },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState("General");

  // General
  const [clinicName, setClinicName] = useState("MindWatch Psychiatric Clinic");
  const [clinicAddress, setClinicAddress] = useState("King Fahd Road, Riyadh, Saudi Arabia");
  const [language, setLanguage] = useState("English");
  const [darkMode, setDarkMode] = useState(false);

  // Camera
  const [resolution, setResolution] = useState("1080p");
  const [fps, setFps] = useState(15);
  const [sensitivity, setSensitivity] = useState(72);
  const [autoStart, setAutoStart] = useState(true);

  // AI
  const [confidenceThreshold, setConfidenceThreshold] = useState(60);
  const [alertEmotions, setAlertEmotions] = useState(["Anxious", "Angry", "Fearful"]);

  // Notifications
  const [notifToggles, setNotifToggles] = useState({
    criticalAlerts: true, highAlerts: true, mediumAlerts: false, lowAlerts: false,
    soundAlert: true, desktopNotif: true,
  });

  const [sessionTimeout, setSessionTimeout] = useState(30);

  const toggleEmotion = (em: string) => {
    setAlertEmotions((prev) => prev.includes(em) ? prev.filter(e => e !== em) : [...prev, em]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "General":
        return (
          <Card title="General Settings">
            <SettingRow label="Clinic Name">
              <input
                value={clinicName} onChange={(e) => setClinicName(e.target.value)}
                style={{ width: 280, padding: "8px 12px", borderRadius: 7, border: "1px solid #E5E7EB", fontSize: 13, outline: "none" }}
              />
            </SettingRow>
            <SettingRow label="Clinic Address">
              <input
                value={clinicAddress} onChange={(e) => setClinicAddress(e.target.value)}
                style={{ width: 280, padding: "8px 12px", borderRadius: 7, border: "1px solid #E5E7EB", fontSize: 13, outline: "none" }}
              />
            </SettingRow>
            <SettingRow label="Language" description="Interface language">
              <select
                value={language} onChange={(e) => setLanguage(e.target.value)}
                style={{ padding: "8px 12px", borderRadius: 7, border: "1px solid #E5E7EB", fontSize: 13, color: "#374151", outline: "none" }}
              >
                <option>English</option>
                <option>Arabic (عربي)</option>
              </select>
            </SettingRow>
            <SettingRow label="Dark Mode" description="Apply dark theme to interface">
              <ToggleSwitch checked={darkMode} onChange={setDarkMode} />
            </SettingRow>
            <div className="py-4 flex justify-end">
              <button style={{ padding: "9px 20px", borderRadius: 8, backgroundColor: "#1A6B8A", color: "white", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Save Changes
              </button>
            </div>
          </Card>
        );

      case "Camera Settings":
        return (
          <Card title="Camera Configuration">
            <SettingRow label="Default Resolution">
              <select
                value={resolution} onChange={(e) => setResolution(e.target.value)}
                style={{ padding: "8px 12px", borderRadius: 7, border: "1px solid #E5E7EB", fontSize: 13, color: "#374151", outline: "none" }}
              >
                <option>720p</option>
                <option>1080p</option>
              </select>
            </SettingRow>
            <div className="py-4" style={{ borderBottom: "1px solid #F3F4F6" }}>
              <SliderInput label="Frame Capture Rate (fps)" value={fps} onChange={setFps} min={1} max={30} />
            </div>
            <div className="py-4" style={{ borderBottom: "1px solid #F3F4F6" }}>
              <SliderInput label="Face Detection Sensitivity" value={sensitivity} onChange={setSensitivity} />
            </div>
            <SettingRow label="Auto-start Cameras" description="Automatically activate cameras on system start">
              <ToggleSwitch checked={autoStart} onChange={setAutoStart} />
            </SettingRow>
            <div className="py-4 flex justify-end">
              <button style={{ padding: "9px 20px", borderRadius: 8, backgroundColor: "#1A6B8A", color: "white", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Save Camera Settings
              </button>
            </div>
          </Card>
        );

      case "AI Model":
        return (
          <Card title="AI Model Configuration">
            <SettingRow label="Emotion Detection Model">
              <select style={{ padding: "8px 12px", borderRadius: 7, border: "1px solid #E5E7EB", fontSize: 13, color: "#374151", outline: "none" }}>
                <option>MindWatch v2.4 (Recommended)</option>
                <option>MindWatch v2.1</option>
                <option>OpenFace Lite</option>
              </select>
            </SettingRow>
            <div className="py-4" style={{ borderBottom: "1px solid #F3F4F6" }}>
              <SliderInput label="Minimum Confidence Threshold" value={confidenceThreshold} onChange={setConfidenceThreshold} />
            </div>
            <div className="py-4" style={{ borderBottom: "1px solid #F3F4F6" }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E", marginBottom: 10 }}>Alert Trigger Emotions</p>
              <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 10 }}>Select emotions that trigger alerts when detected</p>
              <div className="flex flex-wrap gap-2">
                {["Happy", "Neutral", "Sad", "Anxious", "Angry", "Fearful", "Disgusted"].map((em) => {
                  const selected = alertEmotions.includes(em);
                  const colors: Record<string, string> = { Happy: "#2ECC71", Neutral: "#95A5A6", Sad: "#3498DB", Anxious: "#E67E22", Angry: "#E74C3C", Fearful: "#9B59B6", Disgusted: "#8B4513" };
                  return (
                    <button
                      key={em}
                      onClick={() => toggleEmotion(em)}
                      style={{
                        padding: "5px 14px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600,
                        backgroundColor: selected ? colors[em] + "18" : "#F9FAFB",
                        color: selected ? colors[em] : "#9CA3AF",
                        border: selected ? `1.5px solid ${colors[em]}` : "1.5px solid #E5E7EB",
                        transition: "all 0.15s",
                      }}
                    >
                      {em}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="py-4 flex justify-end">
              <button style={{ padding: "9px 20px", borderRadius: 8, backgroundColor: "#1A6B8A", color: "white", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Apply AI Settings
              </button>
            </div>
          </Card>
        );

      case "Notifications":
        return (
          <Card title="Notification Preferences">
            {[
              { key: "criticalAlerts", label: "Critical Alert Notifications", desc: "Notify when Critical severity alerts are triggered" },
              { key: "highAlerts", label: "High Alert Notifications", desc: "Notify when High severity alerts are triggered" },
              { key: "mediumAlerts", label: "Medium Alert Notifications", desc: "Notify when Medium severity alerts are triggered" },
              { key: "lowAlerts", label: "Low Alert Notifications", desc: "Notify when Low severity alerts are triggered" },
              { key: "soundAlert", label: "Sound Alerts", desc: "Play audio notification for alerts" },
              { key: "desktopNotif", label: "Desktop Notifications", desc: "Show system tray notifications" },
            ].map(({ key, label, desc }) => (
              <SettingRow key={key} label={label} description={desc}>
                <ToggleSwitch
                  checked={notifToggles[key as keyof typeof notifToggles]}
                  onChange={(v) => setNotifToggles((prev) => ({ ...prev, [key]: v }))}
                />
              </SettingRow>
            ))}
            <div className="py-4" style={{ borderBottom: "1px solid #F3F4F6" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>Alert Cooldown (minutes)</p>
                  <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>Minimum time between repeated alerts for same patient</p>
                </div>
                <input
                  type="number" defaultValue={5} min={1} max={60}
                  style={{ width: 80, padding: "8px 12px", borderRadius: 7, border: "1px solid #E5E7EB", fontSize: 13, textAlign: "center", outline: "none" }}
                />
              </div>
            </div>
            <div className="py-4 flex justify-end">
              <button style={{ padding: "9px 20px", borderRadius: 8, backgroundColor: "#1A6B8A", color: "white", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Save Notification Settings
              </button>
            </div>
          </Card>
        );

      case "Security":
        return (
          <>
            <Card title="Session & Security">
              <div className="py-4" style={{ borderBottom: "1px solid #F3F4F6" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>Session Timeout</p>
                    <p style={{ fontSize: 12, color: "#9CA3AF" }}>Auto-logout after inactivity (minutes)</p>
                  </div>
                  <input
                    type="number" value={sessionTimeout} onChange={(e) => setSessionTimeout(Number(e.target.value))}
                    min={5} max={120}
                    style={{ width: 80, padding: "8px 12px", borderRadius: 7, border: "1px solid #E5E7EB", fontSize: 13, textAlign: "center", outline: "none" }}
                  />
                </div>
              </div>
              <div className="py-4" style={{ borderBottom: "1px solid #F3F4F6" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E", marginBottom: 8 }}>Password Requirements</p>
                <div className="space-y-2">
                  {["Minimum 8 characters", "At least 1 uppercase letter", "At least 1 number", "At least 1 special character"].map((req) => (
                    <div key={req} className="flex items-center gap-2">
                      <div className="rounded-full" style={{ width: 6, height: 6, backgroundColor: "#2ECC71" }} />
                      <span style={{ fontSize: 12, color: "#374151" }}>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="py-4">
                <p style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E", marginBottom: 12 }}>Change Password</p>
                <div className="space-y-3">
                  {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                    <div key={label}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>{label}</label>
                      <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "9px 12px", borderRadius: 7, border: "1px solid #E5E7EB", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                    </div>
                  ))}
                  <button style={{ padding: "9px 20px", borderRadius: 8, backgroundColor: "#1A6B8A", color: "white", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    Update Password
                  </button>
                </div>
              </div>
            </Card>

            <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB", overflow: "hidden" }}>
              <div style={{ padding: "14px 20px", borderBottom: "1px solid #E5E7EB" }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E" }}>Login History</h3>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F9FAFB" }}>
                    {["Date", "Time", "Device", "IP Address", "Status"].map((col) => (
                      <th key={col} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loginHistory.map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #F3F4F6" }}>
                      <td style={{ padding: "10px 16px", fontSize: 12, color: "#374151" }}>{row.date}</td>
                      <td style={{ padding: "10px 16px", fontSize: 12, color: "#374151", fontFamily: "monospace" }}>{row.time}</td>
                      <td style={{ padding: "10px 16px", fontSize: 12, color: "#374151" }}>{row.device}</td>
                      <td style={{ padding: "10px 16px", fontSize: 12, color: "#374151", fontFamily: "monospace" }}>{row.ip}</td>
                      <td style={{ padding: "10px 16px" }}>
                        <span style={{
                          fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4,
                          backgroundColor: row.status === "Success" ? "#EAFAF1" : "#FDEDEC",
                          color: row.status === "Success" ? "#2ECC71" : "#E74C3C",
                        }}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );

      default:
        return (
          <Card title={activeTab}>
            <div className="py-8 text-center">
              <p style={{ fontSize: 14, color: "#9CA3AF" }}>Settings for {activeTab} will appear here.</p>
            </div>
          </Card>
        );
    }
  };

  return (
    <Layout title="Settings">
      <div className="p-6">
        <div className="flex gap-5">
          {/* Left Tabs */}
          <div style={{ width: 180, flexShrink: 0 }}>
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB", overflow: "hidden" }}>
              {navTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    display: "block", width: "100%", padding: "11px 16px", textAlign: "left",
                    fontSize: 13, fontWeight: 500, cursor: "pointer",
                    backgroundColor: activeTab === tab ? "#EBF5FB" : "transparent",
                    color: activeTab === tab ? "#1A6B8A" : "#374151",
                    borderTop: "none",
                    borderRight: "none",
                    borderBottom: "1px solid #F3F4F6",
                    borderLeft: activeTab === tab ? "3px solid #1A6B8A" : "3px solid transparent",
                    transition: "all 0.15s",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
    </Layout>
  );
}