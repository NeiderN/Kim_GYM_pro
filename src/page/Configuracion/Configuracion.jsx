import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Configuracion.css";

export default function Configuracion() {
  const navigate = useNavigate();

  // Estado unificado para todos los parámetros del sistema (Valores iniciales de producción)
  const [config, setConfig] = useState({
    gymNombre: "GymControl Pro HQ",
    gymNit: "901.432.119-0",
    gymTelefono: "+57 300 765 4321",
    gymDirección: "Calle 72 #54-10, Barranquilla",
    moneda: "COP",
    impuestoPorcentaje: "19",
    diasGraciaAsistencia: "3", // Días permitidos de ingreso con membresía recién vencida
    multaMembresiaCongelada: "15000",
    alertaVencimientoDias: "5", // Días antes para activar la alerta ⚠️ en clientes
    pasarelaPago: "Epayco",
    permitirRegistroManualRecepcion: true,
    notificacionesEmailAuto: true
  });

  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  // Manejador genérico de inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig({
      ...config,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // Simulación de persistencia de datos (Guardado con UI reactiva de carga)
  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveStatus("");

    setTimeout(() => {
      setSaving(false);
      setSaveStatus("✔️ ¡Configuración general del sistema actualizada correctamente!");
      // Limpiar mensaje de éxito después de 4 segundos
      setTimeout(() => setSaveStatus(""), 4000);
    }, 1200);
  };

  return (
    <div className="cfg-root">
      {/* SIDEBAR REPLICADO (Mismo diseño exacto y estable de Clientes.jsx) */}
      <aside className="cfg-sidebar">
        <div className="cfg-sidebar-brand">
          <span className="cfg-brand-name">GymControl<span className="cfg-brand-highlight">PRO</span></span>
        </div>
        <nav className="cfg-sidebar-menu">
          <div className="cfg-menu-section">Principal</div>
          <button className="cfg-nav-btn" onClick={() => navigate("/inicio")}>⬡ inicio</button>
          <button className="cfg-nav-btn" onClick={() => navigate("/clientes")}>👥 Clientes</button>
          <button className="cfg-nav-btn">🎫 Membresías</button>
          <button className="cfg-nav-btn">💳 Pagos</button>

          <div className="cfg-menu-section">Administración</div>
          <button className="cfg-nav-btn" onClick={() => navigate("/usuarios")}>👤 Usuarios</button>
          <button className="cfg-nav-btn">📊 Reportes</button>
          <button className="cfg-nav-btn active">⚙️ Configuración</button>
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="cfg-main">
        {/* TOPBAR */}
        <header className="cfg-topbar">
          <div className="cfg-topbar-left">
            <h1 className="cfg-page-title">Configuración del <span>Sistema</span></h1>
            <p className="cfg-page-subtitle">Módulo de control global de parámetros del gimnasio, reglas de negocio y pasarelas</p>
          </div>
          <div className="cfg-topbar-right">
            <div className="cfg-user-badge">
              <div className="cfg-avatar-mini" style={{ backgroundColor: "var(--color-accent)", color: "#0A0A0A" }}>AD</div>
              <span className="cfg-user-role">Administrador General</span>
            </div>
          </div>
        </header>

        {/* CUERPO DEL PANEL DE CONFIGURACIÓN */}
        <div className="cfg-container">
          <form onSubmit={handleSubmit} className="cfg-form-master">
            
            {/* Mensaje de éxito flotante/estático controlado por estado */}
            {saveStatus && <div className="cfg-alert-success">{saveStatus}</div>}

            <div className="cfg-grid-layout">
              
              {/* BLOQUE 1: DATOS CORPORATIVOS */}
              <div className="cfg-card">
                <div className="cfg-card-header">
                  <span className="cfg-card-icon">🏢</span>
                  <div>
                    <h2 className="cfg-card-title">Perfil del Establecimiento</h2>
                    <p className="cfg-card-desc">Información legal que aparecerá en los recibos de pago y reportes financieros.</p>
                  </div>
                </div>
                <div className="cfg-card-body">
                  <div className="cfg-form-group">
                    <label className="cfg-label">Nombre Comercial del Gimnasio</label>
                    <input type="text" name="gymNombre" className="cfg-input" value={config.gymNombre} onChange={handleInputChange} required />
                  </div>
                  <div className="cfg-form-group">
                    <label className="cfg-label">Identificación Legal / NIT</label>
                    <input type="text" name="gymNit" className="cfg-input" value={config.gymNit} onChange={handleInputChange} required />
                  </div>
                  <div className="cfg-form-group">
                    <label className="cfg-label">Teléfono de Contacto</label>
                    <input type="text" name="gymTelefono" className="cfg-input" value={config.gymTelefono} onChange={handleInputChange} required />
                  </div>
                  <div className="cfg-form-group">
                    <label className="cfg-label">Dirección Física</label>
                    <input type="text" name="gymDirección" className="cfg-input" value={config.gymDirección} onChange={handleInputChange} required />
                  </div>
                </div>
              </div>

              {/* BLOQUE 2: REGLAS DE NEGOCIO Y CONTROL DE ACCESO */}
              <div className="cfg-card">
                <div className="cfg-card-header">
                  <span className="cfg-card-icon">⚡</span>
                  <div>
                    <h2 className="cfg-card-title">Parámetros y Reglas de Control</h2>
                    <p className="cfg-card-desc">Establece las tolerancias del sistema para asistencias, alertas y penalizaciones.</p>
                  </div>
                </div>
                <div className="cfg-card-body">
                  <div className="cfg-form-group">
                    <label className="cfg-label">Días de Gracia para Ingreso (Membresía Vencida)</label>
                    <input type="number" name="diasGraciaAsistencia" className="cfg-input" value={config.diasGraciaAsistencia} onChange={handleInputChange} min="0" required />
                    <span className="cfg-input-help">Permite registrar asistencia temporalmente a clientes en mora.</span>
                  </div>
                  <div className="cfg-form-group">
                    <label className="cfg-label">Antelación Alerta de Vencimiento (Días)</label>
                    <input type="number" name="alertaVencimientoDias" className="cfg-input" value={config.alertaVencimientoDias} onChange={handleInputChange} min="1" required />
                    <span className="cfg-input-help">Días previos para que la interfaz resalte un cliente con la etiqueta ⚠️.</span>
                  </div>
                  <div className="cfg-form-group">
                    <label className="cfg-label">Costo por Descongelación de Membresía</label>
                    <div className="cfg-input-currency-wrapper">
                      <span className="cfg-currency-prefix">$</span>
                      <input type="number" name="multaMembresiaCongelada" className="cfg-input style-prefix" value={config.multaMembresiaCongelada} onChange={handleInputChange} min="0" required />
                    </div>
                  </div>
                </div>
              </div>

              {/* BLOQUE 3: MONEDA Y FACTURACIÓN */}
              <div className="cfg-card">
                <div className="cfg-card-header">
                  <span className="cfg-card-icon">💳</span>
                  <div>
                    <h2 className="cfg-card-title">Finanzas &amp; Facturación Electrónica</h2>
                    <p className="cfg-card-desc">Configuración monetaria e impuestos vinculados directamente a la gestión de cajas.</p>
                  </div>
                </div>
                <div className="cfg-card-body">
                  <div className="cfg-form-group">
                    <label className="cfg-label">Divisa Base del Sistema</label>
                    <select name="moneda" className="cfg-select" value={config.moneda} onChange={handleInputChange}>
                      <option value="COP">COP ($) - Peso Colombiano</option>
                      <option value="USD">USD ($) - Dólar Americano</option>
                      <option value="EUR">EUR (€) - Euro</option>
                      <option value="MXN">MXN ($) - Peso Mexicano</option>
                    </select>
                  </div>
                  <div className="cfg-form-group">
                    <label className="cfg-label">Impuesto sobre Ventas Aplicable (%)</label>
                    <input type="number" name="impuestoPorcentaje" className="cfg-input" value={config.impuestoPorcentaje} onChange={handleInputChange} min="0" max="100" required />
                  </div>
                  <div className="cfg-form-group">
                    <label className="cfg-label">Pasarela de Recaudación Online</label>
                    <select name="pasarelaPago" className="cfg-select" value={config.pasarelaPago} onChange={handleInputChange}>
                      <option value="Epayco">ePayco Colombia (Integración API)</option>
                      <option value="Wompi">Wompi (Bancolombia)</option>
                      <option value="Stripe">Stripe International</option>
                      <option value="Manual">Solo Registro Manual (Efectivo/Datafono)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* BLOQUE 4: DIRECTIVAS DE SEGURIDAD OPERATIVA */}
              <div className="cfg-card">
                <div className="cfg-card-header">
                  <span className="cfg-card-icon">🔒</span>
                  <div>
                    <h2 className="cfg-card-title">Políticas del Sistema</h2>
                    <p className="cfg-card-desc">Habilita o restringe automatizaciones globales del software.</p>
                  </div>
                </div>
                <div className="cfg-card-body cfg-flex-checkboxes">
                  <label className="cfg-checkbox-label">
                    <input type="checkbox" name="permitirRegistroManualRecepcion" checked={config.permitirRegistroManualRecepcion} onChange={handleInputChange} />
                    <div>
                      <span className="cfg-checkbox-title">Permitir Registro Manual en Recepción</span>
                      <p className="cfg-checkbox-desc">Permite a los Recepcionistas registrar asistencias sin usar lector biométrico/QR.</p>
                    </div>
                  </label>

                  <label className="cfg-checkbox-label">
                    <input type="checkbox" name="notificacionesEmailAuto" checked={config.notificacionesEmailAuto} onChange={handleInputChange} />
                    <div>
                      <span className="cfg-checkbox-title">Envío Automatizado de Facturas por Correo</span>
                      <p className="cfg-checkbox-desc">Dispara correos automáticos al cliente tan pronto como se registre un pago en caja.</p>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* SECCIÓN INFERIOR DE ACCIONES FIJAS */}
            <div className="cfg-footer-actions">
              <div className="cfg-footer-info-text">
                🚨 Nota: Al aplicar los cambios, los nuevos parámetros afectarán de inmediato el comportamiento de los roles de Recepción y Auxiliares Financieros.
              </div>
              <button type="submit" className="cfg-btn-submit" disabled={saving}>
                {saving ? "Procesando Cambios..." : "⚡ Guardar Configuración Global"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}