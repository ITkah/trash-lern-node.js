const express = require('express');
const router = require('./Classes/Router');
const app = express();
const fs = require('fs');
const path = require('path');
const jsonParser = express.json();

app.use(express.static("public"));

app.post("/post/userUpdate", jsonParser, function (request, response) {
   console.log(request.body);
   if(!request.body) return response.sendStatus(400);
    
   response.json(request.body); // отправляем пришедший ответ обратно
});

app.get('/get/users', function (req, res) {
     let reqPath = path.join('./user.json');
     fs.readFile(reqPath , 'utf8', function (err, data) {
        if(data) {
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