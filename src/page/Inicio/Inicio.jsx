import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Inicio.css";

/* ── Datos de ejemplo ── */
const KPI_DATA = [
  { label: "TOTAL CLIENTES", value: "347", change: "+12 este mes",  changeType: "up",      icon: "👥",valuecolor:"#E8FF47" },
  { label: "ACTIVOS",         value: "298", change: "85.9% del total", changeType: "up",   icon: "✅",valuecolor: "#3DFFA0" },
  { label: "MEMBRESÍAS VENCIDAS", value: "49", change: "+7 esta semana", changeType: "down", icon: "⚠️",valuecolor:"#FF4747" },
  { label: "INGRESOS MES",    value: "$4.2M", change: "+18% vs anterior", changeType: "up", icon: "💰",valuecolor: "#FFAA47" },
  { label: "ASISTENCIAS HOY", value: "84",  change: "+11 vs ayer",   changeType: "up",      icon: "📋",valuecolor: "#47C5FF" },
];

const BAR_DATA = [
  { day: "Lun", value: 55 },
  { day: "Mar", value: 70 },
  { day: "Mié", value: 60 },
  { day: "Jue", value: 80 },
  { day: "Vie", value: 65 },
  { day: "Sáb", value: 100 },
  { day: "Dom", value: 45 },
];

const DONUT_DATA = [
  { label: "Mensual",    pct: 55, color: "#E8FF47" },
  { label: "Trimestral", pct: 22, color: "#47C5FF" },
  { label: "Vencida",    pct: 23, color: "#FF4747" },
];

const ACTIVITY = [
  { initials: "LA", name: "Laura Arango",   desc: "Pago membresía mensual — $80.000",      time: "10:42", dot: "#3DFFA0", bg: "#3b82f6" },
  { initials: "CM", name: "Carlos Mejia",   desc: "Ingreso registrado — Membresía activa", time: "10:38", dot: "#3DFFA0", bg: "#f97316" },
  { initials: "MP", name: "María Pérez",    desc: "Membresía vencida — Requiere renovación",time: "10:15", dot: "#FF4747", bg: "#ef4444" },
  { initials: "JG", name: "Jorge García",   desc: "Nuevo cliente registrado",              time: "09:51", dot: "#FFAA47", bg: "#E8FF47" },
];

const NAV_ITEMS = [
  { section: "PRINCIPAL", items: [
    { icon: "◎", label: "Inicio"},
    { icon: "👥", label: "Clientes"},
    { icon: "🟨", label: "Membresías"},
    { icon: "💳", label: "Pagos"},
    { icon: "✅", label: "Asistencia"},
  ]},
  { section: "ADMINISTRACIÓN", items: [
    { icon: "👤", label: "Usuarios",     active: false },
    { icon: "📊", label: "Reportes",     active: false },
    { icon: "⚙️", label: "Configuración", active: false },
  ]},
];

/* ── Donut SVG simple ── */
function DonutChart() {
  const size = 110;
  const cx = size / 2;
  const cy = size / 2;
  const r = 38;
  const stroke = 18;
  const circ = 2 * Math.PI * r;

  let offset = 0;
  const slices = DONUT_DATA.map((d) => {
    const dash = (d.pct / 100) * circ;
    const gap  = circ - dash;
    const slice = { ...d, dash, gap, offset };
    offset += dash;
    return slice;
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      {slices.map((s) => (
        <circle
          key={s.label}
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={s.color}
          strokeWidth={stroke}
          strokeDasharray={`${s.dash} ${s.gap}`}
          strokeDashoffset={-s.offset}
        />
      ))}
    </svg>
  );
}

/* ── Componente principal ── */
export default function Inicio() {
  const [activeNav, setActiveNav] = useState("Inicio");
  const navigate = useNavigate();
  const [hoveredBar, setHoveredBar] = useState(null);
  const maxBar = Math.max(...BAR_DATA.map((d) => d.value));

  return (
    <div className="dash-root">

      {/* ════ SIDEBAR ════ */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar-brand">
          <span className="dash-brand-name">GYMCONTROL</span>
          <span className="dash-brand-sub">PRO SYSTEM</span>
        </div>

       <nav className="dash-nav">
          {NAV_ITEMS.map((group) => (
            <div key={group.section} className="dash-nav-group">
            <span className="dash-nav-section">{group.section}</span>
            {group.items.map((item) => (
                <button
                key={item.label}
                className={`dash-nav-item ${activeNav === item.label ? "active" : ""}`}
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
                <span className="dash-nav-icon">{item.icon}</span>
                {item.label}
                </button>
            ))}
            </div>
        ))}
        </nav>

        <div className="dash-sidebar-user">
          <div className="dash-avatar" style={{ backgroundColor: "#E8FF47", color: "#0A0A0A" }}>NN</div>
          <div className="dash-user-info">
            <span className="dash-user-name">Neider Nuñez</span>
            <span className="dash-user-role">Administrador</span>
          </div>
          <button className="dash-user-menu">⋮</button>
        </div>
      </aside>

      {/* ════ CONTENIDO PRINCIPAL ════ */}
      <div className="dash-main">

        {/* Topbar */}
        <header className="dash-topbar">
          <h1 className="dash-page-title">INICIO — <span className="dash-page-title-date">JUN 2026</span></h1>
          <div className="dash-topbar-right">
            <div className="dash-search">
              <span className="dash-search-icon">🔍</span>
              <input
                type="text"
                className="dash-search-input"
                placeholder="Buscar cliente o transacción..."
              />
            </div>
            <button className="dash-notif-btn">
              🔔
              <span className="dash-notif-badge">4</span>
            </button>
            <div className="dash-avatar-sm">NN</div>
          </div>
        </header>

        {/* Contenido scrolleable */}
        <div className="dash-content">

          {/* KPI Grid */}
          <div className="dash-kpi-grid">
            {KPI_DATA.map((kpi) => (
              <div key={kpi.label} className="dash-kpi-card">
                <div className="dash-kpi-dot" />
                <div className="dash-kpi-top">
                  <span className="dash-kpi-icon">{kpi.icon}</span>
                  <span className="dash-kpi-label">{kpi.label}</span>
                </div>
                <div className="dash-kpi-value" style={{ color: kpi.valuecolor }}>{kpi.value}</div>
                <div className={`dash-kpi-change ${kpi.changeType}`}>
                  {kpi.changeType === "up" ? "↑" : "↑"} {kpi.change}
                </div>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="dash-charts-row">

            {/* Bar chart */}
            <div className="dash-card dash-bar-card">
              <div className="dash-card-header">
                <div>
                  <h2 className="dash-card-title">Ingresos Semanales</h2>
                  <p className="dash-card-sub">Pagos registrados por día (en miles COP)</p>
                </div>
                <span className="dash-badge">JUNIO 2025</span>
              </div>
              <div className="dash-bar-chart">
                {BAR_DATA.map((d, i) => (
                  <div key={d.day} className="dash-bar-col">
                    <div
                      className={`dash-bar ${d.value === maxBar ? "dash-bar--peak" : ""}`}
                      style={{
                        height: `${(d.value / maxBar) * 100}%`,
                        backgroundColor: hoveredBar === i
                          ? "var(--color-accent)"
                          : d.value === maxBar
                          ? "var(--color-accent)"
                          : "#3a3d28",
                        opacity: hoveredBar !== null && hoveredBar !== i ? 0.4 : 1,
                        transition: "background-color 0.2s, opacity 0.2s",
                      }}
                      onMouseEnter={() => setHoveredBar(i)}
                      onMouseLeave={() => setHoveredBar(null)}
                    />
                    <span className="dash-bar-label">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Donut chart */}
            <div className="dash-card dash-donut-card">
              <div className="dash-card-header">
                <h2 className="dash-card-title">Membresías Activas</h2>
                <span className="dash-badge">POR TIPO</span>
              </div>
              <div className="dash-donut-body">
                <DonutChart />
                <ul className="dash-donut-legend">
                  {DONUT_DATA.map((d) => (
                    <li key={d.label} className="dash-donut-item">
                      <span className="dash-donut-dot" style={{ background: d.color }} />
                      {d.label} — {d.pct}%
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Actividad reciente */}
          <div className="dash-card dash-activity-card">
            <div className="dash-card-header">
              <h2 className="dash-card-title">Actividad Reciente</h2>
              <span className="dash-badge dash-badge--green">TIEMPO REAL</span>
            </div>
            <ul className="dash-activity-list">
              {ACTIVITY.map((a) => (
                <li key={a.name} className="dash-activity-item">
                  <div className="dash-avatar-md" style={{ backgroundColor: a.bg, color: a.bg === "#E8FF47" ? "#0A0A0A" : "#fff" }}>
                    {a.initials}
                  </div>
                  <div className="dash-activity-info">
                    <span className="dash-activity-name">{a.name}</span>
                    <span className="dash-activity-desc">{a.desc}</span>
                  </div>
                  <div className="dash-activity-time">
                    <span className="dash-activity-dot" style={{ background: a.dot }} />
                    <span className="dash-activity-ts">{a.time}</span>
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