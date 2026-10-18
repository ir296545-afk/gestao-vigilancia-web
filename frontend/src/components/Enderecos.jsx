
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/enderecos";

const formularioInicial = {
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  localidade: "",
  cep: "",
};

function Enderecos({ estabelecimentoId, nomeEstabelecimento }) {
  const [formulario, setFormulario] = useState({ ...formularioInicial });
  const [enderecos, setEnderecos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [excluindoId, setExcluindoId] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarEnderecos() {
      setCarregando(true);
      setErro("");
      setMensagem("");
      setFormulario({ ...formularioInicial });
      setEditandoId(null);

      try {
        const resposta = await axios.get(API_URL, {
          params: { estabelecimento: estabelecimentoId },
        });

        if (ativo) {
          setEnderecos(resposta.data);
        }
      } catch {
        if (ativo) {
          setErro("Não foi possível carregar os endereços.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    if (estabelecimentoId) {
      carregarEnderecos();
    }

    return () => {
      ativo = false;
    };
  }, [estabelecimentoId]);

  const handleChange = (evento) => {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const obterConfiguracao = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setErro("Sessão não encontrada. Faça login novamente.");
      return null;
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const handleSalvar = async (evento) => {
    evento.preventDefault();

    setErro("");
    setMensagem("");

    const configuracao = obterConfiguracao();
    if (!configuracao) return;

    setSalvando(true);

    try {
      const dados = {
        ...formulario,
        estabelecimento: estabelecimentoId,
      };

      if (editandoId) {
        const resposta = await axios.put(
          `${API_URL}/${editandoId}`,
          dados,
          configuracao
        );

        setEnderecos((anteriores) =>
          anteriores.map((endereco) =>
            endereco._id === editandoId
              ? resposta.data
              : endereco
          )
        );

        setMensagem("Endereço atualizado com sucesso!");
      } else {
        const resposta = await axios.post(
          API_URL,
          dados,
          configuracao
        );

        setEnderecos((anteriores) => [
          ...anteriores,
          resposta.data,
        ]);

        setMensagem("Endereço cadastrado com sucesso!");
      }

      setFormulario({ ...formularioInicial });
      setEditandoId(null);
    } catch (error) {
      setErro(
        error.response?.data?.mensagem ||
          "Não foi possível salvar o endereço."
      );
    } finally {
      setSalvando(false);
    }
  };

  const handleEditar = (endereco) => {
    const dados = {};

    Object.keys(formularioInicial).forEach((campo) => {
      dados[campo] = endereco[campo] || "";
    });

    setFormulario(dados);
    setEditandoId(endereco._id);
    setMensagem("");
    setErro("");
  };

  const handleCancelar = () => {
    setFormulario({ ...formularioInicial });
    setEditandoId(null);
    setMensagem("");
    setErro("");
  };

  const handleExcluir = async (endereco) => {
    const confirmado = window.confirm(
      `Deseja realmente excluir o endereço "${endereco.logradouro}"?`
    );

    if (!confirmado) return;

    setErro("");
    setMensagem("");

    const configuracao = obterConfiguracao();
    if (!configuracao) return;

    setExcluindoId(endereco._id);

    try {
      await axios.delete(
        `${API_URL}/${endereco._id}`,
        configuracao
      );

      setEnderecos((anteriores) =>
        anteriores.filter((item) => item._id !== endereco._id)
      );

      if (editandoId === endereco._id) {
        setFormulario({ ...formularioInicial });
        setEditandoId(null);
      }

      setMensagem("Endereço excluído com sucesso!");
    } catch (error) {
      setErro(
        error.response?.data?.mensagem ||
          "Não foi possível excluir o endereço."
      );
    } finally {
      setExcluindoId(null);
    }
  };

  const campos = [
    { nome: "logradouro", titulo: "Logradouro", obrigatorio: true },
    { nome: "numero", titulo: "Número" },
    { nome: "complemento", titulo: "Complemento" },
    { nome: "bairro", titulo: "Bairro" },
    { nome: "localidade", titulo: "Localidade" },
    { nome: "cep", titulo: "CEP" },
  ];

  return (
    <section style={{ marginTop: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>Endereços de {nomeEstabelecimento}</h3>

      <h4>
        {editandoId ? "Editar endereço" : "Cadastrar endereço"}
      </h4>

      <form onSubmit={handleSalvar} style={{ maxWidth: "600px" }}>
        {campos.map((campo) => (
          <div className="campo" key={campo.nome}>
            <label htmlFor={`endereco-${campo.nome}`}>
              {campo.titulo}{campo.obrigatorio ? " *" : ""}
            </label>

            <input
              id={`endereco-${campo.nome}`}
              name={campo.nome}
              type="text"
              value={formulario[campo.nome]}
              onChange={handleChange}
              placeholder={`Digite ${campo.titulo.toLowerCase()}`}
              required={Boolean(campo.obrigatorio)}
            />
          </div>
        ))}

        <button type="submit" disabled={salvando}>
          {salvando
            ? "Salvando..."
            : editandoId
              ? "Salvar alterações"
              : "Salvar endereço"}
        </button>

        {editandoId && (
          <button
            type="button"
            onClick={handleCancelar}
            style={{ marginTop: "10px", backgroundColor: "#6b7280" }}
          >
            Cancelar edição
          </button>
        )}
      </form>

      {mensagem && (
        <p style={{ color: "green" }}>{mensagem}</p>
      )}

      {erro && (
        <p style={{ color: "red" }}>{erro}</p>
      )}

      <h4>Endereços cadastrados</h4>

      {carregando ? (
        <p>Carregando endereços...</p>
      ) : enderecos.length === 0 ? (
        <p>Nenhum endereço cadastrado.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            border="1"
            cellPadding="10"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>Logradouro</th>
                <th>Número</th>
                <th>Bairro</th>
                <th>Localidade</th>
                <th>CEP</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {enderecos.map((endereco) => (
                <tr key={endereco._id}>
                  <td>{endereco.logradouro}</td>
                  <td>{endereco.numero}</td>
                  <td>{endereco.bairro}</td>
                  <td>{endereco.localidade}</td>
                  <td>{endereco.cep}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleEditar(endereco)}
                      style={{ marginBottom: "6px" }}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      disabled={excluindoId === endereco._id}
                      onClick={() => handleExcluir(endereco)}
                      style={{ backgroundColor: "#b91c1c" }}
                    >
                      {excluindoId === endereco._id
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
    </section>
  );
}

export default Enderecos;
