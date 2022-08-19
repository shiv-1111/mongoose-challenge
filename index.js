const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
app.use(bodyparser.json())

const port = 6000
const mongoURI = "mongodb://127.0.0.1:27017/mytestdb";

mongoose.connect(mongoURI)
.then(res => console.log('db connection success'))
.catch(err => console.log('error'))

const user = {
    title:{type:String},
    id:{type:String},
    description:{type:String}
}

const Blog = mongoose.model('users',user)

app.get('/',(req,res) => {
     res.send('hello world');
})

app.post('/contact',(req,res) => {
    console.log(req.body);
    const blog1 = new Blog ({
        title:req.body.title,
        id:req.body.id,
        description:req.body.description
    })
    blog1.save((err,result) =>{
        if(err){res.send('error')}
        else{res.send('data added')}
    })
})

app.get('/fetch',(req,res)=>{
    Blog.find({},(err,docs)=>{
        if(err){
            res.send('err')
        }else{
            res.send(docs)
        }
    })
})

app.put('/update/:id',(req,res)=>{
    Blog.updateOne({id:req.params.id},{id:"Updated"},(err,docs)=>{
        if(err){res.send("error")}
        else{res.send("db updated")}
    })
})

app.listen(6000,() => console.log("server started"))
