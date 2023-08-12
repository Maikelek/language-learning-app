const bcrypt = require("bcryptjs");
const db = require("../db"); 


const isUserValid = (req, res) => {
   
    const email = req.body.email;
    const pass = req.body.pass;

    if (!email || !pass) {
        return res.json({ message: "You must insert email and password" });
    } 
    
    else {
        db.query("SELECT * FROM `users` WHERE email = ?", [email], async (error, results) => {
            if (await bcrypt.compare(pass, results[0].pass)) {
                const user = {id: results[0].user_id, nickname:results[0].nickname, email: results[0].email}
                req.session.user = user;

                return res.json({ message: "ok", user});
            }

            else {
                let random = Math.floor(Math.random() * 7)
                if (random <= 2) {
                    return res.json({ message: "Your email or password is wrong!" });
                } else if (random <= 4) {
                    return res.json({ message: "The email or password you entered is not valid" });
                } else if (random <= 6) {
                    return res.json({ message: "Forgot your email or password?" });
                } else {
                    return res.json({ message: "Please write correct email or password!" });
                }  
            }
        }
    )}
}

const deleteSession = (req, res) => {
    if ( req.session.user ) {
        req.session.destroy(err => {
            if (err) {
                res.send({logout: false, message: "Problem with logging out"})
            } else {
                res.send({logout: true}) 
            }
        })
    } 
    
    else {
          res.send({logout: false, message: "Session does not exist"})
       }
}

module.exports = {
    isUserValid,
    deleteSession
}