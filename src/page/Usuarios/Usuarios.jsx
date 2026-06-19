import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Usuarios.css";

/* ── 1. DEFINICIÓN DE ÍTEMS DE NAVEGACIÓN ── */
const NAV_ITEMS = [
  { section: "PRINCIPAL", items: [
    { icon: "◎",  label: "Inicio"      },
    { icon: "👥", label: "Clientes"    },
    { icon: "🟨", label: "Membresías"  },
    { icon: "💳", label: "Pagos"       },
    { icon: "✅", label: "Asistencia"  },
  ]},
  { section: "ADMINISTRACIÓN", items: [
    { icon: "👤", label: "Usuarios"      },
    { icon: "📊", label: "Reportes"      },
    { icon: "⚙️", label: "Configuración" },
  ]},
];

/* ── Datos de ejemplo basados en la Matriz de Accesos ── */
const INITIAL_USUARIOS = [
  { iniciales: "CM", nombre: "Carlos Mendez", email: "carlos.m@gymcontrol.pro", doc: "10203040", area: "Administrativa", rol: "Administrador General", rolKey: "admin", estado: "Activo", estadoType: "activo", permisos: "Acceso Total", bg: "#e8ff47" },
  { iniciales: "LV", nombre: "Laura Victoria", email: "laura.v@gymcontrol.pro", doc: "10506070", area: "Recepción", rol: "Recepcionista", rolKey: "recepcion", estado: "Activo", estadoType: "activo", permisos: "Clientes, Pagos, Asistencia (Parcial)", bg: "#ffaa47" },
  { iniciales: "ST", nombre: "Sergio Torres", email: "sergio.t@gymcontrol.pro", doc: "10809010", area: "Financiera", rol: "Auxiliar Financiero", rolKey: "financiero", estado: "Activo", estadoType: "activo", permisos: "Pagos y Reportes Financieros", bg: "#47c5ff" },
  { iniciales: "BD", nombre: "Prof. Bruno Díaz", email: "bruno.d@gymcontrol.pro", doc: "10998877", area: "Entrenamiento", rol: "Entrenador", rolKey: "entrenador", estado: "Inactivo", estadoType: "inactivo", permisos: "Consulta de Clientes/Asistencias", bg: "#3dffa0" }
];

export default function Usuarios() {
  const navigate = useNavigate();
  
  // Estados para la gestión de datos
  const [usuarios, setUsuarios] = useState(INITIAL_USUARIOS);
  const [search, setSearch] = useState("");
  const [filterRol, setFilterRol] = useState("Todos");
  
  /* ── 2. ESTADO PARA LA NAVEGACIÓN ACTIVA ── */
  const [activeNav, setActiveNav] = useState("Usuarios");
  
  // Estados del Formulario (Crear / Editar)
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    doc: "",
    rolKey: "",
    estado: "Activo"
  });
  const [isEditing, setIsEditing] = useState(false);

  // Manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Enviar Formulario (Guardar / Actualizar)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const rolesMap = {
      admin: { rol: "Administrador General", area: "Administrativa", permisos: "Acceso Total", bg: "#e8ff47" },
      recepcion: { rol: "Recepcionista", area: "Recepción", permisos: "Clientes, Pagos, Asistencia (Parcial)", bg: "#ffaa47" },
      financiero: { rol: "Auxiliar Financiero", area: "Financiera", permisos: "Pagos y Reportes Financieros", bg: "#47c5ff" },
      entrenador: { rol: "Entrenador", area: "Entrenamiento", permisos: "Consulta de Clientes/Asistencias", bg: "#3dffa0" }
    };

    const roleConfig = rolesMap[formData.rolKey] || { rol: "Usuario", area: "General", permisos: "Lectura", bg: "#6b6d78" };
    const initials = formData.nombre.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);

    if (isEditing) {
      setUsuarios(usuarios.map(u => u.doc === formData.doc ? {
        ...u,
        nombre: formData.nombre,
        email: formData.email,
        rol: roleConfig.rol,
        rolKey: formData.rolKey,
        area: roleConfig.area,
        permisos: roleConfig.permisos,
        estado: formData.estado,
        estadoType: formData.estado.toLowerCase(),
        iniciales: initials,
        bg: roleConfig.bg
      } : u));
      setIsEditing(false);
    } else {
      const nuevoUsuario = {
        iniciales: initials,
        nombre: formData.nombre,
        email: formData.email,
        doc: formData.doc,
        area: roleConfig.area,
        rol: roleConfig.rol,
        rolKey: formData.rolKey,
        estado: formData.estado,
        estadoType: formData.estado.toLowerCase(),
        permisos: roleConfig.permisos,
        bg: roleConfig.bg
      };
      setUsuarios([...usuarios, nuevoUsuario]);
    }

    handleClearForm();
  };

  // Cargar usuario para edición
  const handleEditClick = (usuario) => {
    setIsEditing(true);
    setFormData({
      nombre: usuario.nombre,
      email: usuario.email,
      doc: usuario.doc,
      rolKey: usuario.rolKey,
      estado: usuario.estado
    });
  };

  // Eliminar Usuario
  const handleDeleteClick = (doc) => {
    if (window.confirm("¿Está seguro de que desea eliminar este usuario del sistema?")) {
      setUsuarios(usuarios.filter(u => u.doc !== doc));
    }
  };

  // Limpiar Formulario
  const handleClearForm = () => {
    setFormData({ nombre: "", email: "", doc: "", rolKey: "", estado: "Activo" });
    setIsEditing(false);
  };

  // Filtrado lógico de la lista
  const filteredUsuarios = usuarios.filter(u => {
    const matchesSearch = u.nombre.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterRol === "Todos" || u.rolKey === filterRol;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="usr-root">
      {/* SIDEBAR COMPARTIDO */}
      <aside className="usr-sidebar">
        <div className="cli-sidebar-brand">
          <span className="cli-brand-name">GYMCONTROL</span>
          <span className="cli-brand-sub">PRO SYSTEM</span>
        </div>
        <nav className="usr-nav">
          {NAV_ITEMS.map((group) => (
            <div key={group.section} className="usr-nav-group">
              <span className="usr-nav-section">{group.section}</span>
              {group.items.map((item) => (
                <button
                  key={item.label}
                  className={`usr-nav-item ${activeNav === item.label ? "active" : ""}`}
                  onClick={() => {
                    setActiveNav(item.label);
                    if (item.label === "Inicio")        navigate("/inicio");
                    if (item.label === "Clientes")      navigate("/clientes");
                    if (item.label === "Membresías")    navigate("/membresias");
                    if (item.label === "Pagos")         navigate("/pagos");
                    if (item.label === "Asistencia")    navigate("/asistencia");
                    if (item.label === "Reportes")      navigate("/reportes");
                    if (item.label === "Configuración") navigate("/configuracion");
                    if (item.label === "Usuarios")      navigate("/usuarios");
                  }}
                >
                  <span className="usr-nav-icon">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* COMPONENTE DE USUARIO CORREGIDO CON SU PREFIJO 'usr-' */}
        <div className="usr-sidebar-user">
          <div className="usr-avatar-footer">NN</div>
          <div className="usr-user-info">
            <span className="usr-user-name">Neider Nuñez</span>
            <span className="usr-user-role">Administrador</span>
          </div>
          <button className="usr-user-menu">⋮</button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="usr-main">
        {/* TOPBAR */}
        <header className="usr-topbar">
          <div className="usr-topbar-left">
            <h1 className="usr-page-title">Gestión de <span>Usuarios</span></h1>
            <p className="usr-page-subtitle">Panel de control de accesos y asignación de roles jerárquicos</p>
          </div>
          <div className="usr-topbar-right">
            <div className="usr-search-wrapper">
              <input 
                type="text" 
                className="usr-search-input" 
                placeholder="Buscar por nombre o correo..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>  
        </header>

        {/* CONTENEDOR DE TRABAJO */}
        <div className="usr-container">
          
          {/* SECCIÓN IZQUIERDA: LISTADO */}
          <div className="usr-content-card">
            <div className="usr-card-header">
              <div className="usr-header-meta">
                <h2 className="usr-card-title">Usuarios Registrados</h2>
                <span className="usr-card-counter">{filteredUsuarios.length} usuarios encontrados</span>
              </div>
              
              <div className="usr-filter-group">
                {["Todos", "admin", "recepcion", "financiero", "entrenador"].map((rolKey) => (
                  <button 
                    key={rolKey}
                    className={`usr-filter-chip ${filterRol === rolKey ? "active" : ""}`}
                    onClick={() => setFilterRol(rolKey)}
                  >
                    {rolKey === "Todos" ? "Todos" : rolKey.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* TABLA DE USUARIOS */}
            <table className="usr-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Rol / Área</th>
                  <th>Permisos Clave del Sistema</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsuarios.map((u) => (
                  <tr key={u.doc}>
                    <td>
                      <div className="usr-info-cell">
                        <div className="usr-avatar" style={{ backgroundColor: u.bg, color: u.rolKey === "admin" ? "#0A0A0A" : "var(--color-text)" }}>
                          {u.iniciales}
                        </div>
                        <div>
                          <div className="usr-name">{u.nombre}</div>
                          <div className="usr-subtext">{u.email} • Doc: {u.doc}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`usr-badge-rol ${u.rolKey}`}>
                        {u.rol}
                      </span>
                      <div className="usr-area-subtext">{u.area}</div>
                    </td>
                    <td className="usr-permisos-cell">
                      <code>{u.permisos}</code>
                    </td>
                    <td>
                      <span className={`usr-estado usr-estado--${u.estadoType}`}>
                        <span className="usr-estado-dot" />
                        {u.estado}
                      </span>
                    </td>
                    <td>
                      <div className="usr-actions">
                        <button className="usr-btn usr-btn--edit" onClick={() => handleEditClick(u)}>✏️ Editar</button>
                        {u.rolKey !== "admin" && (
                          <button className="usr-btn usr-btn--delete" onClick={() => handleDeleteClick(u.doc)}>🗑️</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsuarios.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "40px", color: "var(--color-muted)" }}>
                      No se encontraron usuarios con los criterios seleccionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* SECCIÓN DERECHA: PANEL DE FORMULARIO */}
          <div className="usr-side-panel">
            <h2 className="usr-panel-title">{isEditing ? "⚡ Editar Usuario" : "➕ Nuevo Usuario"}</h2>
            <p className="usr-panel-subtitle">
              {isEditing ? "Modifica los privilegios o credenciales del usuario seleccionado." : "Registra un nuevo miembro del equipo y asígnale un rol."}
            </p>

            <form onSubmit={handleSubmit} className="usr-form">
              <div className="usr-form-group">
                <label className="usr-label">Nombre Completo</label>
                <input 
                  type="text" 
                  name="nombre" 
                  className="usr-input" 
                  placeholder="Ej. Andrea Gómez" 
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="usr-form-group">
                <label className="usr-label">Documento de Identidad</label>
                <input 
                  type="text" 
                  name="doc" 
                  className="usr-input" 
                  placeholder="Ej. 10452233" 
                  value={formData.doc}
                  onChange={handleInputChange}
                  disabled={isEditing}
                  required 
                />
              </div>

              <div className="usr-form-group">
                <label className="usr-label">Correo Institucional</label>
                <input 
                  type="email" 
                  name="email" 
                  className="usr-input" 
                  placeholder="nombre@gymcontrol.pro" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="usr-form-group">
                <label className="usr-label">Rol Asignado (Nivel de Acceso)</label>
                <select 
                  name="rolKey" 
                  className="usr-select" 
                  value={formData.rolKey}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Seleccionar Rol...</option>
                  <option value="admin">Administrador General (Acceso Total)</option>
                  <option value="recepcion">Recepcionista (Operativo)</option>
                  <option value="financiero">Auxiliar Financiero (Económico)</option>
                  <option value="entrenador">Entrenador (Rutinas/Asistencia)</option>
                </select>
              </div>

              <div className="usr-form-group">
                <label className="usr-label">Estado de Cuenta</label>
                <div className="usr-radio-group">
                  <label className="usr-radio-label">
                    <input 
                      type="radio" 
                      name="estado" 
                      value="Activo" 
                      checked={formData.estado === "Activo"} 
                      onChange={handleInputChange}
                    /> Activo
                  </label>
                  <label className="usr-radio-label">
                    <input 
                      type="radio" 
                      name="estado" 
                      value="Inactivo" 
                      checked={formData.estado === "Inactivo"} 
                      onChange={handleInputChange}
                    /> Inactivo
                  </label>
                </div>
              </div>

              <div className="usr-form-actions">
                <button type="button" className="usr-btn-clear" onClick={handleClearForm}>
                  Cancelar
                </button>
                <button type="submit" className="usr-btn-submit">
                  {isEditing ? "Actualizar" : "Guardar Equipo"}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}