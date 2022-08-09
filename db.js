const mongoose = require("mongoose")

// Schema: Schema is a representation of the structure of the data. 
//It allows us to decide exactly what data we want, and what options
// we want the data to have as an object.

const demoCollection = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,

        },
        date:{
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model("demo collection 01", demoCollection)