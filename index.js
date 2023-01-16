const express = require('express');
require('dotenv').config()
const { connection } = require('./Config/db');
const { postRouter } = require('./Controller/posts.route');
const { userRouter } = require('./Controller/user.route');
const { Authenticate } = require('./Middlewares/auth.middleWare');

const app = express();

app.use(express.json())
app.use('/users',userRouter)
app.use(Authenticate)
app.use('/posts',postRouter)

app.listen(process.env.port,async(req,res)=>{
    try{
        await connection;
        console.log("Connected to DB")
    }catch(err){
        res.send(err)
    }
    console.log(`running on port ${process.env.port}`)
})