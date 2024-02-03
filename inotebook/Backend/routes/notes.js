const express = require("express");
const router = express.Router();
var fetchuser = require("../middleWare/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1 :get all notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).send("internal server error");
  }
});

// Route 2 :adding new notes using post =>login req
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "enter a valid description").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      // destructuring
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      res.status(500).send("internal server error");
    }
  }
);
// Route 3 :update notes using post =>login req
router.put(
  "/updatenotes/:id",
  fetchuser,
  async (req, res) => {
    try {
      // destructuring
      const { title, description, tag } = req.body;
     
      const newnote = {};
      if(title){newnote.title=title}
      if(description){newnote.description=description}
      if(tag){newnote.tag=tag}
      
      //find the note to be updated 
      let note= await Notes.findById(req.params.id)
      if(!note){return res.status(404).send("not found")}
      if(note.user.toString()!==req.user.id){
        return res.status(401).send("not allowed");
      }
      note =await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
      res.json({note})
    //   const note=Notes.findByIdAndUpdate()
    } catch (error) {
      res.status(500).send("internal server error");
    }
  }
);

// Route 4 : delete notes 
router.delete(
  "/deletenotes/:id",
  fetchuser,
  async (req, res) => {
    try {
      
      //find the note to be deleted and delete it
      let note= await Notes.findById(req.params.id)
      if(!note){return res.status(404).send("not found")}
      // allow deletion only if user owns the notes
      if(note.user.toString()!==req.user.id){
        return res.status(401).send("not allowed");
      }
      note =await Notes.findByIdAndDelete(req.params.id);
      res.json({"success":"note deleted successfully",note})
    //   const note=Notes.findByIdAndUpdate()
    } catch (error) {
      res.status(500).send("internal server error");
    }
  }
);

module.exports = router;
