const express = require("express");
const autenticar = require("../middlewares/authMiddleware");

const {
    criarEstabelecimento,
    listarEstabelecimentos,
    buscarEstabelecimentoPorId,
    atualizarEstabelecimento,
    excluirEstabelecimento
} = require("../controllers/estabelecimentoController");

const router = express.Router();

router.post("/", autenticar, criarEstabelecimento);
router.get("/", listarEstabelecimentos);
router.get("/:id", buscarEstabelecimentoPorId);
router.put("/:id", autenticar, atualizarEstabelecimento);
router.delete("/:id", autenticar, excluirEstabelecimento);

module.exports = router;
