const mongoose = require("mongoose")


const schema = mongoose.Schema({
    isDraft:{
        type:Boolean,
        default:true
    },
    title:{
        type:String,
        default: "Arlin упражнение"
    },
    startTime:String,
    endTime:String,
    date:Date,
    madeBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    questions:[
        {
            testType:String,
            question:{
                elementId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"UnknownWord"
                },
                stringValue:String
            },
            possibleAnswers:[
                {
                    elementId:{
                        type:mongoose.Schema.Types.ObjectId,
                        ref:"UnknownWord"
                    },
                    stringValue:String
                }
            ],
            rightAnswerIndex:Number,
        }
    ],
    isPersonalExercise:Boolean,
    submissions:[
        {
            submittedBy:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            score:{
                type:Number,
                default:0
            },
            answers:[
                {
                    answerIndex:Number,
                    time:Number
                }
            ]
        }
    ]


})


module.exports = mongoose.model("Test",schema)