const express = require('express');
let router = new(require('./Classes/Router'))();
const app = express();

Object.assign(global, { ROOT_DIR: __dirname });

(async() => {

    router = await router.init();

    app.use(express.static("public"));

    app.use('/', router);
    app.listen(3000, function() {
        console.log('Example app listening on port 3000!');
    });

})();