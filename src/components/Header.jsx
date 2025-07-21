import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

export default function Header() {
  const { user } = useContext(AppContext);

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">MERN Frontend</h1>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/cart">MyCart</Link>
        <Link to="/order">MyOrder</Link>
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
        {user?.token ? <Link to="/profile">Profile</Link> : <Link to="/login">Login</Link>}
      </div>
      {user?.firstName && (
        <div className="text-sm font-medium">
          Welcome, <span className="font-bold">{user.firstName}</span>!
        </div>
      )}
    </div>
  );
}
