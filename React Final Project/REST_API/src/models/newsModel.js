const mongoose = require("mongoose")
const bcrypt = require("bcrypt")



const schema = mongoose.Schema({
    source:{
        name:String
    },
    title:String,
    description:String,
    urlToImage:String,
    publishedAt:String,
    content:String,
    category:String
})




module.exports = mongoose.model("News",schema)