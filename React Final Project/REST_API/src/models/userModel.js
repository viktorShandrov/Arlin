const mongoose = require("mongoose")
const bcrypt = require("bcrypt")



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
    isPasswordHashed: {
        type: Boolean,
        default: false,
    }
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