const jwt = require('jsonwebtoken')

const authenticateUser = (req,res,next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if(!token)
        return res.sendStatus(401)

    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err){
            res.sendStatus(401)
        }
        else{
            req.user = user
            next()
        }
    })
}


module.exports = authenticateUser