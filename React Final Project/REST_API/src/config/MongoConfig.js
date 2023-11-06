const mongoose = require('mongoose');

exports.mongodbConfig=()=>{
    mongoose.connect('mongodb://localhost:27017/language-trough-literature', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}