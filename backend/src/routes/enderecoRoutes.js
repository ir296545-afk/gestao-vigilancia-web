
const express = require("express");
const autenticar = require("../middlewares/authMiddleware");

const {
  criarEndereco,
  listarEnderecos,
  buscarEnderecoPorId,
  atualizarEndereco,
  excluirEndereco,
} = require("../controllers/enderecoController");

const router = express.Router();

// CREATE - Cadastrar endereço
router.post("/", autenticar, criarEndereco);

// READ - Listar endereços
router.get("/", listarEnderecos);

// READ - Buscar endereço pelo ID
router.get("/:id", buscarEnderecoPorId);

// UPDATE - Atualizar endereço
router.put("/:id", autenticar, atualizarEndereco);

// DELETE - Excluir endereço
router.delete("/:id", autenticar, excluirEndereco);

module.exports = router;
