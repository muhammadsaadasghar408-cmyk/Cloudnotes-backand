const express=require('express');
const User = require('../models/User')
const router=express.Router();
const { body, validationResult } = require('express-validator');

router.post('/createuser', [
    body('name','Enter a valid name').isLength({ min: 3 }),
     body('email', 'Enter a valid email').isEmail(),
  
  body('password', 'Password must be atleast 5 character').isLength({ min: 5 }),
] ,
 async (req, res)=>{
  // if they are errors,return bad request and error 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check weather the user already with this email exist already
    try {
      
      
      let user=await User.findOne({email:req.body.email});
    if(user){
     return res.status(400).json({error:"sorry a user with this email  already exists"})
     }
     user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })

    
    
  res.json(user)
} catch (error) {
  console.error(error.message);
  res.status(500).send("some error occuured")
}
  

})
module.exports=router