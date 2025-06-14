const bcrypt = require("bcryptjs");
const db = require("../db"); 

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
      user = {id: results[0].user_id, name:results[0].nickname, email: results[0].email}
      req.session.user = user;
      return res.json({ message: "ok", user: user });
  
      });
};

const sessionExists = (req, res) => {
  if ( req.session.user) {
      res.send({ auth: true, user: req.session.user});
  } else {
      res.send({ auth: false, user: null});
  }
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
  } else {
        res.send({logout: false, message: "Session does not exist"})
      }
}


module.exports = {
    isUserValid,
    deleteSession,
    sessionExists
}