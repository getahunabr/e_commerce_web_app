"use client";

import { fetchAPI } from "@/lib/fetchAPI";
import { useEffect, useState } from "react";
import Link from "next/link";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [creating, setCreating] = useState(false);

  // Fetch products from backend
  const loadProducts = async () => {
    try {
      const data = await fetchAPI("products");
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Handle product creation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const product = {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        imageUrl,
      };

      const data = await fetchAPI("products", {
        method: "POST",
        body: JSON.stringify(product),
      });

      alert(`Product "${data.name}" created successfully!`);

      // Update product list
      setProducts((prev) => [...prev, data]);

      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setImageUrl("");
    } catch (error) {
      console.error(error);
      alert("Failed to create product");
    }
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Products Dashboard
      </h1>

      {/* Products Grid */}
      <h2 className="text-2xl font-semibold mb-4">All Products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div
                key={product.id}
                className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                <p className="text-gray-500 mb-2 line-clamp-3">
                  {product.description}
                </p>
                <p className="font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Stock: {product.stock}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Create Product Form */}
      <div className="bg-white border rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Create New Product</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border p-2 rounded w-full"
            required
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            type="number"
            step="0.01"
            className="border p-2 rounded w-full"
            required
          />
          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock"
            type="number"
            className="border p-2 rounded w-full"
            required
          />
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
            className="border p-2 rounded w-full"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="border p-2 rounded w-full sm:col-span-2"
            required
          />
          <button
            type="submit"
            disabled={creating}
            className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 sm:col-span-2 hover:bg-blue-700 transition"
          >
            {creating ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
