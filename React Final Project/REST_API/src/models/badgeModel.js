const mongoose = require("mongoose")



const schema = mongoose.Schema({
    ownedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    imageURL:String,
    text:String

})


module.exports = mongoose.model("Badge",schema)