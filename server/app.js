const express = require('express'); 
const cors = require("cors"); 
const bodyParser = require('body-parser');

require("dotenv").config();

const app = express()

app.use(bodyParser.urlencoded({extended: true}));  
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.get("/", (req, res) => { 
  return res.json("Backend server VerboLingo");

})

app.listen(process.env.PORT, () =>{      
    console.log("Backend is on port " + process.env.PORT);
})