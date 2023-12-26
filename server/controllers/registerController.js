const bcrypt = require("bcryptjs");
const db = require("../db"); 


const userRegister = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.pass;
    const pass_repeat = req.body.pass_repeat;
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if ( !name ) return res.json({ message: "Please, insert nick !" })
    if ( !email ) return res.json({ message: "Please, insert e-mail !" })
    if(!emailRegex.test(email)) return res.json({ message: "Wrong e-mail format !" })
    if ( !pass || !pass_repeat) return res.json({ message: "Please, insert password !" })
    if ( pass !== pass_repeat) return res.json({ message: "Passwords do not match !" })


    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) =>{
        if(error) {
           return console.log(error);
        } 
        if ( results.length > 0 ) {
            return res.json({ message: "The e-mail is already taken !" });
        }


        let hashedPassword = await bcrypt.hash(pass_repeat, 8);

        db.query('INSERT INTO users (`user_id`,`nickname`, `email`, `pass`) VALUES (0,?,?,?)', [name, email, hashedPassword], (error, results) =>{
            if(error) {
                console.log(error);
            } else {
                return res.status(200).json({ messageGreen: "Registration was successful" });
            }
        });
    });
};


module.exports = {
    userRegister
};