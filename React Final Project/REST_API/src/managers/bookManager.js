const models = require("../models/allModels")
const {isOwnedByUser, isAdmin} = require("../managerUtils/managerUtil");


exports.getBook =async(bookId,userId)=>{
    const user = await models.userModel.findById(userId)
    if(user.role!=="admin"){
        await isOwnedByUser(userId,bookId,models.bookModel,"ownedBy")
    }
   return  models.bookModel.findById(bookId)

}
exports.getBookDetails =async(bookId)=>{
    let book
    try{
         book = models.bookModel.findById(bookId)
    }catch (error){
        throw new Error("No such book")
    }

    delete book.chapters
   return book

}
exports.getAllBooks =async()=>{
   return  models.bookModel.find()

}
exports.editBook =async(bookId,bookData,userId)=>{
   await isAdmin(null,userId)
   let book = await models.bookModel.findById(bookId)
    for (const object of Object.entries(bookData)) {
        book[object[0]] = object[1]
    }
   return book.save()
}
exports.deleteBook =async(bookId,userId)=>{
   await isAdmin(null,userId)
   return models.bookModel.findByIdAndDelete(bookId)
}
exports.createBook =async(bookData,userId)=>{
   await isAdmin(null,userId)
    return await models.bookModel.create(
       {
           ...bookData,
           ownedBy:[],
           chapters:[],
           length:0,
       }
       )


}