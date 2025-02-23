const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
   
  },
  tags: {
    type: String,
    required: true
  },
  isPinned: {
    type: Boolean,
    default: false
  },
 
  userId: {
    type: String,
    required: true
  },

 
},{timestamps:true});

const Note = mongoose.model('Note', notesSchema);

module.exports = Note;
