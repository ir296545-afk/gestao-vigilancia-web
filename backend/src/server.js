
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const conectarBanco = require("./config/database");

const estabelecimentoRoutes = require("./routes/estabelecimentoRoutes");
const enderecoRoutes = require("./routes/enderecoRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Rotas de estabelecimentos
app.use("/api/estabelecimentos", estabelecimentoRoutes);

// Rotas de endereços
app.use("/api/enderecos", enderecoRoutes);

// Rotas de autenticação
app.use("/auth", authRoutes);

// Rota inicial
app.get("/", (req, res) => {
  res.send("API da Vigilância Sanitária funcionando");
});

const PORT = process.env.PORT || 3000;

conectarBanco().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
