const express = require('express');
const app = express();
const path = require('path');
const jsonParser = express.json();
const router = require('./Classes/Router');
const users = new(require('./Classes/Users'))({
    conf: {
        users: {
            path: path.join('./user.json'),
            type: 'file'
        }
    }
});

app.use(express.static("public"));

app.get('/user', function(req, res) {

    res.send(users.getUsers());

});

app.post('/user', jsonParser, function(req, res) {

    const user = {
        id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        price: req.body.price
    };

    const usersData = users.getUsers();
    let id = Math.max.apply(Math, usersData.map((o) => o.id));

    usersData.length >= 1 ? user.id = id + 1 : user.id = 1;

    usersData.push(user);

    res.send(users.updateUsers(usersData));
});


app.post('/user/upgrade', jsonParser, function(req, res) {

    let user = {
        id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        price: req.body.price
    };

    const usersData = users.getUsers();

    for (var i = 1; i < usersData.length; i++) {
        if (usersData[i].id == user.id) {
            user = usersData[i];

            // usersData.name = user.name;
            // usersData.age = user.age;
            // usersData.price = user.price;

            break;
        }
    }

});


app.post('/user/delete', jsonParser, function(req, res) {

    let id = req.body.id;

    const usersData = users.getUsers();

    let index = -1;

    for (let i = 0; i < usersData.length; i++) {
        usersData[i].id === id && (index = i);
    }

    if (index > -1) {
        usersData.splice(index, 1)[0];
        res.send(users.updateUsers(usersData));
    } else {
        res.status(404).send();
    }

});

app.use('/', router);
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});