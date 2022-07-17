const express = require('express');
const User  = require('../models/User');
const router = express.Router();
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken"); 
const JWT_SECRET ='Manishaisagoodgirl';
var fetchuser =require('../middleware/fetchuser');
//Create a User using : POST "/api/auth/createuser". no login required.
router.post('/createuser',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password','Password must be atleast five characters').isLength({min:5}),
],async (req,res)=>{
  
//   res.json(obj)
//   console.log(req.body);
//   const user = User(req.body);
//   user.save();

//If there are errors return badrequest and the errors
  let success = false;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({success,errors :errors.array()});
  }

  //Check whether the user with this exists already
  try{
  let user =await User.findOne({email:req.body.email});
  console.log(user)
  if (user){
    
    return res.status(400).json({success,error :"Sorry a user with this email already exists"})
  }
  const salt =await bcrypt.genSalt(10);//return promise so we are using await
  const secPass = await bcrypt.hash(req.body.password,salt);

  //  Create a new user
  user = await User.create({
    name : req.body.name,
    // password : req.body.password,
    password :secPass,
    email : req.body.email,
  });
  // .then(user => res.json(user))  //create promises
  //  .catch(err=> {console.log(err)
  //  res.json({error : 'Please enter unique value'})})
  //    res.send(req.body);
  const data ={
    user:{id:user.id}
  }
  const authtoken = jwt.sign(data,JWT_SECRET);
  //Create a user using :POST "/api/auth".Doesn't require Auth
  
  // console.log(jwtData);
  success=true;
  res.json({success,authtoken})


}catch(error){
  console.error(error.message);
  res.status(500).send("some error ocurred");
}
    
})



//Create a User using : POST "/api/auth/login". no login required.



router.post('/login',[
  
  body('email','Enter valid email').isEmail(),
  body('password','Password cannot be blank').exists(),
],async (req,res)=>{

let success = false
const errors = validationResult(req);
if(!errors.isEmpty()){
  return res.status(400).json({errors :errors.array()});
}

const { email, password } = req.body;
//Check whether the user with this exists already
try{
let user =await User.findOne({email});
// console.log(user)
if (!user){
  success = false
  return res.status(400).json({error :"Enter the valid login credentials"});
}
const passwordCompare = await bcrypt.compare(password, user.password);
if (!passwordCompare) {
  success = false
  return res.status(400).json({success,error: "Please try to login with correct credentials" });
}

const data ={
  user:{id:user.id}
}
const authtoken = jwt.sign(data,JWT_SECRET);
//Create a user using :POST "/api/auth".Doesn't require Auth
success = true;
// console.log(jwtData);
res.json({success,authtoken})


}catch(error){
console.error(error.message);
res.status(500).send("Internal server error");
}
  
})



//Route 3: Get loggedin user details using : POST "/api/auth/getuser". no login required.
router.post('/getuser',fetchuser,async (req,res)=>{


try {
 userId = req.user.id;
 const user = await User.findById(userId).select("-password");
 res.send(user)
} catch (error) {
  console.error(error.message);
res.status(500).send("Internal server error");
}
})
module.exports = router


















