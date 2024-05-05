const mongoose = require("mongoose")


const schema = mongoose.Schema({
    madeBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    questions:[
        {
            question:String,
            testType:String,
            possibleAnswers:[
                {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"UnknownWord"
                }
            ],
            rightAnswer:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"UnknownWord",
            },
            wrongAnswer:{
                wordId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"UnknownWord",
                    default: null
                },
                stringValue:{
                    type:String,
                    default: null
                }
            },
            time:Number

        }
    ],
    score:Number,
    isExercise:Boolean,
    isDone:Boolean

})


module.exports = mongoose.model("Test",schema)