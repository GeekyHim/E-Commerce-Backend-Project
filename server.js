//Starting file of the project 

const express = require('express')
const mongoose = require('mongoose')
// express is function 
const app = express()
const server_config = require('./configs/server.config')
const db_config = require('./configs/db.config')
const user_model = require('./models/user.model')
const bcrypt = require('bcryptjs')

app.use(express.json()) // middleware
//whenever you get json read it as a js object


// create an admin user at start of the application, if not alrdy present
// phele connection with db to check and then create if not present
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on('error',()=>{
    console.log("ERROR when connectiong to MongoDB")
})

db.once('open',()=>{
    console.log("Successfully connected to MongoDB :", db_config.DB_URL)

    init()
})

async function init(){
    try{
        let user = await user_model.findOne({userId : "ADMIN"})

        if(user){
            console.log("Admin is already present")
            return
        }
    }catch(err){
        console.log("Error while reading data...")
    }
   
    try{
        user = await user_model.create({
            name : "Himanshu",
            userId : "ADMIN",
            email : "university.himanshu@gmail.com",
            userType : "ADMIN",
            // encrypt password
            password : bcrypt.hashSync("Welcome1",8)
        })
        console.log("Admin Created : ", user)

    }catch(err){
        console.log("Error while creating Admin", err)
    }
}

// sticth the route to the server

require("./routes/auth.routes")(app)
// calling routes and passing app object 
  // anonymous func? passed app as arg



// start server
// port number is customizable so hard-code nhi karege
app.listen(server_config.PORT, ()=>{
    console.log("Server Started at PORT :", server_config.PORT)
})




