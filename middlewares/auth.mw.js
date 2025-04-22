// mw stands for middle ware
// mw to check if the req body is proper nd correct 

const user_model = require("../models/user.model")

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

module.exports = {
    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody
}