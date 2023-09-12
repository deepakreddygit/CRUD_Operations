const axios=require('axios')


exports.homeRoutes=(req,res)=>{
    //make a get req to api users
    axios.get('http://localhost:3000/api')
        .then(function(response){
            // console.log(response.data)
            res.render('index',{users: response.data})
        })
        .catch(err=>{
            res.send(err)
        })
    
}

exports.add_user=(req,res)=>{
    res.render('add_user')
}

exports.update_user=(req,res)=>{
    axios.get('http://localhost:3000/api',{params:{id:req.query.id}})
        .then(function(userdata){
            res.render("update_user",{user:userdata.data})
        })
        .catch(err=>{
            res.send(err);
        })
    
}