const mongoose = require("mongoose")



const schema = mongoose.Schema({
    chapterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chapter"
    },
    rightAnswerIndex:Number,
    answers:[
        {
            type: String
        }
    ],
})


module.exports = mongoose.model("ChapterQuestion",schema)