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

  const userSchema = new Schema({
    id :  Number,
    name: String,
    username:   String,
    email:   String,
    address: {
        street: String,
        suite: String,
        city:String,
        zipcode:String,
        geo: {
          lat: String,
          lng: String
        }
      },
      phone: String,
      website: String,
      company: {
        name: String,
        catchPhrase: String,
        bs: String
      }
  });
  const userC = mongoose.model('user', userSchema);


  const bulkInsert = (data)=>{
   var totalCount = userC.estimatedDocumentCount();
   totalCount.then((count)=>{
     if(!count){
      userC.insertMany(data).then(()=>{}).catch((error)=>{console.log('Error='+error)});
     }
   });
     return true;
  }


  const getAllUsers = (userId)=>{
    let qr = !userId ? {}:{'id':userId};
    console.log(qr);
     let allUsers = userC.find(qr);
     return allUsers;
  }
  module.exports = {bulkInsert,getAllUsers}