import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { FiSearch } from "react-icons/fi";

import { useSearch } from '@/context/SearchNoteContext';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '@/context/AuthProvider';

export default function Navbar() {
  const navigate = useNavigate();
   const [auth,setAuth]=useAuth();
  const [query,setQuery] = useState("");
  const [searchResults,setSearchResults] = useSearch();

  const searchHandler = (event)=>{
    setQuery(event.target.value);
    console.log(query);
  }
  
  async function handleSubmit(e){
    e.preventDefault();
  
  
    const result=await fetch(`/search/${query}`,{
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
      toast.success(data.message)
  
  }
  else{
    toast.error(data.message)
  }
    setQuery("")
  }



  return (
    <>
    <Toaster/>
      <div className="flex justify-between items-center gap-2 w-full text-2xl bg-blue-200 p-4">
     <div>
      Notes
     </div>

    <form onSubmit={handleSubmit} >
    <div className="flex space-x-2 justify-center items-center">
      <Input placeholder="Search Tags..." value={query} onChange={searchHandler} />
   <button type='submit'> 
   <FiSearch style={{fontSize:"25px"}} />
   </button>
     </div>
    </form>
     <div>

   
     </div>
      </div>
    </>
  )
}
