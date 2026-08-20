import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const ROLES = [
  { label: "Admin",      icon: "👤", value: "admin",      email: "admin@gymcontrol.co" },
  { label: "Recepción",  icon: "🏢", value: "recepcion",  email: "recepcion@gymcontrol.co" },
  { label: "Cliente",    icon: "🔥", value: "cliente",    email: "cliente@gymcontrol.co" },
  { label: "Entrenador", icon: "💪", value: "entrenador", email: "entrenador@gymcontrol.co" },
];

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@gymcontrol.co");
  const [password, setPassword] = useState("");
  const [activeRole, setActiveRole] = useState("admin");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function handleRoleClick(role) {
    setActiveRole(role.value);
    setEmail(role.email);
    setErrorMsg("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      // 1. Petición real al servidor backend
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email, contrasena: password }),
      });

      const data = await response.json();

      // 2. Validación de respuesta HTTP / Credenciales
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Credenciales inválidas.");
      }

      // 3. Guardar datos de sesión si la validación en BD fue exitosa
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      // 4. Redirección por ID de rol retornado por la BD (Evita acceso no autorizado)
      const rolId = data.usuario.id_rol;
      if (rolId === 1) {
        navigate("/inicio");
      } else if (rolId === 2) {
        navigate("/recepcion/inicio");
      } else if (rolId === 3) {
        navigate("/cliente");
      } else if (rolId === 4) {
        navigate("/entrenador");
      } else {
        navigate("/inicio");
      }

    } catch (err) {
      // Muestra la alerta de error y bloquea la navegación
      setErrorMsg(err.message || "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-root">
      <main className="login-main">

        {/* ── Panel izquierdo ── */}
        <div className="login-left">
          <div className="login-glow" />

          <div className="login-left-content">
            <div>
              <h1 className="login-brand-name">KIN GYM</h1>
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

          <div className="login-watermark">KG</div>
        </div>

        {/* ── Panel derecho ── */}
        <div className="login-right">
          <div className="login-form-card">
            <h2 className="login-form-title">BIENVENIDO</h2>
            <p className="login-form-sub">Ingresa con tu cuenta para continuar</p>

            {/* Mensaje de error si falla la validación en BD */}
            {errorMsg && (
              <div style={{
                backgroundColor: "#e74c3c",
                color: "#ffffff",
                padding: "10px",
                borderRadius: "6px",
                marginBottom: "15px",
                fontSize: "0.85rem",
                textAlign: "center",
                fontWeight: "bold"
              }}>
                {errorMsg}
              </div>
            )}

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-field-group">
                <label className="login-label">CORREO ELECTRÓNICO</label>
                <input
                  type="email"
                  className="login-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@gymcontrol.co"
                  required
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
                  required
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
                    type="button"
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