const express = require('express')
var jwt = require('jsonwebtoken');

const Authenticate =(req,res,next) => {
    const token = req.headers.authorization
    if(token){
        const decoded = jwt.verify(token, 'newuser')
        if(decoded){
            const userID= decoded.userID
            req.body.userID = userID
            next()
        }else{
            res.send("Please login First !")
        }
    }else{
        res.send("Please login !")
    }
}

module.exports = {
    Authenticate
}