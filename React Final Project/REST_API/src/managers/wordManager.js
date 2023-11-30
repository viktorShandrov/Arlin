

const models = require("../models/allModels");
const utils = require("../utils/utils");
const { isOwnedByUser, isAdmin } = require("../managerUtils/managerUtil");
const allModels = require("../models/allModels");
const fetch = require('isomorphic-fetch');


import('random-words')
    .then(async (randomWordsModule )=>{
        globalThis.fetch = (await import('node-fetch')).default;

        const randomWords = randomWordsModule;
        import("chatgpt")
            .then(async(chatgpt)=>{



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
                                const trimmedStr = getRandomWord(filteredWords).replace(/^[,.\s:]+|[,\s:"']+$/g, "");
                                testWords.push(trimmedStr)
                            }

                            return await makeTestOutOfWords(testWords)
                        }if(testType === utils.testTypes.textQuestions){
                            // 3 questions from the text
                        }
                    }
                    exports.makePlotTestForChapter =async (chapter)=>{

                    }
                    exports.storeTestForChapter =async (chapter)=>{
                        // const API = new ChatGPTUnofficialProxyAPI({
                        //     accessToken: utils.chatgptAccessToken,
                        //     apiReverseProxyUrl: "https://ai.fakeopen.com/api/conversation" ,
                        // })
                        //
                        // const Response = await API.sendMessage("Hello")

                        // const response = await fetch("https://api.pawan.krd/v1/completions",{
                        //     method :"POST",
                        //     headers:{
                        //         "Content-Type":"application/json",
                        //         "Authorization":"Bearer "+ utils.openAIPReoxyToken
                        //     },
                        //     body:JSON.stringify(
                        //         {
                        //         "model": "pai-001-light-beta",
                        //         "prompt": exports.makeGPTInput(chapter.text),
                        //         // "temperature": 0.7,
                        //         "max_tokens": 240,
                        //         // "stop": [
                        //         //     "Human:",
                        //         //     "AI:"
                        //         // ]
                        // }
                        //     )
                        // })
                        try {
                            const apiKey = "Vcm0eWkTJDLFojmyyDYcTB2rFDV6vFBTiNfs9F4q"
                            const response = await fetch("https://api.cohere.ai/v1/generate",{
                                method:"POST",
                                headers:{
                                    "Content-Type":"application/json",
                                    "accept": "application/json",
                                    "Authorization":`Bearer ${apiKey}`,
                                },
                                body:JSON.stringify({



                                    "prompt":exports.makeGPTInput(chapter),
                                    "connectors": [{"id": "web-search"}]

                                })
                            })
                            const data = (await response.json()).generations[0].text.slice(0,-3)
                            const parsedData = JSON.parse(data)
                            console.log(data)
                            console.log(parsedData)

                            for (const questionElement of parsedData) {
                               await allModels.chapterQuestionsModel.create(
                                    {
                                        chapterId:chapter._id,
                                        question:questionElement.question,
                                        answers:questionElement.options,
                                    }
                                )
                            }
                        }catch (error){
                            console.log(error)
                        }



                        // import("openai")
                        //     .then(async(openaiImport)=>{
                        //         const {Configuration, OpenAIApi} =openaiImport
                        //         console.log(Configuration)
                        //         const configuration = new Configuration({
                        //             apiKey: utils.openAIAPIkey,
                        //             basePath: "https://api.pawan.krd/v1",
                        //         });
                        //
                        //         const openai = new OpenAIApi(configuration);
                        //
                        //         const response = await openai.createCompletion({
                        //             model: "text-davinci-003",
                        //             prompt: "Human: Hello\nAI:",
                        //             temperature: 0.7,
                        //             max_tokens: 256,
                        //             top_p: 1,
                        //             frequency_penalty: 0,
                        //             presence_penalty: 0,
                        //             stop: ["Human: ", "AI: "],
                        //         });
                        //
                        //         console.log(response.data.choices[0].text);
                        //     })


                        // const sdk = require('api')('@pplx/v0#1k349py3lp77geqk');
                        //
                        // sdk.post_chat_completions({
                        //     model: 'mistral-7b-instruct',
                        //     messages: [{content: 'string', role: 'system'}],
                        //     max_tokens: 0,
                        //     temperature: 1,
                        //     top_p: 1,
                        //     top_k: 0,
                        //     stream: false,
                        //     presence_penalty: 0,
                        //     frequency_penalty: 1
                        // })
                        //     .then(( data ) => console.log(data))
                        //     .catch(err => console.error(err));


                        // const response =await  fetch("https://api.perplexity.ai/chat/completions",{
                        //     method:"POST",
                        //     headers:{
                        //         "content-type": "application/json ",
                        //         "accept": "application/json"
                        //     },
                        //     body:JSON.stringify({
                        //         "model": "mistral-7b-instruct",
                        //         "messages": [
                        //             {
                        //                 "role": "system",
                        //                 "content": "Be precise and concise."
                        //             },
                        //             {
                        //                 "role": "user",
                        //                 "content": "How many stars are there in our galaxy?"
                        //             }
                        //         ]
                        //     })
                        //
                        // })
                        // if(!response.ok){
                        //     console.log("not ok")
                        // }
                        // const data = await response.json()

                        // let splitedText = data.choices.text.split("\n")
                        // splitedText = trimResponseArray(splitedText)
                        // const test = []
                        //
                        // for (let i = 0; i < splitedText.length; i+=5) {
                        //     test.push(getQuestionAndAnswersObj(i,splitedText))
                        // }
                        // for (const questionElement of test) {
                        //    await allModels.chapterQuestionsModel.create(
                        //         {
                        //             chapterId:chapter._id,
                        //             rightAnswerIndex:questionElement.rightAnswerIndex,
                        //             answers:questionElement.answers,
                        //         }
                        //     )
                        // }
                        return test
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
                    exports.makeGPTInput=(chapterText)=>{
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
            })




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

