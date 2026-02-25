import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "1rem" }}>
        <button onClick={handleLogout}>Cerrar sesión</button>
        <h2>Dashboard</h2>
        <p>Bienvenido a tu aplicación de fútbol ⚽</p>
        <Outlet />
      </div>
    </div>
  );
}