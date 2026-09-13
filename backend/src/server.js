require("dotenv").config();

const express = require("express");
const conectarBanco = require("./config/database");
const estabelecimentoRoutes = require("./routes/estabelecimentoRoutes");

const app = express();

app.use(express.json());

app.use("/api/estabelecimentos", estabelecimentoRoutes);

app.get("/", (req, res) => {
    res.send("API da Vigilância Sanitária funcionando");
});

const PORT = process.env.PORT || 3000;

conectarBanco().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});