const express = require("express");

const {
  cadastrar,
  login,
} = require("../controllers/authController");

const autenticar = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/cadastro", cadastrar);

router.post("/login", login);

router.get("/perfil", autenticar, (req, res) => {
  return res.status(200).json({
    mensagem: "Acesso autorizado",
    usuario: req.usuario,
  });
});

module.exports = router;
