const models = require("../models/allModels")
const {isOwnedByUser, isAdmin} = require("../managerUtils/managerUtil");
const wordManager = require("./wordManager");
const bookManager = require("./bookManager");
const schedule = require('node-schedule');
const {model} = require("mongoose");
const fetch = require("isomorphic-fetch");
const {translateAPI} = require("../utils/utils");


exports.getChapter =async(chapterId,userId)=>{

    const book = await models.bookModel.findOne({
        chapters: {
            $in: chapterId
        }
    });
    const currentChapterIndex = book.chapters.findIndex(el=>el.equals(chapterId))
    const user = await models.userModel.findById(userId)


    const chapter = await models.chapterModel.findById(chapterId)
    if(!chapter.isFree&&user.role!=="admin"&&![0,1].includes(currentChapterIndex)){
        await isOwnedByUser(userId,book._id,models.bookModel,"ownedBy")
    }

    await changeUserLastReading(book._id,chapter._id,userId)
    const [prev,next] = getPreviousAndNextChapters(book,currentChapterIndex)



    return{
        currentChapter:chapter,
        previousChapterId:prev,
        nextChapterId:next,
        isBookOwnedByUser:bookManager.isBookOwnedByUser(book,userId),
        chapterIndex:currentChapterIndex+1,
        bookLength:book.chapters.length,
        hasChapterPlotTest:await hasChapterPlotTest(chapter._id),
        hasUserRatedTheBook: book.reviews?.some((review)=>review.writtenBy.equals(userId))
    }

}
exports.getFreeRotationChapters = async()=>{
    const payload = []
    const chapters = await models.chapterModel.find({isFree:true})
    for (const chapter of chapters) {
        const book = await models.bookModel.findById(chapter.book)
        payload.push(
            {
                bookImage:book.image,
                bookId:book._id,
                bookName:book.name,
                chapterName:chapter.chapterName,
                chapterId:chapter._id,
            }
        )
    }
    return payload
}
exports.getBookContent = async(bookId)=>{
    let chapters = await models.chapterModel.find({bookId})
    chapters = chapters.map(el=>el.toObject())
    for (const chapter of chapters) {
        delete chapter.text
    }
    return chapters
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


}



exports.translateChapter=async()=>{
    const doc = await models.chapterModel.findById("65c6663aef5179493a74d27a")
    // const cleanedText = doc.text.replace(/['"\\]|[^a-zA-Z0-9_\-.,:;@&=+$#?/()%]+/g, '');
    // const url = `${translateAPI}${encodeURIComponent(doc.text)}`;

    const sentences = doc.text.split(/(?<=[?!.])/)
    const wholeText = []
    for (const sentence of sentences) {
        // const data = await fetch(translateAPI,{
        //     method:"POST",
        //     body:sentence})
        const data = await fetch(translateAPI+sentence)
        const translation = await(data.json())
        if(!translation){
            throw new Error("problem with text translation")
        }
        wholeText.push(translation)
    }
    console.log(wholeText)



    // console.log(translation)
    // await models.chapterModel.updateOne(
    //     { _id: doc._id },
    //     { $set: { translation:translation.translation } }
    // );
    //
    // console.log("translated")

}