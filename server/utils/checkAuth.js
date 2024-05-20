import jwt from 'jsonwebtoken';
// import createError from './error.js';

// export default (req,res,next ) => {
//     const token = req.cookies.access_token
// }

//creating middleware to fetch user
export const checkAuth = async(req,res,next)=>{
    const token = req.header('auth-token')
    if(!token){
       res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else{
       try{
         const JWT_SECRET =   "sdfgddddd";
          const data = jwt.verify(token,JWT_SECRET);
        // return jwt.verify(token,JWT_SECRET,(data) => {
            
        // })
          req.user = data;
          console.log("user",req.user);
           
           return next();
       } catch (error){
          res.status(401).send({errors:"please authenticate using valid token"})
       }
    }
 }