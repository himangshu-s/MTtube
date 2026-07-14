/*
As early as possible in your application, import and configure dotenv:
cuz we want the enironment varibales to load as soon as the the application opens. 

// index.js
require('dotenv').config()

so instead of this syntax we will use
*/
import dotenv from "dotenv";
import connectDB from "./db/index.js";
// then we have to config the doptenv just like the common js syntax
dotenv.config({
    path: './.env'
})




connectDB();


















/*
import express from "express";
const app= express();
// normal function call 
// function connectDB() {}
// connectdb()

// but there is another concept call effy.
// written as ()()   , means immediate function creation and immideaite function call.

( async () => {
    try{
        await mongoose.connect(`${process.env.MONGO
    // sometimes its possible that the express is n;t able tot talk to the backend, so it will ssghow the error hwere.
    // it can listen many evenDB_URI}/${DB_NAME}`)
app.on("error", (error)=> {t by using on , one is error
    console.log("error", error)
    throw error;
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})
    } catch(error){
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }

})()
    */