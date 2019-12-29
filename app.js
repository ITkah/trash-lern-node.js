const express = require('express');
const router = require('./Classes/Router');
const app = express();
const fs = require('fs');
const jsonParser = express.json();

app.use(express.static("public"));

app.post("/userSend", jsonParser, function(request, response) {
    if (!request.body) return response.sendStatus(400);
    response.json(request.body);
});

app.get("/get", function(req, res) {
    if (req) {
        return response.sendStatus(400);
    } else {
        let obj;
        fs.readFile('user.json', 'utf8', function(err, data) {
            if (err) throw err;
            obj = JSON.parse(data);
        });
    }
});

app.use('/', router);
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});