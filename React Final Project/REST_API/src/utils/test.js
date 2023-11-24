const OpenAI = require("openai")
const wordManager = require("../managers/wordManager");
const utils = require("../utils/utils")

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

    import("@waylaidwanderer/chatgpt-api")
        .then(async({BingAIClient })=>{
            const options = {
                // Necessary for some people in different countries, e.g. China (https://cn.bing.com)
                // "_U" cookie from bing.com
                userToken: '1nIGc_7ky5ZD5sMgpmGV6JmXnT6X9rekBXdr6hEsaXDr_MIPX5VUbjiuoycsL9ooON_SOyFnBDA5ZopHoPsfrf7P-UOT3KTwSseZ5ekhkpYqLZGid4Aci_VSnDGA5Uo7LT9wMqRVhl6iB_1f_vhd_KfhzIwJ3t7p_gsZIwriiVOIoYIMVbCyWo4C5gkrmguSFP2eR0h73UjAntVYrFtEuWA',
                // If the above doesn't work, provide all your cookies as a string instead
                // A proxy string like "http://<ip>:<port>"
                // (Optional) Set to true to enable `console.debug()` logging
                debug: false,
            };

            let bingAIClient = new BingAIClient(options);

            let response = await bingAIClient.sendMessage('Write a short poem about cats', {
                // (Optional) Set a conversation style for this message (default: 'balanced')
                toneStyle: 'balanced', // or creative, precise, fast
                onProgress: (token) => {
                    process.stdout.write(token);
                },
            });
            console.log(JSON.stringify(response, null, 2));
        })
        .catch((eee)=>{
            console.log(eee)
        })



}