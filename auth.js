const localStrategy=require('passport-local').Strategy;
const passport = require('passport');
const Person = require('./models/Person');
passport.use(new localStrategy(async(USERNAME,password,done)=>{
    //authentication logic
    try{
        //console.log('Received credentials:',USERNAME,password);
        const user=await Person.findOne({username:USERNAME});
        if(!user){
            return done(null,false,{message:'Incorrect username.'});
        }
        const isPasswordMatch=user.comparePassword(password);
        if(isPasswordMatch){
            return done(null,true);
        }else{
            return done(null,false,{message:'Incorrect password.'});
        }

    }catch(err){
        return done(err);

    }
}))
module.exports=passport;