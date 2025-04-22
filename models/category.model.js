const mongoose = require("mongoose")
// category name and desc

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        require : true
    }
}, {timestamps : true, versionKey : false})

module.exports = mongoose.model('Category',categorySchema)
// name of collection creatted? (yes ho toh jata hai plural but kon sa? --> Ans. --> Categories)