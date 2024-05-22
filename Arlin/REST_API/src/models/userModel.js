const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const {inventoryItems} = require("../utils/utils");



const schema = mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    classMembers:[
        {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                default:[]
        }
    ],
    email:String,
    password:{
        type:String,
    },
    role: {
        type: String,
        enum: ["admin", "user","teacher","student"],
        default: "student"
        //TODO to not be students when published for all users
    },
    plan:{
        type:String,
        enum:["none","basic","enthusiastic","professional"],
        default:"none"
    },
    planSubscriptionDate:{
        type:String,
        default:""
    },
    lastReading: {
        bookId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Book",
        },
        chapterId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Chapter",
        },
        default: {},
    },
    testCompleteCirclesCount:{
        type:Number,
        default:0
    },
    isPasswordHashed: {
        type: Boolean,
        default: false,
    },
    exp:{
        type:Number,
        default: 0
    },

    expMultiplier:{
        value:{
            type:Number,
            default: 1
        },
        dueTo:{
            type:Date,
            default: undefined
        }
    },
    imageURL:String,
    inventory:{
        type: Object,
        default: {}
    },
    advancements:[]


})

schema.virtual("repeatedPassword").set(function(value){
    if(this.password!==value){
        throw new Error("Passwords mismatch!")
    }
})
schema.pre("save",async function(){
    if(this.password&&!this.isPasswordHashed){
        this.password = await bcrypt.hash(this.password,3);
        this.isPasswordHashed = true
    }
})


module.exports = mongoose.model("User",schema)