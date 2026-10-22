
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Estabelecimentos from "./components/Estabelecimentos";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/estabelecimentos"
          element={<Estabelecimentos />}
        />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/estabelecimentos" replace />}
      />
    </Routes>
  );
}

export default App;
