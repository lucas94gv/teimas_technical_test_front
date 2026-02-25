import { useState } from "react";
import api from "../services/api";

export default function TeamSearch() {
  const [query, setQuery] = useState("");
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    setSuccessMsg("");

    try {
      const response = await api.get("/teams/search", {
        params: { name: query },
      });
      setTeams(response.data.data);
    } catch (err) {
      console.error(err);
      setError("Error al buscar equipos");
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async (teamId) => {
    setError(null);
    setSuccessMsg("");
    try {
        const response = await api.post("/teams/select", { team_id: teamId });
        console.log("RESPONSE FAVORITE:", response.data);
        const addedTeamId = response.data.data.team_id || response.data.data.attributes?.team_id;
        setSuccessMsg(`Equipo ${addedTeamId} agregado a favoritos ✅`);
    } catch (err) {
        console.error(err);
        setError("No se pudo agregar a favoritos");
    }
    };

  return (
    <div>
      <h2>Buscador de Equipos</h2>
      <input
        type="text"
        placeholder="Nombre del equipo"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Buscando..." : "Buscar"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

      <ul>
        {teams.map((teamObj) => (
          <li key={teamObj.team.id}>
            {teamObj.team.name} ({teamObj.team.country}){" "}
            <button onClick={() => handleFavorite(teamObj.team.id)}>⭐ Favorito</button>
          </li>
        ))}
      </ul>
    </div>
  );
}