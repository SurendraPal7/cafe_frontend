import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const navigate=useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;


  const handleSubmit = async () => {
    try {
      // const url ="http://localhost:8000/api/users/register";
      const url = `${API_URL}/api/users/register`;
        //   const url = "https://cafe-backend-pearl.vercel.app/api/users/register";

      const result = await axios.post(url, user);
      setError("Data submitted successfully");
      navigate("/login");

    } catch (err) {
      console.log(err);
      setError("Something went wrong, please try again later");
    } 
  };
  

  return (
    <div>
      <h2>Registration Form</h2>
      {error && <p>{error}</p>}
      <p>
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) =>
            setUser({ ...user, firstname: e.target.value })
          }
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="Last Name"
          onChange={(e) =>
            setUser({ ...user, lastname: e.target.value })
          }
        />
      </p>
      <p>
        <input
          type="email"
          placeholder="Email Address"
          onChange={(e) =>
            setUser({ ...user, email: e.target.value })
          }
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) =>
            setUser({ ...user, password: e.target.value })
          }
        />
      </p>
      <p>
        <button onClick={handleSubmit}>Submit</button>
      </p>
      <Link to="/login">Already have account Login</Link>
      
    </div>
  );
}
