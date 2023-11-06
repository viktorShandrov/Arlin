const models = require("../models/allModels")
const {isOwnedByUser, isAdmin} = require("../managerUtils/managerUtil");


exports.getAllWords =async(userId)=>{
   return  models.wordModel.find({unknownBy:userId})
}

exports.deleteWord =async(wordId,userId)=>{
   return models.bookModel.findByIdAndDelete(wordId)
}
exports.createWord =async(word,userId)=>{
    return await models.wordModel.create(
       {
           unknownBy:userId,
           word
       }
       )


}