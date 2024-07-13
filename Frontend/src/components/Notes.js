import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import {useNavigate} from 'react-router'

const Notes = (props) => {
   let memory = useNavigate() ;
   const {showalert} = props;
   const context = useContext(noteContext);
   const { notes, getNotes , editNote } = context;
   
   useEffect(() => {
      if(localStorage.getItem('token')){
          getNotes();
      }
      else{
         memory("/login")
      }
      // eslint-disable-next-line
   }, [])

   const ref = useRef(null)
   const refClose = useRef(null) 
   
   const [note, setNote] = useState({id: "", etitle:"", edescription:"", etag:""})

   const handleClick = (e)=>{
          console.log("Updating Note", note) 
          editNote(note.id , note.etitle, note.edescription, note.etag) ;
          props.showalert("Note Updated Successfully", "success") ;
          refClose.current.click() ;
   }

   const onChange = (e)=>{
       
       setNote({...note, [e.target.name]: e.target.value}) 
   }

   const updateNote = (currnote) => {
      ref.current.click();
      setNote({id: currnote._id, etitle: currnote.title, edescription : currnote.description , etag: currnote.tag})
   }


   return (
      <>
         <AddNote showalert={showalert}/>
         <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
         </button>
         <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="exampleModalLabel">Edit a Note</h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                     <form className='my-3'>
                        <div className="mb-3">
                           <label htmlFor="etitle" className="form-label">Title</label>
                           <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} minLength={5} required/>

                        </div>
                        <div className="mb-3">
                           <label htmlFor="edescription" className="form-label">Description</label>
                           <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} minLength={5} required/>
                        </div>
                        <div className="mb-3">
                           <label htmlFor="etag" className="form-label">Tag</label>
                           <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag}/>
                        </div>
                     </form>
                  </div>
                  <div className="modal-footer">
                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                     <button disabled={note.etitle.length<5 || note.edescription.length<5} ref={refClose} data-bs-dismiss="modal" onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                  </div>
               </div>
            </div>
         </div>
         <div className='row my-3'>
            <h2 > Your Notes </h2>
            <div className='container mx-2'>
            {notes.length===0 && 'No notes to display'}
            </div>
            {notes.length > 0 && notes.map((note) => {
               return <Noteitem showalert={showalert} key={note._id} updateNote={updateNote} note={note} />
            })}
         </div>
        

      </>
   )
}

export default Notes;
