const models = require("../models/allModels")
const {isOwnedByUser, isAdmin} = require("../managerUtils/managerUtil");
const wordManager = require("./wordManager");
const schedule = require('node-schedule');
const {model} = require("mongoose");


exports.getChapter =async(chapterId,userId)=>{
    const book = await models.bookModel.findOne({
        chapters: {
            $in: chapterId
        }
    });
    const currentChapterIndex = book.chapters.findIndex(el=>el.equals(chapterId))

    const chapter = await models.chapterModel.findById(chapterId)
    await changeUserLastReading(book._id,chapter._id,userId)
    const [prev,next] = getPreviousAndNextChapters(book,currentChapterIndex)
    return{
        currentChapter:chapter,
        previousChapterId:prev,
        nextChapterId:next,
        hasChapterPlotTest:await hasChapterPlotTest(chapter._id)
    }

}
function getPreviousAndNextChapters(book,currentChapterIndex){
    return[
        book.chapters[currentChapterIndex-1],
        book.chapters[currentChapterIndex+1]
    ]

}
async function hasChapterPlotTest(chapterId){
    const plotTest = await models.chapterQuestionsModel.findOne({chapterId})
    return !!plotTest
}

async function changeUserLastReading(bookId,chapterId,userId){
    const user = await models.userModel.findById(userId)
    user.lastReading = {
        bookId,
        chapterId
    }
    return user.save()
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
exports.createChapter =async(bookId,text,userId,chapterName,questions)=>{
   await isAdmin(null,userId)
   const chapter = await models.chapterModel.create(
       {
          book:bookId,
          text,
           chapterName
       }
       )
   const book = await models.bookModel.findById(bookId)
   book.chapters.push(chapter._id.toString())
    book.length+=1
    await wordManager.storeChapterQuestions(questions,chapter._id.toString())
   return book.save()
}
const weeklyJob = schedule.scheduleJob({ hour: 2, minute: 0, dayOfWeek: 1 }, async () => {
    try {
        // Your logic to update specific products in the database
        await changeBookFreeRotation();
        console.log('Weekly update completed successfully.');
    } catch (error) {
        console.error('Error during weekly update:', error);
    }
});
async function changeBookFreeRotation(){

   const randomChapters =  await models.chapterModel.aggregate([{ $sample: { size: 10 } }])
    for (const chapter of randomChapters) {
        chapter.isFree = true
        await chapter.save()
    }

    const previousChapters = await models.chapterModel.find({isFree:true})
    for (const previousChapter of previousChapters) {
        previousChapter.isFree = false
        await previousChapter.save()
    }
}
exports.createChapterQuestion =async(chapterId,userId,rightAnswer,answers)=>{
   await isAdmin(null,userId)
   exports.store

}