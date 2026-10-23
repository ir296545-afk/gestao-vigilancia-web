
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const { login, autenticado, carregandoAuth } = useAuth();
  const navigate = useNavigate();

  if (carregandoAuth) {
    return <p>Verificando autenticação...</p>;
  }

  if (autenticado) {
    return <Navigate to="/estabelecimentos" replace />;
  }

  const handleLogin = async (evento) => {
    evento.preventDefault();
    setMensagem("");
    setCarregando(true);

    try {
      await login(email, senha);
      navigate("/estabelecimentos", { replace: true });
    } catch (error) {
      setMensagem(
        error.response?.data?.mensagem ||
          error.message ||
          "Não foi possível conectar ao servidor."
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Vigilância Sanitária</h1>
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <div className="campo">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {mensagem && (
          <p className="mensagem" role="alert">
            {mensagem}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
