import React, { useState, useEffect } from 'react';
import { cartService, orderService } from '../services/api';

const CartPage = ({ currentUser, onCartUpdate }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    if (currentUser) {
      loadCartItems();
    } else {
      setCartItems([]);
      setTotal(0);
      setLoading(false);
    }
  }, [currentUser]);

  const loadCartItems = async () => {
    try {
      setLoading(true);
      const [itemsResponse, totalResponse] = await Promise.all([
        cartService.getItems(currentUser.id),
        cartService.getTotal(currentUser.id)
      ]);
      
      setCartItems(itemsResponse.data);
      setTotal(totalResponse.data.total || 0);
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
      alert('Erro ao carregar carrinho');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }

    try {
      await cartService.updateItem(itemId, { quantity: newQuantity });
      loadCartItems();
      onCartUpdate();
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
      alert('Erro ao atualizar quantidade');
    }
  };

  const removeItem = async (itemId) => {
    try {
      await cartService.removeItem(itemId);
      loadCartItems();
      onCartUpdate();
    } catch (error) {
      console.error('Erro ao remover item:', error);
      alert('Erro ao remover item');
    }
  };

  const clearCart = async () => {
    if (!window.confirm('Deseja limpar todo o carrinho?')) return;

    try {
      await cartService.clearCart(currentUser.id);
      loadCartItems();
      onCartUpdate();
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      alert('Erro ao limpar carrinho');
    }
  };

  const createOrder = async () => {
    if (cartItems.length === 0) {
      alert('Carrinho está vazio!');
      return;
    }

    setCheckingOut(true);
    try {
      const response = await cartService.checkout(currentUser.id);
      if (response.data.success) {
        alert(`${response.data.message}\nPedido #${response.data.orderId}\nTotal: ${formatPrice(response.data.total)}`);
        loadCartItems();
        onCartUpdate();
      } else {
        alert(`Erro: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      alert('Erro ao finalizar pedido');
    } finally {
      setCheckingOut(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (!currentUser) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          <i className="fas fa-exclamation-triangle me-2"></i>
          Selecione um usuário para visualizar o carrinho
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
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              <i className="fas fa-shopping-cart me-2"></i>
              Carrinho de Compras
            </h2>
            {cartItems.length > 0 && (
              <button className="btn btn-outline-danger" onClick={clearCart}>
                <i className="fas fa-trash me-1"></i>
                Limpar Carrinho
              </button>
            )}
          </div>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <div className="alert alert-info">
            <i className="fas fa-shopping-cart fa-3x mb-3 d-block"></i>
            <h4>Carrinho vazio</h4>
            <p>Adicione produtos ao seu carrinho para continuar</p>
          </div>
        </div>
      ) : (
        <>
          <div className="row">
            <div className="col-lg-8">
              {cartItems.map(item => (
                <div key={item.id} className="card mb-3">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <div className="bg-light rounded d-flex align-items-center justify-content-center" 
                             style={{ height: '80px' }}>
                          <i className="fas fa-box fa-2x text-muted"></i>
                        </div>
                      </div>
                      
                      <div className="col-md-4">
                        <h5 className="mb-1">{item.productName}</h5>
                        <p className="text-muted mb-0">
                          {formatPrice(item.unitPrice)} cada
                        </p>
                      </div>
                      
                      <div className="col-md-3">
                        <div className="input-group">
                          <button 
                            className="btn btn-outline-secondary"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <input 
                            type="number" 
                            className="form-control text-center"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            min="1"
                          />
                          <button 
                            className="btn btn-outline-secondary"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                      
                      <div className="col-md-2">
                        <strong>{formatPrice(item.totalPrice)}</strong>
                      </div>
                      
                      <div className="col-md-1">
                        <button 
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeItem(item.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Resumo do Pedido</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <span>Subtotal:</span>
                    <strong>{formatPrice(total)}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Frete:</span>
                    <span className="text-success">Grátis</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-3">
                    <strong>Total:</strong>
                    <strong className="text-primary">{formatPrice(total)}</strong>
                  </div>
                  <button 
                    className="btn btn-primary w-100"
                    onClick={createOrder}
                    disabled={checkingOut}
                  >
                    {checkingOut ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Processando...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-check me-1"></i>
                        Finalizar Pedido
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;