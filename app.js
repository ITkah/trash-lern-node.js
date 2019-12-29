const express = require('express');
const router = require('./Classes/Router');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.static("public"));

app.get('/get/users', function (req, res) {
     let reqPath = path.join('./user.json');
     fs.readFile(reqPath , 'utf8', function (err, data) {
        if(data) {
           console.log("Success" + data);
           let users = JSON.parse(data);
           res.send(users);
         } else {
            res.send("Error: " + err )
         }
    });
 });

app.use('/', router);
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});