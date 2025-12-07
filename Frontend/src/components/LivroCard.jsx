// frontend/src/components/LivroCard.jsx
import React from 'react';
import BotaoFavorito from './BotaoFavorito';
import './LivroCard.css';

const LivroCard = ({ livro, isFavorito, onEdit, onDelete, onToggleFavorito }) => {
  return (
    <div className="livro-card">
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