const mongoose = require("mongoose")



const schema = mongoose.Schema({
    text:String,
    chapterName:String,
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book"
    }
})


module.exports = mongoose.model("Chapter",schema)