import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Bienvenido a tu aplicación de fútbol ⚽</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}