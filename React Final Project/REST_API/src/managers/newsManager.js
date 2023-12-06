const fetch = require("isomorphic-fetch");
const models = require("../models/allModels")
const {newsDATAapiKey} = require("../utils/utils");

const schedule = require('node-schedule');

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
exports.get=async(id)=>{
    return  models.newsModel.findById(id)
}
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
    fetch(req)
        .then(async function(response) {
            const newsData = await response.json()
            for (const news of newsData.results) {
                console.log(news)
                await models.newsModel.create({
                    source:{
                        name:news.creator?news.creator[0]:null,
                    },
                    title:news.title,
                    description:news.description,
                    urlToImage:news.image_url,
                    publishedAt:news.pubDate,
                    content:news.content
                })
            }

        })
}