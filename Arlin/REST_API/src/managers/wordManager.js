

const models = require("../models/allModels");
const utils = require("../utils/utils");
const { isOwnedByUser, isAdmin } = require("../managerUtils/managerUtil");
const allModels = require("../models/allModels");
const fetch = require('isomorphic-fetch');
const userManager =require("./userManager") ;
// const fetch1 = await import("node-fetch")


function checkIfTestExpired(test){
    const date = new Date()
    let isExpired
    if(test.endDate===date){
        const currentTime = new Date();

        const endTimeParts = test.endTime.split(':');
        const endHour = parseInt(endTimeParts[0], 10);
        const endMinute = parseInt(endTimeParts[1], 10);

        const endTime = new Date(currentTime);
        endTime.setHours(endHour);
        endTime.setMinutes(endMinute);
        endTime.setSeconds(0); // Optional if you want to ignore seconds

        isExpired = endTime < currentTime;
    }else{
        isExpired = test.endDate<date
    }
    return isExpired
}
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

                    async function fillWordCircle(userId,allHardWordsForUser){
                        const userDefaultContainer  = await allModels.wordsContainer.findOne({ownedBy:userId,type:"forUnknownWordsCircle"});
                        const randomUnknownWords  = await allModels.wordModel.find({
                            _id: { $nin: allHardWordsForUser.map(w=>w.wordRef._id) } // Assuming arrayOfIds contains the IDs of documents you want to exclude
                        }).limit(utils.numberOfWordsInCircleToAppearOnTest-allHardWordsForUser.length);

                        const randomWordsInEqualFormatAsInput = []
                        for (const randomUnknownWord of randomUnknownWords) {
                            randomWordsInEqualFormatAsInput.push({
                                _isRandomAndAddedNow:true,
                                wordRef:randomUnknownWord._id,
                                addedOn: new Date()
                            })
                            userDefaultContainer.words.push({...randomWordsInEqualFormatAsInput.at(-1)})
                        }

                        await userDefaultContainer.save()
                        return [...allHardWordsForUser,...randomWordsInEqualFormatAsInput]
                    }
                    async function checkIfEnoughWords(allHardWordsForUser,userId){
                        if(allHardWordsForUser.length<utils.numberOfWordsInCircleToAppearOnTest){
                            return fillWordCircle(userId, allHardWordsForUser)
                        }else{
                            return allHardWordsForUser
                        }
                    }

                    async function getWordDetailsAsQuestions(userId,numberOfQuestions){

                        const userWordsContainers = await allModels.wordsContainer.find({ownedBy:userId}).populate("words.wordRef")

                        //get test number of words , sorted by addedOn date
                        let allHardWordsForUser = userWordsContainers.flatMap(c => c.words).filter(word=>word.status==="hard");
                        //fill with random words if necessary
                        allHardWordsForUser = await checkIfEnoughWords(allHardWordsForUser,userId)

                        const user = await allModels.userModel.findById(userId)
                        user.testCompleteCirclesCount++
                        if(user.testCompleteCirclesCount===utils.numberOfCirclesForWordsToAppearOnTest){
                            user.testCompleteCirclesCount=0
                        }
                        await user.save()

                        const startPosition = user.testCompleteCirclesCount*utils.excersiceQuestionsCount
                        let wordForTest = allHardWordsForUser
                            .sort((a,b)=>a.addedOn-b.addedOn)
                            .slice( startPosition,startPosition+utils.excersiceQuestionsCount)

                        for (const word of wordForTest) {
                            if(!word._isRandomAndAddedNow){
                                word.lastTimeGivenOnTest = new Date()
                                word.save({ suppressWarning: true });
                            }
                        }

                        const onlyWordsStandAloneInfo = wordForTest.map(w=>w.wordRef)
                        return shuffleArray(onlyWordsStandAloneInfo)

                    }


                    async function makeWordTest(userId,isPersonalExercise){

                        let questions = await getWordDetailsAsQuestions(userId,utils.excersiceQuestionsCount)

                        let testRecord = await makeTestOutOfWords(questions,isPersonalExercise,userId)

                        testRecord = (await allModels.testModel.findById(testRecord._id).populate("questions.question.elementId").populate("questions.possibleAnswers.elementId")).toObject();

                        for (const question of testRecord.questions) {
                            populateStringValueToQuestionsAndAnswers(question)
                        }
                        for (const question of testRecord.questions) {
                            populateQuestionHelpSections(question)
                        }

                        return testRecord

                    }
                    function populateQuestionHelpSections(question){
                        // question.sentenceWhereWordsIsPresent = question.possibleAnswers[question.rightAnswerIndex]
                        const example = question.question.elementId.examples?.[0]
                        if(example&&example.sentenceWhereWordsIsPresent){
                            question.sentenceWhereWordsIsPresent = example.sentenceWhereWordsIsPresent
                            question.sentenceWhereWordsIsPresentTranslation = example.translation
                        }
                    }
                    function populateStringValueToQuestionsAndAnswers(question){

                            if(!question.question.stringValue) {
                                switch (question.testType) {
                                    case utils.testTypes.fillWord:
                                        question.question.stringValue = question.question.elementId.examples[0].sentenceWhereWordsIsPresent.replace(question.question.elementId.word, "___")
                                        break;
                                    case utils.testTypes.randomWords:
                                        question.question.stringValue = question.question.elementId.word
                                        break;
                                }
                            }

                            for (const answer of question.possibleAnswers) {
                                if(!answer.stringValue) {
                                    switch (question.testType) {
                                        case utils.testTypes.fillWord:
                                            answer.stringValue = answer.elementId.word
                                            break;
                                        case utils.testTypes.randomWords:
                                            answer.stringValue = answer.elementId.translatedText
                                            break;
                                    }
                                }
                            }


                    }
                    async function giveExistingTest(testId,userId){
                        const test =  (await allModels.testModel.findById(testId)).toObject()

                        if(!test.isPersonalExercise){
                            if(!checkIfTestExpired(test)){
                                //if test already submitted
                                //if submitted as test, now is sent like exercise
                                if(
                                    !test.submissions.filter(sub=>sub.submittedBy.equals(userId)).some(sub=>sub.isSubmittedAsTest)
                                ){
                                    for (const question of test.questions) {
                                        delete question.rightAnswerIndex
                                    }
                                }else{
                                    test.isExercise = true
                                }
                            }else{
                                test.isExercise = true
                            }
                        }
                        return test
                    }




                    exports.generateTest =async(testId,userId,isPersonalExercise)=>{

                        if(testId){
                            return giveExistingTest(testId,userId)
                        }else{
                            //generate exercise test
                            return makeWordTest(userId,isPersonalExercise)
                        }






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



                            const updatedAnswers = question.possibleAnswers.map((answer)=>{
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
                                    possibleAnswers:questionElement.options,
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
                            answers: possibleAnswers,
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
                        res.body = {}
                        const user = await models.userModel.findById(userId)
                        const test = await allModels.testModel.findById(testId);

                        const submissionTime = new Date()

                        const payload = {
                            submittedBy: userId,
                            submissionTime,
                        }
                        if(!test.isPersonalExercise){
                            payload.isSubmittedAsTest = submissionTime<test.endDate&&!test.submissions.filter(sub=>sub.submittedBy.equals(userId)).some(sub=>sub.isSubmittedAsTest)
                        }
                        test.submissions.push(payload)

                        const rightAnsweredWords = []

                        results.forEach((question,index)=>{
                            addAnswerToSubmission(question,test,rightAnsweredWords)
                        })
                        for (const rightAnsweredWordId of rightAnsweredWords) {
                            await increaseRightAnsweredCountOfWord(rightAnsweredWordId,userId)
                        }

                        // order in question order
                        test.submissions.at(-1).answers.sort((a, b)=>a.questionIndex-b.questionIndex)
                        //return submissionId
                        res.body.submissionId = test.submissions.at(-1)._id
                        await test.save()


                        await userManager.updateUserExp(utils.defaultExp,user,res)
                        return user.save()
                    }

                    function addAnswerToSubmission(question,test,rightAnsweredWords){
                        test.submissions.at(-1).answers.push({
                            answerIndex:question.guessedAnswerIndex,
                            time:question.time
                        })

                        if(question.guessedAnswerIndex===test.questions[question.questionIndex].rightAnswerIndex){
                            markWordAsRightlyGuessed(question,test,rightAnsweredWords)
                        }
                    }
                    function markWordAsRightlyGuessed(question,test,rightAnsweredWords){
                        test.submissions.at(-1).score++
                        const id = test.questions[question.questionIndex].question.elementId
                        if(id){
                            rightAnsweredWords.push(id)
                        }

                    }
                    async function increaseRightAnsweredCountOfWord(wordId,userId){
                        const containers = await allModels.wordsContainer.find({ownedBy:userId,"words.wordRef":wordId})
                        for (const container of containers) {
                            const word = container.words.find(word=>word.wordRef.equals(wordId))
                            if(word.answeredRightCount<3){
                                word.answeredRightCount++
                            }
                            //the "=" is for dev case
                            if(word.answeredRightCount>=3){
                                word.status = "known"
                            }
                            await container.save();
                        }
                    }

                    exports.createInitialTestInfo=async (testTitle,userId)=>{
                        if(!testTitle) throw new Error("Заглавието на теста е задължително")
                        const test = await allModels.testModel.create({
                            title:testTitle,
                            madeBy:userId,
                            isPersonalExercise:false,
                            questions:[],
                            submissions:[]
                        })
                        return test._id
                    }



                    exports.updateTestInfo=async (info,testId)=>{
                        const test = await allModels.testModel.findById(testId)
                        for (const [k,v] of Object.entries(info)) {
                            test[k] = v
                        }
                        return test.save()
                    }

                    exports.addQuestionToTest=async (testId,question)=>{
                        const test = await allModels.testModel.findById(testId)
                            const payload = {
                                testType:utils.testTypes.justQuestion,
                                question:{
                                    stringValue:question.question
                                },
                                possibleAnswers:[],
                                rightAnswerIndex : question.rightIndex
                            }
                            const indexes = [0,1,2,3]
                        indexes.forEach((i)=>{
                                payload.possibleAnswers.push({
                                    stringValue:question[`option${i+1}`],
                                })
                        })

                        test.questions.push(payload)

                        return test.save()
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
                    function makeTestPlan(isPersonalExercise){
                        const testsPlan = []
                        let marker = 0;
                        const testTypesCount =isPersonalExercise? Object.keys(utils.excersiceTypes).length : Object.keys(utils.testTypes).length
                        const everyTestTypeCount =utils.excersiceQuestionsCount/testTypesCount;
                        for (let i = 0; i < utils.excersiceQuestionsCount; i+=everyTestTypeCount) {
                            for (let j = 0; j < everyTestTypeCount; j++) {
                                testsPlan.push(marker)
                            }
                            marker++
                        }
                        return testsPlan
                    }


                    async function makeTestOutOfWords(words,isPersonalExercise,userId){

                        const newTestElement ={
                            madeBy:userId,
                            questions:[],
                            assignedTo:[userId],
                            isPersonalExercise:true,
                        }

                        const testsPlan = makeTestPlan(isPersonalExercise)

                        for (let i = 0; i < words.length; i++) {
                            //////////////////// stores it in DB ////////////////////
                            const question = words[i]
                            let testType = isPersonalExercise
                                ?Object.entries(utils.excersiceTypes)[testsPlan[i]][1]
                                :Object.entries(utils.testTypes)[testsPlan[i]][1]

                            if(!question.examples?.[0]){
                                testType = utils.testTypes.randomWords
                            }

                            newTestElement.questions.push(
                                {
                                    question:{
                                      elementId:question._id
                                    },
                                    testType,
                                    possibleAnswers:[],
                                }
                            )

                            const answers = await makeWrongAnswers(question,testType,i,newTestElement)

                            const rightAnswer = {
                                _id:question._id,
                            }

                            const randomNumber = Math.floor(Math.random() * 4);
                            answers.splice(randomNumber,0,rightAnswer)

                            newTestElement.questions[i].rightAnswerIndex = randomNumber;
                            newTestElement.questions[i].possibleAnswers = answers.map(el=>{
                                return {elementId:el._id}
                            });
                        }

                        return allModels.testModel.create(newTestElement)

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

            exports.getTestSubmission = async(testSubmissionId,_id)=>{

                        const test = (await allModels.testModel.findOne({ "submissions._id": testSubmissionId }).populate("questions.possibleAnswers.elementId").populate("questions.question.elementId")).toObject();
                        test.submission = test.submissions.find(sub=>sub._id.equals(testSubmissionId))
                        test.submission.time = test.submission.answers.reduce((acc,current)=>acc+current.time,0)

                        delete test.submissions
                        return{
                            test,
                            testTypes:utils.testTypesTranslated
                        }
            }
            })
            function calculateGrade(achievedPoints, totalPoints) {
                const percentage = (achievedPoints / totalPoints);
                const gradeRange = 6 - 2;
                const grade = (percentage * gradeRange) + 2;
                return grade;
            }
            exports.getTestElementsForUserType = async (userId) =>{
                const user = await allModels.userModel.findById(userId)

                const subsCount = (await allModels.testModel.aggregate([
                    { $match: { "submissions.isSubmittedAsTest": true } },
                ])).length;


                switch(user.role){

                    case "teacher":
                        //only test made by teacher
                        const tests = (await allModels.testModel
                            .find({madeBy:userId,isPersonalExercise:false}))
                            .map(el=>el.toObject())

                        //only TEST submissions from classMembers
                        tests.forEach(test=>{
                            test.submissions = test.submissions.filter(sub=>user.classMembers.some(member=>member.equals(sub.submittedBy)&&sub.isSubmittedAsTest))
                        })



                        const totalScoreFromAllClassSubs = tests.reduce((acc,curr)=>acc+curr.submissions.reduce((acc1,curr1)=>acc1+curr1.score,0),0)
                        const totalPossibleScoreFromAllClassSubs = tests.reduce((acc,curr)=>acc+curr.submissions.length,0)
                        // console.log(totalScoreFromAllClassSubs)
                        // console.log(totalSubsCount)
                        return {
                            madeByUser: tests.reverse().map(el => {
                                return {
                                    _id: el._id,
                                    title: el.title
                                }
                            }),
                            stats:{
                                madeByTeachersClassCount:tests.reduce((acc,curr)=>acc+curr.submissions.length,0),
                                averageGrade:calculateGrade(totalScoreFromAllClassSubs,totalPossibleScoreFromAllClassSubs),
                                createdByTeacher:tests.length,
                                allSubs:subsCount
                            }
                        }
                    case "student":
                        const testsArr = (await allModels.testModel
                            .find({ assignedTo: { $in: [userId] }}))
                            .map(test=>test.toObject())

                        const submittedByUser = testsArr
                            .filter(test=>test.submissions.some(sub=>sub.submittedBy.equals(userId)))
                            .map(test=>
                            {
                                return {
                                    testId:test._id,
                                    title:test.title,
                                    //when is personal ex and the submission is one by default
                                    submissionId:test.submissions[0]._id,
                                    isPersonalExercise:test.isPersonalExercise,
                                    isTestSubmittedOnlyAsExercise:!test.submissions.some(sub=>sub.submittedBy.equals(userId)&&sub.isSubmittedAsTest)
                                }
                            })


                        // testsArr.forEach(test=>{
                        //     const submissions = test.submissions.filter(sub=>sub.submittedBy.equals(userId))
                        //     if(submissions.length>0){
                        //         for (const submission of submissions) {
                        //             submittedByUser.push({
                        //                 title:test.title,
                        //                 submissionId:submission._id,
                        //                 submissionTime:submission.submissionTime
                        //             })
                        //         }
                        //     }
                        // })


                        return {
                            //TODO i has to if the test is expired
                            assignedToUser: testsArr.filter(test=>test.submissions.every(sub=>!sub.submittedBy.equals(userId))&&!test.isPersonalExercise).map(test=>{return {testId:test._id,title:test.title}}),
                            submittedByUser,
                            stats:{
                                allSubs:subsCount
                            }
                        }
                    default:{
                        return{
                            stats:{
                                allSubs:subsCount
                            }
                        }
                    }

                }
            }
            exports.getTestInfo = async(testId,userId)=>{
                const test = (await allModels.testModel.findById(testId).populate("madeBy")).toObject()
                const user = (await allModels.userModel.findById(userId).populate("classMembers")).toObject()
                // for all users
                test.questionsCount = test.questions.length
                test.workTime = calcWorkTimeForTest(test.startDate,test.endDate)
                test.createdBy = test.madeBy.username

                //for teacher
                test.isUserAbleToEdit = test.madeBy._id.equals(userId)
                test.isForTeacher = user.role === "teacher"

                if(test.isForTeacher){
                    test.availableStudents = [...user.classMembers]
                    for (const userElement of test.availableStudents) {
                        //if person have assigment and has submitted the test as TEST
                        if(test.assignedTo.some(id=>id.equals(userElement._id))){
                            userElement.isAssignedToUser = true
                            const testSubmission = test.submissions.find(sub=>sub.submittedBy.equals(userElement._id)&&sub.isSubmittedAsTest)
                            if(testSubmission){
                                userElement.submissionId = testSubmission._id
                            }
                        }else{
                            userElement.isAssignedToUser = false
                        }

                    }
                }else{
                    delete test.assignedTo
                    test.submissions = test.submissions.filter(el=>el.submittedBy.equals(userId))
                    test.isSubmittedAsTest = test.submissions.some(sub=>sub.isSubmittedAsTest)
                    test.isExpired = checkIfTestExpired(test)
                }



                for (const sub of test.submissions) {
                    delete sub.answers
                    delete sub.score
                }

                delete test.madeBy
                delete test.questions
                delete test.isDraft

                return test
            }


            function calcWorkTimeForTest(start,end){
                const timeDifference = Math.abs(end - start);
                const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                return formattedTime
            }





exports.getAllWords =async(userId)=>{
   return  models.wordModel.find({unknownFor:userId})
}
exports.getWordInfo=async(wordString)=>{
    return allModels.wordModel.findOne({word:wordString})
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
exports.createWordContainer =async(userId,colorCode,name,type = "custom")=>{
    const existingContainer = await allModels.wordsContainer.findOne({ownedBy:userId,name:name})
    if(existingContainer) throw new Error("Група със същото име вече съществува")

    const container = await allModels.wordsContainer.create(
        {
            ownedBy:userId,
            words:[],
            colorCode,
            name,
            type
        }
    )

}
exports.getUserWordContainer = (user,withPopulatedWords)=>{
    return withPopulatedWords?
        allModels.wordsContainer.find({ownedBy:user._id,type: { $ne: 'forUnknownWordsCircle' }}).populate("words.wordRef"):
        allModels.wordsContainer.find({ownedBy:user._id,type: { $ne: 'forUnknownWordsCircle' }})
}
exports.addWordToContainer =async(wordString,wordContainerId,userId)=>{
    let wordRecord = await allModels.wordModel.findOne({word:wordString})
    if(wordRecord){
        const wordContainerRecord = await allModels.wordsContainer.findById(wordContainerId)
        if(wordContainerRecord.words.some(el=>el.wordRef.equals(wordRecord._id))) throw new Error("вече е запазена в контейнера")
        wordContainerRecord.words.push({
            wordRef:wordRecord._id,
        })
        await wordContainerRecord.save()
    }else{
        const wordContainerRecord = await allModels.wordsContainer.findById(wordContainerId)
        wordRecord =  (await models.wordModel.create(
            {
                word:wordString.replace(/[^\w\s]/gi, ''),
                translatedText:"няма превод"
            }
        ))
        wordContainerRecord.words.push({
            wordRef:wordRecord._id,
        })
        await wordContainerRecord.save()

        saveWordFullInfo({text:wordString},wordRecord)
    }


}
exports.createWords =async(words,userId,res)=>{
    // const wordsAndTranslations = await exports.translateMultipleWords(words)
    const info = []

    for (const word of words) {

        word.text = word.text.replace(/[^\w\s]/gi, '');

        let wordRecord = await allModels.wordModel.findOne({word:word.text})
        const targetContainer = await allModels.wordsContainer.findOne({ownedBy:userId,name:word.targetContainer}).populate("words.wordRef") || await allModels.wordsContainer.findOne({ownedBy:userId,type:"unspecified"}).populate("words.wordRef")



            if(!wordRecord){
                wordRecord =  (await models.wordModel.create(
                    {
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


    if(wordWholeInfo.translation){
        wordRecord.translatedText = wordWholeInfo.translation
    }

    await createWordExamples(wordWholeInfo.info.examples,wordRecord)

    wordRecord.save()
}

exports.setTranslationToAllWords=async()=>{
    let c = 0

    const words = await allModels.wordModel.find({})
    for (const word of words) {
        c++
        console.log(c)
            const wordWholeInfo = await getWordWholeInfo(word.word)
            word.translatedText = wordWholeInfo.translation
            word.save()
        if(word.translatedText){
        }
    }

}


// function prepareForSendingNow(testType,container,answers,question,randomNumber){
//     let rightAnswer
//     switch (testType){
//         case utils.testTypes.randomWords:
//             rightAnswer = {
//                 _id:question._id,
//                 answer:question.translatedText,
//                 isCorrect : true,
//             }
//             break;
//         case utils.testTypes.fillWord:
//             rightAnswer = {
//                 _id:question._id,
//                 answer:question.word,
//                 isCorrect : true,
//             }
//             break;
//     }



    //place right answer on random place

    // switch (testType){
    //     case utils.testTypes.randomWords:
    //         container.push(
    //             {
    //                 sentenceWhereWordsIsPresent:question.examples[0].sentenceWhereWordsIsPresent,
    //                 sentenceWhereWordsIsPresentTranslation:question.examples[0].translation,
    //                 translation:question.translatedText,
    //                 wordId:question._id,
    //                 question:{
    //                     stringValue:question.word
    //                 },
    //                 possibleAnswers:answers,
    //                 testType
    //             }
    //         )
    //         break;
    //     case utils.testTypes.fillWord:
    //         container.push(
    //             {
    //                 question:{
    //                     stringValue:question.examples[0].sentenceWhereWordsIsPresent.replace(question.word,"____")
    //                 },
    //                 sentenceWhereWordsIsPresentTranslation:question.examples[0].translation,
    //                 wordId:question._id,
    //                 possibleAnswers:answers,
    //                 testType
    //             }
    //         )
    //         break;
    // }
// }


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
        const  sentenceWhereWordsIsPresent = (await exports.giveSentence(wordRecord.word))?.text
        if(sentenceWhereWordsIsPresent){
            const translation = await exports.translateText(sentenceWhereWordsIsPresent)
            payload.push(
                {
                    sentenceWhereWordsIsPresent,
                    translation
                }
            )
        }
    }
    wordRecord.examples = payload
    await wordRecord.save()
}
