import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";

export default function Fixtures() {
  const location = useLocation();
  const teamId = location.state?.teamId;

  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const response = await api.get("/fixtures", {
          params: teamId ? { team_id: teamId } : {},
        });
        setFixtures(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los partidos");
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, [teamId]);

  if (loading) return <p>Cargando partidos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Partidos del equipo seleccionado</h2>
      <ul>
        {fixtures.map((f) => {
          const { home, away } = f.teams;
          const { home: homeGoals, away: awayGoals } = f.goals;
          return (
            <li key={f.fixture.id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
              <strong>
                {home.name} {homeGoals} - {awayGoals} {away.name}
              </strong>
              <div style={{ fontSize: "0.9em", color: "#555" }}>
                {new Date(f.fixture.date).toLocaleString()} - {f.league.name}
              </div>
            </li>
          );
        })}
      </ul>
      {fixtures.length === 0 && <p>No hay partidos disponibles para este equipo.</p>}
    </div>
  );
}