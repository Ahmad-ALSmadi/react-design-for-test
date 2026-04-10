import { useState } from "react";
import { Search, Plus, Edit2, MoreVertical, X } from "lucide-react";
import { Layout } from "../components/Layout";
import { staff } from "../data/mockData";

const roleColors: Record<string, { bg: string; color: string }> = {
  Doctor: { bg: "#EBF5FB", color: "#1A6B8A" },
  Staff: { bg: "#EBF5FB", color: "#3498DB" },
  Admin: { bg: "#F5EEF8", color: "#9B59B6" },
};

export function Staff() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Doctor");

  const filtered = staff.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || s.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <Layout title="Staff Management">
      <div className="p-6 relative">
        {/* Action Bar */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative">
            <Search size={14} color="#9CA3AF" className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search staff..."
              style={{
                width: 280, paddingLeft: 34, paddingRight: 12, height: 38, borderRadius: 8,
                border: "1px solid #E5E7EB", fontSize: 13, color: "#1A1A2E", outline: "none", backgroundColor: "#FFFFFF",
              }}
            />
          </div>

          <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
            {["All", "Doctor", "Staff", "Admin"].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                style={{
                  padding: "5px 14px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500,
                  backgroundColor: roleFilter === role ? "#1A6B8A" : "transparent",
                  color: roleFilter === role ? "white" : "#6B7280",
                  transition: "all 0.15s",
                }}
              >
                {role}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowDrawer(true)}
            style={{
              display: "flex", alignItems: "center", gap: 6, marginLeft: "auto",
              padding: "9px 16px", borderRadius: 8, backgroundColor: "#1A6B8A", color: "white",
              border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}
          >
            <Plus size={15} /> Add Staff Member
          </button>
        </div>

        {/* Table */}
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                {["Name & Role", "Employee #", "Role", "Department", "Email", "Status", "Actions"].map((col) => (
                  <th key={col} style={{
                    padding: "12px 16px", textAlign: "left", fontSize: 11,
                    fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em",
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((member) => {
                const rc = roleColors[member.role] || roleColors["Staff"];
                return (
                  <tr
                    key={member.id}
                    style={{ borderBottom: "1px solid #F3F4F6", transition: "background-color 0.1s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <td style={{ padding: "13px 16px" }}>
                      <div className="flex items-center gap-3">
                        <div
                          className="flex items-center justify-center rounded-full text-white flex-shrink-0"
                          style={{ width: 38, height: 38, backgroundColor: "#1A6B8A", fontSize: 12, fontWeight: 700 }}
                        >
                          {member.initials}
                        </div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>{member.name}</p>
                      </div>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{ fontSize: 12, fontWeight: 500, color: "#6B7280", fontFamily: "monospace" }}>{member.id}</span>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{
                        fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 4,
                        backgroundColor: rc.bg, color: rc.color,
                      }}>
                        {member.role.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: "13px 16px", fontSize: 13, color: "#374151" }}>{member.department}</td>
                    <td style={{ padding: "13px 16px", fontSize: 13, color: "#6B7280" }}>{member.email}</td>
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{
                        fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 4,
                        backgroundColor: member.status === "Active" ? "#EAFAF1" : "#F3F4F6",
                        color: member.status === "Active" ? "#2ECC71" : "#9CA3AF",
                      }}>
                        {member.status}
                      </span>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <div className="flex items-center gap-2">
                        <button style={{ padding: "5px", borderRadius: 6, border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB", cursor: "pointer" }}>
                          <Edit2 size={13} color="#6B7280" />
                        </button>
                        <button style={{ padding: "5px", borderRadius: 6, border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB", cursor: "pointer" }}>
                          <MoreVertical size={13} color="#6B7280" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Slide-over Drawer */}
        {showDrawer && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-40"
              style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
              onClick={() => setShowDrawer(false)}
            />
            {/* Drawer Panel */}
            <div
              className="fixed top-0 right-0 h-full z-50 overflow-y-auto"
              style={{
                width: 420,
                backgroundColor: "#FFFFFF",
                boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
              }}
            >
              <div className="flex items-center justify-between p-5" style={{ borderBottom: "1px solid #E5E7EB" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1A1A2E" }}>Add Staff Member</h3>
                <button onClick={() => setShowDrawer(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                  <X size={18} color="#6B7280" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {/* Role Selector */}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Role *</label>
                  <div className="flex gap-2">
                    {["Doctor", "Staff", "Admin"].map((role) => (
                      <button
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        style={{
                          flex: 1, padding: "8px", borderRadius: 7, cursor: "pointer", fontSize: 13, fontWeight: 600,
                          border: selectedRole === role ? "2px solid #1A6B8A" : "1.5px solid #E5E7EB",
                          backgroundColor: selectedRole === role ? "#EBF5FB" : "#F9FAFB",
                          color: selectedRole === role ? "#1A6B8A" : "#6B7280",
                        }}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Fields */}
                {[
                  { label: "Full Name", placeholder: "Dr. / Mr. / Ms." },
                  { label: "Date of Birth", placeholder: "YYYY-MM-DD", type: "date" },
                  { label: "Phone Number", placeholder: "+966 5X XXX XXXX" },
                  { label: "Email Address", placeholder: "name@mindwatch.sa", type: "email" },
                  { label: "Password", placeholder: "••••••••", type: "password" },
                  { label: "Department", placeholder: "e.g. Psychiatry" },
                  { label: "Employee Number", placeholder: "EMP-XXX" },
                ].map(({ label, placeholder, type = "text" }) => (
                  <div key={label}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>{label} *</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      style={{
                        width: "100%", padding: "9px 12px", borderRadius: 8,
                        border: "1.5px solid #E5E7EB", fontSize: 13, color: "#1A1A2E",
                        outline: "none", backgroundColor: "#FAFAFA", boxSizing: "border-box",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#1A6B8A")}
                      onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                    />
                  </div>
                ))}

                {/* Specialization (if Doctor) */}
                {selectedRole === "Doctor" && (
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Specialization</label>
                    <select style={{
                      width: "100%", padding: "9px 12px", borderRadius: 8,
                      border: "1.5px solid #E5E7EB", fontSize: 13, color: "#374151",
                      outline: "none", backgroundColor: "#FAFAFA", boxSizing: "border-box",
                    }}>
                      <option>Psychiatry</option>
                      <option>Clinical Psychology</option>
                      <option>Neurology</option>
                      <option>Behavioral Therapy</option>
                    </select>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2" style={{ borderTop: "1px solid #E5E7EB", paddingTop: 16 }}>
                  <button
                    onClick={() => setShowDrawer(false)}
                    style={{
                      flex: 1, padding: "10px", borderRadius: 8, cursor: "pointer",
                      backgroundColor: "#1A6B8A", color: "white", border: "none", fontSize: 13, fontWeight: 600,
                    }}
                  >
                    Save Staff Member
                  </button>
                  <button
                    onClick={() => setShowDrawer(false)}
                    style={{
                      padding: "10px 18px", borderRadius: 8, cursor: "pointer",
                      backgroundColor: "transparent", color: "#6B7280", border: "1px solid #E5E7EB", fontSize: 13, fontWeight: 500,
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
