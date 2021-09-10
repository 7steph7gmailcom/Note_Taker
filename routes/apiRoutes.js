const fs = require("fs");
const notesData = require("../routes/apiRoutes.js");


module.exports = function(app){

    function writeTodataBase(notes){

    notes = JSON.stringify(notes);
     console.log (notes);
    fs.writeFileSync("./db/db.json", notes, function(err){
    if (err) {
        return console.log(error);
        }
    });
}

// GET Method to return "Notes"
app.get("/api/notes", function(req, res){
        res.json(notesData);
    });


// POST Method to add "Notes"
app.post("/api/notes", function(req, res){

        if (notesData.length == 0){
            req.body.id = "0";
        } else{
            req.body.id = JSON.stringify(JSON.parse(notesData[notesData.length - 1].id) + 1);
        }
        console.log("req.body.id: " + req.body.id);
    
    notesData.push(req.body);

    writeTodataBase(notesData);
    console.log(notesData);

    res.json(req.body);
});
}
