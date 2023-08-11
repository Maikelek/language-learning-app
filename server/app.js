const express = require('express'); 
const cors = require("cors"); 
const bodyParser = require('body-parser');
const session = require('express-session');

require("dotenv").config();

const app = express()

app.use(bodyParser.urlencoded({extended: true}));  
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(
  session({
    key: "user",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 86400000 // 1 day
    }
})
);


app.get("/", (req, res) => { 
  return res.json("Backend server VerboLingo");
})

const registerRouter = require('./routes/registerRouter');
app.use('/register', registerRouter);

const authRouter = require('./routes/authRouter');
app.use('/auth', authRouter);

app.listen(process.env.PORT, () =>{      
    console.log("Backend is on port " + process.env.PORT);
})