const express = require("express");
const router = require('../mainRouter');
const cors = require('cors');
const { auth } = require("../utils/authentication");
const utils = require("../utils/utils");
const bodyParser = require("body-parser");

exports.expressConfig = (app) => {

    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())

    const corsOptions = {
        origin: (origin, callback) => {
            if (utils.isAllowedOrigin(origin)) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin'
    };

    app.use(cors(corsOptions));
    app.options('*', cors(corsOptions));

    app.use(auth);
    app.use('/api', router);
    app.use(router);
}