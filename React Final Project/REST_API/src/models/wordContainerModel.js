const mongoose = require("mongoose")



const schema = mongoose.Schema({
    ownedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    words:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UnknownWord"
    }],
    colorCode:String,
    name:String,

})


module.exports = mongoose.model("UnknownWordContainer",schema)