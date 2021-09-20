// Add required modules
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("./helpers/uuid");
const util = require("util");
// const noteData = require("./db/db.json");
const readFromFile = util.promisify(fs.readFile);

// Create server application at port 3001 (localhost)
const PORT = process.env.PORT || 3001;

// Read JSON (middleware)
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
// app.use(routes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/api/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/api/notes.html"))
});

app.get("/api/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

const writeToFile = (destination, note) => {
    fs.writeFile(destination, JSON.stringify(note, null, 4), (err) =>
        err ? console.error(err) : console.info("Notes Updated")
      );
    };

const append = (content, file) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
          throw err;
        } else {
          const note = JSON.parse(data);
          note.push(content);
          writeToFile(file, note);
        }
      });
    };

app.post("/api/notes", (req, res) => {
  
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
   };
    append(newNote, "./db/db.json");
    
    const response = {
     status: "Note Posted!",
     body: newNote,
   };
   res.status(201).json(response);
 } else {
   res.status(500).json("Error with note posting!");
 }
});


// Add listener (localhost 3001)
app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
})

