"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";

interface Order {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  status: "Pending" | "paid" | "cancelled";
}
export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const userId = 1;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders?userId=${userId}`
        );
        const data: Order[] = await res.json();
        const count = data.reduce(
          (sum: number, order) => sum + order.quantity,
          0
        );
        setCartCount(count);
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch initially
    fetchCartCount();

    // Listen for cart updates
    const handleCartUpdate = () => fetchCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/" },
    { name: "Orders", href: "/orders" },
    { name: "Cart", href: "/cart" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-600">
          🛒 MyStore
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-medium hover:text-green-600 transition ${
                pathname === link.href ? "text-green-600" : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-green-600" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-inner">
          <div className="flex flex-col space-y-2 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium ${
                  pathname === link.href ? "text-green-600" : "text-gray-700"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/cart" onClick={() => setMenuOpen(false)}>
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                <span>Cart ({cartCount})</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
