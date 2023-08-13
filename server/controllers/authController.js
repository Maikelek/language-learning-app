const bcrypt = require("bcryptjs");
const db = require("../db"); 
const jwt = require('jsonwebtoken');



const isUserValid = (req, res) => {
    const { email, pass } = req.body;
  
    if (!email || !pass) {
      return res.json({ message: "You must insert email and password" });
    }
  
    db.query("SELECT * FROM `users` WHERE email = ?", [email], async (error, results) => {
      if (error) {
        console.error(error);
        return res.json({ message: "Internal server error" });
      }
  
      if (results.length === 0) {
        return res.json({ message: "Your email or password is wrong!" });
      }
  
      const match = await bcrypt.compare(pass, results[0].pass);
      if (!match) {
        return res.json({ message: "Your email or password is wrong!" });
      }

      const user = {
        id: results[0].user_id,
        nickname: results[0].nickname,
        email: results[0].email,
      };
  
      jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" }, (err, token) => {
        if (err) {
          console.error(err);
          return res.json({ message: "Failed to generate token" });
        }
  
        return res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 86400000, // 1day
        }).json({ message: "ok", user });;
  
      });
    });
  };

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