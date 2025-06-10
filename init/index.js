const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

let MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main().then( () => {
    console.log('server is connected');
}).catch( (err) => {
    console.log(err);
})


async function main(){
    await mongoose.connect(MONGO_URL);
}

let data = initData.data;

const initDB = async () => {
    await Listing.deleteMany({});
    data = data.map( (obj) => ({ ...obj, owner: "68430ac9c475078911a86a2c"}));
    await Listing.insertMany(data);
    console.log("DB was initialized");
}

initDB();