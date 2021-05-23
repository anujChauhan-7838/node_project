const httpReq   = require("node-fetch");
const postModel = require('../models/post');


const index = (inp,out) =>{
      out.send('From Index Function');
}

const bulkDataInsert  = (inp,out) =>{
    httpReq('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(post=>{  
        httpReq('https://jsonplaceholder.typicode.com/comments')
        .then(res => res.json())
        .then(comment=>{        
           const allPostWithComments =  post.map((p)=>{
            var comments = comment.filter((cmt) =>{ return cmt.postId === p.id; });
            p.comments = comments;

            })
            console.log(post);
            postModel.bulkInsert(post);
            out.write(JSON.stringify({'status':1,"msg":"Posts and Comments Data has been imported."}));
            out.end();
           
        })
        .catch(err => console.log(err))
       
    })
    .catch(err => console.log(err))

    
}
const bulkDataInsert2 = (inp,out)=>{
    const x = request
        .get('https://jsonplaceholder.typicode.com/users')
        .on('response', (response) =>{
            console.log(response);
             console.log(response.body) // 200
             console.log(response.headers['content-type']) // 'image/png'
          })
        .on('data', (data)=>{
            console.log(data);
            userModel.bulkInsert(data.toString());
            out.write(data);
        })
        .on('error',(error)=>{
              console.log(error);
          })
        .on('end',(err)=>{
                out.end();
        })
}

const getAllUserPost = async (inp,out)=>{
    console.log(inp.params);
   const userId = parseInt(inp.params.userId);
   console.log('userId='+userId);
   var allUserPost =  await postModel.getAllUserPosts(userId);
   out.send({'status':1,data:allUserPost,'error':''});
   
}

module.exports = {bulkDataInsert,index,getAllUserPost}