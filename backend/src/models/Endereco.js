const mongoose = require("mongoose");

const enderecoSchema = new mongoose.Schema(
    {
        estabelecimento: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Estabelecimento",
            required: true
        },

        logradouro: {
            type: String,
            required: true,
            trim: true
        },

        numero: {
            type: String,
            trim: true
        },

        complemento: {
            type: String,
            trim: true
        },

        bairro: {
            type: String,
            trim: true
        },

        localidade: {
            type: String,
            trim: true
        },

        cep: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Endereco = mongoose.model(
    "Endereco",
    enderecoSchema
);

module.exports = Endereco;