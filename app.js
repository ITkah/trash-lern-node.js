const express = require('express');
const router = require('./Classes/Router');
const app = express();
const fs = require('fs');
const path = require('path');
const jsonFile = path.join('./user.json');
const jsonParser = express.json();

app.use(express.static("public"));

// app.post("/post/userUpdate", jsonParser, function (request, response) {
//    console.log(request.body);
//    if(!request.body) return response.sendStatus(400);
    
//    response.json(request.body); 
// });

app.post("/post/userNew", jsonParser, function (req, res) {

   if(!req.body) return res.sendStatus(400);

   fs.readFile(jsonFile , 'utf8', function (err, data) {
      if(data) {          
            var nameUser = req.body.name;
            var ageUser = req.body.age;
            var priceUser = req.body.price;
            var user = {name: nameUser, age: ageUser, price: priceUser};
            
            var data = fs.readFileSync(jsonFile, "utf8");
            var users = JSON.parse(data);
            
            // находим максимальный id
            var id = Math.max.apply(Math,users.map(function(o){return o.id;}))
            // увеличиваем его на единицу
            user.id = id + 1;
            // добавляем пользователя в массив
            users.push(user);
            var data = JSON.stringify(users);
            // перезаписываем файл с новыми данными
            fs.writeFileSync(jsonFile, data);
            res.send(data);
         } else {
            res.send("Error: " + err )
         }
   });

});

app.get('/get/users', function (req, res) {
      fs.readFile(jsonFile , 'utf8', function (err, data) {
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