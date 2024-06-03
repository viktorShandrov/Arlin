const express = require("express");
const router = require('../mainRouter');
const cors = require('cors');
const { auth } = require("../utils/authentication");
const utils = require("../utils/utils");
const bodyParser = require("body-parser");

exports.expressConfig = (app) => {

    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())

    const allowedOrigins = utils.FEdomains;

    // app.use(corsMiddleware)
    app.use(cors({
        origin: allowedOrigins,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // This allows cookies and authorization headers
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization','Access-Control-Allow-Origin' // Add the allowed headers here
    }));

    app.use(auth);
    app.use(router);
}