"use client";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-green-500 mb-2">🛒 MyStore</h2>
          <p className="text-gray-400 text-sm">
            Your one-stop online shop for high-quality products. Fast delivery
            and top-notch customer service guaranteed.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" aria-label="Facebook" className="hover:text-green-500">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-green-500">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-green-500">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-green-500">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <a href="/" className="hover:text-green-500 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/cart" className="hover:text-green-500 transition">
                Shop
              </a>
            </li>
            <li>
              <a href="/orders" className="hover:text-green-500 transition">
                Orders
              </a>
            </li>
            <li>
              <a href="/cart" className="hover:text-green-500 transition">
                Cart
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Customer Service
          </h3>
          <ul className="space-y-1 text-gray-400 text-sm">
            <li>
              <a href="/contact" className="hover:text-green-500 transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-green-500 transition">
                FAQ
              </a>
            </li>
            <li>
              <a href="/shipping" className="hover:text-green-500 transition">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-green-500 transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Newsletter</h3>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe to our newsletter to get the latest updates and offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded-md text-gray-900 flex-1"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-6 py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
}
