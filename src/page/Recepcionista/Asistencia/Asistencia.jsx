import React, { useState, useEffect } from "react";
import "./Asistencia.css";

export default function Asistencia() {
  const [documento, setDocumento] = useState("");
  const [clienteActual, setClienteActual] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  useEffect(() => {
    cargarHistorial();
  }, []);

  const cargarHistorial = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/asistencia/hoy");
      const data = await res.json();
      if (data.success) {
        setHistorial(data.historial);
      }
    } catch (error) {
      console.error("Error al cargar el historial:", error);
    }
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
    setMensaje({ tipo: "", texto: "" });

    if (!documento.trim()) {
      setMensaje({ tipo: "error", texto: "Ingrese un número de documento." });
      setClienteActual(null);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/clientes/documento/${documento.trim()}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setClienteActual(data.cliente);
      } else {
        setClienteActual(null);
        setMensaje({ tipo: "error", texto: data.message || "Cliente no encontrado." });
      }
    } catch (error) {
      setMensaje({ tipo: "error", texto: "Error al conectar con el servidor." });
    }
  };

  const handleRegistrar = async () => {
    if (!clienteActual) return;

    if (clienteActual.estado === "Vencido") {
      setMensaje({ tipo: "error", texto: "Membresía vencida. Acceso denegado." });
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/asistencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_cliente: clienteActual.id_cliente })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMensaje({ tipo: "exito", texto: `¡Ingreso registrado para ${clienteActual.nombre}!` });
        setClienteActual(null);
        setDocumento("");
        cargarHistorial();
      } else {
        setMensaje({ tipo: "error", texto: data.message || "No se pudo registrar el ingreso." });
      }
    } catch (error) {
      setMensaje({ tipo: "error", texto: "Error al registrar ingreso en el servidor." });
    }
  };

  const obtenerIniciales = (nombre) => {
    if (!nombre) return "KG";
    return nombre.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  };

  return (
    <div className="asistencia-page-wrapper">
      <header className="asistencia-header-title">
        <h1>ASISTENCIA</h1>
      </header>

      <div className="asistencia-main-content">
        <div className="asistencia-grid-layout">
          
          <div className="kg-card">
            <h2 className="kg-card-title">BUSCAR CLIENTE</h2>
            
            <form onSubmit={handleBuscar} className="kg-search-form">
              <input
                type="text"
                placeholder="Buscar por documento..."
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                className="kg-input-field"
              />
              <button type="submit" className="kg-btn-neon">
                Buscar
              </button>
            </form>

            {mensaje.texto && (
              <div className={`kg-alert-box ${mensaje.tipo}`}>
                {mensaje.texto}
              </div>
            )}

            {clienteActual ? (
              <div className="kg-client-preview">
                <div className="kg-avatar-circle" style={{ backgroundColor: "#3b82f6" }}>
                  {obtenerIniciales(clienteActual.nombre)}
                </div>
                <div className="kg-client-info">
                  <h3>{clienteActual.nombre}</h3>
                  <p className="kg-subtext">{clienteActual.email}</p>
                  
                  <div className="kg-details-box">
                    <p><span>Doc:</span> {clienteActual.documento}</p>
                    <p><span>Membresía:</span> {clienteActual.membresia || "Sin plan"}</p>
                    <p><span>Vence:</span> {clienteActual.vence || "N/A"}</p>
                  </div>

                  <div className="kg-status-wrapper">
                    <span className={`kg-badge ${clienteActual.estado?.toLowerCase()}`}>
                      • {clienteActual.estado}
                    </span>
                  </div>
                </div>

                <button
                  className="kg-btn-confirm"
                  onClick={handleRegistrar}
                  disabled={clienteActual.estado === "Vencido"}
                >
                  {clienteActual.estado === "Vencido" ? "ACCESO BLOQUEADO" : "REGISTRAR INGRESO"}
                </button>
              </div>
            ) : (
              <div className="kg-empty-state">
                <p>Ingrese un número de documento para validar el ingreso.</p>
              </div>
            )}
          </div>

          <div className="kg-card">
            <h2 className="kg-card-title">INGRESOS RECIENTES</h2>
            <div className="kg-table-container">
              <table className="kg-data-table">
                <thead>
                  <tr>
                    <th>CLIENTE</th>
                    <th>DOCUMENTO</th>
                    <th>HORA</th>
                    <th>ESTADO</th>
                  </tr>
                </thead>
                <tbody>
                  {historial.map((item) => (
                    <tr key={item.id_asistencia}>
                      <td>
                        <div className="kg-user-cell">
                          <div className="kg-avatar-small" style={{ backgroundColor: "#06b6d4" }}>
                            {obtenerIniciales(item.nombre)}
                          </div>
                          <div>
                            <div className="kg-user-name">{item.nombre}</div>
                            <div className="kg-user-email">{item.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{item.documento}</td>
                      <td className="kg-time-highlight">
                        {new Date(item.hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td>
                        <span className="kg-badge activo">
                          • Permitido
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}