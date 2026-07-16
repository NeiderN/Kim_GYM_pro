import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./page/Login/Login";
import Inicio from "./page/Admin/Inicio/Inicio";
import Clientes from "./page/Admin/Clientes/Clientes";
import PerfilCliente from "./page/Admin/PerfilCliente/PerfilCliente";
import Membresias from "./page/Admin/Membresias/Membresias";
import Pagos from "./page/Admin/Pagos/Pagos";
import Asistencia from "./page/Admin/Asistencia/Asistencia"; 
import Reportes from "./page/Admin/Reportes/Reportes";
import Usuarios from "./page/Admin/Usuarios/Usuarios";
import Configuracion from "./page/Admin/Configuracion/Configuracion";
import InicioRecepcion from "./page/Recepcionista/Inicio/Inicio";
import ClientesRecepcion from "./page/Recepcionista/Clientes/Clientes";
import PerfilClientesRecepcion from "./page/Recepcionista/PerfilClientes/PerfilClientes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/:id" element={<PerfilCliente />} />
        <Route path="/membresias" element={<Membresias />} /> 
        <Route path="/pagos" element={<Pagos />} />
        <Route path="/asistencia" element={<Asistencia />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/recepcion/inicio" element={<InicioRecepcion />} />
        <Route path="/recepcion/clientes" element={<ClientesRecepcion />} />
        <Route path="/recepcion/clientes/:id" element={<PerfilClientesRecepcion />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;