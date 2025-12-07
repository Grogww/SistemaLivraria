// frontend/src/pages/LivrosFavoritos.jsx
import React, { useState, useEffect } from 'react';
import { livrosService } from '../services/livrosService';
import { favoritosService } from '../services/favoritosService';
import { useAuth } from "../contexts/AuthContext";
import LivroCard from '../components/LivroCard';
import './Livros.css'; // Reutiliza os mesmos estilos

const LivrosFavoritos = () => {
  const [livrosFavoritos, setLivrosFavoritos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;
    carregarFavoritos();
  }, [user?.id]);

  const carregarFavoritos = async () => {
    try {
      setLoading(true);
      setError('');
      
      const favoritosData = await favoritosService.listar(user.id);
      console.log('🔍 Favoritos:', favoritosData);
      
      setFavoritos(favoritosData);
      
      if (favoritosData.length > 0) {
        const livrosIds = favoritosData.map(fav => fav.IDLivro);
        console.log('📋 Buscando IDs:', livrosIds);
        
        const livrosData = await livrosService.listarPorIds(livrosIds);
        console.log('📚 Livros recebidos:', livrosData);
        
        // ✅ CORRETO: só mostra livros que vieram da API filtrada
        setLivrosFavoritos(livrosData);
      } else {
        setLivrosFavoritos([]);
      }
    } catch (err) {
      setError('Erro ao carregar favoritos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Carregando favoritos...</div>;
  }

  return (
    <div className="container">
      <div className="livros-header">
        <h1>Meus Livros Favoritos</h1>
        <button 
          onClick={() => window.history.back()} 
          className="btn btn-secondary"
        >
          ← Voltar aos Livros
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {livrosFavoritos.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum livro favorito ainda.</p>
          <p>Volte à página de livros e favorite alguns! ❤️</p>
        </div>
      ) : (
<div className="livros-grid">
        {livrosFavoritos.map((livro) => (
          <LivroCard
            key={livro.id}
            livro={livro}
            isFavorito={true}  // ✅ Mantenha - nesta página TODOS são favoritos
            onEdit={() => {}}   // Desabilita edição
            onDelete={() => {}} // Desabilita remoção
            onToggleFavorito={() => {}} // Desabilita toggle
          />
        ))}
      </div>
      )}
    </div>
  );
};

export default LivrosFavoritos;
