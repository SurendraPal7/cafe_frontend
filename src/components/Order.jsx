import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";

export default function Order() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/${user.email}`;
      const result = await axios.get(url);
      setOrders(result.data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-6">My Orders</h3>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {orders &&
        orders.map((order) => (
          <div key={order._id} className="mb-10 border rounded-md p-4 shadow-sm">
            <p className="font-medium mb-1">Order ID: <span className="text-gray-600">{order._id}</span></p>
            <p className="mb-1">Order Value: ₹{order.orderValue}</p>
            <p className="mb-4">Status: {order.status}</p>

            <table className="w-full text-left border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Product</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Quantity</th>
                  <th className="p-2 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="p-2 border">{item.productName}</td>
                    <td className="p-2 border">₹{item.price}</td>
                    <td className="p-2 border">{item.qty}</td>
                    <td className="p-2 border">₹{item.qty * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
}
