
import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Enderecos from "./Enderecos";

const API_URL = "/api/estabelecimentos";

const formularioInicial = {
  nome_fantasia: "",
  razao_social: "",
  categoria: "",
  atividade_principal: "",
  tipo_atividade: "",
  tipo_documento: "",
  documento: "",
  cnae: "",
};

function Estabelecimentos() {
  const [formulario, setFormulario] = useState({
    ...formularioInicial,
  });
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [excluindoId, setExcluindoId] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [estabelecimentoEndereco, setEstabelecimentoEndereco] =
    useState(null);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  const { usuario, logout } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  // CADASTRAR OU ATUALIZAR ESTABELECIMENTO
  const handleSalvar = async (e) => {
    e.preventDefault();

    setErro("");
    setMensagem("");
    setSalvando(true);

    try {
      if (editandoId) {
        const resposta = await api.put(
          `${API_URL}/${editandoId}`,
          formulario
        );

        setEstabelecimentos((anteriores) =>
          anteriores.map((item) =>
            item._id === editandoId ? resposta.data : item
          )
        );

        setEstabelecimentoEndereco((anterior) =>
          anterior?._id === editandoId ? resposta.data : anterior
        );

        setMensagem("Estabelecimento atualizado com sucesso!");
      } else {
        const resposta = await api.post(API_URL, formulario);

        setEstabelecimentos((anteriores) => [
          ...anteriores,
          resposta.data,
        ]);

        setMensagem("Estabelecimento cadastrado com sucesso!");
      }

      setFormulario({ ...formularioInicial });
      setEditandoId(null);
    } catch (error) {
      setErro(
        error.response?.data?.mensagem ||
          "Não foi possível salvar o estabelecimento."
      );
    } finally {
      setSalvando(false);
    }
  };

  // CARREGAR DADOS PARA EDIÇÃO
  const handleEditar = (estabelecimento) => {
    const dados = {};

    Object.keys(formularioInicial).forEach((campo) => {
      dados[campo] = estabelecimento[campo] || "";
    });

    setFormulario(dados);
    setEditandoId(estabelecimento._id);
    setErro("");
    setMensagem("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // CANCELAR EDIÇÃO
  const handleCancelar = () => {
    setFormulario({ ...formularioInicial });
    setEditandoId(null);
    setErro("");
    setMensagem("");
  };

  // EXCLUIR ESTABELECIMENTO
  const handleExcluir = async (estabelecimento) => {
    const confirmado = window.confirm(
      `Deseja realmente excluir "${estabelecimento.nome_fantasia}"?`
    );

    if (!confirmado) return;

    setErro("");
    setMensagem("");
    setExcluindoId(estabelecimento._id);

    try {
      await api.delete(
        `${API_URL}/${estabelecimento._id}`
      );

      setEstabelecimentos((anteriores) =>
        anteriores.filter(
          (item) => item._id !== estabelecimento._id
        )
      );

      if (editandoId === estabelecimento._id) {
        setFormulario({ ...formularioInicial });
        setEditandoId(null);
      }

      if (estabelecimentoEndereco?._id === estabelecimento._id) {
        setEstabelecimentoEndereco(null);
      }

      setMensagem("Estabelecimento excluído com sucesso!");
    } catch (error) {
      setErro(
        error.response?.data?.mensagem ||
          "Não foi possível excluir o estabelecimento."
      );
    } finally {
      setExcluindoId(null);
    }
  };

  // ABRIR OU FECHAR ENDEREÇOS
  const handleEnderecos = (estabelecimento) => {
    setEstabelecimentoEndereco((anterior) =>
      anterior?._id === estabelecimento._id
        ? null
        : estabelecimento
    );

    setErro("");
    setMensagem("");
  };

  // LISTAR ESTABELECIMENTOS
  useEffect(() => {
    let ativo = true;

    async function carregarEstabelecimentos() {
      try {
        const resposta = await api.get(API_URL);

        if (ativo) {
          setEstabelecimentos(resposta.data);
        }
      } catch (error) {
        if (ativo) {
          setErro(
            error.response?.data?.mensagem ||
              "Não foi possível carregar os estabelecimentos."
          );
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarEstabelecimentos();

    return () => {
      ativo = false;
    };
  }, []);

  const campos = [
    {
      nome: "nome_fantasia",
      titulo: "Nome fantasia",
      obrigatorio: true,
    },
    { nome: "razao_social", titulo: "Razão social" },
    { nome: "categoria", titulo: "Categoria" },
    {
      nome: "atividade_principal",
      titulo: "Atividade principal",
    },
    { nome: "tipo_atividade", titulo: "Tipo de atividade" },
    { nome: "documento", titulo: "Número do documento" },
    { nome: "cnae", titulo: "CNAE" },
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h1>Gestão da Vigilância Sanitária</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "25px",
        }}
      >
        <p>
          Usuário: {usuario?.nome || usuario?.email || "Autenticado"}
        </p>

        <button
          type="button"
          onClick={logout}
          style={{ backgroundColor: "#b91c1c" }}
        >
          Sair
        </button>
      </div>

      <h2 style={{ marginTop: "25px", marginBottom: "20px" }}>
        {editandoId
          ? "Editar estabelecimento"
          : "Cadastrar estabelecimento"}
      </h2>

      <form onSubmit={handleSalvar} style={{ maxWidth: "600px" }}>
        {campos.slice(0, 5).map((campo) => (
          <div className="campo" key={campo.nome}>
            <label htmlFor={campo.nome}>
              {campo.titulo}
              {campo.obrigatorio ? " *" : ""}
            </label>

            <input
              id={campo.nome}
              name={campo.nome}
              type="text"
              value={formulario[campo.nome]}
              onChange={handleChange}
              placeholder={`Digite ${campo.titulo.toLowerCase()}`}
              required={Boolean(campo.obrigatorio)}
            />
          </div>
        ))}

        <div className="campo">
          <label htmlFor="tipo_documento">
            Tipo de documento
          </label>

          <select
            id="tipo_documento"
            name="tipo_documento"
            value={formulario.tipo_documento}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "16px",
            }}
          >
            <option value="">Selecione</option>
            <option value="CPF">CPF</option>
            <option value="CNPJ">CNPJ</option>
          </select>
        </div>

        {campos.slice(5).map((campo) => (
          <div className="campo" key={campo.nome}>
            <label htmlFor={campo.nome}>{campo.titulo}</label>

            <input
              id={campo.nome}
              name={campo.nome}
              type="text"
              value={formulario[campo.nome]}
              onChange={handleChange}
              placeholder={`Digite ${campo.titulo.toLowerCase()}`}
            />
          </div>
        ))}

        <button type="submit" disabled={salvando}>
          {salvando
            ? "Salvando..."
            : editandoId
              ? "Salvar alterações"
              : "Salvar estabelecimento"}
        </button>

        {editandoId && (
          <button
            type="button"
            onClick={handleCancelar}
            style={{
              marginTop: "10px",
              backgroundColor: "#6b7280",
            }}
          >
            Cancelar edição
          </button>
        )}
      </form>

      {mensagem && (
        <p style={{ color: "green", marginTop: "15px" }}>
          {mensagem}
        </p>
      )}

      {erro && (
        <p role="alert" style={{ color: "red", marginTop: "15px" }}>
          {erro}
        </p>
      )}

      <h2 style={{ marginTop: "35px", marginBottom: "20px" }}>
        Estabelecimentos cadastrados
      </h2>

      {carregando && <p>Carregando estabelecimentos...</p>}

      {!carregando && !erro && estabelecimentos.length === 0 && (
        <p>Nenhum estabelecimento cadastrado.</p>
      )}

      {!carregando && estabelecimentos.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table
            border="1"
            cellPadding="10"
            style={{
              width: "100%",
              marginTop: "20px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th>Nome fantasia</th>
                <th>Razão social</th>
                <th>Documento</th>
                <th>Categoria</th>
                <th>CNAE</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {estabelecimentos.map((estabelecimento) => (
                <tr key={estabelecimento._id}>
                  <td>{estabelecimento.nome_fantasia}</td>
                  <td>{estabelecimento.razao_social}</td>
                  <td>{estabelecimento.documento}</td>
                  <td>{estabelecimento.categoria}</td>
                  <td>{estabelecimento.cnae}</td>

                  <td style={{ minWidth: "150px" }}>
                    <button
                      type="button"
                      onClick={() => handleEditar(estabelecimento)}
                      style={{ marginBottom: "6px" }}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEnderecos(estabelecimento)}
                      style={{
                        marginBottom: "6px",
                        backgroundColor: "#2563eb",
                      }}
                    >
                      {estabelecimentoEndereco?._id ===
                      estabelecimento._id
                        ? "Fechar endereços"
                        : "Endereços"}
                    </button>

                    <button
                      type="button"
                      disabled={excluindoId === estabelecimento._id}
                      onClick={() => handleExcluir(estabelecimento)}
                      style={{ backgroundColor: "#b91c1c" }}
                    >
                      {excluindoId === estabelecimento._id
                        ? "Excluindo..."
                        : "Excluir"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {estabelecimentoEndereco && (
        <div style={{ marginTop: "30px" }}>
          <Enderecos
            key={estabelecimentoEndereco._id}
            estabelecimentoId={estabelecimentoEndereco._id}
            nomeEstabelecimento={
              estabelecimentoEndereco.nome_fantasia
            }
          />

          <button
            type="button"
            onClick={() => setEstabelecimentoEndereco(null)}
            style={{
              marginTop: "15px",
              backgroundColor: "#6b7280",
            }}
          >
            Fechar endereços
          </button>
        </div>
      )}
    </div>
  );
}

export default Estabelecimentos;
