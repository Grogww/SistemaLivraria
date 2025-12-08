// src/repositories/livros.repository.js
const RepositoryBase = require("./repository.interface");
const db = require("../database/sqlite");
const Livro = require("../models/livro.model");

class LivrosRepository extends RepositoryBase {
    constructor() {
        super();
    }

    async findAll() {
        const rows = db.all("SELECT id, titulo, autor, categoria, ano, capaPath FROM livros ORDER BY id ASC");
        return rows.map(row => Livro.fromJSON(row));
    }

    async findByIds(ids) {
        if (!Array.isArray(ids) || ids.length === 0) return [];
        
        const validIds = ids.filter(id => Number.isInteger(id) && id > 0);
        if (validIds.length === 0) return [];
        
        let query = 'SELECT id, titulo, autor, categoria, ano, capaPath FROM livros WHERE ';
        query += validIds.map(() => 'id = ?').join(' OR ');
        query += ' ORDER BY id ASC';
        
        const rows = db.all(query, validIds);
        return rows.map(row => Livro.fromJSON(row));
    }

    async findById(id) {
        const row = db.get("SELECT id, titulo, autor, categoria, ano, capaPath FROM livros WHERE id = ?", [id]);
        return row ? Livro.fromJSON(row) : null;
    }

    async create(livroData) {
        const novoLivro = new Livro({ id: null, ...livroData });
        
        // ✅ Inclui capaPath se presente
        const capaPath = novoLivro.capaPath || null;
        const result = db.run(
            "INSERT INTO livros (titulo, autor, categoria, ano, capaPath) VALUES (?, ?, ?, ?, ?)",
            [novoLivro.titulo, novoLivro.autor, novoLivro.categoria, novoLivro.ano, capaPath]
        );
        return this.findById(result.lastInsertRowid);
    }

    async update(id, dadosAtualizados) {
        const existente = await this.findById(id);
        if (!existente) {
            const error = new Error("Livro não encontrado");
            error.statusCode = 404;
            throw error;
        }
        
        const atualizado = new Livro({ ...existente.toJSON(), ...dadosAtualizados });
        
        // ✅ Inclui capaPath se presente (mantém null se não enviado)
        const capaPath = atualizado.capaPath || null;
        db.run(
            "UPDATE livros SET titulo = ?, autor = ?, categoria = ?, ano = ?, capaPath = ? WHERE id = ?",
            [atualizado.titulo, atualizado.autor, atualizado.categoria, atualizado.ano, capaPath, id]
        );
        return this.findById(id);
    }

    async delete(id) {
        const existente = await this.findById(id); // ← Corrigido: await
        if (!existente) {
            const error = new Error("Livro não encontrado");
            error.statusCode = 404;
            throw error;
        }
        db.run("DELETE FROM livros WHERE id = ?", [id]);
        return existente;
    }
}

module.exports = LivrosRepository;
