const express = require('express');
const router = require('./Classes/Router');
const app = express();
const fs = require('fs');
const path = require('path');
const jsonFile = path.join('./user.json');
const jsonParser = express.json();

app.use(express.static("public"));

app.get('/get/users', function (req, res) {
   
   fs.readFile(jsonFile, 'utf8', function (err, data) {
      if (data) {
         let users = JSON.parse(data);
         res.send(users);
      } else {
         res.send("Error: " + err);
      }
   });

});

app.post("/post/userNew", jsonParser, function (req, res) {

   if (!req.body) return res.sendStatus(400);

   let nameUser = req.body.name;
   let ageUser = req.body.age;
   let priceUser = req.body.price;
   let user = {
      name: nameUser,
      age: ageUser,
      price: priceUser
   };

   let data = fs.readFileSync(jsonFile, "utf8");

   let users = JSON.parse(data);
   let id = Math.max.apply(Math,users.map(function(o){return o.id;}))
   user.id = id ++;
   users.push(user);

   data = JSON.stringify(users);
   fs.writeFileSync(jsonFile, data);
   res.send(user);
});

app.post("/post/deleteUser", jsonParser, function (req, res) {

   if(!req.body) return res.sendStatus(400);

   let id = req.body.id;
   let data = fs.readFileSync(jsonFile, "utf8");
   let users = JSON.parse(data);

   let index = -1;

   for(let i = 0; i < users.length; i++){
      if(users[i].id == id){
         index = i;
         break;
      }
   }

   if(index > -1){
      let user = users.splice(index, 1)[0];
      data = JSON.stringify(users);
      fs.writeFileSync(jsonFile, data);
      res.send(user);
   } else {
      res.status(404).send();
   }
     
});

app.use('/', router);
app.listen(3000, function () {
   console.log('Example app listening on port 3000!');
});