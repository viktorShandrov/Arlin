const express = require("express")
const {expressConfig} = require("./config/expressConfig.js");
const {mongodbConfig} = require("./config/MongoConfig.js");
const {port} = require("./utils/utils");
const {test} = require("./utils/test");

const server = express()


expressConfig(server)

mongodbConfig()
setTimeout(()=>{

    test()
},1000)


module.exports = server