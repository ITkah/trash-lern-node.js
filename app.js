const express = require('express');
var router = require('./router');
const app = express();
const jsonParser = express.json();

app.use(express.static("public"));

app.post("/userSend", jsonParser, function (request, response) {
  if(!request.body) return response.sendStatus(400);
  response.json(request.body); 
});

app.use('/', router);
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
