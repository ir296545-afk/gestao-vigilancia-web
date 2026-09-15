require("dotenv").config();

const express = require("express");
const cors = require("cors");

const conectarBanco = require("./config/database");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API da Vigilância Sanitária funcionando");
});

const PORT = process.env.PORT || 3000;

conectarBanco().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
