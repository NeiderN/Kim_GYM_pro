import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Clientes.css";

/* ── Datos de ejemplo ── */
const CLIENTES = [
  { iniciales: "LA", nombre: "Laura Arango", email: "laura@email.com",   doc: "1098765432", tel: "300 123 4567", plan: "Mensual",     planType: "mensual",    estado: "Activo",    estadoType: "activo",   vence: "30 Jun 2025", alerta: false, bg: "#3b82f6" },
  { iniciales: "CM", nombre: "Carlos Mejía",  email: "cmejia@email.com",  doc: "1023456789", tel: "315 987 6543", plan: "Trimestral",  planType: "trimestral", estado: "Activo",    estadoType: "activo",   vence: "15 Ago 2025", alerta: false, bg: "#3b82f6" },
  { iniciales: "MP", nombre: "María Pérez",   email: "mperez@email.com",  doc: "1087654321", tel: "312 456 7890", plan: "Mensual",     planType: "vencido",    estado: "Vencido",   estadoType: "vencido",  vence: "01 Jun 2025", alerta: true,  bg: "#ef4444" },
  { iniciales: "JG", nombre: "Jorge García",  email: "jgarcia@email.com", doc: "1056789012", tel: "318 321 0987", plan: "Semestral",   planType: "semestral",  estado: "Activo",    estadoType: "activo",   vence: "20 Nov 2025", alerta: false, bg: "#f97316" },
  { iniciales: "SR", nombre: "Sofia Ríos",    email: "srios@email.com",   doc: "1034567890", tel: "316 654 3210", plan: "— Sin asignar", planType: "sin-asignar", estado: "Inactivo", estadoType: "inactivo", vence: "—",          alerta: false, bg: "#a855f7" },
];

const FILTERS = [
  { label: "Todos",     count: 347, value: "todos" },
  { label: "Activos",   count: 298, value: "activos" },
  { label: "Inactivos", count: 49,  value: "inactivos" },
  { label: "Vencidos",  count: 49,  value: "vencidos" },
];

const NAV_ITEMS = [
  { section: "PRINCIPAL", items: [
    { icon: "◎", label: "Inicio",   active: false },
    { icon: "👥", label: "Clientes",    active: true  },
    { icon: "🟨", label: "Membresías",  active: false },
    { icon: "💳", label: "Pagos",       active: false },
    { icon: "✅", label: "Asistencia",  active: false },
  ]},
  { section: "ADMINISTRACIÓN", items: [
    { icon: "📊", label: "Reportes",     active: false },
    { icon: "⚙️", label: "Configuración", active: false },
  ]},
];

export default function Clientes() {
  const [activeNav, setActiveNav] = useState("Clientes");
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("todos");

  return (
    <div className="cli-root">

      {/* ════ SIDEBAR ════ */}
      <aside className="cli-sidebar">
        <div className="cli-sidebar-brand">
          <span className="cli-brand-name">GYMCONTROL</span>
          <span className="cli-brand-sub">PRO SYSTEM</span>
        </div>

        <nav className="cli-nav">
        {NAV_ITEMS.map((group) => (
          <div key={group.section} className="cli-nav-group">
            <span className="cli-nav-section">{group.section}</span>
            {group.items.map((item) => (
              <button
                key={item.label}
                className={`cli-nav-item ${activeNav === item.label ? "active" : ""}`}
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
                <span className="cli-nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>

        <div className="cli-sidebar-user">
          <div className="cli-avatar">NN</div>
          <div className="cli-user-info">
            <span className="cli-user-name">Neider Nuñez</span>
            <span className="cli-user-role">Administrador</span>
          </div>
          <button className="cli-user-menu">⋮</button>
        </div>
      </aside>

      {/* ════ CONTENIDO PRINCIPAL ════ */}
      <div className="cli-main">

        {/* Topbar */}
        <header className="cli-topbar">
          <h1 className="cli-page-title">CLIENTES</h1>
          <div className="cli-topbar-right">
            <div className="cli-search">
              <span className="cli-search-icon">🔍</span>
              <input
                type="text"
                className="cli-search-input"
                placeholder="Buscar por nombre o doc..."
              />
            </div>
            <button className="cli-new-btn">+ NUEVO CLIENTE</button>
          </div>
        </header>

        {/* Contenido scrolleable */}
        <div className="cli-content">

          {/* Filtros */}
          <div className="cli-filters">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={`cli-filter-btn ${activeFilter === f.value ? "active" : ""}`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label} ({f.count})
              </button>
            ))}
          </div>

          {/* Tabla */}
          <div className="cli-table-card">
            <table className="cli-table">
              <thead>
                <tr>
                  <th>CLIENTE</th>
                  <th>DOCUMENTO</th>
                  <th>TELÉFONO</th>
                  <th>MEMBRESÍA</th>
                  <th>ESTADO</th>
                  <th>VENCE</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {CLIENTES.map((c) => (
                  <tr key={c.doc}>
                    <td>
                      <div className="cli-cell-cliente">
                        <div className="cli-avatar-table" style={{ backgroundColor: c.bg }}>
                          {c.iniciales}
                        </div>
                        <div className="cli-cliente-info">
                          <span className="cli-cliente-nombre">{c.nombre}</span>
                          <span className="cli-cliente-email">{c.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="cli-doc">{c.doc}</td>
                    <td className="cli-tel">{c.tel}</td>
                    <td>
                      <span className={`cli-tag cli-tag--${c.planType}`}>{c.plan}</span>
                    </td>
                    <td>
                      <span className={`cli-estado cli-estado--${c.estadoType}`}>
                        <span className="cli-estado-dot" />
                        {c.estado}
                      </span>
                    </td>
                    <td className={`cli-vence ${c.alerta ? "cli-vence--alerta" : ""}`}>
                      {c.vence} {c.alerta && "⚠️"}
                    </td>
                    <td>
                      <div className="cli-actions">
                        <button className="cli-btn cli-btn--ver" onClick={() => navigate(`/clientes/${c.doc}`)}>Ver</button>
                        <button className="cli-btn cli-btn--icon cli-btn--edit">✏️</button>
                        <button className="cli-btn cli-btn--icon cli-btn--delete">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Paginación */}
            <div className="cli-pagination">
              <span className="cli-pagination-info">Mostrando 1–5 de 347 clientes</span>
              <div className="cli-pagination-pages">
                <button className="cli-page-btn active">1</button>
                <button className="cli-page-btn">2</button>
                <button className="cli-page-btn">3</button>
                <span className="cli-page-dots">...</span>
                <button className="cli-page-btn">70</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}