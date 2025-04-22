// mw stands for middle ware
// mw to check if the req body is proper nd correct 

const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const auth_config = require('../configs/auth.config')

const verifySignUpBody = async (req,res,next) =>{
    try{

        //check for all the essentials
        if(!res.body.name){ // 400 -> Bad request
            return res.status(400).send({
                message : "FAILED : Name was not provided"
            })
        }

        if(!res.body.email){
            return res.status(400).send({
                message : "FAILED : Email was not provided"
            })
        }

        if(!res.body.userId){
            return res.status(400).send({
                message : "FAILED : User ID was not provided"
            })
        }
        
        const user = await user_model.findOne({userId : req.body.userId})
        
        if(user){
            return res.status(400).send({
                message : "FAILED : User with same User ID exists"
            })
        }

        //sab pass ho gya toh move next
        next()

    }catch(err){
        console.log("Error while validating the request object ",err)
        res.status(500).send({ // 500 -> internal server error
            message : "Error while validating request bobject"
        })
    }
}

const verifySignInBody = (req,res,next) =>{
    if(!req.body.userId){
        return res.status(400).send({
            message : "User Id Not Provided"
        })
    }

    
    if(!req.body.password){
        return res.status(400).send({
            message : "Password Not Provided"
        })
    }

    next()
}

const verifyToken = async (req,res,next) =>{
    // check if token is present in header
    const token = req.headers['x-access-token']

    if(!token){
        return res.status(403).send({ // 403 bad req - unautherized
            message : "No Token Found"
        })
    }
    // is the token valid
    jwt.verify(token, auth_config.secretKey, async (err,decoded)=>{
        if(err) {
            return res.status(401).send({
                message : "Unautherized"
            })      
        }
        const user = await user_model.findOne({userId : decoded.id})
        // user id ko use karke token bnaya tha, isiliye decode karne pe wo mil jayegi 
        if(!user){
            return res.status(400).send({
                message : "Unautherized, User for the token doesn't exist"
            })
        }
        
        // setting user info to req body
        req.user = user

        // only go to next if verified
        next()
    })
}


const isAdmin = async (req, res, next) =>{
    const user = req.user // could i have used req.body.user???
    if(user && user.userType == "ADMIN"){
        next()
    }
    else{
        return res.status(403).send({
            message : "Only Admin User are allowed to access this endpoint"
        })
    }
}

module.exports = {
    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody,
    verifyToken : verifyToken,
    isAdmin : isAdmin
}