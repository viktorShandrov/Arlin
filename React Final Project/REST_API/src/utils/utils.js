const jwt = require("jsonwebtoken")
const util = require('util');
const path = require("path");
exports.sign = util.promisify(jwt.sign)
exports.verify = util.promisify(jwt.verify)


exports.port = 3000
exports.secret = "kjsdhgLKJGHDLKJGHkljhlkjhh43iu4h8osioduhfis"
exports.FEdomain = "http://localhost:4200"

