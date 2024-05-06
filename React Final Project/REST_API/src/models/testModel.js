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
    isPersonalExercise:Boolean,
    isDone:Boolean,
    submissions:[
        {
            submittedBy:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            score:Number,
            answers:

        }
    ]


})


module.exports = mongoose.model("Test",schema)