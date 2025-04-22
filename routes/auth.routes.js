// create a post call for a url 
// and then intercept it 

const authController = require("../controllers/auth.controller")
const authMW = require("../middlewares/auth.mw")

// takes an app object , app obj created thru express has the ultimate control 
module.exports = (app) =>{
    app.post("/ecomm/api/v1/auth/signup", [authMW.verifySignUpBody], authController.signup) // post call -> handover to right controller
}