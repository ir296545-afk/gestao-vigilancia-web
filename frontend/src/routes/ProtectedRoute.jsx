
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { autenticado, carregandoAuth } = useAuth();

  if (carregandoAuth) {
    return <p>Verificando autenticação...</p>;
  }

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
