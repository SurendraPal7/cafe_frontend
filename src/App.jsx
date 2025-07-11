import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home.jsx'
import Temp from './components/Temp.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Home name="john" age="19"/> */}
      {/* <Temp flag={false} />
       */}

       <h1>Frontend Cafe</h1>
       <Register/>
       {/* <Login/> */}
       <h3>@2025 All right reserve</h3>


    </>
  )
}
 
export default App
