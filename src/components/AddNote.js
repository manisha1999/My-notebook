import React ,{useContext, useState} from 'react'
import noteContext from "../context/notes/NoteContext";

const AddNote = () => {
    const context = useContext(noteContext);
  // eslint-disable-next-line
  const {addNote} = context;

  const [note,setNote] = useState({title :'',description:'',tag :''})
  const handleClick =(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
  }

  const onChange =(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
  return (
    
    <div>
        <h2>Add your notes</h2>
<div className="mb-3">
  <label htmlFor="title" className="form-label">Title</label>
  <input type="text" className="form-control" id="title" name='title' onChange={onChange}/>
</div>
<div className="mb-3">
  <label htmlFor="desc" className="form-label">Description</label>
  <input type="text" className="form-control" id="description" name='description' onChange={onChange}/>
</div>
<div className="mb-3">
  <label htmlFor="tag" className="form-label">Tag</label>
  <input type="tag" className="form-control" id="tag" name='tag' onChange={onChange}/>
</div>
<button type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
    </div>
  )
}

export default AddNote