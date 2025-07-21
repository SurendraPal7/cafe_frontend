import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";

export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty - 1 } : product
    );
    setCart(updatedCart);
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => {
        return sum + value.qty * value.price;
      }, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };
      await axios.post(url, newOrder);
      setCart([]);
      Navigate("/order");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">My Cart</h2>
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4">
        {cart &&
          cart.map(
            (value) =>
              value.qty > 0 && (
                <li
                  key={value._id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="font-medium">
                    {value.productName} - ₹{value.price}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decrement(value._id, value.qty)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{value.qty}</span>
                    <button
                      onClick={() => increment(value._id, value.qty)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                    <div className="ml-4 font-medium">₹{value.price * value.qty}</div>
                  </div>
                </li>
              )
          )}
      </ul>

      <h5 className="text-xl font-semibold mt-6">Total: ₹{orderValue}</h5>

      <div className="mt-4">
        {user?.token ? (
          <button
            onClick={placeOrder}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Place Order
          </button>
        ) : (
          <button
            onClick={() => Navigate("/login")}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login to Order
          </button>
        )}
      </div>
    </div>
  );
}
