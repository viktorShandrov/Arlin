const mongoose = require("mongoose")
const bcrypt = require("bcrypt")



const schema = mongoose.Schema({
    idFromSource:String,
    keywords: {
        type: [String],
        default: undefined,
    },
    title:String,
    description:String,
    urlToImage:String,
    publishedAt:String,
    content:String,
    category:String
})




module.exports = mongoose.model("News",schema)