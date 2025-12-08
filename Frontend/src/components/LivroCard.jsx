// frontend/src/components/LivroCard.jsx
import React, { useState, useCallback } from 'react';
import BotaoFavorito from './BotaoFavorito';
import './LivroCard.css';

const LivroCard = ({ livro, isFavorito, onEdit, onDelete, onToggleFavorito }) => {
  const [imageError, setImageError] = useState(false);
  
  const fallbackImage = './src/assets/livro-placeholder.jpg'; 
  
  const handleImageError = useCallback(() => {
    if (!imageError) {
      setImageError(true);
    }
  }, [imageError]);

  const getImageSrc = () => {
    if (imageError) return fallbackImage;
    
    return livro.imagemUrl ? `/api${livro.imagemUrl}` : fallbackImage;
  };

  return (
    <div className="livro-card">
      <div className="livro-imagem">
        <img 
          src={getImageSrc()} 
          alt={`Capa do livro ${livro.titulo} de ${livro.autor}`}
          className="livro-imagem-img"
          onError={handleImageError}
        />
      </div>
      
      <div className="favorito-wrapper">
        <BotaoFavorito 
          isFavorito={isFavorito}
          onClick={() => onToggleFavorito(livro.id)}
        />
      </div>
      
      <h3>{livro.titulo}</h3>
      <p><strong>Autor:</strong> {livro.autor}</p>
      <p><strong>Ano:</strong> {livro.ano}</p>
      {livro.editora && <p><strong>Editora:</strong> {livro.editora}</p>}
      
      <div className="card-actions">
        <button onClick={() => onEdit(livro)} className="btn btn-primary">
          ✏️ Editar
        </button>
        <button onClick={() => onDelete(livro.id)} className="btn btn-danger">
          🗑️ Remover
        </button>
      </div>
    </div>
  );
};

export default LivroCard;