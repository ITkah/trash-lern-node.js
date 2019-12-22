const express = require('express');
const router = express.Router();
const app = express();
const jsonParser = express.json();

app.use(express.static("public"));

router.get('/', (req,res) => {
    res.sendFile('index.html');
});

app.post("/user", jsonParser, function (request, response) {
  console.log(request.body);
  if(!request.body) return response.sendStatus(400);
   
  response.json(request.body); // отправляем пришедший ответ обратно
});

// app.get("/", function(request, response){
//   response.sendFile(__dirname + "/public");
// });


app.use('/', router);
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
