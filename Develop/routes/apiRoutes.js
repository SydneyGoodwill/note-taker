var fs = require("fs");

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        fs.readFile(__dirname + "/../db/db.json", "utf8", function(error, data) {
            if (error) {
                return console.log(error);
              }
            
              console.log(data);
              console.log(JSON.parse(data));
              res.json(JSON.parse(data));
        });
    });

    app.post("/api/notes", function(req, res) {
        fs.readFile(__dirname + "/../db/db.json", "utf8", function(error, data) {
            var dataArray = JSON.parse(data);
            dataArray.push(req.body)
            fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(dataArray), function(error) {
                if (error) {
                    return console.log(error);
                }
                res.json(dataArray);
            })
        })
    });
}