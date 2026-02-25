import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav style={{ width: 200, borderRight: "1px solid #ccc", padding: "1rem" }}>
      <h3>Menú</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <NavLink to="/dashboard/search" style={{ textDecoration: "none" }}>
            Buscar equipos
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/favorites" style={{ textDecoration: "none" }}>
            Equipos favoritos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}