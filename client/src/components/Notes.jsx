import React, { useEffect, useState } from 'react'
import Note from './Note'
import { CiLogout } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSearch } from '@/context/SearchNoteContext';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '@/context/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function Notes() {
  const [Notes, setNotes] = useState([])
    const [auth,setAuth]=useAuth();
    const navigate = useNavigate();
 const [formData, setFormData] = useState({
  title: "",
    content: "",
    tags: ""
  });
  const [searchResults,setSearchResults] = useSearch();

  console.log(searchResults)
  useEffect(() => {
    const fetchAllNotes = async () => {
      const result = await fetch("/getAllNotes", {
        method: "GET",
        headers: {
          "Content-Type": 'application/json'
        },
        credentials: 'include',
      });
      const data = await result.json();
      if (data.AllNotes) {
        setNotes(data.AllNotes);
      }
    }
    fetchAllNotes();

  }, [])


  function inputHandle(event) {
    const a = event.target.name;
    const b = event.target.value;
    setFormData(() => {
      return {
        ...formData, [a]: b,
      }

    })
  
  }
  const handleLogout = async ()=>{
    localStorage.clear();
  setAuth("");
    const result = await fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
   
      credentials: 'include',
    });
    const data = await result.json();
    console.log(data);
    if (data.success) {
      toast.success(data.message)
  
      navigate("/login");
  
    } else {
      navigate("/");
      toast.error(data.message)
    }
  }
  
  const handleSubmit = async(event)=>{
    event.preventDefault();
    const result=await fetch("/addNote",{
     method:"POST",
     headers:{
         "Content-Type":'application/json'
     },
     body:JSON.stringify(formData),
     credentials: 'include',
 });
 const data=await result.json();
 console.log(data);
 if(data.success){
  

  toast.success(data.message)
  setTimeout(function() {
    window.location.reload();
  },1000);


}else{
  toast.error(data.message)
}
 setFormData({
 title:"",
   content: "",
   tags: "",
 })
  }

  const displayNotes = searchResults.length > 0 ? searchResults : Notes;
  return (
    <>
    <Toaster/>
      <div className="flex flex-wrap w-full h-auto p-4 gap-4 justify-center items-center">

        
        {displayNotes.length > 0 ? (
          displayNotes.map((note) => (
            <Note key={note._id} note={note} />
          ))
        ) : (
          <p>No notes found.</p>
        )}
        {
  searchResults.length > 0?<a href='/'><Button href="/">Back to home </Button></a>:""
}
      </div>

    


      <Dialog>
  <DialogTrigger>
  <CiCirclePlus
        className="fixed bottom-6 right-16 text-4xl cursor-pointer bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-all"
    
      />
  </DialogTrigger>
  <DialogContent>
         <form onSubmit={handleSubmit}>
         <DialogHeader>
            <DialogTitle>Add a New Note</DialogTitle>
            <DialogDescription>
              Please enter the title and content for your new note.
            </DialogDescription>
            <br />
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Note Title"
              name="title"
              value={formData.title}
              onChange={inputHandle}
    
            />
            <Input
              placeholder="Note Content"
              name="content"
              value={formData.content}
              onChange={inputHandle}
            />
            <Input
              placeholder="Add Tags"
              name="tags"
              value={formData.tags}
              onChange={inputHandle}
            />
          </div>
          <div className="mt-4 flex justify-end gap-3">
          
            <Button>Add Note</Button>
          </div>
         </form>
        </DialogContent>

</Dialog>
<CiLogout className='fixed bottom-6 right-6 text-4xl cursor-pointer bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-all '  onClick={handleLogout}  />
    
    </>
  );
}
