const bcrypt = require('bcryptjs')
const user_model = require("../models/user.model")

// need to write the controller / logic to register a user

// create/register a user, should be available as a module everywhere
exports.signup = async (req,res) => {
    
    //logic to create the user
    //1. read req body
    const request_body = req.body  // this gets me the req body in the form of js obj  


    //2. insert the data in the users collections in mongodb 
    //3. Return the response back to the user
    
    const userObj = {
        name : request_body.name,
        userId : request_body.userId,
        email : request_body.email,
        userType : request_body.userType,
        password : bcrypt.hashSync(request_body.password,8)

    }

    try{
        const user_created = await user_model.create(userObj)
        
        // return now
        const res_obj = {
            name : user_created.name,
            userId : user_created.userId,
            email : user_created.email,
            userType : user_created.userType,
            createdAt : user_created.createdAt,
            updatedAt : user_created.updatedAt
        } // this doesnt have password for security purposes

        res.status(201).send(res_obj) // 201 means successfully created
    }catch(err){
        consolele.log("Error while registering the user...",err)
        res.status(500).send({
            message : "Some Error Happened while registering the user"
        }) //500 means internal server error
    }
    
}
//contoller ke pass both req and res ka control hona chahiye 