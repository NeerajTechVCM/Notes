import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { FiSearch } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { useSearch } from '@/context/SearchNoteContext';

export default function Navbar() {
  const navigate = useNavigate();
  const [query,setQuery] = useState("");
  const [searchResults,setSearchResults] = useSearch();

  const searchHandler = (event)=>{
    setQuery(event.target.value);
    console.log(query);
  }
  
  async function handleSubmit(e){
    e.preventDefault();
  
  
    const result=await fetch(`http://localhost:8080/search/${query}`,{
        method:"GET",
        headers:{
            "Content-Type":'application/json',
       
        },

        credentials: 'include',
    });
    const data=await result.json();
  
;
   
    if(data.success){
      setSearchResults(data.Notes)
  
  
    
  }
    setQuery("")
  }


const handleLogout = async ()=>{
  const result = await fetch("http://localhost:8080/logout", {
    method: "POST",
    headers: {
      "Content-Type": 'application/json'
    },
 
    credentials: 'include',
  });
  const data = await result.json();
  console.log(data);
  if (data.success) {


    navigate("/login");

  } else {
    navigate("/");
  }
}

  return (
    <>
      <div className="flex justify-between items-center w-full text-2xl bg-blue-200 p-4">
     <div>
      Notes
     </div>

    <form onSubmit={handleSubmit} >
    <div className="flex space-x-3 justify-center items-center">
      <Input placeholder="Search..." value={query} onChange={searchHandler} />
   <button type='submit'> 
   <FiSearch style={{fontSize:"25px"}} />
   </button>
     </div>
    </form>
     <div>
     <CiLogout className='cursor-pointer' style={{fontSize:"25px"}} onClick={handleLogout}  />
   
     </div>
      </div>
    </>
  )
}
