import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Plus, Eye, Edit2, MoreVertical, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Layout } from "../components/Layout";
import { patients, emotionColors, emotionBgColors } from "../data/mockData";

export function Patients() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [emotionFilter, setEmotionFilter] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = patients.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    const matchEmotion = emotionFilter === "All" || p.lastEmotion === emotionFilter;
    return matchSearch && matchStatus && matchEmotion;
  });

  return (
    <Layout title="Patient Management">
      <div className="p-6">
        {/* Action Bar */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1" style={{ maxWidth: 320 }}>
            <Search size={15} color="#9CA3AF" className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or ID..."
              style={{
                width: "100%", paddingLeft: 36, paddingRight: 12, height: 38, borderRadius: 8,
                border: "1px solid #E5E7EB", fontSize: 13, color: "#1A1A2E", outline: "none",
                backgroundColor: "#FFFFFF", boxSizing: "border-box",
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={14} color="#6B7280" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13, color: "#374151", backgroundColor: "#FFFFFF", outline: "none" }}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={emotionFilter}
              onChange={(e) => setEmotionFilter(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13, color: "#374151", backgroundColor: "#FFFFFF", outline: "none" }}
            >
              <option value="All">All Emotions</option>
              <option value="Happy">Happy</option>
              <option value="Neutral">Neutral</option>
              <option value="Anxious">Anxious</option>
              <option value="Sad">Sad</option>
              <option value="Angry">Angry</option>
              <option value="Fearful">Fearful</option>
            </select>
          </div>

          <button
            onClick={() => {}}
            style={{
              display: "flex", alignItems: "center", gap: 6, marginLeft: "auto",
              padding: "9px 16px", borderRadius: 8, backgroundColor: "#1A6B8A", color: "white",
              border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}
          >
            <Plus size={15} /> Add New Patient
          </button>
        </div>

        {/* Table Card */}
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: "1px solid #E5E7EB", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                {["#", "Patient Name", "Patient ID", "Age", "Phone", "Last Session", "Last Emotion", "Status", "Actions"].map((col) => (
                  <th key={col} style={{
                    padding: "12px 16px", textAlign: "left", fontSize: 12,
                    fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((patient, idx) => (
                <tr
                  key={patient.id}
                  style={{
                    borderBottom: "1px solid #F3F4F6",
                    backgroundColor: patient.hasAlert ? "#FFF5F5" : "transparent",
                    cursor: "pointer",
                    transition: "background-color 0.1s",
                  }}
                  onMouseEnter={(e) => !patient.hasAlert && (e.currentTarget.style.backgroundColor = "#F9FAFB")}
                  onMouseLeave={(e) => !patient.hasAlert && (e.currentTarget.style.backgroundColor = "transparent")}
                  onClick={() => navigate(`/patients/${patient.id}`)}
                >
                  <td style={{ padding: "13px 16px", fontSize: 13, color: "#9CA3AF", fontWeight: 500 }}>{idx + 1}</td>
                  <td style={{ padding: "13px 16px" }}>
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center rounded-full text-white flex-shrink-0"
                        style={{ width: 36, height: 36, backgroundColor: "#1A6B8A", fontSize: 12, fontWeight: 700 }}
                      >
                        {patient.initials}
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>{patient.name}</p>
                        {patient.hasAlert && (
                          <span style={{ fontSize: 10, color: "#E74C3C", fontWeight: 600 }}>⚠ Active Alert</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, padding: "2px 8px", borderRadius: 4, backgroundColor: "#EBF5FB", color: "#1A6B8A" }}>
                      {patient.id}
                    </span>
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: "#374151" }}>{patient.age}</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: "#374151", whiteSpace: "nowrap" }}>{patient.phone}</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: "#6B7280" }}>{patient.lastSession}</td>
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{
                      fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 4,
                      backgroundColor: emotionBgColors[patient.lastEmotion] || "#F9FAFB",
                      color: emotionColors[patient.lastEmotion] || "#6B7280",
                    }}>
                      {patient.lastEmotion}
                    </span>
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{
                      fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 4,
                      backgroundColor: patient.status === "Active" ? "#EAFAF1" : "#F3F4F6",
                      color: patient.status === "Active" ? "#2ECC71" : "#9CA3AF",
                    }}>
                      {patient.status}
                    </span>
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => navigate(`/patients/${patient.id}`)}
                        title="View"
                        style={{ padding: "5px", borderRadius: 6, border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB", cursor: "pointer" }}
                      >
                        <Eye size={14} color="#1A6B8A" />
                      </button>
                      <button
                        title="Edit"
                        style={{ padding: "5px", borderRadius: 6, border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB", cursor: "pointer" }}
                      >
                        <Edit2 size={14} color="#6B7280" />
                      </button>
                      <button
                        title="More"
                        style={{ padding: "5px", borderRadius: 6, border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB", cursor: "pointer" }}
                      >
                        <MoreVertical size={14} color="#6B7280" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: "1px solid #E5E7EB" }}>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 13, color: "#6B7280" }}>Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #E5E7EB", fontSize: 13, color: "#374151", backgroundColor: "#FFFFFF" }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span style={{ fontSize: 13, color: "#6B7280" }}>
                Showing {filtered.length} of {patients.length} patients
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                style={{ padding: "5px 10px", borderRadius: 6, border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB", cursor: "pointer" }}
              >
                <ChevronLeft size={14} color="#6B7280" />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  style={{
                    width: 32, height: 32, borderRadius: 6, border: "1px solid #E5E7EB",
                    backgroundColor: currentPage === p ? "#1A6B8A" : "#F9FAFB",
                    color: currentPage === p ? "white" : "#374151",
                    fontSize: 13, fontWeight: 500, cursor: "pointer",
                  }}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                style={{ padding: "5px 10px", borderRadius: 6, border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB", cursor: "pointer" }}
              >
                <ChevronRight size={14} color="#6B7280" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
