import { useEffect, useState } from "react";
import api from "../services/api";

export default function Favorites() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

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

  const handleDeselect = async (teamId) => {
    setError(null);
    setSuccessMsg("");

    try {
      await api.delete("/teams/deselect", {
        params: { team_id: teamId },
      });

      setTeams((prevTeams) =>
        prevTeams.filter((teamObj) => teamObj.team.id !== teamId)
      );

      setSuccessMsg("Equipo eliminado de favoritos");
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar el favorito");
    }
  };

  return (
    <div>
      <h2>Equipos Favoritos</h2>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

      <ul>
        {teams.map((teamObj) => (
          <li key={teamObj.team.id}>
            <img
              src={teamObj.team.logo}
              alt={teamObj.team.name}
              width={40}
            />
            {teamObj.team.name} ({teamObj.team.country}){" "}
            <button
              onClick={() => handleDeselect(teamObj.team.id)}
            >
              🗑 Eliminar
            </button>
          </li>
        ))}
      </ul>

      {!loading && teams.length === 0 && (
        <p>No tienes equipos favoritos todavía.</p>
      )}
    </div>
  );
}