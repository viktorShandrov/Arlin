
const OpenAI = require("openai")
const utils = require("./utils")
const { MongoClient } = require('mongodb');
const { google } = require('googleapis');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const fs = require('fs');
const archiver = require('archiver');
const AdmZip = require('adm-zip');
const path = require('path');
require('dotenv').config();
const { Dropbox } = require('dropbox'); // Import the Dropbox SDK
const fetch = require('isomorphic-fetch');
const models = require("../models/allModels"); // Import a fetch-compatible library for making HTTP requests
const newsManager = require("../managers/newsManager")
const {response} = require("express");
const wordManager = require("../managers/wordManager");
const {setTodayNews} = require("../managers/newsManager");
const {createClient} = require('@supabase/supabase-js')
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const {translateChapter} = require("../managers/chapterManager");
const stripeManager = require("../managers/stripeManager");
const {wordModel} = require("../models/allModels");
const {translateAPI} = require("./utils");
const {createStripeProduct} = require("../managers/stripeManager");

exports.test=async ()=> {

    setTodayNews()
    // wordManager.fillDBwithWords()

    // await createStripeProduct("Обикновен абонамент",499,null,"month","basic")

    // await createStripeProductsFromExistingBooks()

    setTimeout(()=>{
        // translateChapter()
        // models.wordsContainer.create(
        //     {
        //
        //     }
        // )

    },0)
    async function putSentenceForWords(){
        try {
            const words = await models.wordModel.find({})
            let normal = 0
            let unnormal = 0
            for (const word of words) {
                // const sentenceWhereWordsIsPresent =  (await wordManager.giveSentence(word.word)).text
                if(!word.examples.length){
                    const payload = []
                    const sentencesWhereWordsIsPresent = (await((await fetch(translateAPI+encodeURI(word.word))).json())).info.examples
                    if(sentencesWhereWordsIsPresent.length){
                        for (let  sentenceWhereWordsIsPresent of sentencesWhereWordsIsPresent) {
                            sentenceWhereWordsIsPresent = sentenceWhereWordsIsPresent.replace(/<b>|<\/b>/g, '');
                            const translation = await wordManager.translateText(sentenceWhereWordsIsPresent)
                            payload.push(
                                {
                                    sentenceWhereWordsIsPresent,
                                    translation
                                }
                            )
                            normal++
                            console.log(`${normal} th normal`)
                        }
                    }else{
                        const  sentenceWhereWordsIsPresent = (await wordManager.giveSentence(word.word)).text
                        const translation = await wordManager.translateText(sentenceWhereWordsIsPresent)
                        payload.push(
                            {
                                sentenceWhereWordsIsPresent,
                                translation
                            }
                        )
                        unnormal++
                        console.log(`${unnormal} th unnormal`)

                    }
                    word.examples = payload
                    await word.save()
                }



            }
        }catch (e){
            putSentenceForWords()
        }

    }

    async function createStripeProductsFromExistingBooks(){
        const books = (await models.bookModel.find())

        for(const book of books) {
            await stripeManager.deleteProduct(book.stripeProductId)
            const {product,priceId} = await stripeManager.createBookStripeProduct(book,book.priceInCents)
            book.stripeProductId = product.id
            book.stripePriceId = priceId
            await book.save()

        }
    }


    // putSentenceForWords()


        // const supabase = createClient('https://pezdarqtckujdxnfyxoz.supabase.co', utils.supabaseAPIKey)
        //
        // async function uploadFile(file) {
        //     const { data, error } = await supabase.storage.from('images').upload('/image1', file)
        //     if (error) {
        //         console.log(error)
        //         // Handle error
        //     } else {
        //         console.log(data)
        //
        //         // Handle success
        //     }
        // }
        // const file = fs.readFileSync("src/utils/text.txt","utf-8")
        // console.log(file)
        // await uploadFile(file)




}


