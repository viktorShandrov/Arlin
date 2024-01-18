
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

exports.test=async ()=> {

    setTodayNews()
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


