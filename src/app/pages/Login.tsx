import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Brain, AlertCircle } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@mindwatch.sa" && password === "admin123") {
      navigate("/dashboard");
    } else if (email === "" || password === "") {
      setError(true);
    } else {
      setError(true);
    }
  };

  const handleDemoLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen w-full"
      style={{ backgroundColor: "#0F2B3D", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: "rgba(26, 107, 138, 0.05)",
              border: "1px solid rgba(26, 107, 138, 0.08)",
            }}
          />
        ))}
      </div>

      <div
        className="relative w-full"
        style={{
          maxWidth: 440,
          backgroundColor: "#FFFFFF",
          borderRadius: 16,
          boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
          padding: "40px 40px 32px",
        }}
      >
        {/* Error Banner */}
        {error && (
          <div
            className="flex items-center gap-3 mb-5 px-4 py-3 rounded-lg"
            style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA" }}
          >
            <AlertCircle size={16} color="#E74C3C" />
            <span style={{ fontSize: 13, color: "#DC2626", fontWeight: 500 }}>
              Invalid credentials. Please try again.
            </span>
          </div>
        )}

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div
            className="flex items-center justify-center rounded-full mb-4"
            style={{ width: 80, height: 80, backgroundColor: "#1A6B8A", boxShadow: "0 8px 24px rgba(26,107,138,0.3)" }}
          >
            <Brain size={40} color="white" />
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1A6B8A", margin: 0 }}>
            MindWatch Clinic
          </h1>
          <p style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>
            Clinic Management & Emotion Monitoring
          </p>
        </div>

        <div style={{ height: 1, backgroundColor: "#E5E7EB", marginBottom: 24 }} />

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(false); }}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              placeholder="name@mindwatch.sa"
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: 8,
                border: error ? "1.5px solid #E74C3C" : emailFocused ? "1.5px solid #1A6B8A" : "1.5px solid #E5E7EB",
                fontSize: 14,
                color: "#1A1A2E",
                outline: "none",
                backgroundColor: "#FAFAFA",
                boxSizing: "border-box",
                transition: "border-color 0.15s ease",
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "11px 42px 11px 14px",
                  borderRadius: 8,
                  border: error ? "1.5px solid #E74C3C" : passwordFocused ? "1.5px solid #1A6B8A" : "1.5px solid #E5E7EB",
                  fontSize: 14,
                  color: "#1A1A2E",
                  outline: "none",
                  backgroundColor: "#FAFAFA",
                  boxSizing: "border-box",
                  transition: "border-color 0.15s ease",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                {showPassword ? <EyeOff size={18} color="#9CA3AF" /> : <Eye size={18} color="#9CA3AF" />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                style={{ width: 15, height: 15, accentColor: "#1A6B8A" }}
              />
              <span style={{ fontSize: 13, color: "#6B7280" }}>Remember Me</span>
            </label>
            <button
              type="button"
              style={{ fontSize: 13, color: "#1A6B8A", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}
            >
              Forgot Password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full transition-all"
            style={{
              height: 48,
              backgroundColor: "#1A6B8A",
              color: "white",
              borderRadius: 8,
              border: "none",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(26,107,138,0.3)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#155E7A")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A6B8A")}
          >
            Sign In
          </button>

          {/* Demo login */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full mt-3 transition-all"
            style={{
              height: 44,
              backgroundColor: "transparent",
              color: "#1A6B8A",
              borderRadius: 8,
              border: "1.5px solid #1A6B8A",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Demo — Enter Without Credentials
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6" style={{ borderTop: "1px solid #F3F4F6", paddingTop: 16 }}>
          <p style={{ fontSize: 11, color: "#9CA3AF" }}>
            MindWatch Clinic Management System v2.4.1
          </p>
          <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
            © 2026 MindWatch Health Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
