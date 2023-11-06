const express = require("express")
const {expressConfig} = require("./config/expressConfig");
const {mongodbConfig} = require("./config/MongoConfig");
const {port} = require("./utils/utils");

const server = express()


expressConfig(server)

mongodbConfig()


server.listen(port,()=>{
    console.log("Server is listening on port " + port)
})