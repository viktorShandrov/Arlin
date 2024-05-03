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

        }
    ],
    score:Number,
    isExercise:Boolean,
    isDone:Boolean

})


module.exports = mongoose.model("Test",schema)