const express = require('express');
const router = express.Router();
var fetchuser =require('../middleware/fetchuser');
const Note  = require('../models/Notes');

const {body,validationResult} = require('express-validator');
//ROUTE 1 : get all the notes using :GET "/api/auth/fetchallnotes" .Login required
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
 try {
  
  const notes = await Note.find({user:req.user.id});
  res.json(notes)

} catch (error) {
  console.error(error.message);
res.status(500).send("Internal server error");
}
})
//ROUTE 2 : get all the notes using :GET "/api/auth/addnotes" .Login required
router.post('/addnote',fetchuser,[
  body('title','Enter a valid title').isLength({min:3}),
  body('description','Description must be atleast five characters').isLength({min:5}),
],async(req,res)=>{
  try{

   const {title, description, tag } = req.body;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors :errors.array()});
  }
  const note = new Note({
    title, description, tag, user : req.user.id
  })
  const savedNote =await note.save();
  res.json(savedNote)
}
catch(error){
  console.error(error.message);
res.status(500).send("Internal server error");
}
})




//ROUTE 3 : update the notes using :PUT "/api/auth/updatenotes" .Login required
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
  const {title,description,tag} = req.body;
try {
  
  //Create a newNote object
  const newNote = {};
  if(title){
    newNote.title=title
  };
  if(description){
    newNote.description=description
  };
  if(tag){
    newNote.tag=tag
  };
  let note = await Note.findById(req.params.id);
  if(!note){
    res.status(404).send("Not Found")
  }
  if(note.user.toString()!= req.user.id){
    return res.status(401).send("Not Allowed");
  }
  note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
  res.json({note});
} catch (error) {
  console.error(error.message);
res.status(500).send("Internal server error");
}
})



//ROUTE 4 : delete notes using :DELETE "/api/auth/updatenotes" .Login required
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
  const {title,description,tag} = req.body;
try {
  

  //Find the note and delete it
 
  let note = await Note.findById(req.params.id);
  if(!note){
    res.status(404).send("Not Found")
  }

  //allow deletion only if user owns this note
  if(note.user.toString()!= req.user.id){
    return res.status(401).send("Not Allowed");
  }
  note = await Note.findByIdAndDelete(req.params.id)
  res.json({"Suceess":"Note has been deleted",note :note});
} catch (error) {
  console.error(error.message);
res.status(500).send("Internal server error");
}
})
module.exports = router


















