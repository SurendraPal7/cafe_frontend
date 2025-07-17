import React from 'react'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
const[user,setUser]=useState({});
const[error,setError]=useState("");
const navigate= useNavigate();
const API_URL = import.meta.env.VITE_API_URL;

const handleLogin=()=>{
    const url=`${API_URL}/api/users/login`;
    // const url="http://localhost:8000/api/users/login";   
// const url="https://cafe-backend-pearl.vercel.app/api/users/login";
    // const url=import.meta.env.VITE_API_URL+"/api/users/login";
    // const url=`${import.meta.env.VITE_API_URL}/api/users/login`;
    axios.post(url,user).then((res)=>{
        console.log(res);
        setError("Login successful");
        navigate("/");
    })
    .catch((err)=>{
        console.log(err);
        setError("Something went wrong, please try again later");
    })
}




  return (
    <div>
        <h1>Login</h1>
        {error && <p>{error}</p>}
        

        <p>


            <input type="email" placeholder="Email Address" onChange={(e)=>setUser({...user, email:e.target.value})} />

        </p>
        <p>
            <input type="password" placeholder="Password" onChange={(e)=>setUser({...user, password: e.target.value})} />
            </p>
        <button onClick={handleLogin}>Login</button>
        <hr />
        <Link to ="/register">Create Account</Link>
    </div>
  )
}
