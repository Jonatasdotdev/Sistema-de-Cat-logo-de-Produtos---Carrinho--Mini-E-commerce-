import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import UsersPage from './pages/UsersPage';
import OrdersPage from './pages/OrdersPage';
import { cartService } from './services/api';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    // Carregar usuário do localStorage se existir
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      updateCartCount(user.id);
    }
  }, []);

  const updateCartCount = async (userId) => {
    if (!userId) {
      setCartItemsCount(0);
      return;
    }

    try {
      const response = await cartService.getItems(userId);
      const totalItems = response.data.reduce((sum, item) => sum + item.quantity, 0);
      setCartItemsCount(totalItems);
    } catch (error) {
      console.error('Erro ao atualizar contador do carrinho:', error);
      setCartItemsCount(0);
    }
  };

  const handleUserSelect = (user) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      updateCartCount(user.id);
    } else {
      localStorage.removeItem('currentUser');
      setCartItemsCount(0);
    }
  };

  const handleCartUpdate = () => {
    if (currentUser) {
      updateCartCount(currentUser.id);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar 
          cartItemsCount={cartItemsCount} 
          currentUser={currentUser}
        />
        
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <ProductsPage 
                  currentUser={currentUser}
                  onCartUpdate={handleCartUpdate}
                />
              } 
            />
            <Route 
              path="/cart" 
              element={
                <CartPage 
                  currentUser={currentUser}
                  onCartUpdate={handleCartUpdate}
                />
              } 
            />
            <Route 
              path="/users" 
              element={
                <UsersPage 
                  currentUser={currentUser}
                  onUserSelect={handleUserSelect}
                />
              } 
            />
            <Route 
              path="/orders" 
              element={
                <OrdersPage 
                  currentUser={currentUser}
                />
              } 
            />
          </Routes>
        </main>

        <footer className="bg-light mt-5 py-4">
          <div className="container">
            <div className="row">
              
              
            </div>
            <hr />
            <div className="text-center text-muted">
              <small>© 2025 E-commerce System - Desenvolvido com ❤️</small>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;