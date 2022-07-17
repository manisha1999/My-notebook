import React, { useContext, useEffect, useRef ,useState } from "react";
import { useHistory } from "react-router-dom";
import noteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(noteContext);
  let history= useHistory();
  const { notes, getNotes,editNote } = context;
  const refClose = useRef(null);
  const [note,setNote] = useState({id:"",etitle :'',edescription:"",etag :""})
  const handleClick =(e)=>{
    console.log("Upadting",note)
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
   
  }

  const onChange =(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
  useEffect(() => {
    if (localStorage.getItem('token')){
    getNotes();}
    else{
   history.push("/login")
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id : currentNote._id ,etitle : currentNote.title, edescription : currentNote.description,etag : currentNote.tag})
  };
  const ref = useRef(null);
  return (
    <>
      <div className="row my-3">
        
        <AddNote />
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="desc" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="tag"
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      onChange={onChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                ref={refClose}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary"  onClick={handleClick}>
                  Update note
                </button>
              </div>
            </div>
          </div>
        </div>

        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
