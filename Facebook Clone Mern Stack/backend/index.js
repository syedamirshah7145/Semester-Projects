const express = require('express')
const cors = require('cors')
const app = express()
const mongoDb = require('./db')
mongoDb();

app.use(cors())
app.options('*', cors())
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type,Accept"
    );
    next();
})

app.use(express.json());
app.use('/api', require("./Routes/CreateUser"))
app.use('/api', require("./Routes/LoginUser"))
app.use('/api',require("./Routes/Profile"))
app.use('/api',require("./Routes/Friends"))
app.use('/api',require("./Routes/Posts"))
app.use('/api',require("./Routes/Pages"))
app.use('/api',require('./Routes/Follower'))
app.use('/api',require("./Routes/Message"))
app.use('/api',require("./Routes/User"))

app.get('/',(req,res) => {
    console.log("hello world")
})

app.listen(5000,()=>{console.log('listening on port 5000')})