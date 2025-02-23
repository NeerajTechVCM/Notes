import React, { useEffect } from 'react'
import Signup from './Pages/Auth/Signup'
import Login from './Pages/Auth/Login'
import { BrowserRouter as Router, Routes ,Route, Navigate, useNavigate } from 'react-router-dom'
import Home from './Pages/Home/Home'
import { useAuth } from './context/AuthProvider'


export default function App() {

  const [auth,setAuth]=useAuth();
 

  return (
    <>

      <Routes>
        
      <Route path='/' element={   !auth? <Navigate to={'/login'}/>:<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={ <Signup/>} />
         
        
      </Routes>

      
    </>
  )
}
