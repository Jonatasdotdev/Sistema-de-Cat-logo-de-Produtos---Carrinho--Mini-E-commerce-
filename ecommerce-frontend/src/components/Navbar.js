import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ cartItemsCount, currentUser }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-store me-2"></i>
          E-commerce
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/')}`} to="/">
                <i className="fas fa-home me-1"></i>
                Produtos
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/users')}`} to="/users">
                <i className="fas fa-users me-1"></i>
                Usuários
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/orders')}`} to="/orders">
                <i className="fas fa-receipt me-1"></i>
                Pedidos
              </Link>
            </li>
          </ul>
          
          <ul className="navbar-nav">
            {currentUser && (
              <li className="nav-item">
                <span className="navbar-text me-3">
                  <i className="fas fa-user me-1"></i>
                  {currentUser.name}
                </span>
              </li>
            )}
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/cart')}`} to="/cart">
                <i className="fas fa-shopping-cart me-1"></i>
                Carrinho
                {cartItemsCount > 0 && (
                  <span className="badge bg-danger ms-1">{cartItemsCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;