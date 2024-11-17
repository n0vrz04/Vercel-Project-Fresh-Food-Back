const authService = require('../services/auth-service')
const Auth = require('../models/auth')
const AuthLogin = require('../models/authLogin')

const registerUser = async (req,res) => {
    const register = new Auth(req.body)
    const result = await authService.registerUser(register)
    res.json(result)
}

const loginUser = async (req,res) => {
    const login = new AuthLogin(req.body)
    const result = await authService.loginUser(login)

    if(!result){
        res.status(400).json(result)
    }
    else{
        res.status(200).json(result)

    }
}

module.exports = {
    registerUser,
    loginUser
}