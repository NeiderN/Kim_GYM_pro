import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Usuarios.css";

const NAV_ITEMS = [
  { section: "PRINCIPAL", items: [
    { icon: "◎", label: "Inicio" },
    { icon: "👥", label: "Clientes" },
    { icon: "🟨", label: "Membresías" },
    { icon: "💳", label: "Pagos" },
    { icon: "✅", label: "Asistencia" },
  ]},
  { section: "ADMINISTRACIÓN", items: [
    { icon: "👤", label: "Usuarios" },
    { icon: "📊", label: "Reportes" },
    { icon: "⚙️", label: "Configuración" },
  ]},
];

export default function Usuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRol, setFilterRol] = useState("Todos");
  const [activeNav, setActiveNav] = useState("Usuarios");
  const [loading, setLoading] = useState(true);

  const sessionUser = JSON.parse(localStorage.getItem("usuario") || "{}");

  const [formData, setFormData] = useState({
    id_usuario: null,
    nombre: "",
    email: "",
    contrasena: "",
    rolKey: "admin",
    estado: "Activo"
  });
  const [isEditing, setIsEditing] = useState(false);

  // 1. CARGAR USUARIOS DE LA BASE DE DATOS
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/usuarios");
      if (res.ok) {
        const data = await res.json();
        setUsuarios(data);
      }
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 2. CREAR / ACTUALIZAR EN BASE DE DATOS
  const handleSubmit = async (e) => {
    e.preventDefault();

    const rolIdMap = { admin: 1, recepcion: 2, financiero: 3, entrenador: 4 };

    const payload = {
      nombre: formData.nombre,
      correo: formData.email,
      id_rol: rolIdMap[formData.rolKey] || 1,
      contrasena: formData.contrasena || "123456" // Contraseña temporal si no se ingresa
    };

    try {
      let response;
      if (isEditing) {
        // Petición de actualización (PUT)
        response = await fetch(`http://localhost:5000/api/usuarios/${formData.id_usuario}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        // Petición de creación (POST)
        response = await fetch("http://localhost:5000/api/usuarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      if (response.ok) {
        fetchUsuarios(); // Recargar lista desde la BD
        handleClearForm();
      } else {
        alert("Error al procesar la solicitud en el servidor.");
      }
    } catch (error) {
      console.error("Error guardando usuario:", error);
    }
  };

  const handleEditClick = (u) => {
    setIsEditing(true);
    const rolKeys = { 1: "admin", 2: "recepcion", 3: "financiero", 4: "entrenador" };
    setFormData({
      id_usuario: u.id_usuario,
      nombre: u.nombre,
      email: u.correo,
      contrasena: "",
      rolKey: rolKeys[u.id_rol] || "admin",
      estado: u.estado || "Activo"
    });
  };

  // 3. ELIMINAR REGISTRO EN LA BD
  const handleDeleteClick = async (id) => {
    if (window.confirm("¿Está seguro de eliminar este usuario?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
          method: "DELETE"
        });
        if (response.ok) {
          fetchUsuarios();
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  const handleClearForm = () => {
    setFormData({ id_usuario: null, nombre: "", email: "", contrasena: "", rolKey: "admin", estado: "Activo" });
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/", { replace: true });
  };

  return (
    <div className="usr-root">
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
                  <span className="usr-nav-icon">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="usr-sidebar-user">
          <div className="usr-avatar-footer">{sessionUser.nombre ? sessionUser.nombre.substring(0, 2).toUpperCase() : "ADM"}</div>
          <div className="usr-user-info">
            <span className="usr-user-name">{sessionUser.nombre || "Usuario"}</span>
            <span className="usr-user-role">Administrador</span>
          </div>
          <button className="usr-user-menu" onClick={handleLogout} title="Cerrar Sesión">🚪</button>
        </div>
      </aside>

      <div className="usr-main">
        <header className="usr-topbar">
          <div className="usr-topbar-left">
            <h1 className="usr-page-title">Gestión de <span>Usuarios</span></h1>
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

        <div className="usr-container">
          <div className="usr-content-card">
            <table className="usr-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Correo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id_usuario}>
                    <td>{u.nombre}</td>
                    <td>{u.correo}</td>
                    <td>
                      <div className="usr-actions">
                        <button className="usr-btn usr-btn--edit" onClick={() => handleEditClick(u)}>✏️ Editar</button>
                        <button className="usr-btn usr-btn--delete" onClick={() => handleDeleteClick(u.id_usuario)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="usr-side-panel">
            <h2 className="usr-panel-title">{isEditing ? "⚡ Editar Usuario" : "➕ Nuevo Usuario"}</h2>
            <form onSubmit={handleSubmit} className="usr-form">
              <div className="usr-form-group">
                <label className="usr-label">Nombre Completo</label>
                <input type="text" name="nombre" className="usr-input" value={formData.nombre} onChange={handleInputChange} required />
              </div>

              <div className="usr-form-group">
                <label className="usr-label">Correo Institucional</label>
                <input type="email" name="email" className="usr-input" value={formData.email} onChange={handleInputChange} required />
              </div>

              {!isEditing && (
                <div className="usr-form-group">
                  <label className="usr-label">Contraseña</label>
                  <input type="password" name="contrasena" className="usr-input" value={formData.contrasena} onChange={handleInputChange} required />
                </div>
              )}

              <div className="usr-form-actions">
                <button type="button" className="usr-btn-clear" onClick={handleClearForm}>Cancelar</button>
                <button type="submit" className="usr-btn-submit">{isEditing ? "Actualizar" : "Guardar Equipo"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}