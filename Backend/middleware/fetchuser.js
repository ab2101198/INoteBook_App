var jwt = require('jsonwebtoken') ;

const JWT_SECRET = 'ayushraj567@12345' ;

const fetchuser = (req, res, next) =>{
    //get the user from the 
    const token = req.header('auth-token') ;
    if(!token){
        res.status(401).send({error : "Please authenticate using a valid token"}) 
    }
    try{
        const data = jwt.verify(token , JWT_SECRET) ;
        req.user = data.user ;
        next() ;
    }catch(error){
        res.status(401).send({error : "Please authenticate using a valid token"}) 
    }
}

module.exports = fetchuser ;