// frontend/src/services/livrosService.js
import api from './api';

export const favoritosService = {
  async listar(IDUsuario) {
    const response = await api.get(`/favoritos?IDUsuario=${IDUsuario}`);
    return response.data;
  },

  async criar(favorito) {
    console.log(favorito);
    const response = await api.post('/favoritos', favorito);
    return response.data;
  },

  async deletar(IDLivro, IDUsuario) {
    const response = await api.delete(`/favoritos/${IDLivro}?IDUsuario=${IDUsuario}`);
    return response.data;
  }
};