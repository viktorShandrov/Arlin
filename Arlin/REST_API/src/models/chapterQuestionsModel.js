const mongoose = require("mongoose")



const schema = mongoose.Schema({
    chapterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chapter"
    },
    question:String,
    possibleAnswers:[
        {
           option:String,
            isCorrect:Boolean
        }
    ],
})


module.exports = mongoose.model("ChapterQuestion",schema)