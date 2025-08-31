import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';

const UsersPage = ({ currentUser, onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      alert('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      if (editingUser) {
        await userService.update(editingUser.id, formData);
        alert('Usuário atualizado com sucesso!');
      } else {
        await userService.create(formData);
        alert('Usuário criado com sucesso!');
      }
      
      setShowModal(false);
      setEditingUser(null);
      setFormData({ name: '', email: '' });
      loadUsers();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      if (error.response?.status === 400) {
        alert('Email já está em uso');
      } else {
        alert('Erro ao salvar usuário');
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email });
    setShowModal(true);
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Deseja excluir o usuário ${user.name}?`)) return;

    try {
      await userService.delete(user.id);
      alert('Usuário excluído com sucesso!');
      loadUsers();
      
      // Se o usuário excluído era o atual, limpar seleção
      if (currentUser && currentUser.id === user.id) {
        onUserSelect(null);
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      alert('Erro ao excluir usuário');
    }
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '' });
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h2>
              <i className="fas fa-users me-2"></i>
              Gerenciar Usuários
            </h2>
            <button className="btn btn-primary" onClick={openCreateModal}>
              <i className="fas fa-plus me-1"></i>
              Novo Usuário
            </button>
          </div>
        </div>
      </div>

      {currentUser && (
        <div className="alert alert-info mb-4">
          <i className="fas fa-info-circle me-2"></i>
          Usuário atual: <strong>{currentUser.name}</strong> ({currentUser.email})
        </div>
      )}

      <div className="row">
        {users.map(user => (
          <div key={user.id} className="col-md-6 col-lg-4 mb-3">
            <div className={`card h-100 ${currentUser && currentUser.id === user.id ? 'border-primary' : ''}`}>
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                       style={{ width: '50px', height: '50px' }}>
                    <i className="fas fa-user text-white"></i>
                  </div>
                  <div>
                    <h5 className="card-title mb-1">{user.name}</h5>
                    <p className="card-text text-muted small mb-0">{user.email}</p>
                  </div>
                </div>
                
                <div className="btn-group w-100">
                  <button 
                    className={`btn ${currentUser && currentUser.id === user.id ? 'btn-success' : 'btn-outline-primary'}`}
                    onClick={() => onUserSelect(user)}
                  >
                    {currentUser && currentUser.id === user.id ? (
                      <>
                        <i className="fas fa-check me-1"></i>
                        Selecionado
                      </>
                    ) : (
                      <>
                        <i className="fas fa-user-check me-1"></i>
                        Selecionar
                      </>
                    )}
                  </button>
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => handleEdit(user)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(user)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingUser ? 'Atualizar' : 'Criar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;