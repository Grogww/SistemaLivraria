// frontend/src/pages/Livros.jsx
import React, { useState, useEffect } from 'react';
import { livrosService } from '../services/livrosService';
import { favoritosService } from '../services/favoritosService';
import { useAuth } from "../contexts/AuthContext";
import LivroCard from '../components/LivroCard';
import LivroForm from '../components/LivroForm';
import './Livros.css';


const Livros = () => {
  const [livros, setLivros] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingLivro, setEditingLivro] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const { user } = useAuth();


useEffect(() => {
  if (!user?.id) return;
  carregarLivros();
  carregarFavoritos();
}, [user?.id]);


  const carregarLivros = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await livrosService.listar();
      
      // ✅ MAPEAMENTO PARA INCLUIR IMAGEMURL
      const livrosComImagem = data.map(livro => ({
        ...livro,
        imagemUrl: livro.capaPath 
          ? `/capas/${livro.capaPath}`  // Constrói a URL completa
          : null  // ou '/placeholder.jpg' se tiver um placeholder
      }));
      
      setLivros(livrosComImagem);
    } catch (err) {
      setError('Erro ao carregar livros.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const carregarFavoritos = async () => {
    try {
      const data = await favoritosService.listar(user.id); // ou user.IDUsuario
      setFavoritos(data); // data = lista de favoritos desse usuário
    } catch (err) {
      console.error(err);
    }
  };


  const handleCreate = () => {
    setEditingLivro(null);
    setShowForm(true);
  };


  const handleEdit = (livro) => {
    setEditingLivro(livro);
    setShowForm(true);
  };


  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover este livro?')) {
      return;
    }


    try {
      await livrosService.remover(id);
      showSuccess('Livro removido com sucesso!');
      carregarLivros();
    } catch (err) {
      setError('Erro ao remover livro.');
      console.error(err);
    }
  };


  const handleSubmit = async (formData) => {
    try {
      if (editingLivro) {
        await livrosService.atualizar(editingLivro.id, formData);
        showSuccess('Livro atualizado com sucesso!');
      } else {
        await livrosService.criar(formData);
        showSuccess('Livro criado com sucesso!');
      }
      setShowForm(false);
      setEditingLivro(null);
      carregarLivros();
    } catch (err) {
      setError(err.response?.data?.erro || 'Erro ao salvar livro.');
      console.error(err);
    }
  };


  const handleCancel = () => {
    setShowForm(false);
    setEditingLivro(null);
  };


  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };


  const handleToggleFavorito = async (livroId) => {
    const favoritoExistente = favoritos.find(fav => fav.IDLivro === livroId);
    console.log(favoritoExistente);
    try {
      if (favoritoExistente) {
        // ✅ JÁ EXISTE -> REMOVER
        await favoritosService.deletar(favoritoExistente.IDFavorito);
        //setFavoritos(prev => prev.filter(fav => fav.IDFavorito !== favoritoExistente.IDFavorito));
      } else {
        // ❌ NÃO EXISTE -> CRIAR
        const novoFavorito = await favoritosService.criar({
          IDUsuario: user.id,
          IDLivro: livroId
        });
        //setFavoritos(prev => [...prev, novoFavorito]);
      }

      await carregarFavoritos();
    } catch (err) {
      console.error('Erro ao alternar favorito:', err);
    }
  };




  const isLivroFavorito = (livroId) => {
    return favoritos.some(fav => fav.IDLivro === livroId);
  }


  if (loading) {
    return <div className="loading">Carregando livros...</div>;
  }


  return (
    <div className="container">
      <div className="livros-header">
        <h1>Meus Livros</h1>
        <button onClick={handleCreate} className="btn btn-primary">
          ➕ Adicionar Livro
        </button>
      </div>


      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
     
      {error && (
        <div className="alert alert-error">{error}</div>
      )}


      {livros.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum livro cadastrado ainda.</p>
          <button onClick={handleCreate} className="btn btn-primary">
            Adicionar seu primeiro livro
          </button>
        </div>
      ) : (
        <div className="livros-grid">
          {livros.map((livro) => (
            <LivroCard
              key={livro.id}
              livro={livro}
              isFavorito={isLivroFavorito(livro.id)}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleFavorito={handleToggleFavorito}
            />
          ))}
        </div>
      )}


      {showForm && (
        <LivroForm
          livro={editingLivro}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};


export default Livros;