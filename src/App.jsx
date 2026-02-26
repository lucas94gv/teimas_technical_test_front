import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import TeamSearch from "./components/TeamSearch";
import Favorites from "./components/Favorites";
import Fixtures from "./components/Fixtures";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Ruta protegida Dashboard con rutas hijas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Rutas internas del Dashboard */}
          <Route path="search" element={<TeamSearch />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="fixtures" element={<Fixtures />} /> {/* 🔹 Ruta arreglada */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;