const mongoose = require("mongoose")



const schema = mongoose.Schema({
    ownedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    chapters:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chapter"
    }],
    wishedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    name:String,
    price:Number,
    length: Number,
    image:String,
    author:String,
    resume:String,
    genre:String,
    stripeProductId:String,
    releaseDate:Date,
    rating:{
        type:Number,
        default: 0
    },
    isRecommended:{
        type:Boolean,
        default:false
    },
    reviews:[
        {
            stars:Number,
            text:{
                type:String,
                default:""
            },
            writtenBy:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            likedBy:[
                {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"User",
                    default:[]
                }
            ]
        }
    ]
})


module.exports = mongoose.model("Book",schema)