const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Header",
     "Origin, X-Requested-With, Content-Type, Accept"
     );
     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"
     );
    next();
}) 

// app.use((req, res, next) => {
//     console.log('First middleware')
// next();
// });

app.use('/api/posts', (req, res, next) => {
    const posts = [
        { id: 'fondjdnkdk', 
        title: 'First server-side post', 
        content: 'This is coming from the server'},

        { id: 'cneighkebrw', 
        title: 'Second server-side post', 
        content: 'This is coming from the server!'}
    ];
    res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: posts
    });

    });

module.exports = app;