import axios from 'axios';

const API_BASE_URL = 'http://localhost:12000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Produtos
export const productService = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (product) => api.post('/products', product),
  update: (id, product) => api.put(`/products/${id}`, product),
  delete: (id) => api.delete(`/products/${id}`),
  search: (name) => api.get(`/products/search?name=${name}`),
  getByPriceRange: (minPrice, maxPrice) => 
    api.get(`/products/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}`)
};

// Usuários
export const userService = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (user) => api.post('/users', user),
  update: (id, user) => api.put(`/users/${id}`, user),
  delete: (id) => api.delete(`/users/${id}`),
  getByEmail: (email) => api.get(`/users/email/${email}`)
};

// Carrinho
export const cartService = {
  getItems: (userId) => api.get(`/cart/user/${userId}`),
  addItem: (item) => api.post('/cart', item),
  updateItem: (itemId, item) => api.put(`/cart/${itemId}`, item),
  removeItem: (itemId) => api.delete(`/cart/${itemId}`),
  clearCart: (userId) => api.delete(`/cart/user/${userId}`),
  getTotal: (userId) => api.get(`/cart/user/${userId}/total`),
  checkout: (userId) => api.post(`/cart/user/${userId}/checkout`)
};

// Pedidos
export const orderService = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  getByUser: (userId) => api.get(`/orders/user/${userId}`),
  createFromCart: (userId) => api.post(`/orders/create-from-cart/${userId}`),
  updateStatus: (orderId, status) => 
    api.put(`/orders/${orderId}/status`, { status }),
  delete: (id) => api.delete(`/orders/${id}`)
};

export default api;