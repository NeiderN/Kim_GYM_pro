import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Clientes.css";

const FILTERS = [
  { label: "Todos", value: "todos" },
  { label: "Activos", value: "activos" },
  { label: "Inactivos", value: "inactivos" },
  { label: "Vencidos", value: "vencidos" },
];

const NAV_ITEMS = [
  { section: "PRINCIPAL", items: [
    { icon: "◎", label: "Inicio" },
    { icon: "👥", label: "Clientes" },
    { icon: "🟨", label: "Membresías" },
    { icon: "💳", label: "Pagos" },
    { icon: "✅", label: "Asistencia" },
  ]},
  { section: "ADMINISTRACIÓN", items: [
    { icon: "👥", label: "Usuarios" },
    { icon: "📊", label: "Reportes" },
    { icon: "⚙️", label: "Configuración" },
  ]},
];

export default function Clientes() {
  const [activeNav, setActiveNav] = useState("Clientes");
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("todos");
  
  // 1. ESTADOS DINÁMICOS DESDE API
  const [clientes, setClientes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Obtener usuario autenticado de la sesión
  const sessionUser = JSON.parse(localStorage.getItem("usuario") || "{}");

  // 2. PETICIÓN HTTP A LA BD
  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/usuarios");
      if (response.ok) {
        const data = await response.json();
        // Mapeo seguro de atributos según la estructura de BD
        const MappedData = data.map(c => ({
          id: c.id_usuario,
          nombre: c.nombre || "Sin Nombre",
          email: c.correo || "Sin Correo",
          doc: c.id_usuario?.toString() || "—",
          tel: c.telefono || "—",
          plan: c.plan || "Sin asignar",
          planType: (c.plan || "sin-asignar").toLowerCase(),
          estado: c.estado || "Activo",
          estadoType: (c.estado || "activo").toLowerCase(),
          vence: c.fecha_vencimiento || "—",
          alerta: c.estado === "Vencido",
          bg: "#3b82f6",
          iniciales: (c.nombre || "NN").split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2)
        }));
        setClientes(MappedData);
      }
    } catch (error) {
      console.error("Error cargando clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/", { replace: true });
  };

  // 4. FILTRADO DINÁMICO (BÚSQUEDA + BOTONES)
  const filteredClientes = clientes.filter((c) => {
    const matchSearch = c.nombre.toLowerCase().includes(search.toLowerCase()) || c.doc.includes(search);
    if (activeFilter === "activos") return matchSearch && c.estadoType === "activo";
    if (activeFilter === "inactivos") return matchSearch && c.estadoType === "inactivo";
    if (activeFilter === "vencidos") return matchSearch && c.estadoType === "vencido";
    return matchSearch;
  });

  return (
    <div className="cli-root">
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
                    if (item.label === "Inicio") navigate("/inicio");
                    if (item.label === "Clientes") navigate("/clientes");
                    if (item.label === "Membresías") navigate("/membresias");
                    if (item.label === "Pagos") navigate("/pagos");
                    if (item.label === "Asistencia") navigate("/asistencia");
                    if (item.label === "Reportes") navigate("/reportes");
                    if (item.label === "Configuración") navigate("/configuracion");
                    if (item.label === "Usuarios") navigate("/usuarios");
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
          <div className="cli-avatar">{sessionUser.nombre ? sessionUser.nombre.substring(0, 2).toUpperCase() : "ADM"}</div>
          <div className="cli-user-info">
            <span className="cli-user-name">{sessionUser.nombre || "Usuario"}</span>
            <span className="cli-user-role">{sessionUser.id_rol === 1 ? "Administrador" : "Recepción"}</span>
          </div>
          <button className="cli-user-menu" title="Cerrar Sesión" onClick={handleLogout}>🚪</button>
        </div>
      </aside>

      <div className="cli-main">
        <header className="cli-topbar">
          <h1 className="cli-page-title">CLIENTES</h1>
          <div className="cli-topbar-right">
            <div className="cli-search">
              <span className="cli-search-icon">🔍</span>
              <input
                type="text"
                className="cli-search-input"
                placeholder="Buscar por nombre o doc..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="cli-new-btn">+ NUEVO CLIENTE</button>
          </div>
        </header>

        <div className="cli-content">
          <div className="cli-filters">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={`cli-filter-btn ${activeFilter === f.value ? "active" : ""}`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="cli-table-card">
            {loading ? (
              <p style={{ padding: "20px", textAlign: "center" }}>Cargando clientes...</p>
            ) : (
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
                  {filteredClientes.map((c) => (
                    <tr key={c.id}>
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
                          <button className="cli-btn cli-btn--ver" onClick={() => navigate(`/clientes/${c.id}`)}>Ver</button>
                          <button className="cli-btn cli-btn--icon cli-btn--edit">✏️</button>
                          <button className="cli-btn cli-btn--icon cli-btn--delete">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}