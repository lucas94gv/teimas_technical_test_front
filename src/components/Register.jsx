import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css"; // Reutilizamos el CSS de Login

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/register", { name, email, password });
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      setSuccess("Registrado correctamente!");
      navigate("/dashboard");
    } catch (err) {
      console.log("REGISTER ERROR:", err);
      const backendError =
        err.response?.data?.errors?.[0] || "Error al registrarse";
      setError(backendError);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Registro</h2>
        <form onSubmit={handleSubmit} className="login-form">          
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Registrarse
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
    </div>
  );
}