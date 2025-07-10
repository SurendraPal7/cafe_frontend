import React from 'react'
import { useState } from "react";
import axios from "axios";

export default function Login() {
const[error,setError]=useState("");
const handleLogin=()=>{
    const url="http://localhost:8000/api/users/login";      
    const restult=axios.post(url,)
}




  return (
    <div>
        <h2>Login</h2>
        <p>
            <input type="email" placeholder="Email Address" />
        </p>
        <p>
            <input type="password" placeholder="Password" />
            </p>
        
    </div>
  )
}
