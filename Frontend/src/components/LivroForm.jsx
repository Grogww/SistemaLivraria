// frontend/src/components/LivroForm.jsx
import React, { useState, useEffect } from 'react';
import './LivroForm.css';

const LivroForm = ({ livro, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    ano: '',
    editora: ''
  });
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erroArquivo, setErroArquivo] = useState('');

  useEffect(() => {
    if (livro) {
      setFormData({
        titulo: livro.titulo || '',
        autor: livro.autor || '',
        ano: livro.ano || '',
        editora: livro.editora || ''
      });

      if (livro.imagem) {
        setPreview(livro.imagem);
      }
    } else {

      setFormData({ titulo: '', autor: '', ano: '', editora: '' });
      setImagem(null);
      setPreview(null);
    }
  }, [livro]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImagemChange = (e) => {
    const arquivo = e.target.files[0];
    setErroArquivo('');

    if (!arquivo) {
      setImagem(null);
      setPreview(null);
      return;
    }

    if (!arquivo.type.startsWith('image/')) {
      setErroArquivo('Apenas arquivos de imagem são permitidos');
      e.target.value = '';
      return;
    }

      //10mb
    if (arquivo.size > 10 * 1024 * 1024) {
      setErroArquivo('O arquivo deve ter no máximo 5MB');
      e.target.value = '';
      return;
    }

    setImagem(arquivo);
    setPreview(URL.createObjectURL(arquivo));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return;

    setLoading(true);
    setErroArquivo('');

    const formDataToSend = new FormData();
    formDataToSend.append('titulo', formData.titulo);
    formDataToSend.append('autor', formData.autor);
    formDataToSend.append('ano', formData.ano);
    formDataToSend.append('editora', formData.editora);
    
    if (imagem) {
      formDataToSend.append('capaPath', imagem);
    }

    try {
      await onSubmit(formDataToSend, livro?.id);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="livro-form-overlay">
      <div className="livro-form-container">
        <h2>{livro ? 'Editar Livro' : 'Novo Livro'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="titulo">Título *</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="autor">Autor *</label>
            <input
              type="text"
              id="autor"
              name="autor"
              value={formData.autor}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="ano">Ano *</label>
            <input
              type="number"
              id="ano"
              name="ano"
              value={formData.ano}
              onChange={handleChange}
              required
              min="1000"
              max="9999"
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="editora">Editora</label>
            <input
              type="text"
              id="editora"
              name="editora"
              value={formData.editora}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="imagem">Imagem da capa</label>
            <input
              type="file"
              id="imagem"
              accept="image/*"
              onChange={handleImagemChange}
              disabled={loading}
            />
            {erroArquivo && (
              <span className="error-message">{erroArquivo}</span>
            )}
          </div>

          {preview && (
            <div className="input-group">
              <label>Preview da imagem:</label>
              <div className="image-preview">
                <img src={preview} alt="Preview" />
              </div>
            </div>
          )}

          <div className="form-actions">
            <button 
              type="button" 
              onClick={onCancel} 
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? 'Enviando...' : (livro ? 'Atualizar' : 'Criar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LivroForm;
