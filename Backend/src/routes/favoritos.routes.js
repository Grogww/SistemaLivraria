const express = require("express");
const router = express.Router();

// Controllers
const FavoritosController = require("../controllers/favoritos.controller");
const favoritosController = new FavoritosController();

// Middlewares
const { validarParamId } = require("../middlewares/validar/favoritos.validar");

// bind: vincula o contexto do 'this' ao controller, garantindo que os métodos funcionem corretamente quando chamados como callbacks.
router.get("/", favoritosController.listarFavoritos.bind(favoritosController));
router.post("/", favoritosController.adicionarFavorito.bind(favoritosController));
router.delete("/:id", validarParamId, favoritosController.removerFavorito.bind(favoritosController));

module.exports = router;