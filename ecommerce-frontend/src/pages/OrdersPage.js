import React, { useState, useEffect } from 'react';
import { orderService } from '../services/api';

const OrdersPage = ({ currentUser }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (currentUser) {
      loadOrders();
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, [currentUser]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getByUser(currentUser.id);
      setOrders(response.data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      alert('Erro ao carregar pedidos');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateStatus(orderId, newStatus);
      alert('Status atualizado com sucesso!');
      loadOrders();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: { class: 'bg-warning', text: 'Pendente' },
      CONFIRMED: { class: 'bg-info', text: 'Confirmado' },
      SHIPPED: { class: 'bg-primary', text: 'Enviado' },
      DELIVERED: { class: 'bg-success', text: 'Entregue' },
      CANCELLED: { class: 'bg-danger', text: 'Cancelado' }
    };

    const config = statusConfig[status] || { class: 'bg-secondary', text: status };
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  if (!currentUser) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          <i className="fas fa-exclamation-triangle me-2"></i>
          Selecione um usuário para visualizar os pedidos
        </div>
      </div>
    );
  }

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
          <h2>
            <i className="fas fa-receipt me-2"></i>
            Meus Pedidos
          </h2>
          <p className="text-muted">Usuário: {currentUser.name}</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center">
          <div className="alert alert-info">
            <i className="fas fa-receipt fa-3x mb-3 d-block"></i>
            <h4>Nenhum pedido encontrado</h4>
            <p>Você ainda não fez nenhum pedido</p>
          </div>
        </div>
      ) : (
        <div className="row">
          {orders.map(order => (
            <div key={order.id} className="col-12 mb-4">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col-md-3">
                      <strong>Pedido #{order.id}</strong>
                    </div>
                    <div className="col-md-3">
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="col-md-3">
                      <small className="text-muted">
                        {formatDate(order.createdAt)}
                      </small>
                    </div>
                    <div className="col-md-3 text-end">
                      <strong className="text-primary">
                        {formatPrice(order.totalAmount)}
                      </strong>
                    </div>
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <h6>Itens do Pedido:</h6>
                      {order.items.map((item, index) => (
                        <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                          <div>
                            <span>{item.productName}</span>
                            <small className="text-muted ms-2">
                              (Qtd: {item.quantity})
                            </small>
                          </div>
                          <div>
                            <span>{formatPrice(item.unitPrice)} x {item.quantity} = </span>
                            <strong>{formatPrice(item.totalPrice)}</strong>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="col-md-4">
                      <div className="card bg-light">
                        <div className="card-body">
                          <h6>Ações do Pedido</h6>
                          <div className="btn-group-vertical w-100">
                            {order.status === 'PENDING' && (
                              <>
                                <button 
                                  className="btn btn-sm btn-info mb-1"
                                  onClick={() => updateOrderStatus(order.id, 'CONFIRMED')}
                                >
                                  <i className="fas fa-check me-1"></i>
                                  Confirmar
                                </button>
                                <button 
                                  className="btn btn-sm btn-danger"
                                  onClick={() => updateOrderStatus(order.id, 'CANCELLED')}
                                >
                                  <i className="fas fa-times me-1"></i>
                                  Cancelar
                                </button>
                              </>
                            )}
                            
                            {order.status === 'CONFIRMED' && (
                              <button 
                                className="btn btn-sm btn-primary"
                                onClick={() => updateOrderStatus(order.id, 'SHIPPED')}
                              >
                                <i className="fas fa-shipping-fast me-1"></i>
                                Marcar como Enviado
                              </button>
                            )}
                            
                            {order.status === 'SHIPPED' && (
                              <button 
                                className="btn btn-sm btn-success"
                                onClick={() => updateOrderStatus(order.id, 'DELIVERED')}
                              >
                                <i className="fas fa-check-circle me-1"></i>
                                Marcar como Entregue
                              </button>
                            )}
                            
                            <button 
                              className="btn btn-sm btn-outline-secondary mt-2"
                              onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                            >
                              <i className="fas fa-eye me-1"></i>
                              {selectedOrder === order.id ? 'Ocultar' : 'Ver'} Detalhes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {selectedOrder === order.id && (
                    <div className="mt-3 pt-3 border-top">
                      <h6>Detalhes do Pedido:</h6>
                      <div className="row">
                        <div className="col-md-6">
                          <p><strong>ID:</strong> {order.id}</p>
                          <p><strong>Cliente:</strong> {order.userName}</p>
                          <p><strong>Status:</strong> {getStatusBadge(order.status)}</p>
                        </div>
                        <div className="col-md-6">
                          <p><strong>Data:</strong> {formatDate(order.createdAt)}</p>
                          <p><strong>Total:</strong> {formatPrice(order.totalAmount)}</p>
                          <p><strong>Itens:</strong> {order.items.length}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;