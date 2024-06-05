const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connetDB = async() => {
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected", connect.connection.host, connect.connection.name);
    }catch(err){
        console.error(err);
        process.exit(1);
    }
} 

module.exports = connetDB;