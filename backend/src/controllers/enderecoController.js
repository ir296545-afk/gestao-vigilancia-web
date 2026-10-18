
const mongoose = require("mongoose");
const Endereco = require("../models/Endereco");
const Estabelecimento = require("../models/Estabelecimento");

// CREATE - Cadastrar endereço
const criarEndereco = async (req, res) => {
  try {
    const { estabelecimento, logradouro } = req.body;

    if (!mongoose.isValidObjectId(estabelecimento)) {
      return res.status(400).json({
        mensagem: "ID do estabelecimento inválido",
      });
    }

    const existe = await Estabelecimento.findById(estabelecimento);

    if (!existe) {
      return res.status(404).json({
        mensagem: "Estabelecimento não encontrado",
      });
    }

    if (!logradouro || !logradouro.trim()) {
      return res.status(400).json({
        mensagem: "O logradouro é obrigatório",
      });
    }

    const endereco = await Endereco.create(req.body);

    return res.status(201).json(endereco);
  } catch (erro) {
    return res.status(400).json({
      mensagem: "Erro ao cadastrar endereço",
      erro: erro.message,
    });
  }
};

// READ - Listar endereços
const listarEnderecos = async (req, res) => {
  try {
    const filtro = {};

    if (req.query.estabelecimento) {
      if (!mongoose.isValidObjectId(req.query.estabelecimento)) {
        return res.status(400).json({
          mensagem: "ID do estabelecimento inválido",
        });
      }

      filtro.estabelecimento = req.query.estabelecimento;
    }

    const enderecos = await Endereco.find(filtro).populate(
      "estabelecimento",
      "nome_fantasia razao_social"
    );

    return res.status(200).json(enderecos);
  } catch (erro) {
    return res.status(500).json({
      mensagem: "Erro ao listar endereços",
      erro: erro.message,
    });
  }
};

// READ - Buscar endereço pelo ID
const buscarEnderecoPorId = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        mensagem: "ID do endereço inválido",
      });
    }

    const endereco = await Endereco.findById(req.params.id);

    if (!endereco) {
      return res.status(404).json({
        mensagem: "Endereço não encontrado",
      });
    }

    return res.status(200).json(endereco);
  } catch (erro) {
    return res.status(400).json({
      mensagem: "Erro ao buscar endereço",
      erro: erro.message,
    });
  }
};

// UPDATE - Atualizar endereço
const atualizarEndereco = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        mensagem: "ID do endereço inválido",
      });
    }

    if (req.body.estabelecimento !== undefined) {
      if (!mongoose.isValidObjectId(req.body.estabelecimento)) {
        return res.status(400).json({
          mensagem: "ID do estabelecimento inválido",
        });
      }

      const existe = await Estabelecimento.findById(
        req.body.estabelecimento
      );

      if (!existe) {
        return res.status(404).json({
          mensagem: "Estabelecimento não encontrado",
        });
      }
    }

    const endereco = await Endereco.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!endereco) {
      return res.status(404).json({
        mensagem: "Endereço não encontrado",
      });
    }

    return res.status(200).json(endereco);
  } catch (erro) {
    return res.status(400).json({
      mensagem: "Erro ao atualizar endereço",
      erro: erro.message,
    });
  }
};

// DELETE - Excluir endereço
const excluirEndereco = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        mensagem: "ID do endereço inválido",
      });
    }

    const endereco = await Endereco.findByIdAndDelete(req.params.id);

    if (!endereco) {
      return res.status(404).json({
        mensagem: "Endereço não encontrado",
      });
    }

    return res.status(200).json({
      mensagem: "Endereço excluído com sucesso",
    });
  } catch (erro) {
    return res.status(400).json({
      mensagem: "Erro ao excluir endereço",
      erro: erro.message,
    });
  }
};

module.exports = {
  criarEndereco,
  listarEnderecos,
  buscarEnderecoPorId,
  atualizarEndereco,
  excluirEndereco,
};
