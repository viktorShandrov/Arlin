const OpenAI = require("openai")

const openai = new OpenAI({ apiKey: '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' });
exports.test=async ()=>{
    // const completion = await openai.chat.completions.create({
    //     messages: [{ role: "system", content: "You are a helpful assistant." }],
    //     model: "gpt-3.5-turbo",
    // });
    //
    // console.log(completion.choices[0]);
}