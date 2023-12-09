const fetch = require('isomorphic-fetch');


exports.getAnswer=async(question)=>{

    // const data = {
    //     "id": "chatcmpl-3kkagbrzhsyke4uy89456",
    //     "object": "chat.completion",
    //     "created": 1702059279,
    //     "model": "C:\\Users\\mmano\\.cache\\lm-studio\\models\\TheBloke\\dolphin-2.2.1-mistral-7B-GGUF\\dolphin-2.2.1-mistral-7b.Q3_K_S.gguf",
    //     "choices": [
    //         {
    //             "index": 0,
    //             "message": {
    //                 "role": "assistant",
    //                 "content": " Hello there!\n```\nThe day come and gone,\nAnd the sun now bids adieu.\nBut as it sets, we meet,\nIn this realm of virtual sweets.\n```\n"
    //             },
    //             "finish_reason": "stop"
    //         }
    //     ],
    //     "usage": {
    //         "prompt_tokens": 0,
    //         "completion_tokens": 46,
    //         "total_tokens": 46
    //     }
    // }


    // return {message:data.choices[0].message.content}


    const response = await fetch("http://localhost:1234/v1/chat/completions",{
        headers:{
            "Content-Type":"application/json"
        },
        method:"POST",
        body:JSON.stringify({
            "messages": [
                { "role": "system", "content": "Always answer in rhymes." },
                { "role": "user", "content": question }
            ],
            "temperature": 0.7,
            "max_tokens": -1,
            "stream": false
        })
    })
    const data = await response.json()

    return {message:data.choices[0].message.content}
}
