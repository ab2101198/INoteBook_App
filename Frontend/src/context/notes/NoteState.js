import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = "https://inotebook-app-backend.onrender.com"
    const notesInitial = [] 

    const [notes, setNotes] = useState(notesInitial);
    
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token') 
            }// body data type must match "Content-Type" header
        });
      const json = await response.json(); // parses JSON response into native JavaScript objects
      console.log(json) ;
      setNotes(json);
    }     

    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token') 
            },
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        const note = await response.json(); // parses JSON response into native JavaScript objects
        setNotes(notes.concat(note));
    }

    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token') 
            }

        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json) ;
        const newNotes = notes.filter((note) => {return note._id !== id})
        setNotes(newNotes) 
    }

    const editNote = async (id, title, description, tag) => {
        //API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token') 
            },
            body: JSON.stringify({title, description , tag}) // body data type must match "Content-Type" header
        });
        const json = response.json(); // parses JSON response into native JavaScript objects
        console.log(json) 

        let newNotes = JSON.parse(JSON.stringify(notes)) 
        for (let index = 0; index < newNotes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break ;
            }
        }
        setNotes(newNotes) ;

    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}



export default NoteState 
