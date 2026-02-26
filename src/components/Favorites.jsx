import { useEffect, useState } from "react";
import api from "../services/api";

export default function Favorites() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get("/favorites");
        setTeams(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar favoritos");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h2>Equipos Favoritos</h2>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {teams.map((teamObj) => (
          <li key={teamObj.team.id}>
            <img src={teamObj.team.logo} alt={teamObj.team.name} width={40} />
            {teamObj.team.name} ({teamObj.team.country})
          </li>
        ))}
      </ul>

      {!loading && teams.length === 0 && (
        <p>No tienes equipos favoritos todavía.</p>
      )}
    </div>
  );
}