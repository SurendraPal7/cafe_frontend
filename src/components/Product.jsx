import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function Product() {
  const [product, setProduct] =useState({})
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleadd= async()=>{
    try{
          const url=`${API_URL}/api/products/addPro`;

    // const url= "http://localhost:8000/api/products/addPro"
    const result= await axios.post(url,product);
    setError("Product added succesfully");
    }
    catch(err){ 
      setError("Error adding product");

    }
  }

  return (
    <div>
      <h1>Add Products</h1>
        {error && <p>{error}</p>}
      <div>
        <p>
        <input type="text" placeholder='Product name'  onChange={(e)=>setProduct({...product, productName: e.target.value})}/>
      </p>
      <p>
        <input type="text" placeholder='Enter Description' onChange={(e)=>setProduct({...Product,description: e.target.value})} />
      </p>
      <p>
        <input type="number" placeholder='Price' onChange={(e)=>setProduct({...product, price: e.target.value})} />
      </p>
      <p>
        <input type="text" placeholder='image url' onChange={(e)=>setProduct({...product , imgUrl: e.target.value})} />
      </p>
      </div>
      <p>
      <button onClick={handleadd}>Add Products</button>

      </p>
      </div>
  )
}
