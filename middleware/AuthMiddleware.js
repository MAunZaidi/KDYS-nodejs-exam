import JWT from 'jsonwebtoken';

const UserAuth = (req,res,next)=>{
    const originaltoken = req.headers.authorization
    if(!originaltoken || !originaltoken.startsWith('Bearer')){
        res.status(401).json({message:'Cant provide Image to an UnAuthorized User'})
    }
    const passedtoken = originaltoken.split(' ')[1]
    try {
        const payload = JWT.verify(passedtoken, process.env.JWT_Secret)
        req.user = {userid:payload.userid}
        next();
    } catch (e) {
        res.status(401).json({message:'Cant provide Image to an UnAuthorized User'})
    }

};
export default UserAuth;
