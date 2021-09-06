// Add required modules
const express = require("express");
const path = require("path");

// Create server application at port 3001 (localhost)
const app = express();
const PORT = process.env.PORT || 3001;

// Read JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Include js files
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Use public folder
app.use(express.static("public"));

// Add listener (localhost 3001)
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});