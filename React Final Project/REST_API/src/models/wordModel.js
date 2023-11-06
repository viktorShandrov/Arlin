const mongoose = require("mongoose")



const schema = mongoose.Schema({
    unknownBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    word:String,
})


module.exports = mongoose.model("UnknownWord",schema)