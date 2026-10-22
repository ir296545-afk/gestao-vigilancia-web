
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregandoAuth, setCarregandoAuth] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUsuario(null);
  }, []);

  useEffect(() => {
    const tratarNaoAutorizado = () => logout();

    window.addEventListener(
      "auth:unauthorized",
      tratarNaoAutorizado
    );

    return () => {
      window.removeEventListener(
        "auth:unauthorized",
        tratarNaoAutorizado
      );
    };
  }, [logout]);

  useEffect(() => {
    let ativo = true;

    async function verificarSessao() {
      const token = localStorage.getItem("token");

      if (!token) {
        setCarregandoAuth(false);
        return;
      }

      try {
        const resposta = await api.get("/auth/perfil");

        if (ativo) {
          setUsuario(resposta.data.usuario);
        }
      } catch {
        if (ativo) {
          logout();
        }
      } finally {
        if (ativo) {
          setCarregandoAuth(false);
        }
      }
    }

    verificarSessao();

    return () => {
      ativo = false;
    };
  }, [logout]);

  const login = async (email, senha) => {
    const resposta = await api.post("/auth/login", {
      email,
      senha,
    });

    if (!resposta.data.token) {
      throw new Error("O servidor não retornou um token.");
    }

    localStorage.setItem("token", resposta.data.token);
    setUsuario(resposta.data.usuario);

    return resposta.data.usuario;
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        autenticado: Boolean(usuario),
        carregandoAuth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  }

  return contexto;
}
