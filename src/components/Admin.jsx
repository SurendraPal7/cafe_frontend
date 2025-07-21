import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="p-6">
      <nav className="flex space-x-6 text-lg font-medium mb-6">
        <Link
          to="/admin"
          className="hover:text-blue-600 transition-colors text-gray-700"
        >
          Users
        </Link>
        <Link
          to="/admin/products"
          className="hover:text-blue-600 transition-colors text-gray-700"
        >
          Products
        </Link>
        <Link
          to="/admin/orders"
          className="hover:text-blue-600 transition-colors text-gray-700"
        >
          Orders
        </Link>
      </nav>

      <div className="border rounded-lg p-4 shadow-md bg-white">
        <Outlet />
      </div>
    </div>
  );
}
