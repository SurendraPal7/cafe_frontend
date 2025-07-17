import React from 'react'
import { useState,useEffect, useRef } from 'react'
import axios  from 'axios'

export default function Products() {
  const [products, setProducts] = useState([])
  const[error,setError]=useState("");
  // const [loading, setLoading] = useState(false)
/*
  const fetchProducts=async()=>{
    setError("Loading...");
    try{
      const url="http://localhost:8000/api/products/"
      const result= await axios.get(url)
      setProducts(result.data);
      setError("Unable to fetch Products");

    }

  }
    */

  return (
    <div>Products</div>
  )
}
