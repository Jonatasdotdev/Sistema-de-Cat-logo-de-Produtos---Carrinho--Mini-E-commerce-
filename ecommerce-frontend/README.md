# Frontend React - Sistema E-commerce

Interface web moderna e responsiva para o sistema de e-commerce desenvolvido em React.

## 🚀 Funcionalidades

### ✅ Catálogo de Produtos
- Listagem de produtos com layout em cards
- Busca por nome de produto
- Filtro por faixa de preço
- Adicionar produtos ao carrinho
- Interface responsiva

### ✅ Carrinho de Compras
- Visualizar itens no carrinho
- Atualizar quantidade de produtos
- Remover itens individuais
- Limpar carrinho completo
- Calcular total automaticamente
- Finalizar pedido

### ✅ Gerenciamento de Usuários
- Listar todos os usuários
- Criar novos usuários
- Editar usuários existentes
- Excluir usuários
- Selecionar usuário ativo

### ✅ Histórico de Pedidos
- Visualizar pedidos do usuário
- Detalhes completos de cada pedido
- Atualizar status dos pedidos
- Histórico com datas e valores

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework JavaScript
- **React Router DOM** - Navegação entre páginas
- **Axios** - Cliente HTTP para APIs
- **Bootstrap 5** - Framework CSS
- **Font Awesome** - Ícones
- **JavaScript ES6+** - Linguagem principal

## 📋 Pré-requisitos

- Node.js 16+ 
- npm ou yarn
- Backend Spring Boot rodando na porta 12000

## 🚀 Como Executar

### 1. Instalar dependências
```bash
cd ecommerce-frontend
npm install
```

### 2. Iniciar o backend
Certifique-se de que o backend Spring Boot está rodando:
```bash
cd ../project
mvn spring-boot:run
```

### 3. Iniciar o frontend
```bash
npm start
```

A aplicação estará disponível em: `http://localhost:3000`

## 📱 Páginas da Aplicação

### 🏠 Página Inicial - Produtos (`/`)
- Catálogo completo de produtos
- Busca e filtros
- Adicionar ao carrinho

### 🛒 Carrinho (`/cart`)
- Itens no carrinho
- Gerenciar quantidades
- Finalizar pedido

### 👥 Usuários (`/users`)
- CRUD de usuários
- Seleção de usuário ativo

### 📦 Pedidos (`/orders`)
- Histórico de pedidos
- Gerenciar status

## 🎨 Interface

### Design Responsivo
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (< 768px)

### Componentes Principais
- **Navbar** - Navegação principal com contador do carrinho
- **ProductCard** - Card individual de produto
- **Modal** - Para formulários de usuário

### Cores e Tema
- **Primary**: Azul Bootstrap (#0d6efd)
- **Success**: Verde para ações positivas
- **Warning**: Amarelo para alertas
- **Danger**: Vermelho para ações destrutivas

## 🔧 Configuração da API

O frontend está configurado para consumir a API REST do backend:

```javascript
const API_BASE_URL = 'http://localhost:12000/api';
```

### Endpoints Utilizados:
- `GET /products` - Listar produtos
- `POST /cart` - Adicionar ao carrinho
- `POST /orders/create-from-cart/{userId}` - Criar pedido
- E todos os outros endpoints do backend

## 📊 Funcionalidades Avançadas

### Gerenciamento de Estado
- Estado local com React Hooks
- Persistência do usuário no localStorage
- Atualização automática do contador do carrinho

### Validações
- Formulários com validação client-side
- Mensagens de erro e sucesso
- Confirmações para ações destrutivas

### UX/UI
- Loading states durante requisições
- Feedback visual para ações
- Navegação intuitiva
- Ícones descritivos

## 🚀 Melhorias Futuras

### Funcionalidades
- [ ] Autenticação de usuários
- [ ] Favoritos/Wishlist
- [ ] Avaliações de produtos
- [ ] Chat de suporte
- [ ] Notificações push

### Técnicas
- [ ] Context API para estado global
- [ ] React Query para cache de dados
- [ ] Lazy loading de componentes
- [ ] PWA (Progressive Web App)
- [ ] Testes unitários com Jest
- [ ] Storybook para componentes

### Performance
- [ ] Code splitting
- [ ] Otimização de imagens
- [ ] Service Workers
- [ ] Bundle analysis

## 📱 Screenshots

### Desktop
- Layout em grid responsivo
- Sidebar com filtros
- Carrinho com resumo detalhado

### Mobile
- Menu hambúrguer
- Cards empilhados
- Botões touch-friendly

## 🔧 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Navbar.js       # Barra de navegação
│   └── ProductCard.js  # Card de produto
├── pages/              # Páginas da aplicação
│   ├── ProductsPage.js # Catálogo de produtos
│   ├── CartPage.js     # Carrinho de compras
│   ├── UsersPage.js    # Gerenciar usuários
│   └── OrdersPage.js   # Histórico de pedidos
├── services/           # Serviços de API
│   └── api.js         # Cliente HTTP
├── App.js             # Componente principal
└── index.js           # Ponto de entrada
```

## 🐛 Troubleshooting

### Erro de CORS
Se houver erro de CORS, certifique-se de que o backend tem a anotação `@CrossOrigin(origins = "*")` nos controllers.

### API não encontrada
Verifique se o backend está rodando na porta 12000 e se a URL da API está correta.

### Dependências
Se houver problemas com dependências, tente:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

**Desenvolvido com React + Bootstrap para máxima compatibilidade e performance** 🚀