const mongoose = require("mongoose")



const schema = mongoose.Schema({
    // unknownFor:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"User"
    // }],
    word:String,
    translatedText:String,
    examples: {
        type:[
            {
                sentenceWhereWordsIsPresent:String,
                translation:String
            }
        ],
        default: []
    },
    synonyms: {
        type: [String],
        default: []
    }

})


module.exports = mongoose.model("UnknownWord",schema)