import React from 'react';

const ProductCard = ({ product, onAddToCart, currentUser }) => {
  const handleAddToCart = () => {
    if (!currentUser) {
      alert('Selecione um usuário primeiro!');
      return;
    }
    onAddToCart(product);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-img-top bg-light d-flex align-items-center justify-content-center" 
             style={{ height: '200px' }}>
          <i className="fas fa-box fa-3x text-muted"></i>
        </div>
        
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text text-muted small flex-grow-1">
            {product.description}
          </p>
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center">
              <span className="h5 text-primary mb-0">
                {formatPrice(product.price)}
              </span>
              <button 
                className="btn btn-primary btn-sm"
                onClick={handleAddToCart}
                disabled={!currentUser}
              >
                <i className="fas fa-cart-plus me-1"></i>
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;