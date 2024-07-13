const express = require('express') ;
const User = require('../models/User');
const router = express.Router() ;
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'ayushraj567@12345' ;
let success ;
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min : 5}),
],  async (req, res)=>{
    const errors = validationResult(req) ;

    if(!errors.isEmpty()){
        success = false;
        return res.status(400).json({success,  errors: errors.array()}) ;
    }
    
    try{
    let user = await User.findOne({email : req.body.email}) ;
    

    if(user){
        success = false;
        return res.status(400).json({success, error : "Sorry a user with this email already exists"}) 
    }

    const salt = await bcrypt.genSalt(10) ;
    const secPass = await bcrypt.hash(req.body.password, salt)  ;


    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
    });

    const data = {
        user : {
            id: user.id 
        }
    }
    
    const jwtDta = jwt.sign(data, JWT_SECRET) ;
    // console.log(jwtDta) ;
    success = true;
    res.json({success , jwtDta}) ;

    } catch(err){
        console.error(err.message) ;
        res.status(500).send("Internal server error") ;
    }
    // .then(user => res.json(user)).
    // catch((err)=>{ console.log(err)
    //   res.json({error: 'Please enter a unique value for email'})}) 
})

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
],  async (req, res, next)=>{
    const errors = validationResult(req) ;

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}) ;
    }

    const {email, password} = req.body ;

    try{
        let user = await User.findOne({email}) ;

        if(!user){
            // console.log("Hello") ;
            success = false; 
            return res.status(400).json({success, error : "Please try to login using valid credentials"}) ;
        }


        bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) { throw (err); }
        
            bcrypt.compare(password, hash, function(err, result) {
                if(result){
                    const data = {
                        user : {
                            id: user.id 
                        }
                    }
                     success = true;
                     const jwtDta = jwt.sign(data, JWT_SECRET) ;
                     res.json({success, jwtDta}) ;
                }
                else{
                    // console.log("ram")
                    success = false;
                    return res.status(400).json({ success, error : "Please try to login using valid credentials"}) ; 

                }
            });
        });

        


    } catch(error){
        console.error(error.message) ;
        res.status(500).send("Internal server error") ;
    }


})

//ROUTE3
router.post('/getuser',  fetchuser , async (req, res)=> {
     try{
        userId = req.user.id ;
        const user = await User.findById(userId).select("-password") 
        res.send(user) ;
     }catch(error){
        console.error(error.message) ;
        res.status(500).send("Internal Server Error") ;
     }
}) 

module.exports = router