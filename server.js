// Add required modules
const express = require("express");
const path = require("path");
const fs = require("fs");
// const notesData = require("./routes/apiRoutes");
// const notesTaken = require("./routes/htmlRoutes");
// const {_dirname } = require("path");


// Create server application at port 3001 (localhost)
// const routes = routes('./routes');

const PORT = process.env.PORT || 3001;

// Read JSON (middleware)
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use(express.static(path.join(_dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(routes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  });
  
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html")),
);

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


// Include js files
// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

// app.use("/api", notesData)
// app.use("/", notesTaken)
// // Use public folder
// app.use(express.static("public"));

// Add listener (localhost 3001)
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
})





