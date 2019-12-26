const express = require('express');
const router = express.Router();
const jsonParser = express.json();
const fs = require('fs');

module.exports = class Router {
    async init() {
        this.router = router;

        this.router.get('/', (req, res) => {
            res.sendFile('index.html');
        });

        this.router.post("/userSend", jsonParser, async(reg, res) => {
            let userData = false;

            const usersData = await new Promise((cb) => fs.readFile('./user.json', cb));

            console.log(usersData);

            JSON.parse(usersData).forEach((user) => userData = user.id === req.body.id ? user : userData);

            if (!reg.body) return res.sendStatus(400);
            res.json(reg.body);

        });
        return this.router;
    }
}