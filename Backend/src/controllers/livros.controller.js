const LivrosRepository = require("../repositories/livros.repository");

class LivrosController {
    constructor() {
        this.livrosRepository = new LivrosRepository();
    }

    async listarLivros(req, res, next) {
        try {
            const idsString = req.query.ids;
            
            if (idsString) {
            const idsRaw = decodeURIComponent(idsString);
            
            const idsStringArray = idsRaw.split(',').map(id => id.trim());
            
            const ids = [];
            for (const idStr of idsStringArray) {
                const idNum = parseInt(idStr);
                if (!isNaN(idNum) && idNum > 0) {
                ids.push(idNum);
                }
            }
            
            if (ids.length === 0) {
                return res.status(200).json([]);
            }
            
            const livros = await this.livrosRepository.findByIds(ids);
            return res.status(200).json(livros);
            }
            
            const livros = await this.livrosRepository.findAll();
            res.status(200).json(livros);
        } catch (error) {
            next(error);
        }
    }

    async buscarLivroPorId(req, res, next) {
        const id = parseInt(req.params.id);
        const livro = await this.livrosRepository.findById(id);
        if (!livro) {
            return res.status(404).json({ erro: "Livro não encontrado" });
        }
        res.status(200).json(livro);
    }

    async criarLivro(req, res, next) {
        try {
            const { titulo, autor, categoria, ano } = req.body;
            const livroData = {
                titulo,
                autor,
                categoria,
                ano: parseInt(ano)
            };

            // Adiciona caminho da capa se arquivo foi enviado
            if (req.file) {
                livroData.capaPath = req.file.path.replace(/\\/g, '/'); // Normaliza para forward slash
            }

            const novoLivro = await this.livrosRepository.create(livroData);
            res.status(201).json({
                mensagem: "Livro criado com sucesso",
                data: novoLivro
            });
        } catch (error) {
            next(error);
        }
    }

    async atualizarLivro(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const { titulo, autor, categoria, ano } = req.body;
            const livroData = {
                titulo,
                autor,
                categoria,
                ano: parseInt(ano)
            };

            // Atualiza capa se novo arquivo foi enviado
            if (req.file) {
                livroData.capaPath = req.file.path.replace(/\\/g, '/');
            }

            const livroAtualizado = await this.livrosRepository.update(id, livroData);
            
            if (!livroAtualizado) {
                return res.status(404).json({ erro: "Livro não encontrado" });
            }

            res.status(200).json({
                mensagem: "Livro atualizado com sucesso",
                data: livroAtualizado
            });
        } catch (error) {
            next(error);
        }
    }

    async removerLivro(req, res, next) {
        const id = parseInt(req.params.id);
        const livroRemovido = await this.livrosRepository.delete(id);
        res.status(200).json({
            mensagem: "Livro removido com sucesso",
            data: livroRemovido
        });
    }

}

module.exports = LivrosController;