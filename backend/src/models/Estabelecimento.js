const mongoose = require("mongoose");

const estabelecimentoSchema = new mongoose.Schema(
    {
        data_atualizacao: {
            type: Date
        },

        categoria: {
            type: String,
            trim: true
        },

        nome_fantasia: {
            type: String,
            required: true,
            trim: true
        },

        atividade_principal: {
            type: String,
            trim: true
        },

        tipo_atividade: {
            type: String,
            trim: true
        },

        tipo_documento: {
            type: String,
            trim: true
        },

        documento: {
            type: String,
            trim: true
        },

        razao_social: {
            type: String,
            trim: true
        },

        cnae: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Estabelecimento = mongoose.model(
    "Estabelecimento",
    estabelecimentoSchema  
);

module.exports = Estabelecimento;