import React, { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/login", { email, password });

      const token = response.data.data.token;
      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (err) {
      setError("Email o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar sesión</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>

        {error && <p className="login-error">{error}</p>}

        <div className="login-register-link">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </div>
      </div>
    </div>
  );
}