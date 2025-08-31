import React, { useState, useEffect } from 'react';
import { productService, cartService } from '../services/api';
import ProductCard from '../components/ProductCard';

const ProductsPage = ({ currentUser, onCartUpdate }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      alert('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadProducts();
      return;
    }

    try {
      setLoading(true);
      const response = await productService.search(searchTerm);
      setProducts(response.data);
    } catch (error) {
      console.error('Erro na busca:', error);
      alert('Erro ao buscar produtos');
    } finally {
      setLoading(false);
    }
  };

  const handlePriceFilter = async () => {
    if (!minPrice || !maxPrice) {
      alert('Informe o preço mínimo e máximo');
      return;
    }

    try {
      setLoading(true);
      const response = await productService.getByPriceRange(minPrice, maxPrice);
      setProducts(response.data);
    } catch (error) {
      console.error('Erro no filtro de preço:', error);
      alert('Erro ao filtrar por preço');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const cartItem = {
        userId: currentUser.id,
        productId: product.id,
        quantity: 1
      };

      await cartService.addItem(cartItem);
      alert(`${product.name} adicionado ao carrinho!`);
      onCartUpdate();
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      alert('Erro ao adicionar produto ao carrinho');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    loadProducts();
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
          <h2>
            <i className="fas fa-store me-2"></i>
            Catálogo de Produtos
          </h2>
        </div>
      </div>

      {/* Filtros */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="btn btn-outline-primary" onClick={handleSearch}>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Preço mínimo"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Preço máximo"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        
        <div className="col-md-2">
          <div className="btn-group w-100">
            <button className="btn btn-outline-primary" onClick={handlePriceFilter}>
              <i className="fas fa-filter"></i>
            </button>
            <button className="btn btn-outline-secondary" onClick={clearFilters}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="row">
        {products.length === 0 ? (
          <div className="col-12 text-center">
            <div className="alert alert-info">
              <i className="fas fa-info-circle me-2"></i>
              Nenhum produto encontrado
            </div>
          </div>
        ) : (
          products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              currentUser={currentUser}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsPage;