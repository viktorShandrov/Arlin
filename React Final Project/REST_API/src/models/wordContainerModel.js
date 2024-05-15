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
        answeredRightCount:{
            type:Number,
            default: 0
        },
        lastTimeGivenOnTest:Date,
        addedOn:{
            type:Date,
            default: new Date()
        },
        status:{
            type:String,
            enum:['known','hard'],
            default:"hard"
        }

    }],
    colorCode:String,
    name:String,
    type:{
        type:String,
        enum:['unspecified','forUnknownWordsCircle','custom'],
        default:"custom"
    }

})


module.exports = mongoose.model("UnknownWordContainer",schema)