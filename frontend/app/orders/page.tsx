"use client";
import { fetchAPI } from "@/lib/fetchAPI";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Order {
  id: number;
  quantity: number;
  totalPrice: number;
  Product: Product;
  status: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders?userId=1`
        );
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  // Cancel an order
  const cancelOrder = async (orderId: number) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmCancel) return;
    try {
      const res = await fetchAPI(`orders/${orderId}`, {
        method: "PUT",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled" }),
      });
      if (!res.ok) throw new Error("Failed to cancel order");
      const updatedOrder = await res.json();

      // update local state
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, status: updatedOrder.status }
            : order
        )
      );
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };
  if (loading) return <div className="p-4">Loading your orders...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border p-4 mb-4 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{order.Product.name}</h2>
              <p className="text-gray-500">Quantity: {order.quantity}</p>
              <p className="text-gray-500">Status: {order.status}</p>
              <p className="font-bold">Total: ${order.totalPrice}</p>
            </div>
            {order.status !== "Cancelled" && (
              <button
                onClick={() => cancelOrder(order.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel Order
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
