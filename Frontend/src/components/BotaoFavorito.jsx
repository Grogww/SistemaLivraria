import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import './BotaoFavorito.css';

function BotaoFavorito({ isFavorito, onClick, disabled = false }) {
  const handleClick = (e) => {
    e.stopPropagation(); 
    e.preventDefault();
    if (!disabled) {
      onClick();
    }
  };

  return (
    <button onClick={handleClick} className="botao-favorito" disabled={disabled} aria-label={isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
      {isFavorito ? <FaStar color="gold" /> : <FaRegStar color="gold" />}
    </button>
  );
}

export default BotaoFavorito;

