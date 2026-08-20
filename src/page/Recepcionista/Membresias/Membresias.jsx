import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Membresias.css";
const MEMBRESIAS = [
  { id: 1, nombre: "Plan Mensual Gold", duracion: "30 días", precio: "$120.000", estado: "Activa", usuarios: 142 },
  { id: 2, nombre: "Plan Trimestral", duracion: "90 días", precio: "$320.000", estado: "Activa", usuarios: 85 },
  { id: 3, nombre: "Plan Semestral VIP", duracion: "180 días", precio: "$580.000", estado: "Activa", usuarios: 43 },
  { id: 4, nombre: "Plan Anual Pro", duracion: "365 días", precio: "$1.000.000", estado: "Inactiva", usuarios: 12 },
];

const NAV_ITEMS = [
  { section: "MI PANEL", items: [
    { icon: "◎", label: "Inicio" },
    { icon: "👥", label: "Clientes" },
    { icon: "🟨", label: "Membresías" },
    { icon: "💳", label: "Pagos" },
    { icon: "✅", label: "Asistencia" },
    { icon: "⚙️", label: "Configuración" },
  ]},
];

export default function Membresias() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Membresías");

  return (
    <div className="rec-root">
      <aside className="rec-sidebar">
        <div className="rec-sidebar-brand">
          <span className="rec-brand-name">KIN GYM</span>
          <span className="rec-brand-sub">PRO SYSTEM</span>
        </div>
        <nav className="rec-nav">
          {NAV_ITEMS.map((group) => (
            <div key={group.section} className="rec-nav-group">
              <span className="rec-nav-section">{group.section}</span>
              {group.items.map((item) => (
                <button
                  key={item.label}
                  className={`rec-nav-item ${activeNav === item.label ? "active" : ""}`}
                  onClick={() => {
                    setActiveNav(item.label);
                    if (item.label === "Inicio") navigate("/recepcion/inicio");
                    if (item.label === "Clientes") navigate("/recepcion/clientes");
                    if (item.label === "Membresías") navigate("/recepcion/membresias");
                    if (item.label === "Pagos") navigate("/recepcion/pagos");
                    if (item.label === "Asistencia") navigate("/recepcion/asistencia");
                  }}
                >
                  <span className="rec-nav-icon">{item.icon}</span>
                  <span className="rec-nav-label">{item.label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <div className="rec-main">
        <header className="rec-topbar">
          <h1 className="rec-page-title">Gestión de Membresías</h1>
        </header>

        <div className="rec-content">
          <div className="rec-card">
            <h3 className="rec-card-title" style={{ marginBottom: 16 }}>Planes Disponibles</h3>
            <ul className="rec-list">
              {MEMBRESIAS.map((m) => (
                <li key={m.id} className="rec-list-item">
                  <div className="rec-item-info">
                    <span className="rec-item-nombre">{m.nombre}</span>
                    <span className="rec-item-desc">{m.duracion} — {m.usuarios} usuarios activos</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontWeight: "bold", color: "#E8FF47" }}>{m.precio}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}