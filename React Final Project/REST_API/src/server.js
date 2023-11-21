const express = require("express")
const {expressConfig} = require("./config/expressConfig");
const {mongodbConfig} = require("./config/MongoConfig");
const {port} = require("./utils/utils");
const {test} = require("./utils/test");

const server = express()


expressConfig(server)

mongodbConfig()
setTimeout(()=>{

test()
},1000)
server.listen(port,()=>{
    console.log("Server is listening on port " + port)
})