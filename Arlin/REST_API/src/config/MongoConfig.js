const mongoose = require('mongoose');

let cachedConnection = null;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://viktor_shandrov:%2369BGshadopest43@learn-through-literatur.t3m1yqz.mongodb.net/';

exports.mongodbConfig = async () => {
    if (cachedConnection && mongoose.connection.readyState === 1) {
        return cachedConnection;
    }

    if (!cachedConnection) {
        cachedConnection = mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            bufferCommands: false,
        }).then((m) => {
            console.log("MongoDB connected successfully");
            return m;
        }).catch((err) => {
            cachedConnection = null;
            console.error("MongoDB connection error:", err);
            throw err;
        });
    }

    return cachedConnection;
};
