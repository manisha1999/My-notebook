import React, { useState } from "react";
// import React from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial =[]
  const [notes, setNotes] = useState(notesinitial)
  //get all note
  const getNotes = async () => {
    const response = await fetch(`${host}/api/Notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    
    });
    const json = await response.json();
    
    setNotes(json);
  }
 

  //Add note
  const addNote = async (title, description, tag) => {
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/Notes/addnote`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // const note=await response.json();
    const note =  {
      "_id": "62cd510a848d594e10a2005c",
      "user": "62c85b5ad478e32197bf4e8b",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-07-12T10:46:34.027Z",
      "__v": 0
    }
    
    setNotes(notes.concat(note));
  };
  //edit note

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/Notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // eslint-disable-next-line
    const json=await response.json();
    // console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  };
  //Delete note
  const deleteNote =async (id) => {
    const response = await fetch(`${host}/api/Notes/deletenote/${id}`, {

      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      
    });
    const json=await response.json();
    console.log(json);
    console.log("Delete note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // const s1 ={
  //     "name" : "Harry",
  //     "class":"5b"
  // }
  // const [state,setState] = useState(s1);
  // const update = () => {
  //     setTimeout(() => {

  //         setState({
  //             "name" : "Larry",

  //             "class" : "10b"
  //         })
  //     }, 1000);
  // }
  
  return (
    // <NoteContext.Provider value={{state:state , update: update}}>{props.children}</NoteContext.Provider>
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote,getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
