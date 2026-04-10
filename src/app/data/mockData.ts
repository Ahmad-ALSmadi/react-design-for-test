export const patients = [
  { id: "P-001", name: "Ahmed Al-Rashidi", age: 34, phone: "+966 50 123 4567", lastSession: "2026-04-10", lastEmotion: "Anxious", status: "Active", hasAlert: true, initials: "AA" },
  { id: "P-002", name: "Sara Mohammed", age: 28, phone: "+966 55 987 6543", lastSession: "2026-04-09", lastEmotion: "Happy", status: "Active", hasAlert: false, initials: "SM" },
  { id: "P-003", name: "Khalid Ibrahim", age: 45, phone: "+966 54 321 0987", lastSession: "2026-04-08", lastEmotion: "Sad", status: "Active", hasAlert: false, initials: "KI" },
  { id: "P-004", name: "Fatima Al-Zahra", age: 31, phone: "+966 56 654 3210", lastSession: "2026-04-10", lastEmotion: "Fearful", status: "Active", hasAlert: true, initials: "FZ" },
  { id: "P-005", name: "Omar Hassan", age: 52, phone: "+966 50 111 2222", lastSession: "2026-04-07", lastEmotion: "Neutral", status: "Inactive", hasAlert: false, initials: "OH" },
  { id: "P-006", name: "Nora Al-Qahtani", age: 25, phone: "+966 55 333 4444", lastSession: "2026-04-09", lastEmotion: "Angry", status: "Active", hasAlert: true, initials: "NQ" },
  { id: "P-007", name: "Youssef Karimi", age: 38, phone: "+966 54 555 6666", lastSession: "2026-04-06", lastEmotion: "Happy", status: "Active", hasAlert: false, initials: "YK" },
  { id: "P-008", name: "Layla Al-Amri", age: 42, phone: "+966 56 777 8888", lastSession: "2026-04-10", lastEmotion: "Anxious", status: "Active", hasAlert: false, initials: "LA" },
];

export const alerts = [
  { id: 1, severity: "Critical", patient: "Ahmed Al-Rashidi", patientId: "P-001", emotion: "Extreme Anxiety", percentage: 94, camera: "Camera 1 — Waiting Room", time: "5 min ago", status: "Triggered" },
  { id: 2, severity: "High", patient: "Fatima Al-Zahra", patientId: "P-004", emotion: "Fearfulness", percentage: 82, camera: "Camera 2 — Hall", time: "18 min ago", status: "Triggered" },
  { id: 3, severity: "High", patient: "Nora Al-Qahtani", patientId: "P-006", emotion: "Anger", percentage: 78, camera: "Camera 1 — Waiting Room", time: "34 min ago", status: "Acknowledged" },
  { id: 4, severity: "Medium", patient: "Khalid Ibrahim", patientId: "P-003", emotion: "Sadness", percentage: 65, camera: "Camera 3 — Lobby", time: "1 hr ago", status: "Acknowledged" },
  { id: 5, severity: "Low", patient: "Omar Hassan", patientId: "P-005", emotion: "Anxiety", percentage: 52, camera: "Camera 2 — Hall", time: "2 hrs ago", status: "Resolved" },
];

export const sessions = [
  { id: "S-001", time: "08:30", endTime: "09:15", patient: "Ahmed Al-Rashidi", patientId: "P-001", doctor: "Dr. Rania Haddad", status: "Done", emotion: "Anxious" },
  { id: "S-002", time: "09:30", endTime: "10:15", patient: "Sara Mohammed", patientId: "P-002", doctor: "Dr. Nasser Al-Ghamdi", status: "Done", emotion: "Happy" },
  { id: "S-003", time: "10:30", endTime: "11:15", patient: "Khalid Ibrahim", patientId: "P-003", doctor: "Dr. Rania Haddad", status: "In Progress", emotion: "Sad" },
  { id: "S-004", time: "11:30", endTime: "12:15", patient: "Fatima Al-Zahra", patientId: "P-004", doctor: "Dr. Nasser Al-Ghamdi", status: "Scheduled", emotion: "Fearful" },
  { id: "S-005", time: "13:00", endTime: "13:45", patient: "Omar Hassan", patientId: "P-005", doctor: "Dr. Rania Haddad", status: "Scheduled", emotion: "Neutral" },
  { id: "S-006", time: "14:00", endTime: "14:45", patient: "Nora Al-Qahtani", patientId: "P-006", doctor: "Dr. Nasser Al-Ghamdi", status: "Scheduled", emotion: "Angry" },
  { id: "S-007", time: "15:00", endTime: "15:45", patient: "Youssef Karimi", patientId: "P-007", doctor: "Dr. Rania Haddad", status: "Scheduled", emotion: "Neutral" },
];

export const cameras = [
  { id: "CAM-01", name: "Camera 1", location: "Waiting Room", status: "Online", patientsToday: 18, alertsTriggered: 2 },
  { id: "CAM-02", name: "Camera 2", location: "Hall Corridor", status: "Online", patientsToday: 12, alertsTriggered: 1 },
  { id: "CAM-03", name: "Camera 3", location: "Lobby", status: "Online", patientsToday: 9, alertsTriggered: 0 },
  { id: "CAM-04", name: "Camera 4", location: "Reception", status: "Online", patientsToday: 24, alertsTriggered: 3 },
  { id: "CAM-05", name: "Camera 5", location: "Room 101", status: "Offline", patientsToday: 0, alertsTriggered: 0, lastSeen: "2 hours ago" },
];

export const staff = [
  { id: "EMP-001", name: "Dr. Rania Haddad", role: "Doctor", department: "Psychiatry", email: "r.haddad@mindwatch.sa", status: "Active", initials: "RH" },
  { id: "EMP-002", name: "Dr. Nasser Al-Ghamdi", role: "Doctor", department: "Clinical Psychology", email: "n.ghamdi@mindwatch.sa", status: "Active", initials: "NG" },
  { id: "EMP-003", name: "Maha Saleh", role: "Staff", department: "Reception", email: "m.saleh@mindwatch.sa", status: "Active", initials: "MS" },
  { id: "EMP-004", name: "Tariq Al-Otaibi", role: "Staff", department: "IT Support", email: "t.otaibi@mindwatch.sa", status: "Active", initials: "TO" },
  { id: "EMP-005", name: "Hind Al-Shamrani", role: "Admin", department: "Administration", email: "h.shamrani@mindwatch.sa", status: "Active", initials: "HS" },
  { id: "EMP-006", name: "Walid Mansour", role: "Staff", department: "Security", email: "w.mansour@mindwatch.sa", status: "Inactive", initials: "WM" },
];

export const emotionColors: Record<string, string> = {
  Happy: "#2ECC71",
  Neutral: "#95A5A6",
  Sad: "#3498DB",
  Anxious: "#E67E22",
  Angry: "#E74C3C",
  Fearful: "#9B59B6",
  Disgusted: "#8B4513",
};

export const emotionBgColors: Record<string, string> = {
  Happy: "#EAFAF1",
  Neutral: "#F2F3F4",
  Sad: "#EBF5FB",
  Anxious: "#FEF5E7",
  Angry: "#FDEDEC",
  Fearful: "#F5EEF8",
  Disgusted: "#F9F2EC",
};

export const severityColors: Record<string, string> = {
  Critical: "#E74C3C",
  High: "#E67E22",
  Medium: "#F1C40F",
  Low: "#3498DB",
};

export const emotionChartData = [
  { emotion: "Happy", count: 8, percentage: 33, color: "#2ECC71" },
  { emotion: "Neutral", count: 6, percentage: 25, color: "#95A5A6" },
  { emotion: "Anxious", count: 5, percentage: 21, color: "#E67E22" },
  { emotion: "Sad", count: 3, percentage: 13, color: "#3498DB" },
  { emotion: "Angry", count: 1, percentage: 4, color: "#E74C3C" },
  { emotion: "Fearful", count: 1, percentage: 4, color: "#9B59B6" },
];

export const emotionTrendData = [
  { date: "Apr 4", Happy: 40, Neutral: 30, Anxious: 20, Sad: 10, Angry: 5, Fearful: 3 },
  { date: "Apr 5", Happy: 35, Neutral: 28, Anxious: 25, Sad: 15, Angry: 8, Fearful: 5 },
  { date: "Apr 6", Happy: 45, Neutral: 32, Anxious: 18, Sad: 12, Angry: 3, Fearful: 2 },
  { date: "Apr 7", Happy: 50, Neutral: 25, Anxious: 22, Sad: 8, Angry: 6, Fearful: 4 },
  { date: "Apr 8", Happy: 38, Neutral: 35, Anxious: 28, Sad: 14, Angry: 9, Fearful: 7 },
  { date: "Apr 9", Happy: 42, Neutral: 30, Anxious: 24, Sad: 11, Angry: 4, Fearful: 3 },
  { date: "Apr 10", Happy: 48, Neutral: 28, Anxious: 20, Sad: 9, Angry: 5, Fearful: 2 },
];

export const alertsByWeekData = [
  { week: "Wk 1", Critical: 3, High: 5, Medium: 8, Low: 4 },
  { week: "Wk 2", Critical: 5, High: 7, Medium: 6, Low: 9 },
  { week: "Wk 3", Critical: 2, High: 4, Medium: 10, Low: 6 },
  { week: "Wk 4", Critical: 6, High: 8, Medium: 5, Low: 3 },
];

export const sessionsPerDayData = [
  { day: "Mon", Completed: 8, Cancelled: 1, InProgress: 0 },
  { day: "Tue", Completed: 10, Cancelled: 2, InProgress: 0 },
  { day: "Wed", Completed: 7, Cancelled: 0, InProgress: 0 },
  { day: "Thu", Completed: 12, Cancelled: 1, InProgress: 0 },
  { day: "Fri", Completed: 6, Cancelled: 0, InProgress: 3 },
];
