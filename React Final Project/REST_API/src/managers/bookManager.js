const models = require("../models/allModels")
const {isOwnedByUser, isAdmin} = require("../managerUtils/managerUtil");
const mongoose = require("mongoose");
const {model} = require("mongoose");
const {storage} = require("../utils/firebase")


const  { v4 } = require("uuid") ;
const {
    ref,
    uploadBytes,
    getDownloadURL,
} = require("firebase/storage") ;


exports.getBook =async(bookId,userId)=>{
    const user = await models.userModel.findById(userId)
    if(user.role!=="admin"){
        await isOwnedByUser(userId,bookId,models.bookModel,"ownedBy")
    }
    const book = (await models.bookModel.findById(bookId)).toObject()
    delete book.ownedBy
   return  book

}
exports.getBookDetails =async(bookId,userId)=>{
    let book
    try{
         book = await models.bookModel.findById(bookId)
    }catch (error){
        throw new Error("Няма такава книга")
    }
    book = book.toObject()

    delete book.chapters


    book.isBookOwnedByUser = isBookOwnedByUser(book,userId)
    book.similarBooks = await getSimilarBooks(book)
    book.similarBooks.splice(book.similarBooks.findIndex((currBook=>book._id===currBook._id)),1)

    delete book.ownedBy
    return book

}
exports.getBookForFree = async(userId,bookId)=>{
    const user = await models.userModel.findById(userId)
    if(!user.inventory.freeBook) throw new Error("Нямате достатъчно безплатни книги в инвентара")

    await exports.bookIsPurchased(userId,bookId)

    user.inventory.freeBook--

    if (user.isModified("inventory")) {
        user.markModified("inventory")
    }


    return user.save()
}
exports.writeReview = async (bookId,userId,stars,text)=>{
    const book = await models.bookModel.findById(bookId)
    const user = await models.userModel.findById(userId)

    if(!isBookOwnedByUser(book,userId)&&user.role!=="admin") throw new Error("Не притежавате книгата")

    if(!book.hasOwnProperty("reviews")) book.reviews = []

    if(book.reviews.some((review)=>review.writtenBy.equals(userId))) throw new Error("Вече сте оценили книгата")

    book.reviews.push({
        stars,
        text,
        writtenBy:userId
    })

    return book.save()
}


async function getSimilarBooks(book){
    const genre = book.genre
    return (await models.bookModel.find({genre}).limit(10)).map(book=>
    {
        book = book.toObject()
        delete book.chapters
        return book
    })
}
function isBookOwnedByUser(book,userId){
    return book.ownedBy.some(id=>id.toString()===userId.toString())
}





exports.getAllBooks =async(userId)=>{
    const books =await models.bookModel.find()
    const payload =[]
    for (let book of books) {
        book = book.toObject()
        book.isBookOwnedByUser = isBookOwnedByUser(book,userId)
        delete book.ownedBy
        payload.push(book)
    }
   return  payload

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
    const uploadFile =async (bucketName,image) => {
        if (!image) throw new Error("No image uploaded");

        const allowedExtensions = {
            'image/jpeg': 'jpg',
            'image/png': 'png',
        };
        const  fileExtension = allowedExtensions[contentType]
        if(!fileExtension) throw new Error("File type not supported")

        // @ts-ignore
        const imageRef = ref(storage, `${bucketName}/${image.originalname + v4()}.${fileExtension}`);
        const snapshot = await uploadBytes(imageRef, image.buffer)
        const url = await getDownloadURL(snapshot.ref)
        return url
    };
exports.addImageToBook =async(bookId,userId,image)=>{
   await isAdmin(null,userId)

    const imageUrl = await uploadFile("images",image)

    const book = await models.bookModel.findById(bookId)
    book.image = imageUrl
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