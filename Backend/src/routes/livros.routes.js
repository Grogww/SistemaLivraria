const express = require("express");
const router = express.Router();

// Controllers
const LivrosController = require("../controllers/livros.controller");
const livrosController = new LivrosController();

// Middlewares
const { validarParamId } = require("../middlewares/validar/livros.validar");
const upload = require("../config/multer");

// bind: vincula o contexto do 'this' ao controller, garantindo que os métodos funcionem corretamente quando chamados como callbacks.
router.get("/", livrosController.listarLivros.bind(livrosController));
router.get("/:id", validarParamId, livrosController.buscarLivroPorId.bind(livrosController));
router.post("/", upload.single('capaPath'), livrosController.criarLivro.bind(livrosController));
router.put("/:id", validarParamId, upload.single('capaPath'), livrosController.atualizarLivro.bind(livrosController));
router.delete("/:id", validarParamId, livrosController.removerLivro.bind(livrosController));

module.exports = router;