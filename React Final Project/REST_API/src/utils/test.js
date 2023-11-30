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
    // return {}
    const apiKey = "Vcm0eWkTJDLFojmyyDYcTB2rFDV6vFBTiNfs9F4q"
    const repsonse = await fetch("https://api.cohere.ai/v1/generate",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "accept": "application/json",
            "Authorization":`Bearer ${apiKey}`,
        },
        body:JSON.stringify({



            "prompt":  wordManager.makeGPTInput(`
            Hi, Mike-One," I said.

"Good morning, Daddy." Very formal, and solemn. A bad sign, I thought.

I gave him a big reassuring grin and waved him into a chair. "This is a pleasant surprise, Mike-One. I hardly ever have a caller during Ice Cream Recess."

He squirmed in the chair, looking down at his feet. "I—I could come back later, Daddy."

"No, no," I said hastily, "that's all right. A feller must have something pretty important on his mind to bring him all the way up to Daddy's office at Ice Cream time."

Mike-One fidgeted. He tugged at a lock of hair and began to twist it. "Well...."

"Come on," I cajoled. "What's it all about? That's what Daddy's here for, you know—to listen to your troubles!"

He scuffed his feet around on the floor. Then he took out a handkerchief and blew his nose. "Well ... see, I got a buddy—well, he ain't really my best buddy, or even second best. Sometimes we play chess together. Or checkers, only he thinks checkers is silly."

I cleared my throat and smiled patiently, waiting for him to come to the point. When he didn't go on I said, "What's his name?"

"Uh ... Adam."

"Adam-Two, or -Three?"

"-Two."

I nodded. "Okay, go on."

"He talks crazy, an' he's always wonderin' about things. I never seen a kid to wonder so much. An' he's only twenty-three."

I nodded again. "And now he's got you to wonderin' about something and you want Daddy to straighten you out. Right?"

"Uh-huh."

"Okay," I said, "shoot!"

He sniffed and scuffed his feet and scrooched around in the chair some more. Then suddenly he opened his eyes wide and looked me square in the face and blurted: "Is there really a Santa Claus?"

The grin I was wearing froze on my face. It seemed I'd been waiting twenty years for one of the Kids to ask me that question. Daddy, is there a Santa Claus? A loaded question, loaded and fused and capable of blasting the Fairyland Experiment into space-dust.

Mike-One was waiting for an answer, I had to deal with the crisis of the moment and worry about implications later.

I stood up and walked around the desk and put my hands on his shoulders. "Mike," I said, "how many Christmases can you remember?"

"Gee, Daddy, I don't know. Lots and lots."

"Let's see, now. You're thirty-eight, and Christmas comes twice a year, so that's two times thirty-eight—seventy-six Christmases. Of course, you can't remember all of them. But of the ones you remember, did you ever not see Santa Claus, Mike?"

"No, Daddy. I always saw him."

"Well then, why come asking me if there is such a person when you know there is because you see him all the time?"

Mike-One looked more uncomfortable than ever. "Well, Adam-Two says he don't think there is a Cold Side of Number One Sun. He thinks it's hot all the way around, an' if that's so then Santa Claus couldn't live there. He says he thinks Santa Claus is just pretend an' that you or somebody from the Council of Uncles dresses up that way at Christmastime."

I scowled. How the devil had Adam-Two managed to figure that one out?

"Listen, Mike," I said. "You trust your Daddy, don't you?"

"Golly. Course I do!"

"All right, then. There is a Santa Claus, Mike-One. He's as real as you or me or the pink clouds or the green rain.... He's as real as Fairyland itself. So just don't pay any more attention to Adam-Two and his crazy notions. Okay?"

He grinned and stood up, blinking his eyes to hold back the tears. "Th-thank you, Daddy!"

I clapped him on the back. "You're welcome, pal. Now if you hurry, you just might get back down in time for a dish of ice cream!"

When the indicator over the elevator door told me that Mike-One had been safely deposited at the bottom of Daddy's Tower, I walked across the circular office to the windows facing the Compound.

Ice Cream Recess was about over and the Kids were straggling out in all directions from the peppermint-striped Ice Cream and Candy Factory just to the right of the Midway entrance. Except for the few whose turn it was to learn "something new" in Mommy's school room, they were on their own from now until Lunchtime. It was Free-Play period.

From my hundred-foot high vantage point, I watched them go; walking, running, skipping or hopping toward their favorite play spots. They had their choice of the slides and swings in the Playground, the swimming pool, tennis courts, ball diamond, gridiron, golf course, bowling alley and skating rinks—and of course, the rides on the Midway.

I watched them go, and my heart thumped a little faster. My gang, I thought.... Not really mine, of course, except from the standpoint of responsibility, but I couldn't have loved them more if I'd sired each and every one of them. And Mommy (sometimes I almost forgot her name was Ruth) felt the same way. It was a funny thing, this paternal feeling—even a little weird, if I stopped to remember that a baker's dozen of them were actually older than I. But a child is still a child, whatever his chronological age may be, and the inhabitants of Fairyland were children in every sense except the physical.

It was a big job, being Daddy to so many kids—but one that had set lightly on my shoulders, so far. They were a wonderful gang, healthy and happy. Really happy. And I couldn't think of a single place in the Universe where you'd find another hundred and thirty-seven human beings about whom you could make that statement.

A wonderful gang ... all sizes and shapes and personalities, ranging in physical age from five to forty-three. Mental age ... well, that was another story. After years of research and experimentation, we'd settled on eight as the optimum of mental development. And so, there wasn't a Kid in Fairyland mentally older than eight years....

Or was there?

Mike-One's confused story of his friend Adam-Two re-echoed in my head. He says he don't think there is a Cold Side of Number One Sun. He thinks it's hot all the way around. He says he thinks Santa Claus is just pretend....

Something was wrong. Something big and important and dangerous, and I didn't know what I was going to do about it. Adam-Two, unlike some of the older Kids, had been born in Fairyland. There wasn't one single solitary thing in his life history to account for this sudden, terrifying curiosity and insight. Nothing. Not even pre-natal influence, if there is such a thing.

I wondered if Ruth had noticed anything strange about him. If so, she'd never mentioned it.

I decided I'd better have a Daddy-and-son chat with young Adam right away.

I walked through the Midway in the warm, twin-star sunshine, waving and shouting back at the Kids on the rides who shrieked "Hi, Daddy!" as they caught sight of me. Nobody had seen Adam-Two, so I escaped after a brief roller coaster ride ("Aw, come on Daddy, just once!") with a trio of husky thirty-year-olds who called themselves the "Three Bears."

Adam-Two wasn't at the Playground either, nor the Swimming Pool, nor the Tennis Courts. I decided he must be in the Recreation Hall, so I headed in that direction, taking a short cut through Pretty Park at the north end of the Midway. The park was a big place, stretching east and west from the Baseball Diamond to the Pony Stables at the edge of Camping Woods, and northward as far as the Golf Course.

This was my favorite spot in Fairyland. I always came here when I wanted to relax, or think something through without any interruptions. It had once been an oasis on this otherwise barren desert planet, and was therefore the logical site for the Fairyland Compound. An underground spring in the center of the park was our main water supply. The clear, cold fluid bubbled out of the rocks to form a lovely lake which was perhaps fifty yards across at the widest part. The lakeshore was ringed with tall, unearthly palm-like trees—strange and beautiful.

I found Adam-Two there beside the lake, sitting on a rock with his shoes and socks off, dangling his bare feet in the cold water and gazing upward into the swaying tree-tops.

"Hi, Adam-Two!"

"Hello." He didn't seem either surprised or glad to see me.

He was above average height, well over six feet, and exceptionally thin. Physically awkward, too, I remembered. He invariably struck out on the Ball Diamond, invariably sliced into the rough on the Golf Course. His hair was dark and curly and he had a nervous way of ruffling it with his fingers, so that it was always in disarray.

But the most unusual thing about him was his eyes. They were ice-blue, set deep back under a high, ridged forehead. They stared out at you with a kind of ruthless, unblinking intensity that made you uncomfortable, and I wondered why I'd never noticed those eyes before. It was like looking at a stranger, though I'd known him since he was little more than a baby.

I sat down alongside him on the rock. "Whatcha doin'?"

He didn't answer for awhile. His bare feet made white froth in the water. At last he said, "Thinking."

I waited, but apparently he wasn't going to elaborate. "I hear tell you've been doing some of your thinkin' out loud," I said quietly.

No answer.

"It's all right to think," I went on. "That's good for us. But a feller ought to be careful about sounding off to the other Kids about somethin' maybe he don't know anything about."

Still no answer. He kept lashing the water with his feet. His indifference and lack of attention were beginning to annoy me, and I was annoyed at myself for being annoyed with him and for beating around the bush with him.

"What makes the trees grow?"

His query was so sudden and unexpected that it caught me off guard. That made me more annoyed than ever.

"You're supposed to have learned that from Mommy in school," I said curtly.

Another long pause. "She says the fairies touch the trees and flowers with their magic wands. She says that's what makes them grow."

"That's right."

"I don't believe in fairies," he said, matter-of-factly.

I scowled fiercely at him. "Oh, you don't, eh? First it's Santa Claus, now the fairies. The next thing we know you'll stop believing in Mommies and Daddies!"

He looked up into the tree-tops again. "I think the sun has something to do with it," he went on, as though I hadn't said a word. "They seem to be sort of reaching for the sun, as if the sun gave them life...."

His eyes met mine—cold and intensely blue and very frank. "Why don't you tell me the truth?"

I stood up, fighting to control my rising anger. "Are you calling your Daddy a liar?" I shouted.

"I only asked a simple question."

"All right." I was regaining a little of my composure, but it was evident that I needed more time to think this through. "Let's just forget it for now.... Let's go over to the Rec Hall and have a game of chess, shall we?" Adam was Chess Champ of Fairyland.

Splash-splash-splash. His feet fluttered wildly in the water again. "I can't," he said. Splash-splash-splash.

I raised my eyebrows. "Why not?"

"I'm not through thinking."

What he needs is a spanking, I thought grimly. But spankings were outlawed in Fairyland. They were old-fashioned, and conducive to the generation of neuroses. I'd never considered the regulation as a handicap—until now.

"Okay, feller," I said, with exaggerated calm, "but just let me hear one more report—just one, mind you—about you telling the Kids there's no Santa Claus, or no fairies, and you'll be on the No Ice Cream List for a month!"

Splash-splash-splash. "I get tired of ice cream every day."

I stalked away, not trusting myself to speak.

That night after the Kids were bedded down in the dormitories, Mommy and I stretched out in our lounge-chairs to watch the video-cast from Earth. The news was dull, the kind that reminds you history repeats itself, and so what?

The Martian colony was complaining about taxes and threatening to secede; the campaign for Galaxy Manager was in full swing and the network was allotting equal mud-slinging and empty-promise time to each Party; the Solar Congress had doubled the defense budget for next year; and an unconfirmed report had been received that an unidentified space ship had landed on the dark side of Earth's moon. I yawned and switched off the set.

"Why the hell does anybody want to live on Earth?" I said.

Ruth smiled at me, a sympathetic wifely smile. She'd been watching me all evening and she knew something wasn't right. "What's the matter, Harry?"

I sighed. "Tell me about Adam-Two."

"Oh, Him."

"Yeah. Him."
            `),
            "connectors": [{"id": "web-search"}]

        })
    })
    console.log("repsonse",await repsonse.json())

}


