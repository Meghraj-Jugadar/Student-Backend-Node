const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/users');

module.exports = ()=>{
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(usersRouter);
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    return app;
};
