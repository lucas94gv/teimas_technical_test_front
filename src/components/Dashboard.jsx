import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content">
        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
        <h2>Dashboard</h2>
        <p>Bienvenido a tu aplicación de fútbol ⚽</p>
        <Outlet />
      </div>
    </div>
  );
}