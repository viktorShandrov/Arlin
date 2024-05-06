

const models = require("../models/allModels");
const utils = require("../utils/utils");
const { isOwnedByUser, isAdmin } = require("../managerUtils/managerUtil");
const allModels = require("../models/allModels");
const fetch = require('isomorphic-fetch');
const userManager =require("./userManager") ;
// const fetch1 = await import("node-fetch")



import('random-words')
    .then(async (randomWordsModule )=>{
        globalThis.fetch = (await import('node-fetch')).default;

        const randomWords = randomWordsModule;



                    function shuffleArray(array) {
                        for (let i = array.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [array[i], array[j]] = [array[j], array[i]];
                        }
                        return array;
                    }

                    async function getWordDetailsAsQuestions(userId,numberOfQuestions){
                        const userWordsContainers = await allModels.wordsContainer.find({ownedBy:userId}).populate("words.wordRef")
                        //12 words
                        return shuffleArray(userWordsContainers.flatMap((container) => container.words.map((wordRef)=>wordRef.wordRef))).slice(0,numberOfQuestions);

                    }


                    async function makeWordTest(userId,isExercise){


                        let questions = await getWordDetailsAsQuestions(userId,utils.excersiceQuestionsCount)

                        //fill with random words if necessary
                        let randomWordsToFill = []
                        if(utils.excersiceQuestionsCount-questions.length>0){
                            randomWordsToFill = await allModels.wordModel.find({ word: { $nin: questions.map(el=>el.word) } }).limit(numberOfQuestions-questions.length);
                        }

                        questions = [...questions,...randomWordsToFill]



                        const containerForTestResult ={
                            madeBy:userId,
                            questions:[],
                            score:0,
                            isExercise,
                            isDone:false
                        }
                          const test = await makeTestOutOfWords(questions,isExercise,containerForTestResult)
                        return {
                            _id: (await allModels.testModel.create(containerForTestResult))._id,
                            questions:test,
                        }

                    }




                    exports.generateTest =async(userId,chapterId,isExercise)=>{



                        return makeWordTest(userId,isExercise)




                        if(testType === utils.testTypes.randomWords||
                            testType === utils.testTypes.fillWord
                        ){
                            return makeWordTest(false,testType)

                        }else if(testType === utils.testTypes.textWords){
                            //12 words from text
                            const chapter = await allModels.chapterModel.findById(chapterId)
                            const splitedChapter = chapter.text.split(/\s+/);

                            const filteredWords = splitedChapter.filter(word => !utils.commonWords.includes(word.toLowerCase()));

                            const words = []

                            for (let i = 0; i < 12; i++) {
                                //removes . : ; ,
                                const trimmedStr = getRandomWord(filteredWords).replace(/^[,.\s:]+|[,\s:"']+$/g, "");
                                words.push(trimmedStr)
                            }

                            const testWords = await exports.translateMultipleWords(words)

                            return await makeTestOutOfWords(testWords)
                        }else if(testType === utils.testTypes.textQuestions){
                            // 3 questions from the text

                            let questions = [...await allModels.chapterQuestionsModel.find({chapterId})]
                            questions = refactorQuestionAnswers(questions)

                            return questions
                        }else if(testType === utils.testTypes.matchFour){
                            //match 4 words
                            return allModels.wordModel.aggregate([{ $sample: { size: 12 } }])
                        }else if(testType === utils.testTypes.fillWord) {

                        }
                    function refactorQuestionAnswers(questions){
                        return questions.map(question=>{



                            const updatedAnswers = question.answers.map((answer)=>{
                                const updatedAnswer = answer.toObject()

                                if(updatedAnswer.hasOwnProperty("isCorrect")&&!updatedAnswer.isCorrect){
                                    delete updatedAnswer.isCorrect
                                }
                                return updatedAnswer
                            })

                            question.answers = updatedAnswers


                            return question
                        })
                    }
                    }
                    exports.makePlotTestForChapter =async (chapterText,userId)=>{
                        try {


                            await isAdmin(null,userId)
                            const apiKey = "Vcm0eWkTJDLFojmyyDYcTB2rFDV6vFBTiNfs9F4q"
                            const response = await fetch("https://api.cohere.ai/v1/generate",{
                                method:"POST",
                                headers:{
                                    "Content-Type":"application/json",
                                    "accept": "application/json",
                                    "Authorization":`Bearer ${apiKey}`,
                                },
                                body:JSON.stringify({



                                    "prompt":exports.makeGPTInput(chapterText),
                                    "connectors": [{"id": "web-search"}]

                                })
                            })
                            const data = await response.json()
                            console.log(data)
                            const responseText = data.generations[0].text
                            const extractJsonFromText = (text) => {
                                const jsonRegex = /{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})*}/g;
                                const matches = text.match(jsonRegex);
                                return matches ? matches.map(JSON.parse) : [];
                            };
                            const extractedJson = extractJsonFromText(responseText);

                            return extractedJson


                        }catch (error){
                            console.log(error)
                                throw new Error("Problem with AI")
                        }

                    }
                    exports.storeChapterQuestions = async(questions,chapterId)=>{
                        for (const questionElement of questions) {
                            await allModels.chapterQuestionsModel.create(
                                {
                                    chapterId,
                                    question:questionElement.question,
                                    answers:questionElement.options,
                                }
                            )
                        }
                    }
                    function trimResponseArray(splitedText){
                        while (splitedText.includes("")){
                            const index = splitedText.indexOf("")
                            if(index){
                                splitedText.splice(index,1)
                            }
                        }
                        return splitedText
                    }
                    function getQuestionAndAnswersObj(i,splitedText){
                        const question = splitedText[i]
                        let answers = [
                            splitedText[i+1],
                            splitedText[i+2],
                            splitedText[i+3],
                            splitedText[i+4],
                        ]
                        const rightAnswerIndex = answers.findIndex((el)=>el.includes("(TRUE ANSWER)"))
                        answers[rightAnswerIndex] = answers[rightAnswerIndex].split("(TRUE ANSWER)")[1]
                        answers=answers.map(el=>el.trim())
                        return{
                            question,
                            answers,
                            rightAnswerIndex
                        }
                    }
                    const trimLastSentence = (chapterText)=>{
                            const pattern = /[\.\!\?]\s*/g;

                            const matches = [...chapterText.matchAll(pattern)];
                            if (matches.length > 0) {
                                const lastMatch = matches[matches.length - 1];
                                console.log(lastMatch)
                                const index = lastMatch.index + lastMatch[0].length - 1; // Adjusting for the punctuation character
                                return chapterText.substring(0,index)
                            } else{
                                return null
                            }
                    }
                    exports.makeGPTInput=(chapterText)=>{
                        const maxGTPcharInput = 4081
                        const promptStartingLength = 2020
                        while(chapterText.length>maxGTPcharInput-promptStartingLength){
                            chapterText = trimLastSentence(chapterText)
                            console.log(chapterText.length)
                        }

                        return `
                        Chapter Plot Analysis:

                        Text:
                        ${chapterText}
                        
                        Generate three questions about the plot of the chapter, each with four possible answers. Keep each answer concise, between 5-10 words. It's crucial that the correct answer is marked with the '"isCorrect": true' property.
                        The output must be in JSON format as follows:
                        [
                          {
                            "question": "Question 1 here",
                            "options": [
                              {"option": "[Possible Answer 1]", "isCorrect": false},
                              {"option": "[Possible Answer 2]", "isCorrect": false},
                              {"option": "[Possible Answer 3]", "isCorrect": false},
                              {"option": "[Possible Answer 4]", "isCorrect": true}
                            ]
                          },
                          {
                            "question": "Question 2 here",
                            "options": [
                              {"option": "[Possible Answer 1]", "isCorrect": false},
                              {"option": "[Possible Answer 2]", "isCorrect": false},
                              {"option": "[Possible Answer 3]", "isCorrect": false},
                              {"option": "[Possible Answer 4]", "isCorrect": true}
                            ]
                          },
                          {
                            "question": "Question 3 here",
                            "options": [
                              {"option": "[Possible Answer 1]", "isCorrect": false},
                              {"option": "[Possible Answer 2]", "isCorrect": false},
                              {"option": "[Possible Answer 3]", "isCorrect": true},
                              {"option": "[Possible Answer 4]", "isCorrect": false}
                            ]
                          }
                        ]
                        `
                         // Please, return me only the JSON data. Nothing else like any other human interaction!

                    }

                    `
                     "
                        3.How does Daddy respond to Adam-Two's skepticism about Santa Claus?
                        He dismisses Adam-Two's thoughts as childish imagination.
                        (TRUE ANSWER) He reassures Mike-One that Santa Claus is real in Fairyland.
                         He puts Adam-Two on the No Ice Cream List for a month.
                        He ignores the question and suggests playing chess instead.
                        "
                    `

                    exports.markTestAsCompleted =async (userId,res,results,testId)=>{
                        const user = await models.userModel.findById(userId)

                        const test = await allModels.testModel.findById(testId);

                        results.forEach((question,index)=>{
                            test.questions[index].time = question.time
                            if(question.guessedAnswerIndex!==question.rightAnswerIndex){
                                test.questions[index].wrongAnswer.wordId = test.questions[index].possibleAnswers[question.guessedAnswerIndex]
                            }
                        })
                        test.isDone = true
                        await test.save()

                        return

                        switch(testType){
                            case utils.testTypes.randomWords :
                                await exports.makeThemKnown(wordsIds,userId)
                                ++user.randomWordsTests
                                user.knownWords+=12
                                break;
                            case utils.testTypes.textWords :
                                ++user.wordsFromChapterTests
                                break;
                            case utils.testTypes.textQuestions :
                                ++user.chapterPlotTests
                                break;
                                case utils.testTypes.matchFour :
                                ++user.matchFourTests
                                break;

                        }
                        await userManager.updateUserExp(utils.defaultExp,user,res)
                        return user.save()
                    }


                    function getRandomWord(wordsArray) {
                        const randomIndex = Math.floor(Math.random() * wordsArray.length);
                        return wordsArray[randomIndex];
                    }
                    async function makeWrongAnswers(question,testType,i,containerForTestResult){

                        return (await allModels.wordModel.aggregate([
                            { $match: { word: { $ne: question.word } } },
                            { $sample: { size: 3 } }
                        ])).map(question=>{
                            console.log(question)
                            switch (testType){
                                case utils.testTypes.randomWords:
                                    return {
                                        _id:question._id,
                                        answer:question.translatedText,
                                        isCorrect : false,
                                    }
                                case utils.testTypes.fillWord:

                                    return {
                                        _id:question._id,
                                        answer:question.word,
                                        isCorrect : false,
                                    }
                            }

                        })
                        // return (await allModels.wordModel.find({ word: { $ne: question.word } }).limit(3)).map(el=>el.translatedText);
                        // return exports.translateWrongAnswers([randomWords.generate(),randomWords.generate(),randomWords.generate()])
                    }
                    function makeTestPlan(isExersice){
                        const testsPlan = []
                        let marker = 0;
                        const testTypesCount =isExersice? Object.keys(utils.excersiceTypes).length : Object.keys(utils.testTypes).length
                        const everyTestTypeCount =utils.excersiceQuestionsCount/testTypesCount;
                        for (let i = 0; i < utils.excersiceQuestionsCount; i+=everyTestTypeCount) {
                            for (let j = 0; j < everyTestTypeCount; j++) {
                                testsPlan.push(marker)
                            }
                            marker++
                        }
                        return testsPlan
                    }


                    async function makeTestOutOfWords(words,isExercise,containerForTestResult){
                        const container = []
                        const testsPlan = makeTestPlan(isExercise)




                        for (let i = 0; i < words.length; i++) {
                            const question = words[i]
                            const testType = isExercise?Object.entries(utils.excersiceTypes)[testsPlan[i]][1]:Object.entries(utils.testTypes)[testsPlan[i]][1]

                            // save for DB
                            containerForTestResult.questions.push(
                                {
                                    question:question.word,
                                    testType,
                                    possibleAnswers:[],
                                    rightAnswer: question._id
                                }
                            )

                            const answers = await makeWrongAnswers(question,testType,i,containerForTestResult)

                            let rightAnswer

                            switch (testType){
                                case utils.testTypes.randomWords:
                                    rightAnswer = {
                                        _id:question._id,
                                        answer:question.translatedText,
                                        isCorrect : true,
                                    }
                                    break;
                                case utils.testTypes.fillWord:
                                    rightAnswer = {
                                        _id:question._id,
                                        answer:question.word,
                                        isCorrect : true,
                                    }
                                    break;
                            }



                            //place right answer on random place
                            const randomNumber = Math.floor(Math.random() * 4);
                            answers.splice(randomNumber,0,rightAnswer)

                            containerForTestResult.questions[i].possibleAnswers = answers.map(el=>el._id);
                            switch (testType){
                                case utils.testTypes.randomWords:
                                    container.push(
                                        {
                                            sentenceWhereWordsIsPresent:question.examples[0].sentenceWhereWordsIsPresent,
                                            sentenceWhereWordsIsPresentTranslation:question.examples[0].translation,
                                            translation:question.translatedText,
                                            wordId:question._id,
                                            question:question.word,
                                            answers,
                                            testType
                                        }
                                    )
                                    break;
                                case utils.testTypes.fillWord:
                                    container.push(
                                        {
                                            question:question.examples[0].sentenceWhereWordsIsPresent.replace(question.word,"____"),
                                            sentenceWhereWordsIsPresentTranslation:question.examples[0].translation,
                                            wordId:question._id,
                                            answers,
                                            testType
                                        }
                                    )
                                    break;
                            }
                        }

                        return container
                    }

            exports.translateWord=async(word)=>{
                const response = await((await fetch(utils.translateAPI+word)).json())
                return response.translation
            }


        exports.translateMultipleWords=async(words)=>{
                        const payload = words.join(", ")
                        const response = await((await fetch(utils.translateAPI+payload)).json())
                        const translations = response.translation.split(", ")

                        for(let i = 0;i<words.length;i++){
                            if(! await allModels.wordModel.findOne({word:words[i]})){
                                await allModels.wordModel.create(
                                    {
                                        unknownFor:[],
                                        word:words[i],
                                        translatedText:translations[i]
                                    }
                                )
                            }

                        }
                        return translations.map((translation,index)=>{
                            return{
                                word:words[index],
                                translatedText:translation
                            }

                        })
        }
            exports.fillDBwithWords =async () =>{
                const words = randomWords.generate(500)

                const payload = words.join(", ")
                const response = await((await fetch(utils.translateAPI+payload)).json())
                const translations = response.translation.split(", ")

                for(let i = 0;i<words.length;i++){
                    if(! await allModels.wordModel.findOne({word:words[i]})){
                        await allModels.wordModel.create(
                            {
                                unknownFor:[],
                                word:words[i],
                                translatedText:translations[i]
                            }
                        )
                    }
                }

            }

            exports.translateText=async(text)=>{
                const response = await((await fetch(utils.translateAPI+encodeURI(text))).json())
                return response.translation
            }

            exports.getTestDetails = async(testId)=>{
                        return{
                            test: await allModels.testModel.findById(testId).populate("questions.possibleAnswers"),
                            testTypes:utils.testTypesTranslated
                        }
            }
            })





exports.getAllWords =async(userId)=>{
   return  models.wordModel.find({unknownFor:userId})
}



exports.deleteWord =async(wordId,userId)=>{
    await isOwnedByUser(userId,wordId,models.wordModel,"unknownBy")
   return models.bookModel.findByIdAndDelete(wordId)
}
exports.makeThemKnown =async(wordsIds,userId)=>{
    const wordContainers = await allModels.wordsContainer.find({ownedBy:userId})
    for (const wordContainer of wordContainers) {
       const targetWords = wordContainer.words.filter((word)=>wordsIds.some(wordId=>word.wordRef.equals(wordId)))
        for (const targetWord of targetWords) {
            targetWord.isKnown=true
        }
            await wordContainer.save()
    }
    // for (const wordId of wordsIds) {
    //     const word = await models.wordModel.findById(wordId)
    //     const index = word.unknownFor.findIndex(id=>id.equals(userId))
    //     if(index!==-1){
    //         word.unknownFor.splice(index,1)
    //     }
    //     await word.save()
    // }
}
exports.giveSentence =async(word)=>{

    return await(await fetch(`https://api.wordnik.com/v4/word.json/${word}/topExample?useCanonical=false&api_key=c23b746d074135dc9500c0a61300a3cb7647e53ec2b9b658e`)).json()

}
exports.createWordContainer =async(user,colorCode,name,type = "custom")=>{
    const existingContainer = await allModels.wordsContainer.findOne({ownedBy:user._id,name:name})
    if(existingContainer) throw new Error("Група със същото име вече съществува")

    const container = await allModels.wordsContainer.create(
        {
            ownedBy:user._id,
            words:[],
            colorCode,
            name,
            type
        }
    )

}
exports.getUserWordContainer = (user,withPopulatedWords)=>{
    return withPopulatedWords?
        allModels.wordsContainer.find({ownedBy:user._id}).populate("words.wordRef"):
        allModels.wordsContainer.find({ownedBy:user._id})
}
exports.createWords =async(words,userId,res)=>{
    // const wordsAndTranslations = await exports.translateMultipleWords(words)
    const info = []

    for (const word of words) {
        let wordRecord = await allModels.wordModel.findOne({word:word.text})
        const targetContainer = await allModels.wordsContainer.findOne({ownedBy:userId,name:word.targetContainer}).populate("words.wordRef") || await allModels.wordsContainer.findOne({ownedBy:userId,type:"systemGenerated"}).populate("words.wordRef")



            if(!wordRecord){
                wordRecord =  (await models.wordModel.create(
                    {
                        // unknownFor:[userId],
                        word:word.text,
                        translatedText:"няма превод"
                    }
                ))

                saveWordFullInfo(word,wordRecord)

            }else {
                if(wordRecord.examples.length===0){
                    createWordExamples([],wordRecord)
                }

            }
            const alreadySaved = targetContainer.words.filter((el)=>el.wordRef.equals(wordRecord._id))
            if(alreadySaved.length>0){
                for (const word of alreadySaved) {
                    info.push(`"${word.wordRef.word}" вече е запазена`)
                }
            }else{
                targetContainer.words.push({
                    wordRef:wordRecord._id,
                })
                await targetContainer.save()
            }



    }
    const user = await allModels.userModel.findById(userId)
    await userManager.checkIfAdvancements(user,res)
    return info
}
 async function getWordWholeInfo(word){
   return (await fetch(utils.translateAPI+encodeURI(word))).json()
}
async function saveWordFullInfo(word,wordRecord){
    const wordWholeInfo = await getWordWholeInfo(word.text)
    wordRecord.translatedText = wordWholeInfo.translation
    await createWordExamples(wordWholeInfo.info.examples,wordRecord)
    wordRecord.save()
}

async function createWordExamples(sentenceExamples,wordRecord){
    const payload = []
    if(sentenceExamples.length>0){
        for (let  sentenceWhereWordsIsPresent of sentenceExamples) {
            sentenceWhereWordsIsPresent = sentenceWhereWordsIsPresent.replace(/<b>|<\/b>/g, '');
            const translation = await exports.translateText(sentenceWhereWordsIsPresent)
            payload.push(
                {
                    sentenceWhereWordsIsPresent,
                    translation
                }
            )
        }
    }else{
        const  sentenceWhereWordsIsPresent = (await exports.giveSentence(wordRecord.word)).text
        const translation = await exports.translateText(sentenceWhereWordsIsPresent)
        payload.push(
            {
                sentenceWhereWordsIsPresent,
                translation
            }
        )

    }
    wordRecord.examples = payload
    await wordRecord.save()
}
