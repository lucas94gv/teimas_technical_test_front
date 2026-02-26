import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Favorites() {
  const navigate = useNavigate();
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
        prevTeams.filter((teamObj) => teamObj.id !== teamId)
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

      <ul style={{ listStyle: "none", padding: 0 }}>
        {teams.map((teamObj) => (
          <li
            key={teamObj.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "8px",
            }}
          >

            {teamObj.logo && (
              <img
                src={teamObj.logo}
                alt={teamObj.name}
                width={40}
                style={{ marginRight: "10px" }}
              />
            )}

            <div style={{ flexGrow: 1 }}>
              <strong>{teamObj.name || "Nombre no disponible"}</strong>{" "}
              ({teamObj.country?.name || "País desconocido"})
            </div>

            <button
              onClick={() => navigate("/dashboard/fixtures", { state: { teamId: teamObj.id } })}
              style={{ marginLeft: "10px", padding: "5px 10px", cursor: "pointer" }}
            >
              Ver Partidos 📅
            </button>

            <button
              onClick={() => handleDeselect(teamObj.id)}
              style={{
                marginLeft: "10px",
                padding: "5px 10px",
                cursor: "pointer",
                backgroundColor: "#ff4d4f",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Eliminar ❌
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