"use client";

import { fetchAPI } from "@/lib/fetchAPI";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      const res = await fetchAPI("orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, quantity: 1, userId: 1 }),
      });
      if (res.ok === false) throw new Error("Failed to add to cart");

      alert("Product added to cart!");
      router.push("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product)
    return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full sm:w-1/2 h-72 object-cover rounded-lg shadow"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-blue-600 mb-2">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-500 mb-4">In stock: {product.stock}</p>

          <button
            onClick={addToCart}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
