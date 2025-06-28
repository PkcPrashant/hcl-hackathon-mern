// src/components/SideBar.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import { Link, useLocation } from "react-router-dom";

export default function SideBar() {
  const { token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!token) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="h-screen w-64 bg-gray-800 text-white flex flex-col p-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
      <nav className="flex flex-col space-y-4">
        <Link
          to="/order-page"
          className={`px-4 py-2 rounded hover:bg-gray-700 ${
            isActive("/order-page") ? "bg-gray-700" : ""
          }`}
        >
          Orders
        </Link>
        <Link
          to="/transaction-page"
          className={`px-4 py-2 rounded hover:bg-gray-700 ${
            isActive("/transaction-page") ? "bg-gray-700" : ""
          }`}
        >
          Transactions
        </Link>
      </nav>
    </aside>
  );
}
