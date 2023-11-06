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
    length: Number,
    image:String
})


module.exports = mongoose.model("Book",schema)