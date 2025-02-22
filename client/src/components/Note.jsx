import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
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
  import { CiEdit } from "react-icons/ci";
  import { MdDeleteOutline } from "react-icons/md";
export default function Note({note}) {
  const [formData, setFormData] = useState({
    title: "",
      content: "",
      tags: ""
    });
  function inputHandle(event) {
    const a = event.target.name;
    const b = event.target.value;
    setFormData(() => {
      return {
        ...formData, [a]: b,
      }

    })
  
  }
  const handleSubmit = async(event)=>{
    event.preventDefault();
    const result=await fetch(`/updateNote/${note._id}`,{
     method:"PUT",
     headers:{
         "Content-Type":'application/json'
     },
     body:JSON.stringify(formData),
     credentials: 'include',
 });
 const data=await result.json();
 console.log(data);
 if(data.success){
  window.location.reload();
}
 setFormData({
 title:"",
   content: "",
   tags: "",
 })
  }
  const handleDeleteNote = async()=>{
    const result=await fetch(`/deleteNote/${note._id}`,{
      method:"DELETE",
      headers:{
          "Content-Type":'application/json'
      },
   
      credentials: 'include',
  });
  const data=await result.json();
  console.log(data);
  if(data.success){
    window.location.reload();
  }
  }
  return (
    <Card className={'lg:w-[30%]  md:w-[40%] w-full '}>
  <CardHeader>
    <CardTitle>{note.title}</CardTitle>

  </CardHeader>
  <CardContent>
    <p>{new Date(note.createdOn).toLocaleString()}</p>
    <p style={{ wordWrap: "break-word", overflowWrap: "break-word", whiteSpace: "pre-wrap" }}>{note.content}</p>

  </CardContent>
  <CardFooter className={'flex justify-between'} style={{ wordWrap: "break-word", overflowWrap: "break-word", whiteSpace: "pre-wrap" }}>
    <p>{note.tags}</p>
<div className='space-x-3 flex'> 


     <Dialog>
  <DialogTrigger >
    
  <CiEdit style={{fontSize:"25px"}} />
  </DialogTrigger>
  <DialogContent>
         <form onSubmit={handleSubmit}>
         <DialogHeader>
            <DialogTitle>Edit A Note</DialogTitle>
            <DialogDescription>
              Please enter the title or  content for update your note.
            </DialogDescription>
            <br />
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder={note.title}
              name="title"
              value={formData.title}
              onChange={inputHandle}
    
            />
            <Input
              placeholder={note.content}
              name="content"
              value={formData.content}
              onChange={inputHandle}
            />
            <Input
              placeholder={note.tags}
              name="tags"
              value={formData.tags}
              onChange={inputHandle}
            />
          </div>
          <div className="mt-4 flex justify-end gap-3">
          
            <Button>Edit Note</Button>
          </div>
         </form>
        </DialogContent>

</Dialog>

<MdDeleteOutline style={{fontSize:"25px"}}  className='cursor-pointer' onClick={handleDeleteNote} /></div>
  </CardFooter>
</Card>

  )
}
