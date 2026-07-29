const express = require("express");
const { expressConfig } = require("./config/expressConfig.js");
const { mongodbConfig } = require("./config/MongoConfig.js");

const server = express();

server.use(async (req, res, next) => {
    try {
        await mongodbConfig();
        next();
    } catch (err) {
        console.error("Database connection error:", err);
        res.status(500).json({ message: "Database connection failed" });
    }
});

expressConfig(server);

module.exports = server;