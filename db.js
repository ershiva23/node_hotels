const mongoose = require('mongoose');

//define mongodb connection url-->'mongodb://localhost:27017/mydatabase'
const mongoUrl = process.env.MONGODB_URL_LOCAL; // here replace mydatabase with our db  
//const mongoUrl= process.env.MONGODB_URL;
require('dotenv').config();
//setup mongodb connection
mongoose.connect(process.env.MONGODB_URL_LOCAL);

//get the default connection
//Mongoose maintains a default connection object representing the mongodb connection
const db=mongoose.connection;
//define event listner for db connection
db.on('connected',()=>{
    console.log('connected to db server'); 
})

db.on('error',(err)=>{
    console.error('db disconnected'); 
})

db.on('disconnected',()=>{
    console.log('db server disconnected'); 
})

//Export the Database Connection:
module.exports=db;