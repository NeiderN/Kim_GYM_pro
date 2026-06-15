import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Asistencia.css";

const INGRESOS = [
  { initials: "LA", nombre: "Laura Arango",  cc: "CC 1098765432", plan: "Mensual",    time: "10:42", dot: "#3DFFA0", bg: "#3b82f6", bloqueado: false },
  { initials: "CM", nombre: "Carlos Mejia",  cc: "CC 1023456789", plan: "Trimestral", time: "10:38", dot: "#3DFFA0", bg: "#f97316", bloqueado: false },
  { initials: "JG", nombre: "Jorge García",  cc: "CC 1056789012", plan: "Semestral",  time: "10:22", dot: "#3DFFA0", bg: "#E8FF47", bloqueado: false },
  { initials: "SR", nombre: "Sofía Ríos",    cc: "CC 1034567890", plan: "Mensual",    time: "10:05", dot: "#3DFFA0", bg: "#a855f7", bloqueado: false },
  { initials: "PV", nombre: "Pedro Vargas",  cc: "CC 1056789012", plan: "Membresía VENCIDA — Bloqueado", time: "09:55", dot: "#FF4747", bg: "#ef4444", bloqueado: true },
];

const NAV_ITEMS = [
  { section: "PRINCIPAL", items: [
    { icon: "◎",  label: "Inicio"      },
    { icon: "👥", label: "Clientes"    },
    { icon: "🟨", label: "Membresías"  },
    { icon: "💳", label: "Pagos"       },
    { icon: "✅", label: "Asistencia"  },
  ]},
  { section: "ADMINISTRACIÓN", items: [
    { icon: "📊", label: "Reportes"      },
    { icon: "⚙️", label: "Configuración" },
  ]},
];

export default function Asistencia() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Asistencia");
  const [documento, setDocumento] = useState("");
  const [resultado, setResultado] = useState({
    show: true,
    nombre: "Laura Arango",
    estado: "ok",
    plan: "Mensual",
    vence: "30 Jun 2025",
    hora: "10:42 AM",
  });

  function handleBuscar() {
    if (documento.trim()) {
      setResultado({
        show: true,
        nombre: "Laura Arango",
        estado: "ok",
        plan: "Mensual",
        vence: "30 Jun 2025",
        hora: new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }),
      });
    }
  }

  return (
    <div className="asis-root">

      {/* ════ SIDEBAR ════ */}
      <aside className="asis-sidebar">
        <div className="asis-sidebar-brand">
          <span className="asis-brand-name">GYMCONTROL</span>
          <span className="asis-brand-sub">PRO SYSTEM</span>
        </div>

        <nav className="asis-nav">
          {NAV_ITEMS.map((group) => (
            <div key={group.section} className="asis-nav-group">
              <span className="asis-nav-section">{group.section}</span>
              {group.items.map((item) => (
                <button
                  key={item.label}
                  className={`asis-nav-item ${activeNav === item.label ? "active" : ""}`}
                  onClick={() => {
                    setActiveNav(item.label);
                    if (item.label === "Inicio")        navigate("/inicio");
                    if (item.label === "Clientes")      navigate("/clientes");
                    if (item.label === "Membresías")    navigate("/membresias");
                    if (item.label === "Pagos")         navigate("/pagos");
                    if (item.label === "Asistencia")    navigate("/asistencia");
                    if (item.label === "Reportes")      navigate("/reportes");
                    if (item.label === "Configuración") navigate("/configuracion");
                  }}
                >
                  <span className="asis-nav-icon">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="asis-sidebar-user">
          <div className="asis-avatar-sidebar">NN</div>
          <div className="asis-user-info">
            <span className="asis-user-name">Neider Nuñez</span>
            <span className="asis-user-role">Administrador</span>
          </div>
          <button className="asis-user-menu">⋮</button>
        </div>
      </aside>

      {/* ════ MAIN ════ */}
      <div className="asis-main">

        {/* Topbar */}
        <header className="asis-topbar">
          <h1 className="asis-page-title">
            ASISTENCIA <span className="asis-title-date">— HOY 08 JUN</span>
          </h1>
          <div className="asis-topbar-right">
            <span className="asis-counter-value">84</span>
            <span className="asis-counter-label">ingresos hoy</span>
          </div>
        </header>

        <div className="asis-content">
          <div className="asis-layout">

            {/* Panel izquierdo — registrar ingreso */}
            <div className="asis-card asis-register-card">
              <div className="asis-door-icon">🚪</div>
              <h2 className="asis-register-title">REGISTRAR INGRESO</h2>
              <p className="asis-register-sub">Ingresa el documento o nombre del cliente</p>

              <div className="asis-search-row">
                <input
                  className="asis-input"
                  placeholder="N° Documento"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
                />
                <button className="asis-search-btn" onClick={handleBuscar}>→</button>
              </div>

              {resultado.show && (
                <div className={`asis-resultado asis-resultado--${resultado.estado}`}>
                  <div className="asis-resultado-icon">
                    {resultado.estado === "ok" ? "✅" : "❌"}
                  </div>
                  <div className="asis-resultado-info">
                    <span className="asis-resultado-nombre">
                      {resultado.nombre} — {resultado.estado === "ok" ? "ACCESO OK" : "ACCESO DENEGADO"}
                    </span>
                    <span className="asis-resultado-meta">
                      {resultado.plan} · Vence {resultado.vence} · {resultado.hora}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Panel derecho — ingresos de hoy */}
            <div className="asis-card asis-list-card">
              <div className="asis-card-header">
                <h3 className="asis-card-title">Ingresos de Hoy</h3>
                <span className="asis-badge">84 HOY</span>
              </div>

              <ul className="asis-list">
                {INGRESOS.map((a, i) => (
                  <li key={i} className="asis-list-item">
                    <div
                      className="asis-avatar"
                      style={{
                        backgroundColor: a.bg,
                        color: a.bg === "#E8FF47" ? "#0A0A0A" : "#fff",
                      }}
                    >
                      {a.initials}
                    </div>
                    <div className="asis-item-info">
                      <span className="asis-item-nombre">{a.nombre}</span>
                      <span className={`asis-item-meta ${a.bloqueado ? "asis-item-meta--bloqueado" : ""}`}>
                        {a.cc} · {a.plan}
                      </span>
                    </div>
                    <div className="asis-item-time">
                      <span className="asis-dot" style={{ backgroundColor: a.dot }} />
                      <span className="asis-time">{a.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}