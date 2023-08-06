const bcrypt = require("bcryptjs");
const db = require("../db"); 


const isUserValid = (req, res) => {
   
    const email = req.body.email;
    const pass = req.body.pass;

    console.log(email,pass, "login")

}

module.exports = {
    isUserValid
};