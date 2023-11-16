const mongoose = require("mongoose")



const schema = mongoose.Schema({
    ownedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    chapters:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chapter"
    }],
    name:String,
    length: Number,
    image:Buffer,
    author:String,
    resume:String,
    genre:String,
    releaseDate:Date
})


module.exports = mongoose.model("Book",schema)