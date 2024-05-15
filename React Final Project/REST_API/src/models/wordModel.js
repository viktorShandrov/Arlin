const mongoose = require("mongoose")



const schema = mongoose.Schema({
    // unknownFor:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"User"
    // }],
    word:String,
    translatedText:String,
    examples:[{
        sentenceWhereWordsIsPresent:String,
        translation:String
    }],
    synonyms: {
        type: [String],
        default: []
    }

})


module.exports = mongoose.model("UnknownWord",schema)