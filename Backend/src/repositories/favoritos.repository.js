// src/repositories/livros.repository.js
const RepositoryBase = require("./repository.interface");
const db = require("../database/sqlite");
const Favorito = require("../models/favorito.model");

class FavoritosRepository extends RepositoryBase {
    constructor() {
        super();
    }

    async findAll(idUsuario) {
        const rows = db.all("SELECT IDFavorito, IDLivro, IDUsuario, created_at FROM Favoritos WHERE IDUsuario = ? ORDER BY IDFavorito ASC", [idUsuario]);
        return rows.map(row => Favorito.fromJSON(row));
    }

    async findById(id) {
        const row = db.get("SELECT IDFavorito, IDLivro, IDUsuario, created_at FROM Favoritos WHERE IDFavorito = ?", [id]);
        return row ? Favorito.fromJSON(row) : null;
    }

    async create(favoritoData) {
        const novoFavorito = new Favorito({ IDFavorito: null, ...favoritoData });
        const result = db.run(
            "INSERT INTO Favoritos (IDLivro, IDUsuario) VALUES (?, ?)",
            [novoFavorito.idLivro, novoFavorito.idUsuario]
        );
        return this.findById(result.lastInsertRowid);
    }

    async delete(id) {
        const existente = this.findById(id);
        if (!existente) {
            const error = new Error("Favorito não encontrado");
            error.statusCode = 404;
            throw error;
        }
        db.run("DELETE FROM Favorito WHERE IDFavorito = ?", [id]);
        return existente;
    }
}

module.exports = FavoritosRepository;