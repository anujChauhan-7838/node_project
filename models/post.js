const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://anuj:anuj@179123@anujcluster.mlyjo.mongodb.net/master?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>{
    console.log('Connection created successfully');
}).catch((error)=>{
    console.log("connection error="+error);
})

const { Schema } = mongoose;

  const postSchema = new Schema({
    userId:Number,
    id :  Number,
    title: String,
    body:   String,
    comments: [{
        postId:Number,
        id: Number,
        name:String,
        body: String
    }]

    
  });
  const postC = mongoose.model('post', postSchema);


  const bulkInsert = (data)=>{
   var totalCount = postC.estimatedDocumentCount();
   totalCount.then((count)=>{
     if(!count){
      postC.insertMany(data).then(()=>{}).catch((error)=>{console.log('Error='+error)});
     }
   });
     return true;
  }

  const getAllUserPosts = (userId)=>{
    let qr = !userId ? {}:{'userId':userId};
    console.log(qr);
     let allUsersPost = postC.find(qr);
     return allUsersPost;
  }

  module.exports = {bulkInsert,getAllUserPosts}