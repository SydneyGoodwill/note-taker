var fs = require("fs");

var dataBase = require("../db/db.json");

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        fs.readFile(__dirname + "/../db/db.json", "utf8", function(error, data) {
            if (error) {
                return console.log(error);
              }
            
              res.json(JSON.parse(data));
              console.log(JSON.parse(data));
        });
    });

    app.post("/api/notes", function(req, res) {

        var newNote = req.body
        newNote.id = Date.now()


             var dataArray = JSON.parse(fs.readFileSync(__dirname + "/../db/db.json"));
             dataArray.push(newNote)
             console.log(dataArray);
        //     console.log(req.body);
            fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(dataArray), function(error) {
                if (error) {
                    return console.log(error);
                }
                res.json(newNote);
            })
    });
    

    

    app.delete("/api/notes/:id", function(req, res) {
        fs.readFile(__dirname + "/../db/db.json", "utf8", function(error, data) {
            if (error) {
                return console.log(error);
            }

            fs.unlink(__dirname + "/../db/db.json", function(error) {
                if(error) return console.log(error);
                console.log("File deleted successfully");
            })
        });
    })
}