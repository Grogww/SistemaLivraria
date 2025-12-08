// src/models/favorito.model.js
class Favorito {
    constructor({ IDFavorito = null, IDLivro, IDUsuario, created_at = null }) {
        this.IDFavorito = IDFavorito !== undefined ? IDFavorito : null;
        this.IDLivro = Number(IDLivro);
        this.IDUsuario = Number(IDUsuario);
        this.created_at = created_at || null;

        this._validar();
    }

    static fromJSON(json) {
        return new Favorito({
            IDFavorito: json.IDFavorito ?? json.IDFavorito ?? null,
            IDLivro: json.IDLivro ?? json.IDLivro,
            IDUsuario: json.IDUsuario ?? json.IDUsuario,
            created_at: json.created_at ?? json.createdAt ?? null
        });
    }

    toJSON() {
        return {
            IDFavorito: this.IDFavorito,
            IDLivro: this.IDLivro,
            IDUsuario: this.IDUsuario,
            created_at: this.created_at
        };
    }

    _validar() {
        const erros = [];

        if (!Number.isInteger(this.IDLivro) || isNaN(this.IDLivro)) {
            erros.push("IDLivro deve ser um número válido");
        }

        if (!Number.isInteger(this.IDUsuario) || isNaN(this.IDUsuario)) {
            erros.push("IDUsuario deve ser um número válido");
        }

        
        if (erros.length > 0) {
            const error = new Error("Dados inválidos");
            error.statusCode = 400;
            error.details = erros;
            throw error;
        }
    }
}

module.exports = Favorito;
