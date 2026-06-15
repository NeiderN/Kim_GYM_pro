import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Pagos.css";

const KPI = [
  { label: "INGRESOS HOY",  value: "$480K", sub: "6 pagos",   subColor: "#3DFFA0" },
  { label: "ESTA SEMANA",   value: "$2.1M", sub: "↑ +15%",    subColor: "#3DFFA0" },
  { label: "ESTE MES",      value: "$4.2M", sub: "Meta: $5M", subColor: "#3DFFA0" },
];

const HISTORIAL = [
  { id: "#PAY-0891", cliente: "Laura Arango",  membresia: "Mensual",    fecha: "08 Jun 10:42", valor: "$80.000",  metodo: "Nequi"         },
  { id: "#PAY-0890", cliente: "Carlos Mejía",  membresia: "Trimestral", fecha: "08 Jun 09:30", valor: "$220.000", metodo: "Transferencia"  },
  { id: "#PAY-0889", cliente: "Jorge García",  membresia: "Semestral",  fecha: "07 Jun 18:15", valor: "$380.000", metodo: "Tarjeta"        },
  { id: "#PAY-0888", cliente: "Sofía Ríos",    membresia: "Mensual",    fecha: "07 Jun 16:00", valor: "$80.000",  metodo: "Efectivo"       },
];

const METODOS = [
  { label: "Efectivo",   icon: "💵", value: "efectivo"       },
  { label: "Nequi",      icon: "📱", value: "nequi"          },
  { label: "Daviplata",  icon: "📲", value: "daviplata"      },
  { label: "Transfer.",  icon: "🏦", value: "transferencia"  },
  { label: "Débito",     icon: "💳", value: "debito"         },
  { label: "Crédito",    icon: "💎", value: "credito"        },
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

const FILTROS = ["Hoy", "Semana", "Mes"];

export default function Pagos() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Pagos");
  const [filtroActivo, setFiltroActivo] = useState("Hoy");
  const [metodoActivo, setMetodoActivo] = useState("efectivo");
  const [form, setForm] = useState({
    cliente: "", membresia: "Mensual — $80.000", observacion: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="pag-root">

      {/* ════ SIDEBAR ════ */}
      <aside className="pag-sidebar">
        <div className="pag-sidebar-brand">
          <span className="pag-brand-name">GYMCONTROL</span>
          <span className="pag-brand-sub">PRO SYSTEM</span>
        </div>

        <nav className="pag-nav">
          {NAV_ITEMS.map((group) => (
            <div key={group.section} className="pag-nav-group">
              <span className="pag-nav-section">{group.section}</span>
              {group.items.map((item) => (
                <button
                  key={item.label}
                  className={`pag-nav-item ${activeNav === item.label ? "active" : ""}`}
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
                  <span className="pag-nav-icon">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="pag-sidebar-user">
          <div className="pag-avatar">NN</div>
          <div className="pag-user-info">
            <span className="pag-user-name">Neider Nuñez</span>
            <span className="pag-user-role">Administrador</span>
          </div>
          <button className="pag-user-menu">⋮</button>
        </div>
      </aside>

      {/* ════ MAIN ════ */}
      <div className="pag-main">

        {/* Topbar */}
        <header className="pag-topbar">
          <h1 className="pag-page-title">PAGOS</h1>
          <div className="pag-search">
            <span className="pag-search-icon">🔍</span>
            <input
              type="text"
              className="pag-search-input"
              placeholder="Buscar cliente..."
            />
          </div>
        </header>

        <div className="pag-content">
          <div className="pag-layout">

            {/* Columna izquierda */}
            <div className="pag-col-left">

              {/* KPIs */}
              <div className="pag-kpi-grid">
                {KPI.map((k) => (
                  <div key={k.label} className="pag-kpi-card">
                    <span className="pag-kpi-label">{k.label}</span>
                    <div className="pag-kpi-value">{k.value}</div>
                    <span className="pag-kpi-sub" style={{ color: k.subColor }}>{k.sub}</span>
                  </div>
                ))}
              </div>

              {/* Historial */}
              <div className="pag-card">
                <div className="pag-card-header">
                  <h3 className="pag-card-title">Historial de Pagos</h3>
                  <div className="pag-filtros">
                    {FILTROS.map((f) => (
                      <button
                        key={f}
                        className={`pag-filtro-btn ${filtroActivo === f ? "active" : ""}`}
                        onClick={() => setFiltroActivo(f)}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <table className="pag-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>CLIENTE</th>
                      <th>MEMBRESÍA</th>
                      <th>FECHA</th>
                      <th>VALOR</th>
                      <th>MÉTODO</th>
                      <th>ACCIÓN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HISTORIAL.map((p) => (
                      <tr key={p.id} className="pag-table-row">
                        <td className="pag-mono pag-id">{p.id}</td>
                        <td className="pag-cliente">{p.cliente}</td>
                        <td>{p.membresia}</td>
                        <td className="pag-mono">{p.fecha}</td>
                        <td className="pag-valor">{p.valor}</td>
                        <td><span className="pag-metodo-tag">{p.metodo}</span></td>
                        <td>
                          <button className="pag-btn pag-btn--icon">🗑️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

            {/* Columna derecha — formulario */}
            <div className="pag-col-right">
              <div className="pag-card pag-form-card">
                <h3 className="pag-form-title">REGISTRAR PAGO</h3>
                <p className="pag-form-sub">Registra el pago de un cliente</p>

                <form className="pag-form">

                  <div className="pag-field">
                    <label className="pag-label">CLIENTE</label>
                    <input
                      className="pag-input"
                      name="cliente"
                      value={form.cliente}
                      onChange={handleChange}
                      placeholder="Buscar por nombre o doc..."
                    />
                  </div>

                  <div className="pag-field">
                    <label className="pag-label">MEMBRESÍA / CONCEPTO</label>
                    <select
                      className="pag-input pag-select"
                      name="membresia"
                      value={form.membresia}
                      onChange={handleChange}
                    >
                      <option>Mensual — $80.000</option>
                      <option>Trimestral — $220.000</option>
                      <option>Semestral — $380.000</option>
                      <option>Anual — $650.000</option>
                    </select>
                  </div>

                  <div className="pag-field">
                    <label className="pag-label">MÉTODO DE PAGO</label>
                    <div className="pag-metodos-grid">
                      {METODOS.map((m) => (
                        <button
                          key={m.value}
                          type="button"
                          className={`pag-metodo-btn ${metodoActivo === m.value ? "active" : ""}`}
                          onClick={() => setMetodoActivo(m.value)}
                        >
                          <span className="pag-metodo-icon">{m.icon}</span>
                          <span className="pag-metodo-label">{m.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pag-field">
                    <label className="pag-label">OBSERVACIÓN</label>
                    <input
                      className="pag-input"
                      name="observacion"
                      value={form.observacion}
                      onChange={handleChange}
                      placeholder="Opcional..."
                    />
                  </div>

                  {/* Resumen */}
                  <div className="pag-resumen">
                    <div className="pag-resumen-row">
                      <span>Plan seleccionado</span>
                      <span>Mensual</span>
                    </div>
                    <div className="pag-resumen-row">
                      <span>Método</span>
                      <span>{METODOS.find(m => m.value === metodoActivo)?.label}</span>
                    </div>
                    <div className="pag-resumen-row">
                      <span>Fecha</span>
                      <span>08 Jun 2025</span>
                    </div>
                    <div className="pag-resumen-row pag-resumen-total">
                      <span>TOTAL</span>
                      <span className="pag-total-valor">$80.000</span>
                    </div>
                  </div>

                  <button type="submit" className="pag-btn pag-btn--guardar">
                    REGISTRAR PAGO
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}