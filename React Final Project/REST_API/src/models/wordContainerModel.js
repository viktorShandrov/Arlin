const mongoose = require("mongoose")



const schema = mongoose.Schema({
    ownedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    words:[{
        wordRef:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"UnknownWord"
        },
        isKnown:{
            type:Boolean,
            default: false
        }

    }],
    colorCode:String,
    name:String,
    type:{
        type:String,
        enum:['systemGenerated','custom'],
        default:"custom"
    }

})


module.exports = mongoose.model("UnknownWordContainer",schema)