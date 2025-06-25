import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-lg font-bold text-blue-700">Gestor de Tareas</h1>

      <div className="flex gap-4 items-center">
        {token ? (
          <>
            <Link to="/" className="text-blue-600 hover:underline">
              Inicio
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 hover:underline">
              Iniciar sesión
            </Link>
            <Link to="/register" className="text-blue-600 hover:underline">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
