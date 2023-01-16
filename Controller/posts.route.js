const express = require('express');
const { PostModel } = require('../Model/posts.model');

const postRouter = express.Router();

postRouter.use(express.json())

postRouter.get('/',async(req,res)=>{
    const query = req.query
    try{
        const posts = await PostModel.find(query)
        res.send(posts)
    }catch(err){
        res.send(err)
    }
})
postRouter.post('/create',async(req,res)=>{
    const payload = req.body
    try{
        const post = new PostModel(payload)
        await post.save()
        res.send("post Created !")
    }catch(err){
        res.send(err)
    }
})
postRouter.patch('/update/:id',async(req,res)=>{
    const ID = req.params.id
    const payload = req.body
    const post = await PostModel.find({"_id":ID})
    const userID_in_post = post[0].userID
    const userID_making_req = req.body.userID
    try{
        if(userID_making_req!==userID_in_post){
            res.send("You are not Authorized !")
        }else{
            await PostModel.findByIdAndUpdate({"_id":ID},payload)
            res.send("updated the post !")
        }
        
    }catch(err){
        res.send("Somthing went wrong while updating !")
    }
})
postRouter.delete('/delete/:id',async(req,res)=>{
    const ID = req.params.id
    const post = await PostModel.find({"_id":ID})
    const userID_in_post = post[0].userID
    const userID_making_req = req.body.userID
    try{
        if(userID_making_req!==userID_in_post){
            res.send("You are not Authorized !")
        }else{
            await PostModel.findByIdAndDelete({"_id":ID})
            res.send("Deleted the post !")
        }
        
    }catch(err){
        res.send("Somthing went wrong while Deleting !")
    }
})


module.exports = {
    postRouter
}