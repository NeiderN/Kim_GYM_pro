import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "./page/Login/Login";

// Admin Imports
import Inicio from "./page/Admin/Inicio/Inicio";
import Clientes from "./page/Admin/Clientes/Clientes";
import PerfilCliente from "./page/Admin/PerfilCliente/PerfilCliente";
import Membresias from "./page/Admin/Membresias/Membresias";
import Pagos from "./page/Admin/Pagos/Pagos";
import Asistencia from "./page/Admin/Asistencia/Asistencia"; 
import Reportes from "./page/Admin/Reportes/Reportes";
import Usuarios from "./page/Admin/Usuarios/Usuarios";
import Configuracion from "./page/Admin/Configuracion/Configuracion";

// Recepcionista Imports (Solo carpetas existentes)
import InicioRecepcion from "./page/Recepcionista/Inicio/Inicio";
import ClientesRecepcion from "./page/Recepcionista/Clientes/Clientes";
import PerfilClientesRecepcion from "./page/Recepcionista/PerfilClientes/PerfilClientes";
import MembresiasRecepcion from "./page/Recepcionista/Membresias/Membresias";
import PagosRecepcion from "./page/Recepcionista/Pagos/Pagos";
import AsistenciaRecepcion from "./page/Recepcionista/Asistencia/Asistencia";

// Componente para proteger páginas de accesos no autorizados
const ProtectedRoute = ({ children, allowedRoles }) => {
  const userSession = localStorage.getItem("usuario");

  if (!userSession) {
    return <Navigate to="/" replace />;
  }

  const user = JSON.parse(userSession);

  // Valida si el rol del usuario está dentro de los roles permitidos
  if (allowedRoles && !allowedRoles.includes(user.id_rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Login />} />

        {/* Rutas exclusivas para Administrador (id_rol === 1) */}
        <Route path="/inicio" element={<ProtectedRoute allowedRoles={[1]}><Inicio /></ProtectedRoute>} />
        <Route path="/clientes" element={<ProtectedRoute allowedRoles={[1]}><Clientes /></ProtectedRoute>} />
        <Route path="/clientes/:id" element={<ProtectedRoute allowedRoles={[1]}><PerfilCliente /></ProtectedRoute>} />
        <Route path="/membresias" element={<ProtectedRoute allowedRoles={[1]}><Membresias /></ProtectedRoute>} />
        <Route path="/pagos" element={<ProtectedRoute allowedRoles={[1]}><Pagos /></ProtectedRoute>} />
        <Route path="/asistencia" element={<ProtectedRoute allowedRoles={[1]}><Asistencia /></ProtectedRoute>} />
        <Route path="/reportes" element={<ProtectedRoute allowedRoles={[1]}><Reportes /></ProtectedRoute>} />
        <Route path="/usuarios" element={<ProtectedRoute allowedRoles={[1]}><Usuarios /></ProtectedRoute>} />
        <Route path="/configuracion" element={<ProtectedRoute allowedRoles={[1]}><Configuracion /></ProtectedRoute>} />

        {/* Rutas para Recepción y Admin (id_rol 2 y 1) */}
        <Route path="/recepcion/inicio" element={<ProtectedRoute allowedRoles={[1, 2]}><InicioRecepcion /></ProtectedRoute>} />
        <Route path="/recepcion/clientes" element={<ProtectedRoute allowedRoles={[1, 2]}><ClientesRecepcion /></ProtectedRoute>} />
        <Route path="/recepcion/clientes/:id" element={<ProtectedRoute allowedRoles={[1, 2]}><PerfilClientesRecepcion /></ProtectedRoute>} />
        <Route path="/recepcion/membresias" element={<ProtectedRoute allowedRoles={[1, 2]}><MembresiasRecepcion /></ProtectedRoute>} />
        <Route path="/recepcion/pagos" element={<ProtectedRoute allowedRoles={[1, 2]}><PagosRecepcion /></ProtectedRoute>} />
        <Route path="/recepcion/asistencia" element={<ProtectedRoute allowedRoles={[1, 2]}><AsistenciaRecepcion /></ProtectedRoute>} />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;