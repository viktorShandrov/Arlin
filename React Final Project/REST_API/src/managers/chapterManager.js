const models = require("../models/allModels")
const {isOwnedByUser, isAdmin} = require("../managerUtils/managerUtil");
const wordManager = require("./wordManager");

exports.getChapter =async(chapterId,userId)=>{
    const book = await models.bookModel.findOne({
        chapters: {
            $in: chapterId
        }
    });
    const currentChapterIndex = book.chapters.findIndex(el=>el.equals(chapterId))
       const previousChapterId = book.chapters[currentChapterIndex-1]
       const nextChapterId = book.chapters[currentChapterIndex+1]

    return{
        currentChapter:await models.chapterModel.findById(chapterId),
        previousChapterId,
        nextChapterId
    }

}
exports.editChapter =async(chapterId,bookId,text,userId)=>{
   await isAdmin(null,userId)
   const chapter = await models.chapterModel.findById(chapterId)
   chapter.bookId = bookId
   chapter.text = text
   return chapter.save()
}
exports.deleteChapter =async(chapterId,userId)=>{
   await isAdmin(null,userId)
    const chapter = await models.chapterModel.findById(chapterId)
    const book = await models.bookModel.findById(chapter.book)
    book.chapters.splice(book.chapters.findIndex(el=>el.equals(chapter._id)),1)
    await book.save()
   return models.chapterModel.findByIdAndDelete(chapterId)
}
exports.createChapter =async(bookId,text,userId,chapterName)=>{
   await isAdmin(null,userId)
   const chapter = await models.chapterModel.create(
       {
          book:bookId,
          text,
           chapterName
       }
       )
   const book = await models.bookModel.findById(bookId)
   book.chapters.push(chapter._id)
    book.length+=1
    // await wordManager.storeTestForChapter(chapter)
   return book.save()
}
exports.createChapterQuestion =async(chapterId,userId,rightAnswer,answers)=>{
   await isAdmin(null,userId)
   const chapter = await models.chapterModel.findById(chapterId)

    return models.chapterQuestionsModel.create({
        chapterId:chapterId,
        rightAnswer:rightAnswer,
        answers,
    })

}