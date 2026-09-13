const express = require("express");

const {
    criarEstabelecimento,
    listarEstabelecimentos,
    buscarEstabelecimentoPorId,
    atualizarEstabelecimento,
    excluirEstabelecimento
} = require("../controllers/estabelecimentoController");

const router = express.Router();

router.post("/", criarEstabelecimento);
router.get("/", listarEstabelecimentos);
router.get("/:id", buscarEstabelecimentoPorId);
router.put("/:id", atualizarEstabelecimento);
router.delete("/:id", excluirEstabelecimento);

module.exports = router;
