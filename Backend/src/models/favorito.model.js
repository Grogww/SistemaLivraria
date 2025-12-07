// src/models/favorito.model.js
class Favorito {
    constructor({ IDFavorito = null, IDLivro, IDUsuario, created_at = null }) {
        console.log(IDLivro, IDUsuario);

        this.idFavorito = IDFavorito !== undefined ? IDFavorito : null;
        this.idLivro = Number(IDLivro);
        this.idUsuario = Number(IDUsuario);
        this.created_at = created_at || null;

        this._validar();
    }

    static fromJSON(json) {
        return new Favorito({
            idFavorito: json.idFavorito ?? json.IDFavorito ?? null,
            idLivro: json.idLivro ?? json.IDLivro,
            idUsuario: json.idUsuario ?? json.IDUsuario,
            created_at: json.created_at ?? json.createdAt ?? null
        });
    }

    toJSON() {
        return {
            IDFavorito: this.idFavorito,
            IDLivro: this.idLivro,
            IDUsuario: this.idUsuario,
            created_at: this.created_at
        };
    }

    _validar() {
        const erros = [];

        if (!Number.isInteger(this.idLivro) || isNaN(this.idLivro)) {
            erros.push("IDLivro deve ser um número válido");
        }

        if (!Number.isInteger(this.idUsuario) || isNaN(this.idUsuario)) {
            erros.push("IDUsuario deve ser um número válido");
        }

        
        if (erros.length > 0) {
            console.log(erros);
            const error = new Error("Dados inválidos");
            error.statusCode = 400;
            error.details = erros;
            throw error;
        }
    }
}

module.exports = Favorito;
