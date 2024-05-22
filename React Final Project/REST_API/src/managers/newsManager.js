const fetch = require("isomorphic-fetch");
const models = require("../models/allModels")
const {newsDATAapiKey, guardianNewsURL} = require("../utils/utils");

const schedule = require('node-schedule');
const {newsModel} = require("../models/allModels");

function task() {
    exports.setTodayNews()
}

const job = schedule.scheduleJob('0 0 * * *', task);


process.stdin.resume();

// Handle termination signals to gracefully exit the script
['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, () => {
        process.exit(0);
    });
});



exports.setTodayNews = async()=>{
    // fetchViaNewsAPI()
    // fetchViaNewsDATA()

}
exports.getAll=async()=>{
    return  models.newsModel.find({})
}
exports.getPaginated=async(start)=>{
    return  models.newsModel.find({})
        .skip(start)
        .limit(10)
}
exports.get=async(id)=>{
    return  models.newsModel.findById(id)
}
exports.getTopNews=async(id)=>{
    return  models.newsModel.find({}).sort({ publishedAt: -1 }).limit(10)
}
exports.getMovieReviews =async()=>{
    // https://api.themoviedb.org/3/discover/movie?api_key=fbfa933abdd195f5110498309e8859de&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1
    // https://api.themoviedb.org/3/movie/792307/reviews?api_key=fbfa933abdd195f5110498309e8859de
}

exports.fillDBWithNews = async(r,q,next)=>{
     const latestDate =  new Date((await getLatestNewFromDB()).publishedAt).toISOString().split('T')[0];
     const currDate = new Date().toISOString().split('T')[0];

     if(latestDate===currDate) return next()

    next()

    let page = 1
    let allPages = 0
    do{
        const articles =  await getArticles(latestDate??new Date().toISOString().split('T')[0],page)
        for (const article of articles.results) {
            const isAlreadySaved = (await newsModel.findOne({idFromSource:article.id}))
            if(!isAlreadySaved){
                await saveArticleToDB(article)
            }
        }

        ++page
        allPages = articles.pages

    } while(allPages!==page)

}

async function saveArticleToDB(data){
    if(
        !data.fields.headline||
        !data.fields.trailText||
        !data.fields.thumbnail||
        !data.webPublicationDate||
        !data.fields.bodyText||
        !data.pillarName
    ){
        return null
    }
    return newsModel.create({
        idFromSource:data.id,
        keywords: data.tags??[],
        title:data.fields.headline,
        description:data.fields.trailText,
        urlToImage:data.fields.thumbnail,
        publishedAt:data.webPublicationDate,
        content:data.fields.bodyText,
        category:data.pillarName
    })
}
async function getArticles(fromDate,fromPage){
    return (await((await fetch(guardianNewsURL(fromDate,fromPage))).json())).response
}

async function getLatestNewFromDB(){
    return  newsModel.findOne()
        .sort({ publishedAt: -1 }) // Sort in descending order based on the dateField
        .limit(1);
}



//old
function fetchViaNewsAPI(){
    const url = 'https://newsapi.org/v2/top-headlines?' +
        'country=us&' +
        'apiKey=bed9711e59814ef59ab510e3a7f99b8e';
    const req = new Request(url);
    fetch(req)
        .then(async function(response) {
            const articles = (await response.json()).articles
            for (const article of articles) {
                await models.newsModel.create(article)
            }
        })
}
function fetchViaNewsDATA(){
    const url = `https://newsdata.io/api/1/news?apikey=${newsDATAapiKey}&country=us`
    const req = new Request(url);
    fetch(url)
        .then(async function(response) {
            const newsData = await response.json()
            for (const news of newsData.results) {
                console.log(news)
                if(news.category.length===0||
                    !news.title||
                    !news.source_id||
                    !news.description||
                    !news.image_url||
                    !news.content

                ){
                    continue
                }
                await models.newsModel.create({
                    source_id:news.source_id,
                    title:news.title,
                    description:news.description,
                    urlToImage:news.image_url,
                    publishedAt:news.pubDate,
                    content:news.content,
                    category:news.category[0].split(", ")[0],
                    keywords:news.keywords?.length>0? news.keywords[0].split(", "):undefined
                })
            }

        })
}

const exampleRes = {
    article_id: '17ce7ba94e6e4022d7371087f090d1e1',
    title: 'Pakistani airstrikes on Iran killed 4 children and 3 women, a local official tells Iranian state television',
    link: 'https://abcnews.go.com/International/wireStory/pakistani-airstrikes-iran-killed-4-children-3-women-106470740',
    keywords: [ 'business, technology' ],
    creator: null,
    video_url: null,
    description: 'Pakistani airstrikes on Iran killed 4 children and 3 women, a local official tells Iranian state television',
    content: 'ONLY AVAILABLE IN PAID PLANS',
    pubDate: '2024-01-18 05:10:14',
    image_url: 'https://s.abcnews.com/images/US/abc_news_default_2000x2000_update_4x3t_384.jpg',
    source_id: 'abcnews',
    source_url: 'http://www.abcnews.go.com',
    source_priority: 313,
    country: [ 'united states of america' ],
    category: [ 'world' ],
    language: 'english',
    ai_tag: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
    sentiment: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
    sentiment_stats: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS'
}

