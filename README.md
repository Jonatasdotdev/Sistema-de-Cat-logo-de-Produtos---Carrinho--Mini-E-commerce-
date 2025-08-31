

# 🛒 E-commerce System (Spring Boot + React)

Um sistema de **e-commerce completo** com **backend em Java (Spring Boot + Hibernate)** e **frontend em React**, oferecendo catálogo de produtos, gerenciamento de usuários, carrinho de compras e pedidos.

---

## 🚀 Tecnologias Utilizadas

### 🔹 Backend

* **Java 17**
* **Spring Boot 3.1.5**
* **Spring Data JPA**
* **Hibernate**
* **H2 Database** (in-memory)
* **Maven**
* **JUnit 5** + **Mockito**

### 🔹 Frontend

* **React 18**
* **React Router DOM**
* **Axios**
* **Bootstrap 5**
* **Font Awesome**
* **JavaScript ES6+**

---

## 📋 Funcionalidades

### ✅ Catálogo de Produtos

* CRUD de produtos (criar, listar, atualizar, excluir)
* Busca por nome
* Filtro por faixa de preço
* Listagem responsiva em cards

### ✅ Usuários

* CRUD de usuários
* Busca por email
* Seleção de usuário ativo

### ✅ Carrinho de Compras

* Adicionar produtos ao carrinho
* Atualizar/remover itens
* Calcular total do carrinho
* Limpar carrinho
* Finalizar pedido

### ✅ Pedidos

* Criar pedido a partir do carrinho
* Histórico de pedidos por usuário
* Atualizar status
* Listagem detalhada

---

## 🏗️ Arquitetura

### 📂 Backend (Spring Boot)

```
src/main/java/com/ecommerce/catalog/
├── controller/     # REST Controllers
├── service/        # Business logic
├── repository/     # Data access (JPA)
├── entity/         # JPA Entities
├── dto/            # Data Transfer Objects
└── config/         # Configurations
```

### 📂 Frontend (React)

```
src/
├── components/          # Reusable components
│   ├── Navbar.js
│   └── ProductCard.js
├── pages/               # Application pages
│   ├── ProductsPage.js
│   ├── CartPage.js
│   ├── UsersPage.js
│   └── OrdersPage.js
├── services/            # API services
│   └── api.js
├── App.js
└── index.js
```

---

## ⚙️ Como Executar

### 🔹 Pré-requisitos

* **Java 17+**
* **Maven 3.6+**
* **Node.js 16+**
* **npm ou yarn**

---

### 🔹 Executar Backend

1. Clone o repositório:

```bash
git clone 
cd product-catalog
```

2. Compile e rode:

```bash
mvn clean install
mvn spring-boot:run
```

> O backend estará disponível em: `http://localhost:12000`
> Console H2: `http://localhost:12000/h2-console` (JDBC URL: `jdbc:h2:mem:ecommerce`)

---

### 🔹 Executar Frontend

1. Vá até a pasta `ecommerce-frontend`:

```bash
cd ecommerce-frontend
npm install
```

2. Inicie o servidor React:

```bash
npm start
```

> O frontend estará disponível em: `http://localhost:3000`
> Certifique-se de que o **backend está rodando na porta 12000**.

---

## 📚 API Endpoints Principais

### 🛍️ Produtos

* `GET /api/products` → lista produtos
* `POST /api/products` → cria produto
* `PUT /api/products/{id}` → atualiza produto
* `DELETE /api/products/{id}` → remove produto

### 👥 Usuários

* `GET /api/users` → lista usuários
* `POST /api/users` → cria usuário

### 🛒 Carrinho

* `GET /api/cart/user/{userId}` → itens do carrinho
* `POST /api/cart` → adicionar item
* `PUT /api/cart/{itemId}` → atualizar quantidade
* `DELETE /api/cart/{itemId}` → remover item

### 📦 Pedidos

* `POST /api/orders/create-from-cart/{userId}` → criar pedido
* `GET /api/orders/user/{userId}` → pedidos de um usuário

---

## 📱 Páginas do Frontend

* **Produtos (`/`)** → catálogo + filtros + adicionar ao carrinho
* **Carrinho (`/cart`)** → visualizar/editar carrinho + finalizar pedido
* **Usuários (`/users`)** → CRUD de usuários + seleção de usuário ativo
* **Pedidos (`/orders`)** → histórico de pedidos

---

## 🎨 Design

* **Responsivo** (Desktop, Tablet, Mobile)
* **Bootstrap 5** para layout
* **Ícones Font Awesome**
* **Feedback visual (loading, alerts, toasts)**

Screenshots:
<img width="1280" height="720" alt="screenshot_20250831_155803_360214" src="https://github.com/user-attachments/assets/85dc1d0e-0038-48eb-b0cb-c5f23fbcf85d" />
<img width="1280" height="720" alt="screenshot_20250831_155751_593722" src="https://github.com/user-attachments/assets/e51d092a-7574-4329-97f7-54d9cd48da0e" />
<img width="1280" height="720" alt="screenshot_20250831_155743_351354" src="https://github.com/user-attachments/assets/dabfd5b6-cb60-4cf1-83d0-d3514612ccdf" />
<img width="1280" height="720" alt="screenshot_20250831_155551_505315" src="https://github.com/user-attachments/assets/0e0fc030-2fe0-41a5-a399-402344a24804" />
<img width="1280" height="720" alt="screenshot_20250831_154625_442333" src="https://github.com/user-attachments/assets/893f7efe-d383-4df5-b779-ba7268ab9356" />
<img width="1280" height="720" alt="screenshot_20250831_154558_973341" src="https://github.com/user-attachments/assets/448272b9-6e65-4830-a452-b335b363f218" />
<img width="1280" height="720" alt="screenshot_20250831_154537_139534" src="https://github.com/user-attachments/assets/40b0108b-6949-4697-a918-37c4832c0d93" />
<img width="1280" height="720" alt="screenshot_20250831_154530_674984" src="https://github.com/user-attachments/assets/f6370398-36da-4d27-8dfa-781f44729bf0" />
<img width="1280" height="720" alt="screenshot_20250831_154524_788545" src="https://github.com/user-attachments/assets/a369e2c6-b0ba-4899-89a8-1dc49cbcb19a" />
<img width="1280" height="720" alt="screenshot_20250831_154518_702313" src="https://github.com/user-attachments/assets/2e2b676f-ea6a-41a9-8a75-eb555b4ac766" />
<img width="1280" height="720" alt="screenshot_20250831_154512_704926" src="https://github.com/user-attachments/assets/14f734c5-dde5-4c21-a5c7-741bc9a57de2" />
<img width="1280" height="720" alt="screenshot_20250831_155824_688051" src="https://github.com/user-attachments/assets/ef9d8e20-719d-49b9-b232-a6c1d64a3fa2" />


---

## 🚀 Melhorias Futuras

* [ ] Autenticação e autorização (Spring Security + JWT)
* [ ] Paginação em listagens
* [ ] Cache com Redis
* [ ] Swagger/OpenAPI para documentação
* [ ] Docker e CI/CD
* [ ] React Query para cache de dados
* [ ] PWA + notificações push

---

## 👨‍💻 Desenvolvedor

Projeto desenvolvido com **Java + Spring Boot no backend** e **React no frontend**, aplicando boas práticas de arquitetura limpa, responsividade e testes automatizados.


