import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PerfilCliente.css";

/* ── Datos de ejemplo (en un proyecto real vendrían de la API según :id) ── */
const CLIENTE = {
  iniciales: "LA",
  nombreCompleto: "Laura Arango Castillo",
  cc: "1098765432",
  registrada: "10 Ene 2024",
  edad: 25,
  estado: "Activa",
  membresia: "Membresía Mensual",
  asistencia: "Asistencia regular",
  bg: "#E8FF47",
  color: "#0A0A0A",

  telefono: "300 123 4567",
  correo: "laura@email.com",
  direccion: "Cra 15 #45-20, Bello",
  fechaNacimiento: "12 Mar 2000",
  fechaRegistro: "10 Ene 2024",

  plan: "MENSUAL",
  precio: "$80.000",
  duracion: "30 días",
  planEstado: "Activa",
  inicio: "08 Jun 2025",
  vence: "30 Jun 2025",
  diasRestantes: 22,
};

const PAGOS = [
  { fecha: "08 Jun 2025", membresia: "Mensual", valor: "$80.000", metodo: "Nequi",    estado: "Pagado" },
  { fecha: "08 May 2025", membresia: "Mensual", valor: "$80.000", metodo: "Efectivo", estado: "Pagado" },
  { fecha: "08 Abr 2025", membresia: "Mensual", valor: "$80.000", metodo: "Tarjeta",  estado: "Pagado" },
];

const NAV_ITEMS = [
  { section: "PRINCIPAL", items: [
    { icon: "◎",  label: "Inicio"     },
    { icon: "👥", label: "Clientes"   },
    { icon: "🟨", label: "Membresías" },
    { icon: "💳", label: "Pagos"      },
    { icon: "✅", label: "Asistencia" },
  ]},
  { section: "ADMINISTRACIÓN", items: [
    { icon: "📊", label: "Reportes"      },
    { icon: "⚙️", label: "Configuración" },
  ]},
];

export default function PerfilCliente() {
  const [activeNav, setActiveNav] = useState("PerfilCliente");
  const navigate = useNavigate();
  const { id } = useParams(); // ID del cliente desde la URL: /clientes/:id

  return (
    <div className="pf-root">

      {/* ════ SIDEBAR ════ */}
      <aside className="pf-sidebar">
        <div className="pf-sidebar-brand">
          <span className="pf-brand-name">GYMCONTROL</span>
          <span className="pf-brand-sub">PRO SYSTEM</span>
        </div>

        <nav className="pf-nav">
          {NAV_ITEMS.map((group) => (
            <div key={group.section} className="pf-nav-group">
              <span className="pf-nav-section">{group.section}</span>
              {group.items.map((item) => (
                <button
                  key={item.label}
                  className={`pf-nav-item ${activeNav === item.label ? "active" : ""}`}
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
                  <span className="pf-nav-icon">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        
        <div className="pf-sidebar-user">
          <div className="pf-avatar-sidebar">NN </div>
          <div className="pf-user-info">
            <span className="pf-user-name">Neider Nuñez</span>
            <span className="pf-user-role">Administrador</span>
          </div>
          <button className="pf-user-menu">:</button>
        </div>
      </aside>

      {/* ════ CONTENIDO PRINCIPAL ════ */}
      <div className="pf-main">

        {/* Topbar */}
        <header className="pf-topbar">
          <div className="pf-topbar-left">
            <button className="pf-back-btn" onClick={() => navigate("/clientes")}>
              ←
            </button>
            <h1 className="pf-page-title">PERFIL CLIENTE</h1>
          </div>
          <div className="pf-topbar-right">
            <button className="pf-btn pf-btn--edit" onClick={() => navigate(`/clientes/${id}/editar`)}>
              ✏️ Editar
            </button>
            <button className="pf-btn pf-btn--delete">🗑️ Eliminar</button>
          </div>
        </header>

        <div className="pf-content">

          {/* Header del cliente */}
          <div className="pf-card pf-header-card">
            <div className="pf-header-left">
              <div className="pf-avatar" style={{ backgroundColor: CLIENTE.bg, color: CLIENTE.color }}>
                {CLIENTE.iniciales}
              </div>
              <div className="pf-header-info">
                <h2 className="pf-cliente-nombre">{CLIENTE.nombreCompleto}</h2>
                <div className="pf-header-meta">
                  <span>📄 CC {CLIENTE.cc}</span>
                  <span>📅 Registrada {CLIENTE.registrada}</span>
                  <span>🎂 {CLIENTE.edad} años</span>
                </div>
                <div className="pf-header-tags">
                  <span className="pf-tag pf-tag--activo"><span className="pf-tag-dot" />Activa</span>
                  <span className="pf-tag pf-tag--info">{CLIENTE.membresia}</span>
                  <span className="pf-tag pf-tag--info">{CLIENTE.asistencia}</span>
                </div>
              </div>
            </div>
            <div className="pf-header-actions">
              <button className="pf-btn pf-btn--green" onClick={() => navigate(`/pagos/nuevo?cliente=${id}`)}>
                💳 Pago
              </button>
              <button className="pf-btn pf-btn--blue" onClick={() => navigate(`/membresias/${id}/renovar`)}>
                🔄 Renovar
              </button>
            </div>
          </div>

          {/* Grid principal */}
          <div className="pf-grid">

            {/* Columna izquierda */}
            <div className="pf-col-left">

              {/* Información personal */}
              <div className="pf-card">
                <h3 className="pf-card-title">Información Personal</h3>
                <div className="pf-info-grid">
                  <div className="pf-info-item">
                    <span className="pf-info-label">TELÉFONO</span>
                    <span className="pf-info-value">{CLIENTE.telefono}</span>
                  </div>
                  <div className="pf-info-item">
                    <span className="pf-info-label">CORREO</span>
                    <span className="pf-info-value">{CLIENTE.correo}</span>
                  </div>
                  <div className="pf-info-item">
                    <span className="pf-info-label">DIRECCIÓN</span>
                    <span className="pf-info-value">{CLIENTE.direccion}</span>
                  </div>
                  <div className="pf-info-item">
                    <span className="pf-info-label">FECHA NACIMIENTO</span>
                    <span className="pf-info-value">{CLIENTE.fechaNacimiento}</span>
                  </div>
                  <div className="pf-info-item">
                    <span className="pf-info-label">FECHA REGISTRO</span>
                    <span className="pf-info-value">{CLIENTE.fechaRegistro}</span>
                  </div>
                  <div className="pf-info-item">
                    <span className="pf-info-label">ESTADO</span>
                    <span className="pf-info-value pf-estado-activo"><span className="pf-tag-dot" />Activa</span>
                  </div>
                </div>
              </div>

              {/* Historial de pagos */}
              <div className="pf-card">
                <div className="pf-card-header">
                  <h3 className="pf-card-title">Historial de Pagos</h3>
                  <span className="pf-badge">ÚLTIMOS 5</span>
                </div>
                <table className="pf-table">
                  <thead>
                    <tr>
                      <th>FECHA</th>
                      <th>MEMBRESÍA</th>
                      <th>VALOR</th>
                      <th>MÉTODO</th>
                      <th>ESTADO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PAGOS.map((p, i) => (
                      <tr
                        key={i}
                        className="pf-table-row"
                        onClick={() => navigate(`/pagos/${id}-${i}`)}
                      >
                        <td className="pf-mono">{p.fecha}</td>
                        <td>{p.membresia}</td>
                        <td className="pf-valor">{p.valor}</td>
                        <td><span className="pf-metodo">{p.metodo}</span></td>
                        <td><span className="pf-pagado">{p.estado}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Asistencias recientes */}
              <div className="pf-card">
                <div className="pf-card-header">
                  <h3 className="pf-card-title">Asistencias Recientes</h3>
                  <span className="pf-badge pf-badge--accent">ESTE MES: 18</span>
                </div>
                <div className="pf-asistencia-chart">
                  {[
                    { day: "Lun", value: 55 },
                    { day: "Mar", value: 80 },
                    { day: "Mié", value: 45 },
                    { day: "Jue", value: 70 },
                    { day: "Vie", value: 60 },
                    { day: "Sáb", value: 100 },
                    { day: "Dom", value: 40 },
                  ].map((d, i) => (
                    <div key={d.day} className="pf-bar-col">
                      <div
                        className="pf-bar"
                        style={{
                          height: `${d.value}%`,
                          backgroundColor: d.value === 100 ? "#E8FF47" : "#3a3d28",
                        }}
                      />
                      <span className="pf-bar-label">{d.day}</span>
                    </div>
                  ))}
                </div>
                <button
                  className="pf-link-btn"
                  onClick={() => navigate(`/asistencia?cliente=${id}`)}
                >
                  Ver historial completo →
                </button>
              </div>

            </div>

            {/* Columna derecha */}
            <div className="pf-col-right">
              <div className="pf-card pf-membership-card">
                <h3 className="pf-card-title">Membresía Actual</h3>
                <p className="pf-card-sub">Plan activo y fechas de vigencia</p>

                <div className="pf-plan-box">
                  <span className="pf-plan-name">{CLIENTE.plan}</span>
                  <div className="pf-plan-price">
                    {CLIENTE.precio}<span className="pf-plan-period">/mes</span>
                  </div>
                  <p className="pf-plan-meta">{CLIENTE.duracion} · {CLIENTE.planEstado}</p>
                  <div className="pf-plan-dates">
                    <p>Inicio: <strong>{CLIENTE.inicio}</strong></p>
                    <p>Vence: <strong className="pf-vence-fecha">{CLIENTE.vence}</strong></p>
                  </div>
                  <div className="pf-plan-countdown">
                    ⏱ Quedan {CLIENTE.diasRestantes} días
                  </div>
                </div>

                <button
                  className="pf-renew-btn"
                  onClick={() => navigate(`/membresias/${id}/renovar`)}
                >
                   RENOVAR MEMBRESÍA
                </button>
                <button
                  className="pf-change-plan-btn"
                  onClick={() => navigate(`/membresias/${id}/cambiar-plan`)}
                >
                  Cambiar Plan
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}