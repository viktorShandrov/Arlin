
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
                const questions = randomWords.generate(12)

                return await makeTestOutOfWords(questions)

            }else if(testType === utils.testTypes.textWords){
                //12 words from text
                const chapter = await allModels.chapterModel.findById(chapterId)
                const splitedChapter = chapter.text.split(/\s+/);

                const filteredWords = splitedChapter.filter(word => !utils.commonWords.includes(word.toLowerCase()));

                const testWords = []

                for (let i = 0; i < 12; i++) {
                    testWords.push(getRandomWord(filteredWords))
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


        async function makeTestOutOfWords(words){
            const container = []
            for (const question of words) {
                const answers =[]
                for (let i =0;i<3;i++){
                    answers[i] = {answer:await exports.translateWord(randomWords.generate()) }
                }
                const rightAnswer =  {answer:await exports.translateWord(question),isCorrect : true}

                const randomNumber = Math.floor(Math.random() * 4);
                answers.splice(randomNumber,0,rightAnswer)
                container.push(
                    {
                        question,
                        answers
                    }
                )
            }
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

