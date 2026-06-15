import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Membresias.css";

const PLANES = [
  { nombre: "MENSUAL",    precio: "$80.000",  dias: 30,  activos: 189, color: "#E8FF47",  tipo: "mensual"    },
  { nombre: "TRIMESTRAL", precio: "$220.000", dias: 90,  activos: 67,  color: "#47C5FF",  tipo: "trimestral" },
  { nombre: "SEMESTRAL",  precio: "$380.000", dias: 180, activos: 28,  color: "#FFAA47",  tipo: "semestral"  },
  { nombre: "ANUAL",      precio: "$650.000", dias: 365, activos: 14,  color: "#3DFFA0",  tipo: "anual"      },
];

const PROXIMAS = [
  { cliente: "Laura Arango", plan: "Mensual",    planTipo: "mensual",    vence: "30 Jun", dias: 22 },
  { cliente: "Pedro Soto",   plan: "Mensual",    planTipo: "mensual",    vence: "29 Jun", dias: 21 },
  { cliente: "Ana López",    plan: "Trimestral", planTipo: "trimestral", vence: "28 Jun", dias: 20 },
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

export default function Membresias() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Membresías");
  const [form, setForm] = useState({
    nombre: "", descripcion: "", precio: "80000", duracion: "30", estado: "Activo",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleGuardar(e) {
    e.preventDefault();
    alert(`Plan "${form.nombre}" guardado`);
  }

  return (
    <div className="mem-root">

      {/* ════ SIDEBAR ════ */}
      <aside className="mem-sidebar">
        <div className="mem-sidebar-brand">
          <span className="mem-brand-name">GYMCONTROL</span>
          <span className="mem-brand-sub">PRO SYSTEM</span>
        </div>

        <nav className="mem-nav">
          {NAV_ITEMS.map((group) => (
            <div key={group.section} className="mem-nav-group">
              <span className="mem-nav-section">{group.section}</span>
              {group.items.map((item) => (
                <button
                  key={item.label}
                  className={`mem-nav-item ${activeNav === item.label ? "active" : ""}`}
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
                  <span className="mem-nav-icon">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="mem-sidebar-user" onClick={() => {}}>
          <div className="mem-avatar">NN</div>
          <div className="mem-user-info">
            <span className="mem-user-name">Neider Nuñez</span>
            <span className="mem-user-role">Administrador</span>
          </div>
          <button className="mem-user-menu">⋮</button>
        </div>
      </aside>

      {/* ════ MAIN ════ */}
      <div className="mem-main">

        {/* Topbar */}
        <header className="mem-topbar">
          <h1 className="mem-page-title">MEMBRESÍAS</h1>
          <button className="mem-new-btn">+ NUEVA MEMBRESÍA</button>
        </header>

        <div className="mem-content">

          {/* Grid de planes + formulario */}
          <div className="mem-layout">

            {/* Columna izquierda — planes y tabla */}
            <div className="mem-col-left">

              {/* Grid de planes */}
              <div className="mem-planes-grid">
                {PLANES.map((p) => (
                  <div key={p.nombre} className={`mem-plan-card mem-plan--${p.tipo}`}>
                    <div className="mem-plan-glow" style={{ background: `radial-gradient(circle at top left, ${p.color}18 0%, transparent 60%)` }} />
                    <span className="mem-plan-nombre" style={{ color: p.color }}>{p.nombre}</span>
                    <div className="mem-plan-precio">
                      {p.precio}<span className="mem-plan-period">/plan</span>
                    </div>
                    <p className="mem-plan-meta">{p.dias} días · {p.activos} activos</p>
                    <div className="mem-plan-actions">
                      <button
                        className="mem-btn mem-btn--asignar"
                        onClick={() => navigate(`/membresias/${p.tipo}/asignar`)}
                      >
                        Asignar
                      </button>
                      <button className="mem-btn mem-btn--icon">✏️</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Membresías próximas a vencer */}
              <div className="mem-card">
                <div className="mem-card-header">
                  <h3 className="mem-card-title">Membresías Próximas a Vencer</h3>
                  <span className="mem-badge mem-badge--orange">PRÓXIMOS 7 DÍAS</span>
                </div>
                <table className="mem-table">
                  <thead>
                    <tr>
                      <th>CLIENTE</th>
                      <th>PLAN</th>
                      <th>VENCE</th>
                      <th>DÍAS</th>
                      <th>ACCIÓN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PROXIMAS.map((r, i) => (
                      <tr key={i} className="mem-table-row">
                        <td className="mem-cliente-nombre">{r.cliente}</td>
                        <td>
                          <span className={`mem-tag mem-tag--${r.planTipo}`}>{r.plan}</span>
                        </td>
                        <td className="mem-mono">{r.vence}</td>
                        <td className="mem-dias-alerta">{r.dias} días</td>
                        <td>
                          <button
                            className="mem-btn mem-btn--renovar"
                            onClick={() => navigate(`/membresias/${r.cliente}/renovar`)}
                          >
                            Renovar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

            {/* Columna derecha — formulario */}
            <div className="mem-col-right">
              <div className="mem-card mem-form-card">
                <h3 className="mem-form-title">CREAR MEMBRESÍA</h3>
                <p className="mem-form-sub">Define un nuevo plan disponible</p>

                <form className="mem-form" onSubmit={handleGuardar}>
                  <div className="mem-field">
                    <label className="mem-label">NOMBRE DEL PLAN</label>
                    <input
                      className="mem-input"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      placeholder="Ej: Mensual Premium"
                    />
                  </div>

                  <div className="mem-field">
                    <label className="mem-label">DESCRIPCIÓN</label>
                    <input
                      className="mem-input"
                      name="descripcion"
                      value={form.descripcion}
                      onChange={handleChange}
                      placeholder="Acceso completo..."
                    />
                  </div>

                  <div className="mem-row">
                    <div className="mem-field">
                      <label className="mem-label">PRECIO (COP)</label>
                      <input
                        className="mem-input"
                        name="precio"
                        value={form.precio}
                        onChange={handleChange}
                        placeholder="80000"
                      />
                    </div>
                    <div className="mem-field">
                      <label className="mem-label">DURACIÓN (DÍAS)</label>
                      <input
                        className="mem-input"
                        name="duracion"
                        value={form.duracion}
                        onChange={handleChange}
                        placeholder="30"
                      />
                    </div>
                  </div>

                  <div className="mem-field">
                    <label className="mem-label">ESTADO</label>
                    <select
                      className="mem-input mem-select"
                      name="estado"
                      value={form.estado}
                      onChange={handleChange}
                    >
                      <option>Activo</option>
                      <option>Inactivo</option>
                    </select>
                  </div>

                  <div className="mem-form-btns">
                    <button type="submit" className="mem-btn mem-btn--guardar">GUARDAR PLAN</button>
                    <button type="button" className="mem-btn mem-btn--cancelar">Cancelar</button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}