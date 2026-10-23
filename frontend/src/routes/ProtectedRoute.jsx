
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { autenticado, carregando } = useAuth();

  if (carregando) {
    return <p>Verificando autenticação...</p>;
  }

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
