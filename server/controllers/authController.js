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
  
      const token = jwt.sign({ userId: results[0].user_id, isAdmin: results[0].user_is_admin }, process.env.JWT_SECRET);
  
      return res.json({ token, message: "ok" });;
  
      });
  };


module.exports = {
    isUserValid,
}