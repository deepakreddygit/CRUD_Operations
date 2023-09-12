var Userdb=require('../model/model');

//create and save new user
exports.create=(req,res)=>{
    //validate req
    if(!req.body){
        res.status(400).send({message:'Content can not be empty'});
        return;
    }

    //new user
    const user=new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    //save user in db
    user
    .save(user)
    .then(data=>{
        // res.send(data)
        res.redirect('/add-user')
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || 'Some error occured while creating operation'
        });
    });

}

//retrive an dreturn of users/ retribve and return a single user
exports.find=(req,res)=>{

    if(req.query.id){
        const id=req.query.id
        Userdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(400).send({message:"Not found with id" + id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error retriving user with userid"+id})
            })

    }else{
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message:err.message||"Error occured while retriving the user"})
        })
    }
}

//update a new identified user by userid
exports.update=(req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"Data to update can not be empty"})
    }
    const id=req.params.id;
    Userdb.findByIdAndUpdate(id,req.body)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot Update user with ${id}.Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error update user information."})
        })
}

//delete a user with speciified userid in the req
exports.delete=(req,res)=>{
    const id=req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot delete with ${id}. Maybe id is wrong`})
        } else{
            res.send({
                message:"User was deleted successfully"
            })
        }
    }) 
    .catch(err=>{
        res.status(500).send({
            message: "Could not delete User with id ="+id
        });
    });

}