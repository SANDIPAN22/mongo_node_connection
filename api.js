const express = require("express")
const router = express.Router()
const bodyparser = require("body-parser")
const db_model = require("./db")


router.use(bodyparser.json())

router.get("/",(req,res)=>{
    res.send("hello world")
})
/////////// CRUD OPeratios ////////// 
// Models basically provide a list of predefined methods that are used to manipulate the data
// for inserting, updating, deleting and retrieving from the database collection.

// With that basic pattern, we’ll use the mongoose.model method to make it usable with 
//actual data and export it so that we can use in api.js.


// inserting  document using .save() method ==> using callback technique

router.post("/save",(req,res)=>{
    console.log(req.body)
    if (req.method != "POST"){
        res.send({"error":"The method is not allowed"},405)
    }
    else{
        
        const name = req.body.name
        const email = req.body.email

        const newEntry = new db_model({
            name,
            email
        })

        newEntry.save((err,data)=>{
            if(err){
                res.send({"error":"There is problem while entering the data..."})
            }
            else{
                res.send(data)

            }
        })
    }
})

// inserting the document using .save() method ===> following aync await approach
router.post("/save2", async(req,res)=>{
    const name = req.body.name
    const email = req.body.email 

    const newEntry = new db_model({
        name,
        email
})
    try{
    var data = await newEntry.save()
    res.send(data)
    }
    catch(err){
        res.send({"error":"error detected please check!! "})
    }
})

// inserting new record using .save method ===> promise (then/catch)
router.post("/save3", (req,res)=>{
    const name = req.body.name
    const email = req.body.email

    const newEntry = new db_model({
        name,
        email
    })
    newEntry.save().then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send({error: err})
    })
})

// reading the data from mongoDB  using .find() ==> callback

router.get("/get",(req,res)=>{
    db_model.find((err,data)=>{
        if (err){
            res.send({"error":"error while pulling the data"})
        }
        else{
            res.send(data)
        }
    })
})

// reading the data from mongoDB using .find() ===> async await

router.get("/get1", async(req, res)=>{
    try{
    var dataList = await db_model.find({"email":"tony@stark.com"})
    res.send(dataList)
    }
    catch(err){
        res.send({"error":"error while pulling the data"})
    }

})

// findOne()    ==> gives you the first match or only one record(if you dont provide any matching statement)
router.get("/get2",(req,res)=>{
    db_model.findOne({"name":"Tony Stark"}).then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send({"error":"error while pulling the data from MongoDB"})
    })
})


// remove 
router.post("/del", (req,res)=>{
    db_model.findByIdAndDelete(req.body.id,(err,data)=>{
        if(err){
            res.send({"error":"error while deleteing the selected record"})
        }
        else{
            res.send({"action":"successful Deletion", data})
        }
    })
})

// update
router.post("/update", async (req,res)=>{

    try{
    var data = await db_model.findByIdAndUpdate(req.body.id,{"name":req.body.name})
    res.send(data)
    }
    catch(err){
        res.send({"error":"error deteced"})
    }
})

// How to retrieve the latest 2 record from database collection
router.get("/last2", (req,res)=>{
    db_model.find({}).sort({"date":-1}).limit(2).exec((err,data)=>{
        res.send(data)

    })
})
module.exports = router