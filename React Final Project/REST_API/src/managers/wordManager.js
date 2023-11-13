
const models = require("../models/allModels")
const utils = require("../utils/utils")
const {isOwnedByUser, isAdmin} = require("../managerUtils/managerUtil");
const allModels = require("../models/allModels");
// Change this line to use dynamic import
import('random-words')
    .then(async (randomWordsModule )=>{
        const randomWords = randomWordsModule;



        exports.generateTest =async(userId,testType,chapterId)=>{


            if(testType === utils.testTypes.randomWords){
                //12 words
                let questions
                const unknownWords = await models.wordModel.find({
                    unknownFor:{
                        $in:userId
                    }
                })

                //max 12
                    questions = unknownWords.slice(0,12)
                //fill with random words if necessary
                    const randomWordsToFill = randomWords.generate(12-questions.length)

                    questions = [...questions,...randomWordsToFill]


                return await makeTestOutOfWords(questions)

            }else if(testType === utils.testTypes.textWords){
                //12 words from text
                const chapter = await allModels.chapterModel.findById(chapterId)
                const splitedChapter = chapter.text.split(/\s+/);

                const filteredWords = splitedChapter.filter(word => !utils.commonWords.includes(word.toLowerCase()));

                const testWords = []

                for (let i = 0; i < 12; i++) {
                    //removes . : ; ,
                    const trimmedStr = getRandomWord(filteredWords).replace(/^[,.\s:]+|[,\s:]+$/g, "");
                    testWords.push(trimmedStr)
                }

                return await makeTestOutOfWords(testWords)
            }if(testType === utils.testTypes.textQuestions){
                // 3 questions from the text
            }
        }

        exports.markTestAsCompleted =async (userId,testType)=>{
            const user = await models.userModel.findById(userId)
            switch(testType){
                case utils.testTypes.randomWords :
                    ++user.randomWordsTests
                    user.knownWords+=12
                    break;
                case utils.testTypes.textWords :
                    ++user.wordsFromChapterTests
                    break;
                case utils.testTypes.textQuestions :
                    ++user.chapterPlotTests
                    break;
            }
            return user.save()
        }


        function getRandomWord(wordsArray) {
            const randomIndex = Math.floor(Math.random() * wordsArray.length);
            return wordsArray[randomIndex];
        }
        async function makeWrongAnswers(){
            const answers =[]
            for (let i =0;i<3;i++){
                answers[i] = {answer:await exports.translateWord(randomWords.generate()) }
            }
            return answers
        }


        async function makeTestOutOfWords(words){
            const container = []
            for (const question of words) {

               const answers =await makeWrongAnswers()

                let rightAnswer
                if(question.translatedText){
                    rightAnswer ={answer:question.translatedText,isCorrect : true,}
                }else{
                     rightAnswer =  {answer:await exports.translateWord(question),isCorrect : true}
                }

                const randomNumber = Math.floor(Math.random() * 4);
                //place it on random place
                answers.splice(randomNumber,0,rightAnswer)
                if(question.translatedText) {
                    container.push(
                        {
                            _id:question._id,
                            question:question.word,
                            answers
                        }
                    )
                }else{
                    container.push(
                        {
                            question,
                            answers
                        }
                    )
                }
            }
            console.log(container)
            return container
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
exports.translateWord=async(word)=>{
    const fetch = await import("node-fetch")

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            q: word,
            source: 'en',
            target: 'bg',
            format: 'text',
        }),
    };

    const response = await fetch.default(`https://translation.googleapis.com/language/translate/v2?key=${utils.GoogleTranslateAPI_KEY}`, requestOptions);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return  data.data.translations[0].translatedText;
}

exports.getAllWords =async(userId)=>{
   return  models.wordModel.find({unknownFor:userId})
}

exports.deleteWord =async(wordId,userId)=>{
    await isOwnedByUser(userId,wordId,models.wordModel,"unknownBy")
   return models.bookModel.findByIdAndDelete(wordId)
}
exports.makeThemKnown =async(wordsIds,userId)=>{
    for (const wordId of wordsIds) {
        const word = await models.wordModel.findById(wordId)
        const index = word.unknownFor.findIndex(id=>id.equals(userId))
        if(index!==-1){
            word.unknownFor.splice(index,1)
        }
        await word.save()
    }
}
exports.createWords =async(words,userId)=>{
    for (const word of words) {
        const wordRecord = await allModels.wordModel.findOne({word})
        if(wordRecord){
            wordRecord.unknownFor.push(userId)
            await wordRecord.save()
        }else{





            await models.wordModel.create(
                {
                    unknownFor:[userId],
                    word,
                    translatedText:await exports.translateWord(word)
                }
            )
        }


    }






}

