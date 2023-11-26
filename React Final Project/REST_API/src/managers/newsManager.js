const fetch = require("isomorphic-fetch");
const models = require("../models/allModels")


exports.setTodayNews = async()=>{
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
exports.getAll=async()=>{
    return  models.newsModel.find({})
}
exports.get=async(id)=>{
    return  models.newsModel.find({id})
}