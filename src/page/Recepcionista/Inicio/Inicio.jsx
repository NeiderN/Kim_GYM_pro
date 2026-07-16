import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Inicio.css";

const KPI_DATA = [
  { label: "INGRESOS HOY",        value: "84",  change: "+11 vs ayer",           changeType: "up",   icon: "🚪", valuecolor: "#E8FF47" },
  { label: "CLIENTES ACTIVOS",    value: "298", change: "de 347 registrados",     changeType: "up",   icon: "👥", valuecolor: "#3DFFA0" },
  { label: "MEMBRESÍAS VENCIDAS", value: "49",  change: "requieren renovación",   changeType: "down", icon: "⚠️", valuecolor: "#FF4747" },
  { label: "PAGOS HOY",           value: "6",   change: "$480.000 recaudados",    changeType: "up",   icon: "💳", valuecolor: "#47C5FF" },
];

const ACTIVITY = [
  { initials: "LA", name: "Laura Arango",  desc: "Ingreso registrado · Mensual",          time: "10:42", dot: "#3DFFA0", bg: "#3b82f6", blocked: false },
  { initials: "CM", name: "Carlos Mejia",  desc: "Pago registrado · $220.000",            time: "10:38", dot: "#3DFFA0", bg: "#f97316", blocked: false },
  { initials: "MP", name: "María Pérez",   desc: "Acceso bloqueado · Membresía vencida",  time: "10:15", dot: "#FF4747", bg: "#ef4444", blocked: true  },
  { initials: "JG", name: "Jorge García",  desc: "Nuevo cliente registrado",              time: "09:51", dot: "#FFAA47", bg: "#E8FF47", blocked: false },
  { initials: "SR", name: "Sofía Ríos",    desc: "Ingreso registrado · Mensual",          time: "09:33", dot: "#3DFFA0", bg: "#a855f7", blocked: false },
];

const PROXIMAS = [
  { initials: "LA", nombre: "Laura Arango",  sub: "Mensual · vence 30 Jun",    dias: 22, bg: "#3b82f6" },
  { initials: "PS", nombre: "Pedro Soto",    sub: "Mensual · vence 29 Jun",    dias: 21, bg: "#a855f7" },
  { initials: "AL", nombre: "Ana López",     sub: "Trimestral · vence 28 Jun", dias: 20, bg: "#3b82f6" },
  { initials: "RP", nombre: "Ricardo Palma", sub: "Mensual · vence 27 Jun",    dias: 19, bg: "#ef4444" },
];

const NAV_ITEMS = [
  { section: "MI PANEL", items: [
    { icon: "◎",  label: "Inicio"     },
    { icon: "👥", label: "Clientes"   },
    { icon: "🟨", label: "Membresías" },
    { icon: "💳", label: "Pagos"      },
    { icon: "✅", label: "Asistencia" },
    { icon: "⚙️", label: "Configuración"},
  ]},
];

const ACCIONES = [
  { icon: "🚪", label: "Registrar Ingreso", route: "/recepcion/asistencia", color: "#FFAA47" },
  { icon: "👤", label: "Nuevo Cliente",     route: "/recepcion/clientes",   color: "#a855f7" },
  { icon: "💳", label: "Registrar Pago",    route: "/recepcion/pagos",      color: "#47C5FF" },
  { icon: "🔄", label: "Renovar Membresía", route: "/recepcion/membresias", color: "#3DFFA0" },
];

export default function Inicio() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Inicio");

  return (
    <div className="rec-root">

      {/* ════ SIDEBAR ════ */}
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
                  className={`rec-nav-item ${activeNav === item.label ? "active" : ""} ${item.locked ? "locked" : ""}`}
                  onClick={() => {
                    if (item.locked) return;
                    setActiveNav(item.label);
                    if (item.label === "Inicio")      navigate("/recepcion/inicio");
                    if (item.label === "Clientes")    navigate("/recepcion/clientes");
                    if (item.label === "Membresías")  navigate("/recepcion/membresias");
                    if (item.label === "Pagos")       navigate("/recepcion/pagos");
                    if (item.label === "Asistencia")  navigate("/recepcion/asistencia");
                  }}
                >
                  <span className="rec-nav-icon">{item.icon}</span>
                  <span className="rec-nav-label">{item.label}</span>
                  {item.locked && <span className="rec-lock-icon">🔒</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="rec-sidebar-user">
          <div className="rec-avatar-sidebar">AN</div>
          <div className="rec-user-info">
            <span className="rec-user-name">Ana Nuñez</span>
            <span className="rec-user-role">Recepcionista</span>
          </div>
          <button className="rec-user-menu" onClick={() => navigate("/")}>⏻</button>
        </div>
      </aside>

      {/* ════ MAIN ════ */}
      <div className="rec-main">

        {/* Topbar */}
        <header className="rec-topbar">
          <h1 className="rec-page-title">
            Inicio <span className="rec-title-date">— LUN 08 JUN</span>
          </h1>
          <div className="rec-topbar-right">
            <div className="rec-search">
              <span className="rec-search-icon">🔍</span>
              <input className="rec-search-input" placeholder="Buscar cliente..." />
            </div>
            <button className="rec-notif-btn">
              🔔
              <span className="rec-notif-badge">4</span>
            </button>
            <div className="rec-avatar-sm">AN</div>
          </div>
        </header>

        <div className="rec-content">

          {/* KPIs */}
          <div className="rec-kpi-grid">
            {KPI_DATA.map((kpi) => (
              <div key={kpi.label} className="rec-kpi-card">
                <div className="rec-kpi-top">
                  <span className="rec-kpi-icon">{kpi.icon}</span>
                  <span className="rec-kpi-label">{kpi.label}</span>
                </div>
                <div className="rec-kpi-value" style={{ color: kpi.valuecolor }}>{kpi.value}</div>
                <span className={`rec-kpi-change ${kpi.changeType}`}>{kpi.change}</span>
              </div>
            ))}
          </div>

          {/* Fila central */}
          <div className="rec-mid-row">

            {/* Actividad reciente */}
            <div className="rec-card">
              <div className="rec-card-header">
                <h3 className="rec-card-title">Actividad Reciente</h3>
                <span className="rec-badge rec-badge--green">TIEMPO REAL</span>
              </div>
              <ul className="rec-list">
                {ACTIVITY.map((a, i) => (
                  <li key={i} className="rec-list-item">
                    <div className="rec-avatar" style={{ backgroundColor: a.bg, color: a.bg === "#E8FF47" ? "#0A0A0A" : "#fff" }}>
                      {a.initials}
                    </div>
                    <div className="rec-item-info">
                      <span className="rec-item-nombre">{a.name}</span>
                      <span className={`rec-item-desc ${a.blocked ? "rec-item-desc--blocked" : ""}`}>{a.desc}</span>
                    </div>
                    <div className="rec-item-time">
                      <span className="rec-dot" style={{ backgroundColor: a.dot }} />
                      <span className="rec-time">{a.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Próximas a vencer */}
            <div className="rec-card rec-proximas-card">
              <div className="rec-card-header">
                <h3 className="rec-card-title">Próximas a Vencer</h3>
                <span className="rec-badge rec-badge--yellow">7 DÍAS</span>
              </div>
              <ul className="rec-proximas-list">
                {PROXIMAS.map((p, i) => (
                  <li key={i} className="rec-proxima-item">
                    <div className="rec-avatar" style={{ backgroundColor: p.bg, color: "#fff" }}>
                      {p.initials}
                    </div>
                    <div className="rec-item-info">
                      <span className="rec-item-nombre">{p.nombre}</span>
                      <span className="rec-item-desc">{p.sub}</span>
                    </div>
                    <span className="rec-dias-badge">{p.dias}d</span>
                  </li>
                ))}
              </ul>
              <button className="rec-ver-todos-btn" onClick={() => navigate("/recepcion/membresias")}>
                Ver todos →
              </button>
            </div>

          </div>

          {/* Acciones rápidas */}
          <div className="rec-card">
            <h3 className="rec-card-title" style={{ marginBottom: 16 }}>Acciones Rápidas</h3>
            <div className="rec-acciones-grid">
              {ACCIONES.map((a) => (
                <button key={a.label} className="rec-accion-btn" onClick={() => navigate(a.route)}>
                  <span className="rec-accion-icon" style={{ color: a.color }}>{a.icon}</span>
                  <span className="rec-accion-label">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}