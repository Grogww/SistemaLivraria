const FavoritosRepository = require("../repositories/favoritos.repository");

class FavoritosController {
    constructor() {
        this.favoritosRepository = new FavoritosRepository();
    }

    async listarFavoritos(req, res, next) {
        const favoritos = await this.favoritosRepository.findAll();
        res.status(200).json(favoritos);
    }

    async adicionarFavorito(req, res, next) {
        const { IDLivro, IDUsuario } = req.body;
        const novoFavorito = await this.favoritosRepository.create({
            IDLivro,
            IDUsuario
        });
        res.status(201).json({
            mensagem: "Livro favoritado com sucesso",
            data: novoFavorito
        });
    }

    async removerFavorito(req, res, next) {
        const id = parseInt(req.params.id);
        const favoritoRemovido = await this.favoritosRepository.delete(id);
        res.status(200).json({
            mensagem: "Livro removido com sucesso",
            data: favoritoRemovido
        });
    }


}

module.exports = FavoritosController;