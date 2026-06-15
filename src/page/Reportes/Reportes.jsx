import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Reportes.css";

const KPI = [
  { label: "CLIENTES REG.", value: "347", valueColor: "#E8FF47" },
  { label: "ACTIVOS",       value: "298", valueColor: "#3DFFA0" },
  { label: "INGRESO MENSUAL", value: "$4.2M", valueColor: "#FFAA47" },
  { label: "VENCIDAS",      value: "49",  valueColor: "#FF4747" },
];

const BAR_DATA = [
  { mes: "Ene", value: 55 },
  { mes: "Feb", value: 62 },
  { mes: "Mar", value: 58 },
  { mes: "Abr", value: 70 },
  { mes: "May", value: 80 },
  { mes: "Jun", value: 100 },
  { mes: "Jul", value: 60 },
  { mes: "Ago", value: 65 },
  { mes: "Sep", value: 68 },
  { mes: "Oct", value: 72 },
  { mes: "Nov", value: 75 },
  { mes: "Dic", value: 70 },
];

const DONUT_DATA = [
  { label: "Activas",    value: 298, color: "#3DFFA0" },
  { label: "Por vencer", value: 22,  color: "#47C5FF" },
  { label: "Vencidas",   value: 27,  color: "#FF4747" },
];

const TOP_CLIENTES = [
  { pos: 1, initials: "CM", nombre: "Carlos Mejía",  asistencias: 28, plan: "Trimestral", planTipo: "trimestral", ultimo: "Hoy 10:38", bg: "#3b82f6" },
  { pos: 2, initials: "LA", nombre: "Laura Arango",  asistencias: 25, plan: "Mensual",    planTipo: "mensual",    ultimo: "Hoy 10:42", bg: "#3b82f6" },
  { pos: 3, initials: "JG", nombre: "Jorge García",  asistencias: 22, plan: "Semestral",  planTipo: "semestral",  ultimo: "Hoy 10:22", bg: "#E8FF47" },
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

const FILTROS = ["Mensual", "Semanal", "Anual"];

function DonutChart() {
  const size = 100;
  const cx = size / 2;
  const cy = size / 2;
  const r = 36;
  const stroke = 16;
  const circ = 2 * Math.PI * r;
  const total = DONUT_DATA.reduce((a, b) => a + b.value, 0);

  let offset = 0;
  const slices = DONUT_DATA.map((d) => {
    const dash = (d.value / total) * circ;
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

export default function Reportes() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Reportes");
  const [filtroActivo, setFiltroActivo] = useState("Mensual");
  const [hoveredBar, setHoveredBar] = useState(null);
  const maxBar = Math.max(...BAR_DATA.map((d) => d.value));

  return (
    <div className="rep-root">

      {/* ════ SIDEBAR ════ */}
      <aside className="rep-sidebar">
        <div className="rep-sidebar-brand">
          <span className="rep-brand-name">GYMCONTROL</span>
          <span className="rep-brand-sub">PRO SYSTEM</span>
        </div>

        <nav className="rep-nav">
          {NAV_ITEMS.map((group) => (
            <div key={group.section} className="rep-nav-group">
              <span className="rep-nav-section">{group.section}</span>
              {group.items.map((item) => (
                <button
                  key={item.label}
                  className={`rep-nav-item ${activeNav === item.label ? "active" : ""}`}
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
                  <span className="rep-nav-icon">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="rep-sidebar-user">
          <div className="rep-avatar-sidebar">NN</div>
          <div className="rep-user-info">
            <span className="rep-user-name">Neider Nuñez</span>
            <span className="rep-user-role">Administrador</span>
          </div>
          <button className="rep-user-menu">⋮</button>
        </div>
      </aside>

      {/* ════ MAIN ════ */}
      <div className="rep-main">

        {/* Topbar */}
        <header className="rep-topbar">
          <h1 className="rep-page-title">REPORTES</h1>
          <div className="rep-topbar-right">
            <div className="rep-filtros">
              {FILTROS.map((f) => (
                <button
                  key={f}
                  className={`rep-filtro-btn ${filtroActivo === f ? "active" : ""}`}
                  onClick={() => setFiltroActivo(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <button className="rep-export-btn">📤 Exportar</button>
          </div>
        </header>

        <div className="rep-content">

          {/* KPIs */}
          <div className="rep-kpi-grid">
            {KPI.map((k) => (
              <div key={k.label} className="rep-kpi-card">
                <span className="rep-kpi-label">{k.label}</span>
                <div className="rep-kpi-value" style={{ color: k.valueColor }}>{k.value}</div>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="rep-charts-row">

            {/* Bar chart */}
            <div className="rep-card rep-bar-card">
              <div className="rep-card-header">
                <h3 className="rep-card-title">Ingresos Mensuales 2025</h3>
                <span className="rep-badge">COP</span>
              </div>
              <div className="rep-bar-chart">
                {BAR_DATA.map((d, i) => (
                  <div key={d.mes} className="rep-bar-col">
                    <div
                      className="rep-bar"
                      style={{
                        height: `${(d.value / maxBar) * 100}%`,
                        backgroundColor: hoveredBar === i
                          ? "#E8FF47"
                          : d.value === maxBar
                          ? "#E8FF47"
                          : "#3a3d28",
                        opacity: hoveredBar !== null && hoveredBar !== i ? 0.4 : 1,
                        transition: "background-color 0.2s, opacity 0.2s",
                      }}
                      onMouseEnter={() => setHoveredBar(i)}
                      onMouseLeave={() => setHoveredBar(null)}
                    />
                    <span className="rep-bar-label">{d.mes}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Donut */}
            <div className="rep-card rep-donut-card">
              <div className="rep-card-header">
                <h3 className="rep-card-title">Estado Membresías</h3>
              </div>
              <div className="rep-donut-body">
                <DonutChart />
                <ul className="rep-donut-legend">
                  {DONUT_DATA.map((d) => (
                    <li key={d.label} className="rep-donut-item">
                      <span className="rep-donut-dot" style={{ background: d.color }} />
                      {d.label} — {d.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Top clientes */}
          <div className="rep-card">
            <div className="rep-card-header">
              <h3 className="rep-card-title">Clientes Más Frecuentes</h3>
              <span className="rep-badge rep-badge--green">TOP 5</span>
            </div>
            <table className="rep-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>CLIENTE</th>
                  <th>ASISTENCIAS</th>
                  <th>PLAN</th>
                  <th>ÚLTIMO INGRESO</th>
                </tr>
              </thead>
              <tbody>
                {TOP_CLIENTES.map((c) => (
                  <tr key={c.pos} className="rep-table-row">
                    <td className="rep-pos">{c.pos}</td>
                    <td>
                      <div className="rep-cell-cliente">
                        <div className="rep-avatar" style={{ backgroundColor: c.bg, color: c.bg === "#E8FF47" ? "#0A0A0A" : "#fff" }}>
                          {c.initials}
                        </div>
                        <span className="rep-cliente-nombre">{c.nombre}</span>
                      </div>
                    </td>
                    <td className="rep-asistencias">{c.asistencias} días</td>
                    <td>
                      <span className={`rep-tag rep-tag--${c.planTipo}`}>{c.plan}</span>
                    </td>
                    <td className="rep-mono">{c.ultimo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}