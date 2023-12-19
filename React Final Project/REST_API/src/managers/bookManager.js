const models = require("../models/allModels")
const {isOwnedByUser, isAdmin} = require("../managerUtils/managerUtil");
const mongoose = require("mongoose");


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
         book = await models.bookModel.findById(bookId)
            delete book.image
    }catch (error){
        throw new Error("No such book")
    }

    delete book.chapters
   return book

}
exports.getAllBooks =async()=>{
   return  models.bookModel.find().select("-image")

}
exports.editBook =async(bookId,bookData,userId)=>{
   await isAdmin(null,userId)
   let book = await models.bookModel.findById(bookId)
    for (const object of Object.entries(bookData)) {
        book[object[0]] = object[1]
    }
   return book.save()
}
exports.bookIsPurchased =async (userId,bookId)=>{
    const book = await models.bookModel.findById(bookId)
    if(!book.ownedBy.some((el)=>el.equals(userId))){
        book.ownedBy.push(userId)
    }
    return book.save()
}
exports.deleteBook =async(bookId,userId)=>{
   await isAdmin(null,userId)
   await deleteBookChapters(bookId)
   return models.bookModel.findByIdAndDelete(bookId)
}
async function deleteBookChapters(bookId){
    const chapters = await models.chapterModel.find({bookId})
    for (const chapter of chapters) {
        console.log(chapter)
        await chapter.delete()
    }
}
exports.addImageToBook =async(bookId,userId,image)=>{
   await isAdmin(null,userId)
    const book = await models.bookModel.findById(bookId)
    book.image = image
   return book.save()
}
exports.getFilteringData =async(userId)=>{
    const authors = new Set()
    const genres =new Set()
    const books = await models.bookModel.find({})
    for (const book of books) {
        authors.add(book.author)
        genres.add(book.genre)
    }
    return {
        authors:[...authors],
        genres:[...genres]
    }
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