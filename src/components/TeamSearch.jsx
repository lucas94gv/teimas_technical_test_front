import { useState } from "react";
import api from "../services/api";

export default function TeamSearch() {
  const [query, setQuery] = useState("");
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);

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

      <ul>
        {teams.map((teamObj) => (
          <li key={teamObj.team.id}>
            {teamObj.team.name} ({teamObj.team.country})
          </li>
        ))}
      </ul>
    </div>
  );
}