const OpenAI = require("openai")
const utils = require("../utils/utils")
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


const openai = new OpenAI({ apiKey: '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' });
exports.test=async ()=> {
    // const completion = await openai.chat.completions.create({
    //     messages: [{ role: "system", content: "You are a helpful assistant." }],
    //     model: "gpt-3.5-turbo",
    // });
    //
    // console.log(completion.choices[0]);
    // console.log(typeof makePlotTestForChapter)

    // const response = await fetch("http://localhost:8080/v1/completion", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         // "Authorization":"Bearer "+ utils.openAIPReoxyToken
    //     },
    //     body: JSON.stringify({
    //         model: "gpt-3.5",
    //         prompt: 'Explain me how starts works'
    //     })
    // });
    //
    // const data = await response.json()
    // console.log(response.ok)
    // console.log(data)

    // import("@waylaidwanderer/chatgpt-api")
    //     .then(async({BingAIClient })=>{
    //         const options = {
    //             // Necessary for some people in different countries, e.g. China (https://cn.bing.com)
    //             // "_U" cookie from bing.com
    //             userToken: '1nIGc_7ky5ZD5sMgpmGV6JmXnT6X9rekBXdr6hEsaXDr_MIPX5VUbjiuoycsL9ooON_SOyFnBDA5ZopHoPsfrf7P-UOT3KTwSseZ5ekhkpYqLZGid4Aci_VSnDGA5Uo7LT9wMqRVhl6iB_1f_vhd_KfhzIwJ3t7p_gsZIwriiVOIoYIMVbCyWo4C5gkrmguSFP2eR0h73UjAntVYrFtEuWA',
    //             // If the above doesn't work, provide all your cookies as a string instead
    //             // A proxy string like "http://<ip>:<port>"
    //             // (Optional) Set to true to enable `console.debug()` logging
    //             debug: false,
    //         };
    //
    //         let bingAIClient = new BingAIClient(options);
    //
    //         let response = await bingAIClient.sendMessage('Write a short poem about cats', {
    //             // (Optional) Set a conversation style for this message (default: 'balanced')
    //             toneStyle: 'balanced', // or creative, precise, fast
    //             onProgress: (token) => {
    //                 process.stdout.write(token);
    //             },
    //         });
    //         console.log(JSON.stringify(response, null, 2));
    //     })
    //     .catch((eee)=>{
    //         console.log(eee)
    //     })


// MongoDB connection
//     const mongoUrl = 'mongodb://localhost:27017';
//     const dbName = 'language-trough-literature';
//     const bucketName = "mongo0db-backup"
//
//     // await zipFolder()
//     const uploadFileToGCS = async (signedUrl, filePath) => {
//         const fileStream = fs.createReadStream(filePath);
//
//         const response = await fetch(signedUrl[0],
//                 {
//                     method:"POST",
//                     body:fileStream,
//                     headers: {
//                         'Content-Type': 'application/octet-stream',
//                     }})
//         console.log(response)
//
//     };
//
//     const options = {
//         version: 'v4',
//         action:"write",
//         expires: Date.now() + 15 * 60 * 1000,
//     };
//
// // Example usage
//     const signedUrl = await storage.bucket(bucketName).file("BACKUP").getSignedUrl(options);
//     const filePath = "P:\\Folder-Deliivanova\\SoftUni\\Repository\\React\\MongoDbBackUp\\backup.zip"
//
//     await uploadFileToGCS(signedUrl,filePath)
//
//     const watchDatabaseChanges = async () => {
//         const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
//         await client.connect();
//
//         const db = client.db(dbName);
//
//         // Get a list of all collections in the database
//         const collections = await db.listCollections().toArray();
//
//         // Set up change streams for each collection
//         collections.forEach(collection => {
//             const changeStream = db.collection(collection.name).watch();
//
//             changeStream.on('change', async (change) => {
//                 console.log(`Change detected in collection: ${collection.name}`);
//
//                 // Export the entire database
//                 const timestamp = new Date().toISOString().replace(/:/g, '-');
//                 const filePath = `/path/to/backup/${dbName}_${timestamp}.json`;
//                 await exportDatabase(filePath);
//
//
//                 try {
//                     const result = await uploadFileToGCS(signedUrl[0], filePath);
//                     console.log('File uploaded successfully:', result);
//                 } catch (error) {
//                     console.error('Error uploading file:', error);
//                 }
//
//                 // Send the exported data to Google Drive
//                 // await sendRequestToGoogleDrive(filePath);
//
//                 console.log('Backup and upload complete.');
//             });
//         });
//     };
//
//     const exportDatabase = async (filePath) => {
//         const dumpCommand = `P:\\Folder-Deliivanova\\SoftUni\\Repository\\React\\mongo tools\\mongodump.exe --db language-trough-literature --out P:\Folder-Deliivanova\SoftUni\Repository\React\MongoDbBackUp`;
//         await runCommand(dumpCommand);
//     };
//
//     const runCommand = (command) => {
//         const { execSync } = require('child_process');
//         execSync(command);
//     };
//
//     watchDatabaseChanges()
//         .catch(error => console.error(error))
//         // .finally(() => client.close());
//
//
// Import Node.js's native file system module for reading and writing files

// Initialize a new Dropbox client with the access token from environment variables
//     await zipFolder()

    // const filePath = "C:\\Users\\mmano\\Downloads\\cbimage.png"



    // newsManager.setTodayNews()
    return {}

    // console.log("repsonse",await repsonse.json())


}


