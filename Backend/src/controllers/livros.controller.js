const LivrosRepository = require("../repositories/livros.repository");

class LivrosController {
    constructor() {
        this.livrosRepository = new LivrosRepository();
    }

    async listarLivros(req, res, next) {
        try {
            const idsString = req.query.ids;
            console.log('🔍 Backend recebeu idsString:', idsString, typeof idsString);
            
            if (idsString) {
            const idsRaw = decodeURIComponent(idsString);
            console.log('🔍 Após decode:', idsRaw);
            
            const idsStringArray = idsRaw.split(',').map(id => id.trim());
            console.log('🔍 Split:', idsStringArray);
            
            // ✅ VALIDAÇÃO RIGOROSA
            const ids = [];
            for (const idStr of idsStringArray) {
                const idNum = parseInt(idStr);
                if (!isNaN(idNum) && idNum > 0) {
                ids.push(idNum);
                }
            }
            
            console.log('🔍 IDs FINais (válidos):', ids, 'Tipo:', ids.map(i => typeof i));
            
            if (ids.length === 0) {
                console.log('⚠️ Nenhum ID válido');
                return res.status(200).json([]);
            }
            
            const livros = await this.livrosRepository.findByIds(ids);
            console.log('📚 Livros encontrados:', livros.length);
            return res.status(200).json(livros);
            }
            
            const livros = await this.livrosRepository.findAll();
            res.status(200).json(livros);
        } catch (error) {
            console.error('❌ ERRO no controller:', error);
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
        const { titulo, autor, categoria, ano } = req.body;
        const novoLivro = await this.livrosRepository.create({
            titulo,
            autor,
            categoria,
            ano: parseInt(ano)
        });
        res.status(201).json({
            mensagem: "Livro criado com sucesso",
            data: novoLivro
        });
    }

    async atualizarLivro(req, res, next) {
        const id = parseInt(req.params.id);
        const { titulo, autor, categoria, ano } = req.body;
        const livroAtualizado = await this.livrosRepository.update(id, {
            titulo,
            autor,
            categoria,
            ano: parseInt(ano)
        });

        res.status(200).json({
            mensagem: "Livro atualizado com sucesso",
            data: livroAtualizado
        });
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