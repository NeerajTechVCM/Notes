const express = require('express');
const mongoose = require('mongoose');

const app = express();
const AuthRouter = require('./controller/user-controller');
const NoteRouter = require('./controller/notes-controller');
const authMiddleware = require('./middleware/authentication');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path=require("path");
if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
  }
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      origin: "http://localhost:5173",
    
      credentials: true,
    })
  );
app.post('/register',AuthRouter.register)
app.post('/login',AuthRouter.login)
app.post('/logout',AuthRouter.logoutUser)
app.post('/addNote',authMiddleware.authMiddleware,NoteRouter.addNote)
app.get('/getAllNotes',authMiddleware.authMiddleware,NoteRouter.getAllNotes)
app.put('/updateNote/:id',authMiddleware.authMiddleware,NoteRouter.updateNote)
app.delete('/deleteNote/:id',authMiddleware.authMiddleware,NoteRouter.deleteNote)
app.get("/search/:query",authMiddleware.authMiddleware,NoteRouter.searchNotes);

if(process.env.NODE_ENV==="production"){
  const dirPath=path.resolve();
    app.use(express.static(path.join(dirPath,'./client/dist')));
    app.get("*",(req,res)=>{
      res.sendFile(path.resolve(dirPath,'client','dist','index.html'));
    })
  }


mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Mongodb Connected"))
.catch((error)=>console.log(error))

app.listen(process.env.PORT,()=>{
    console.log("server listening to port 8080");
})