const express = require("express");

const usersController = require('./controllers/usersController');
const postController = require('./controllers/postController');
const app     = express();

const port    = 3000;

app.use(function (req, res, next) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });
app.get('/',usersController.index);

app.get('/fetchUserFromPlaceholder',usersController.bulkDataInsert);

app.get('/getAllUsers/:userId?',usersController.getAllUsers);
app.get('/fetchPostAndCommentsFromPlaceholder',postController.bulkDataInsert)
app.get('/getAllPost/:userId?',postController.getAllUserPost)


app.listen(port,()=>{
    console.log(`Yes now it is listing on port ${port} `);
})