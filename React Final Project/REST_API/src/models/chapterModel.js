const mongoose = require("mongoose")



const schema = mongoose.Schema({
    text:String,
    chapterName:String,
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book"
    },
    isFree:{
        type:Boolean,
        default:false
    }
})


module.exports = mongoose.model("Chapter",schema)