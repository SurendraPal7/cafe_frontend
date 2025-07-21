import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/register`;
      await axios.post(url, user);
      setError("Registration successful.");
      Navigate("/login");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registration Form</h2>
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        <div className="space-y-4">
          <input
            type="text"
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            placeholder="First Name"
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Email Address"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-md mt-6 hover:bg-blue-700"
        >
          Submit
        </button>

        <hr className="my-6" />

        <p className="text-center text-sm">
          Already a member?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login Here...
          </Link>
        </p>
      </div>
    </div>
  );
}
