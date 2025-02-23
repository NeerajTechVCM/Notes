const Note = require("../model/notes");

module.exports.addNote = async(req,res)=>{
    const { title,content,tags} = req.body;
    const user = req.user;
    console.log(user)
     if(!title || !content || !tags ){
        return res.json({
            success:false,
            message:"pls fill all Fields"
        })
     }
try {
     const note = new Note({
        title,
        content,
        tags:tags || [],
        userId:user.id,

     });

     await note.save();

     return res.json({
        success:true,
        note,
        message:'Note Created Successfully'
     })
} catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }

}




module.exports.getAllNotes = async(req,res)=>{
    
    const userId = req.user.id;
    console.log(userId)
   
try {
 const AllNotes =  await Note.find({userId:userId})

if(AllNotes){
    console.log(AllNotes)
     return res.json({
        success:true,
        AllNotes,
        message:'Note fetched Successfully'
     })
}
    
} catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }

}





module.exports.updateNote = async(req,res)=>{
    const {title,content,tags}=req.body;
   
    const {id:NoteId }= req.params;
  
    if (!title && !content && !tags) {
      return res.status(400).json({ message: 'No fields to update provided', success: false });
    }

   const updatenote={};
    if (title){
       updatenote.title = title;
    }
    if (content){
      updatenote.content = content;
    } 
    if (tags){
      updatenote.tags = tags;
    } 
  
    try {
      const updatedNotes = await Note.findByIdAndUpdate(NoteId, updatenote, { new: true });
      if (updatedNotes) {
        res.json({
          
          message: "Notes Updated",
          success: true
        });
      } else {
        res.json({
          msg: "An error occurred while updating profile",
          success: false
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }

}





module.exports.deleteNote = async(req,res)=>{
 
   
    const {id }= req.params;
 

    const Notes = await Note.findByIdAndDelete(id);
    return res.json({
 
          message: "Notes Deleted",
          success: true
        });
    

}





module.exports.searchNotes = async (req, res) => {
 
  const userId = req.user.id;
  const { query}=req.params; 
  console.log(query);

  if (!query) {
    return res.json({ message: "Please Enter some Data", success: false });
  }

  try {
   
    const Notes= await Note.find(  { $and: [ { userId:userId }, {tags: { $regex: query, $options: 'i' }} ] }).limit(10);
    console.log(Notes)
  
    if (Notes.length > 0) {
      res.json({
        Notes,
        message: "Notes found",
        success: true
      });
      
    } else {
      res.json({
        Notes:[],
        message: "Notes Not found",
        success: false
      });
      console.log("No Notes found");
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "An error occurred while searching notes",
      success: false
    });
  }
};
