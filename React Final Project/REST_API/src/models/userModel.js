const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const {inventoryItems} = require("../utils/utils");



const schema = mongoose.Schema({
    username:{
        type:String,
    },
    email:String,
    password:{
        type:String,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    randomWordsTests: {
        type:Number,
        default: 0
    },
    wordsFromChapterTests: {
        type:Number,
        default: 0
    },
    chapterPlotTests: {
        type:Number,
        default: 0
    },
    knownWords: {
        type:Number,
        default: 0
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
    isPasswordHashed: {
        type: Boolean,
        default: false,
    },
    exp:Number,
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