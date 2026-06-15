import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./page/Login/Login";
import Inicio from "./page/Inicio/Inicio";
import Clientes from "./page/Clientes/Clientes";
import PerfilCliente from "./page/PerfilCliente/PerfilCliente";
import Membresias from "./page/Membresias/Membresias";
import Pagos from "./page/Pagos/Pagos";
import Asistencia from "./page/Asistencia/Asistencia"; 
import Reportes from "./page/Reportes/Reportes"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Clientes" element={<Clientes />} />
        <Route path="/clientes/:id" element={<PerfilCliente />} />
        <Route path="/membresias" element={<Membresias />} /> 
        <Route path="/pagos" element={<Pagos />} />
        <Route path="/asistencia" element={<Asistencia />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;