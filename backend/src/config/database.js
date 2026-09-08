const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["177.37.220.17", "177.37.220.18"]);

const conectarBanco = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "gestao_vigilancia",
            family: 4
        });

        console.log("MongoDB conectado com sucesso");
    } catch (erro) {
        console.error("Erro ao conectar ao MongoDB:", erro.message);
        process.exit(1);
    }
};

module.exports = conectarBanco;