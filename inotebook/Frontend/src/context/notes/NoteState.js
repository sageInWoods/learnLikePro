import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  //   const s1 = {
  //     name: "ankit",
  //     age: 2,
  //   };

  // method to update the sate :=> usestate hook
  //   const [state,setState]=useState(s1);
  //   const update=()=>{
  //     setTimeout(()=>{
  //         setState({
  //             "name":"tikna",
  //             "age":3
  //         })
  //     },1000);
  //   }
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // get all notes
  const getNotes = async () => {
    // to do api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // add a note
  const addNote = async (title, description, tag) => {
    // to do api call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json,"adding a new note");
    // const note = {
    //   _id: "6592d5c4436e16566cer4736",
    //   user: "65918a217ddf928869d9d627",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2024-01-01T15:09:56.087Z",
    //   __v: 0,
    // };
    const note = json
    
    //concat returns an array whereas push updates an array
    setNotes(notes.concat(note));
  };
  //delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = response.json();
    console.log(json);
    console.log("deleting the note with id" + id);
    const newnotes = notes.filter((notes) => {
      return notes._id !== id;
    });
    setNotes(newnotes);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    // Api call

    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))
    // logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      setNotes(newNotes)
    }
  };
  return (
    // <NoteContext.Provider value={{state,update}}>{props.children}</NoteContext.Provider>
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
