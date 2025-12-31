const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// Rout 1 : get all notes  using:get "/api/auth/fetchallnotes" .  required login
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
        
    }catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
});

// Rout 2 : add new notes  using:post "/api/auth/addnote" .  required login
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 character").isLength({min: 5,}),
  ], async (req, res) => {
   try {
   
    const {title , description,tag}=req.body;
    // if they are errors,return bad request and error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const note=new Note({
title,description,tag,user: req.user.id
        })
      const savedNote=await  note.save()
    res.json(savedNote);
    
}catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
}
);
module.exports = router;
