const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
require('dotenv').config();

const apis = require("./api")

const app = express()
app.use("/",apis)
app.use(bodyparser.json())

///// call back technique ////


// mongoose.connect(process.env.DB_URI,(err,response)=>{
//     if(err){
//         return console.log("oops problem detected while connecting DB. Error "+ err)
//     }
//     console.log("Successfully connected with mongoDB atlas!")
// })

///// promise handling technique ////

mongoose.connect(process.env.DB_URI).then((res)=>{
    console.log("Huurrah ! connected with mongodb atlas!")
}).catch((err)=>{
    console.log("Opps faced problem while connecting with mongoDB!")
})

app.listen(3000, (err,res)=>{
    if (err){
        console.log("ooppsss sorry unable to connect....")
    }
    else{
        console.log("Successfully connected and started listening !!!!")
    }
})