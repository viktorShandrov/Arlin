const models = require("../models/allModels")
const {isOwnedByUser, isAdmin} = require("../managerUtils/managerUtil");


exports.getBook =async(bookId,userId)=>{
   await isOwnedByUser(userId,bookId,models.bookModel,"ownedBy")
   return  models.bookModel.findById(bookId)

}
exports.getAllBooks =async()=>{
   return  models.bookModel.find()

}
exports.editBook =async(bookId,bookName,image,userId)=>{
   await isAdmin(null,userId)
   let book = await models.bookModel.findById(bookId)
    book.name = name
    book.image = image
   return book.save()
}
exports.deleteBook =async(bookId,userId)=>{
   await isAdmin(null,userId)
   return models.bookModel.findByIdAndDelete(bookId)
}
exports.createBook =async(bookName,image,userId)=>{
   await isAdmin(null,userId)
    return await models.bookModel.create(
       {
           ownedBy:[],
           chapters:[],
           length:0,
           image
       }
       )


}