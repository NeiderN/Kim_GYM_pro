import { useState } from "react";
import "./Login.css";

const ROLES = [
  { label: "Admin",      icon: "👤", value: "admin",      email: "admin@gymcontrol.co"      },
  { label: "Recepción",  icon: "🏢", value: "recepcion",  email: "recepcion@gymcontrol.co"  },
  { label: "Financiero", icon: "🔥", value: "financiero", email: "financiero@gymcontrol.co" },
  { label: "Entrenador", icon: "💪", value: "entrenador", email: "entrenador@gymcontrol.co" },
];

export default function Login() {
  const [email,      setEmail]      = useState("admin@gymcontrol.co");
  const [password,   setPassword]   = useState("");
  const [activeRole, setActiveRole] = useState("admin");
  const [loading,    setLoading]    = useState(false);

  function handleRoleClick(role) {
    setActiveRole(role.value);
    setEmail(role.email);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  }

  return (
    <div className="login-root">
      <main className="login-main">

        {/* ── Panel izquierdo ── */}
        <div className="login-left">
          <div className="login-glow" />

          <div className="login-left-content">
            <div>
              <h1 className="login-brand-name">GYMCONTROL</h1>
              <p className="login-brand-sub">PRO&nbsp;&nbsp;SYSTEM&nbsp;&nbsp;v2.0</p>
            </div>

            <div className="login-pitch">
              <p className="login-pitch-line">Gestiona tu gimnasio</p>
              <p className="login-pitch-accent">con control total.</p>
            </div>

            <ul className="login-feature-list">
              {[
                "Gestión de clientes y membresías",
                "Control de asistencias en tiempo real",
                "Reportes financieros automáticos",
                "Acceso por roles y permisos",
              ].map((f) => (
                <li key={f} className="login-feature-item">
                  <span className="login-bullet">•</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="login-watermark">GC</div>
        </div>

        {/* ── Panel derecho ── */}
        <div className="login-right">
          <div className="login-form-card">
            <h2 className="login-form-title">BIENVENIDO</h2>
            <p className="login-form-sub">Ingresa con tu cuenta para continuar</p>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-field-group">
                <label className="login-label">CORREO ELECTRÓNICO</label>
                <input
                  type="email"
                  className="login-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@gymcontrol.co"
                />
              </div>

              <div className="login-field-group">
                <label className="login-label">CONTRASEÑA</label>
                <input
                  type="password"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <div className="login-forgot-row">
                <a href="#" className="login-forgot-link">¿Olvidaste tu contraseña?</a>
              </div>

              <button
                type="submit"
                className="login-submit-btn"
                disabled={loading}
              >
                {loading ? "VERIFICANDO..." : "INICIAR SESIÓN →"}
              </button>
            </form>

            <div className="login-role-section">
              <p className="login-role-label">ACCESO RÁPIDO POR ROL</p>
              <div className="login-role-grid">
                {ROLES.map((role) => (
                  <button
                    key={role.value}
                    className={`login-role-btn ${activeRole === role.value ? "active" : ""}`}
                    onClick={() => handleRoleClick(role)}
                  >
                    <span className="login-role-icon">{role.icon}</span>
                    {role.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}