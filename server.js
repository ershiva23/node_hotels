// // // console.log('server file is running');

// // //function callback in js

// // // function add(a,b){
// // //     return a+b;
// // // }

// // var add=(a,b)=>a+b;

// // var res= add(6,5);
// // console.log(res);

// // (function(){
// //     console.log("Hi shivanshu");
// // })();

// //callback function : ye tab execute hoga jab koi ek kam fn apna kam kr leta hai 
// //for eg lets make a callback fn

// // function callback(){
// //     console.log("hi shivanshu");
// // }

// //another way to call callback fn
// const add=function(a,b,shivanshu){
//     var res = a+b;
//     console.log("result :"+res);
//     shivanshu();
// }
// // add(3,4,function(){
// //     console.log('another way to make callback fn');
// // });

// //another way 
// add(3,4,()=>console.log('add completed'));
 
// var fs=require('fs');
// var os= require('os');

// //it gives detail about system
// var user = os.userInfo();
// console.log(user)
// //to get the name of the user
// console.log(user.username);

// fs.appendFile('greeting.txt','Hi '+ user.username+ '!\n' ,()=>{
//     console.log('file is created') ;
        
//     });
// const notes = require('./notes.js');
// var _ = require('lodash');
// var age=notes.age;
// console.log(age);
// //retrieve unique elements from the arr data
// var data = ["person","person",1,2,3,1,2,'name','age'];
// var filter = _.uniq(data);
// console.log(filter);
// console.log(_.isString(3));
// const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
// const jsonObject = JSON.parse(jsonString); 
// console.log(jsonObject.name); //converting json to object
const express = require('express')
const app = express();
const db=require('./db');
require('dotenv').config();
const PORT=process.env.PORT||3000; 
const passport=require('./auth');

//middleware function
const logReq=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);

    next();  //move to the new phase
}

//use middleware to all routes
app.use(logReq);


app.use(passport.initialize());
//body parser is a middleware library of express js
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body  



const personRoutes = require('./routes/personRoutes');
const menuItemRoutes=require('./routes/menuItemRoutes');

const localAuthMiddleware=passport.authenticate('local',{session:false})
app.get('/', function (req, res) {
res.send('Welcome to our hotel')
})

//use the router
app.use('/Person',localAuthMiddleware,personRoutes);
app.use('/menu',menuItemRoutes);
        
   


app.listen(PORT, ()=>{
console.log('listening on port 3000');
});