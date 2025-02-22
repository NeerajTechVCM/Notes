import React, { useEffect } from 'react'
import Signup from './Pages/Auth/Signup'
import Login from './Pages/Auth/Login'
import { BrowserRouter as Router, Routes ,Route, Navigate, useNavigate } from 'react-router-dom'
import Home from './Pages/Home/Home'

import Cookies from 'js-cookie';
export default function App() {

  const token = Cookies.get('token');
  const navigate = useNavigate();
  useEffect(() => {

    const token = Cookies.get('token');

    if (!token) {
    
      navigate('/login');
    } 
  }, [navigate]);


  return (
    <>

      <Routes>
        
        <Route path='/' element={ <Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={ <Signup/>} />
         
        
      </Routes>

      
    </>
  )
}
