const jwt = require("jsonwebtoken")
const util = require('util');
const path = require("path");
const userManager = require("../managers/userManager");
const {wordsContainer} = require("../models/allModels");
exports.sign = util.promisify(jwt.sign)
exports.verify = util.promisify(jwt.verify)





exports.isProduction = false


process.env.GOOGLE_APPLICATION_CREDENTIALS =path.join(__dirname,'./gc-cred.json')
exports.port = 3000
exports.secret = "kjsdhgLKJGHDLKJGHkljhlkjhh43iu4h8osioduhfis"
exports.supabaseAPIKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlemRhcnF0Y2t1amR4bmZ5eG96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMwODMxMjYsImV4cCI6MjAxODY1OTEyNn0.yF9fPsBpio--MgH-QpbqHfyFp3z3UO-1MZgWVkoF_WU"
exports.dropboxAccessToken = "sl.BreX7v7ZN5INnqzES9rbGC-bHLUD52tUEYt8JojoqxvHL4shqYvbRi6-6R0zzc3es1bZ1rGgAcXNdfVJagv1PInfzuM6MhL0gxtUvySq9Gq6ZVCIP-6MR_nt-6Xc-InqZnP5PSNrdLwR"
exports.FEdomains = [
    "https://theconfederacy.site",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:4173",
]
exports.testTypes ={
    randomWords:"randomWordsTests",
    textWords:"wordsFromChapterTests",
    textQuestions:"chapterPlotTests",
    matchFour:"matchFourTests",
    fillWord:"fillWord",
    justQuestion:"justQuestion"
}

exports.testTypesTranslated ={
    randomWordsTests:"Познай превода на думата",
    wordsFromChapterTests:"Познай превода на думата от текста",
    chapterPlotTests:"Въпроси от съдържанието на текста",
    matchFourTests:"Свържи четити с четири думи",
    fillWord:"Попълни липсващата дума",
}

exports.excersiceTypes ={
    randomWords:"randomWordsTests",
    fillWord:"fillWord",
}
exports.excersiceQuestionsCount = 8
exports.guardianNewsURL = (fromDate,page) => `https://content.guardianapis.com/search?show-fields=headline,bodyText,thumbnail,trailText,sectionName,webTitle&page=${page}&page-size=50&api-key=f96328e9-081e-43cc-ace9-c08daa8a174d&from-date=${fromDate}&order-by=oldest`
exports.GoogleTranslateAPI_KEY = "AIzaSyCwcafxQT_4clYPFoz6pR5C3KOAbNhvTc8"
exports.tmdbAPItoken = "fbfa933abdd195f5110498309e8859de"
exports.chatgptAccessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJjYXJpdmFuODEyNzQ5ODlAcHJvdG9ubWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sImh0dHBzOi8vYXBpLm9wZW5haS5jb20vYXV0aCI6eyJwb2lkIjoib3JnLTNmMW05QjY4ZkxOQnJVMUxKc0RlM1NwOSIsInVzZXJfaWQiOiJ1c2VyLVpUS09OdkM4VUVyMWFIeDljU3l3Zk5RRCJ9LCJpc3MiOiJodHRwczovL2F1dGgwLm9wZW5haS5jb20vIiwic3ViIjoiYXV0aDB8NjU1ZTE2NjZmZWY3NjViZGVmOTZlNjA3IiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcwMDY2NTEzMCwiZXhwIjoxNzAxNTI5MTMwLCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9yZ2FuaXphdGlvbi53cml0ZSBvZmZsaW5lX2FjY2VzcyJ9.hbJwi105EMnC3mMCxXrSC7vSBld66371eLeIANuEvSvlV-tXt23h8SlYObEE0DBIsfNDozaZZnGPqt2wu3aiCxtQYrKWNpa0v00oDcxbAvlWEx9Qni-dyo6A9KipM3F6JyoG4jrV9k52EQDq600nfS2BYEAnGBL8kMESA7fiRmMUB0Jlq9upaZRo9CGaF5XqPixJxRbdNMEMVgO4Fnu-2lPFgIp8Fzfflg-qM7rBbmufE3TWIJxb_hUijnRf2rc0tUhxl8syjQsnUn8x2uoUIuCi3irav_xWtJQD1L11kEa3VqOTlSHCDwOiPoqN7bg50Xt8A0pQozVai4EV8j8a1Q"
exports.stripeSecretKey="sk_test_51OEwwSAPrNaPFyVR8ratcB8BTCUKEMzYiSIF8iQiBNBzOmr2olTnhDeuRC0bAAdBqrUyisTg1CN4hEVFSapAmUnV00QqAC84Oj"
exports.openAIAPIkey = "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"
exports.openAIPReoxyToken = "pk-YkGnWlSytCvQzNQVUvPYkfRvCdFfxmFKcgGRYZAEdrXyHkaY"
exports.dbxAccessToken = "sl.Bqd8661L9fVn0Wf6cHyqhSu7SKPPCddVXUsBYpvoj9xzLqXuJMr0Jdx5AOrYoAJk8QGLjYnOXLo3wvsDQp2yQcK1tRX7nHoceo-af89pRK3-pAURe5DmR8DkmnzANiTFdPZ_to_WFBVq"
exports.facebookAppId = "350005497676561"
exports.facebookAppSecret = "201b0438ac600da907d9471d9ff0daf1"
exports.GoogleClientId = "638123872925-ss6qml6jnp2ltb4v11jtd63lkhgmrikk.apps.googleusercontent.com"
exports.GoogleClientSecret = "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"
exports.newsDATAapiKey = "pub_342489edad85920d094b8caf8cd28224293cc"
exports.translateAPI = "https://arlin-translate-lingva.vercel.app/api/v1/en/bg/"
exports.commonWords = [
    "a",
    "about",
    "above",
    "after",
    "again",
    "against",
    "ain't",
    "all",
    "am",
    "an",
    "and",
    "any",
    "are",
    "aren't",
    "as",
    "at",
    "be",
    "because",
    "been",
    "before",
    "being",
    "below",
    "between",
    "both",
    "but",
    "by",
    "can't",
    "cannot",
    "could",
    "couldn't",
    "did",
    "didn't",
    "do",
    "does",
    "doesn't",
    "doing",
    "don't",
    "down",
    "during",
    "each",
    "few",
    "for",
    "from",
    "further",
    "had",
    "hadn't",
    "has",
    "hasn't",
    "have",
    "haven't",
    "having",
    "he",
    "he'd",
    "he'll",
    "he's",
    "her",
    "here",
    "here's",
    "hers",
    "herself",
    "him",
    "himself",
    "his",
    "how",
    "how's",
    "i",
    "i'd",
    "i'll",
    "i'm",
    "i've",
    "if",
    "in",
    "into",
    "is",
    "isn't",
    "it",
    "it's",
    "its",
    "itself",
    "let's",
    "me",
    "more",
    "most",
    "mustn't",
    "my",
    "myself",
    "no",
    "nor",
    "not",
    "of",
    "off",
    "on",
    "once",
    "only",
    "or",
    "other",
    "ought",
    "our",
    "ours",
    "ourselves",
    "out",
    "over",
    "own",
    "same",
    "shan't",
    "she",
    "she'd",
    "she'll",
    "she's",
    "should",
    "shouldn't",
    "so",
    "some",
    "such",
    "than",
    "that",
    "that's",
    "the",
    "their",
    "theirs",
    "them",
    "themselves",
    "then",
    "there",
    "there's",
    "these",
    "they",
    "they'd",
    "they'll",
    "they're",
    "they've",
    "this",
    "those",
    "through",
    "to",
    "too",
    "under",
    "until",
    "up",
    "very",
    "was",
    "wasn't",
    "we",
    "we'd",
    "we'll",
    "we're",
    "we've",
    "were",
    "weren't",
    "what",
    "what's",
    "when",
    "when's",
    "where",
    "where's",
    "which",
    "while",
    "who",
    "who's",
    "whom",
    "why",
    "why's",
    "with",
    "won't",
    "would",
    "wouldn't",
    "you",
    "you'd",
    "you'll",
    "you're",
    "you've",
    "your",
    "yours",
    "yourself",
    "yourselves",
];
exports.defaultExp = 40

exports.inventoryItems = ["freeBook","chest","expMultiplier"]


exports.levelRewards = {
    "5": "expMultiplier",
    "6": "freeBook",
    "15": "freeBook",
    "20": "chest",
    "25": "expMultiplier",
    "30": "expMultiplier",
    "35": "chest",
    "40": "expMultiplier",
    "45": "expMultiplier",
    "50": "chest",
    "55": "chest",
    "60": "freeBook",
    "65": "expMultiplier",
    "70": "chest",
    "75": "chest",
    "80": "freeBook",
    "85": "freeBook",
    "90": "freeBook",
    "95": "expMultiplier",
    "100": "chest"
};
exports.advancements = [
    {
        id:1,
        name:"Достигни ниво 5",
        requirement:async (user)=>{
            const userLevel = userManager.calculateLevel(user.exp)
            return userLevel>=5
        },
        type:"level"
    },
    {
        id:2,
        name:"Запази 50 непознати нови думи",
        requirement:async (user)=>{
            const containers = await wordsContainer.find({ownedBy:user._id})
            const userUnknownWordsCount = containers.map(cont=>cont.words.length).reduce((acc,curr)=>acc+curr,0)
            return userUnknownWordsCount>=50
        },
        type:"words"
    },
]



exports.plansInfo =[
    {
        name:"Обикновен абонамент",
        benefits:[
            "Достъп до всяка книга",
            "4 множителя на опит",
            "3 съндъка с награди",
            "1000 опит",
        ] ,
        type:"basic",
        price:4.99,
        priceId:"price_1OnRkwAPrNaPFyVRqc1HU3qJ"
    },
    {
        name:"Ентусиазиран абонамент",
        benefits:[
            "Достъп до всяка книга",
            "9 множителя на опит",
            "5 съндъка с награди",
            "2500 опит",
        ] ,
        type:"enthusiastic",
        price:7.99,
        priceId:"price_1OnRjEAPrNaPFyVRN66a10fW"
    },
    {
        name:"Професионален абонамент",
        benefits:[
            "Достъп до всяка книга",
            "14 множителя на опит",
            "10 съндъка с награди",
            "3000 опит",
        ] ,
        type:"professional",
        price:8.99,
        priceId:"price_1OnRkQAPrNaPFyVRXBhdXZtG"
    },


]
exports.stripe = require('stripe')(exports.stripeSecretKey);
