import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <h3 className="sidebar-title">Menú</h3>
      <ul className="sidebar-list">
        <li>
          <NavLink
            to="/dashboard/search"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            Buscar equipos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/favorites"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            Equipos favoritos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}