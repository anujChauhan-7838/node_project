const httpReq   = require("node-fetch");
const userModel = require('../models/user');


const index = (inp,out) =>{
      out.send('From Index Function');
}

const bulkDataInsert  = (inp,out) =>{
    httpReq('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data=>{
        console.log(data)
        userModel.bulkInsert(data);
        out.write(JSON.stringify({'status':1,"msg":"User Data has been imported."}));
        out.end();
       
    })
    .catch(err => console.log(err))

    
}
const getAllUsers = async (inp,out)=>{
    console.log(inp.params);
   const userId = inp.params.userId != undefined  || Number.isInteger(inp.params.userId) | 0;
   console.log('userId='+userId);
   var allUsers =  await userModel.getAllUsers(userId);
   out.send({'status':1,data:allUsers,'error':''});
   
}

module.exports = {bulkDataInsert,index,getAllUsers}