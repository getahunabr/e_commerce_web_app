"use client";
import { fetchAPI } from "@/lib/fetchAPI";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

interface Order {
  id: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  Product: Product;
}

export default function CartPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const userId = 1; // replace later with logged-in user

  const fetchCartOrders = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders?userId=${userId}`
      );
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching cart orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartOrders();
  }, []);

  const updateQuantity = async (orderId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? {
                ...order,
                quantity: newQuantity,
                totalPrice: newQuantity * order.Product.price,
              }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (orderId: number) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`, {
        method: "DELETE",
      });
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCheckout = async () => {
    // Implement checkout logic here

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/checkout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );
      if (!res.ok) throw new Error("Checkout failed");
      const data = await res.json();

      alert("Checkout successful!");
      setOrders([]);

      //  Wait a bit for backend to finish processing (important)
      setTimeout(() => {
        window.dispatchEvent(new Event("cartUpdated"));
      }, 300);

      alert("✅ Checkout successful!");
      // router.push("/");
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("❌ Checkout failed. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  const totalAmount = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {orders.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border p-4 mb-4 rounded flex justify-between items-center"
          >
            {order.Product.imageUrl && (
              <img
                src={
                  order.Product.imageUrl.startsWith("http")
                    ? order.Product.imageUrl
                    : `${process.env.NEXT_PUBLIC_API_URL}/${order.Product.imageUrl}`
                }
                alt={order.Product.name}
                className="w-32 h-32 object-cover rounded-lg shadow"
              />
            )}
            <div>
              <h2 className="text-lg font-semibold">{order.Product.name}</h2>
              <p className="text-gray-500">Price: ${order.Product.price}</p>
              <p className="text-gray-500">Total: ${order.totalPrice}</p>
              <div className="flex items-center mt-2 gap-2">
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => updateQuantity(order.id, order.quantity - 1)}
                >
                  -
                </button>
                <span>{order.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => updateQuantity(order.id, order.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => removeItem(order.id)}
            >
              Remove
            </button>
          </div>
        ))
      )}
      <div className="mt-6 text-right">
        <h3 className="text-xl font-bold">
          Total Amount: ${totalAmount.toFixed(2)}
        </h3>
        <button
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
