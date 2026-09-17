import { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setMensagem("");
    setCarregando(true);

    try {
      const resposta = await axios.post(
        "http://localhost:3000/auth/login",
        {
          email,
          senha,
        }
      );

      localStorage.setItem("token", resposta.data.token);

      setMensagem("Login realizado com sucesso!");
    } catch (error) {
      if (error.response) {
        setMensagem(error.response.data.mensagem);
      } else {
        setMensagem("Não foi possível conectar ao servidor.");
      }
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
          <p className="mensagem">
            {mensagem}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
