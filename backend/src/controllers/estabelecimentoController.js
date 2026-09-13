const Estabelecimento = require("../models/Estabelecimento");

// CREATE - Cadastrar um novo estabelecimento
const criarEstabelecimento = async (req, res) => {
    try {
        const estabelecimento = await Estabelecimento.create(req.body);

        return res.status(201).json(estabelecimento);
    } catch (erro) {
        return res.status(400).json({
            mensagem: "Erro ao cadastrar estabelecimento",
            erro: erro.message
        });
    }
};

// READ - Listar todos os estabelecimentos
const listarEstabelecimentos = async (req, res) => {
    try {
        const estabelecimentos = await Estabelecimento.find();

        return res.status(200).json(estabelecimentos);
    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao listar estabelecimentos",
            erro: erro.message
        });
    }
};

// READ - Buscar um estabelecimento pelo ID
const buscarEstabelecimentoPorId = async (req, res) => {
    try {
        const estabelecimento = await Estabelecimento.findById(req.params.id);

        if (!estabelecimento) {
            return res.status(404).json({
                mensagem: "Estabelecimento não encontrado"
            });
        }

        return res.status(200).json(estabelecimento);
    } catch (erro) {
        return res.status(400).json({
            mensagem: "Erro ao buscar estabelecimento",
            erro: erro.message
        });
    }
};

// UPDATE - Atualizar um estabelecimento
const atualizarEstabelecimento = async (req, res) => {
    try {
        const estabelecimento = await Estabelecimento.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!estabelecimento) {
            return res.status(404).json({
                mensagem: "Estabelecimento não encontrado"
            });
        }

        return res.status(200).json(estabelecimento);
    } catch (erro) {
        return res.status(400).json({
            mensagem: "Erro ao atualizar estabelecimento",
            erro: erro.message
        });
    }
};

// DELETE - Excluir um estabelecimento
const excluirEstabelecimento = async (req, res) => {
    try {
        const estabelecimento = await Estabelecimento.findByIdAndDelete(
            req.params.id
        );

        if (!estabelecimento) {
            return res.status(404).json({
                mensagem: "Estabelecimento não encontrado"
            });
        }

        return res.status(200).json({
            mensagem: "Estabelecimento excluído com sucesso"
        });
    } catch (erro) {
        return res.status(400).json({
            mensagem: "Erro ao excluir estabelecimento",
            erro: erro.message
        });
    }
};

module.exports = {
    criarEstabelecimento,
    listarEstabelecimentos,
    buscarEstabelecimentoPorId,
    atualizarEstabelecimento,
    excluirEstabelecimento
};