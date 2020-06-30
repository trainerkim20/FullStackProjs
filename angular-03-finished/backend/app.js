const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require('./models/post');

const app = express();

//insert passwrd and SRV to mongo
mongoose.connect()
.then(() => {
    console.log('Connected to database');
}) 
.catch(() => {
    console.log('Connection failed');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept"
     );
     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"
     );
    next();
});

app.post("/api/posts", (req, res, next) => {
    const posts = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    res.status(201).json({
        message: 'Psot added successfully!'
    });
});


// app.use((req, res, next) => {
//     console.log('First middleware')
// next();
// });


app.get('/api/posts', (req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: 'Posts fetched successfully!',
            posts: documents
    });
    // const posts = [
    //     { id: 'fondjdnkdk', 
    //     title: 'First server-side post', 
    //     content: 'This is coming from the server'},

    //     { id: 'cneighkebrw', 
    //     title: 'Second server-side post', 
    //     content: 'This is coming from the server!'}
    // ];
    
    });

    });

module.exports = app;