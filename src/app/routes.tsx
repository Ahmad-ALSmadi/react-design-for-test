import { createBrowserRouter, Navigate } from "react-router";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { LiveMonitor } from "./pages/LiveMonitor";
import { Patients } from "./pages/Patients";
import { PatientProfile } from "./pages/PatientProfile";
import { Alerts } from "./pages/Alerts";
import { Sessions } from "./pages/Sessions";
import { Reports } from "./pages/Reports";
import { Cameras } from "./pages/Cameras";
import { Staff } from "./pages/Staff";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/live-monitor", element: <LiveMonitor /> },
  { path: "/patients", element: <Patients /> },
  { path: "/patients/:id", element: <PatientProfile /> },
  { path: "/alerts", element: <Alerts /> },
  { path: "/sessions", element: <Sessions /> },
  { path: "/reports", element: <Reports /> },
  { path: "/cameras", element: <Cameras /> },
  { path: "/staff", element: <Staff /> },
  { path: "/settings", element: <Settings /> },
  { path: "*", element: <Navigate to="/" replace /> },
]);
