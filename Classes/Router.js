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

        this.router.post("/userSend", jsonParser, async(req, res) => {
            let userData = false;

            let usersData = await new Promise((cb) => fs.readFile(`${ROOT_DIR}/user.json`, (err, data) => {
                cb(data.toString());
            }));

            console.log(usersData);

            JSON.parse(usersData).forEach((user) => userData = user.id === req.body.id ? user : userData);

            if (!req.body) return res.sendStatus(400);
            res.json(userData);

        });
        return this.router;
    }
}