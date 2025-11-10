# 🛒 MyStore - Modern E-Commerce Application

MyStore is a fully functional, modern e-commerce web application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It allows users to browse products, manage a cart, place orders, and view order history. The application also includes a clean responsive UI with a modern footer and navigation system.

---

## 🌟 Features

- Browse products with images, descriptions, and prices.
- Add, update, and remove products from the shopping cart.
- View cart with total amounts and checkout functionality.
- Place and manage orders.
- Cancel or delete pending orders.
- Responsive navigation with a dynamic cart icon showing the number of items.
- Modern footer with social links, quick links, and newsletter subscription.
- Clean UI using **Tailwind CSS**.
- RESTful backend API for managing products, orders, and checkout.

---

## 🛠 Tech Stack

- **Frontend:** Next.js, TypeScript, React, Tailwind CSS
- **Backend:** Node.js, Express.js, Sequelize ORM
- **Database:** MySQL / PostgreSQL (configurable in `models` setup)
- **Icons:** Lucide-react
- **State Management:** React useState & useEffect

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/getahunabr/mystore.git
cd mystore
```

````

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
DATABASE_URL=your_database_url_here
```

### 4. Run Backend

Ensure you have your database running, then:

```bash
cd backend
npm install
npm run dev
```

### 5. Run Frontend

```bash
cd frontend
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app in action.

---

## 📦 Project Structure

```
/frontend
  /app
    /components
      Navbar.tsx
      Footer.tsx
      CartPage.tsx
      OrdersPage.tsx
    /pages
      index.tsx
      shop.tsx
      cart.tsx
      orders.tsx
  /lib
    fetchAPI.ts
/backend
  /models
    Product.ts
    Order.ts
    User.ts
  /routes
    orderRoutes.ts
    productRoutes.ts
  server.js
```

---

## ⚙️ API Endpoints

### Products

- `GET /api/products` - Fetch all products
- `GET /api/products/:id` - Fetch single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders

- `GET /api/orders?userId=:id` - Get orders by user
- `POST /api/orders` - Create a new order
- `PUT /api/orders/:id` - Update order (quantity/status)
- `DELETE /api/orders/:id` - Delete an order
- `POST /api/orders/checkout` - Checkout all pending orders

---

## 🎨 UI Features

- Responsive navigation bar with dynamic cart count.
- Cart page with update quantity, remove item, and checkout functionality.
- Orders page with cancel/delete functionality.
- Modern footer with social media links, quick links, and newsletter signup.

---

## 👨‍💻 Contributing

1. Fork the project
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Author

**Getahun Lakachew**

- [Portfolio](https://my-3-d-portfolio-eight.vercel.app)
- [GitHub](https://github.com/getahunabr)
- [LinkedIn](https://www.linkedin.com/in/getahun-lakachew-6bb98731b/)

```


```
````
