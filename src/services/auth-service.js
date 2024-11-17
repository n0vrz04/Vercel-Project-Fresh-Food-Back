const pool = require('../config/db')
const Auth = require('../models/auth')
const { DATA_ADDED_SUCCESSFULLY, DATA_GET_SUCCESSFULLY } = require('../utils/constants/messages')
const { SuccessResult, ErrorResult } = require('../utils/results/result')
const {USER_DOESNT_EXIST, PASSWORD_INCORRECT, USER_SUCCESSFULLY} = require('../utils/constants/userMessages')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AccessToken = require('../utils/auth/access-token')

/**
 * @param {Auth} userLoginDto
 */

const registerUser = async (user) => {
    try {
        user.password = await bcrypt.hash(user.password,10)
        const res = await pool.query('insert into users (name,username,email,password) values($1,$2,$3,$4) returning *',
            [user.name,user.username,user.email,user.password]
        )
        return new SuccessResult(DATA_ADDED_SUCCESSFULLY,res.rows[0])
    } catch (error) {
        return new ErrorResult(error.message)
    }
}

const getUserByUsername = async (username) => {
    try {
        const res = await pool.query('select * from users u where u.username = $1',[username])
        return new SuccessResult(DATA_GET_SUCCESSFULLY,res.rows[0])
    } catch (error) {
        return new ErrorResult(error.message)
    }
}

const loginUser = async (userLoginDto) => {
    try {
        const availableUser = await getUserByUsername(userLoginDto.username)
        if(!availableUser.data){
            return new ErrorResult(USER_DOESNT_EXIST)
        }

        const passwordCheck = await bcrypt.compare(userLoginDto.password,availableUser.data.password)
        if(!passwordCheck){
            return new ErrorResult(PASSWORD_INCORRECT)
        }

        const token = jwt.sign({username:availableUser.data.username},process.env.JWT_SECRET_KEY,{expiresIn:'90d'})

        const expireDate = new Date()
        expireDate.setDate(expireDate.getDay()+30)
        const accessToken = new AccessToken(token,expireDate.toString())

        return new SuccessResult(USER_SUCCESSFULLY,accessToken)

    } catch (error) {
        return new ErrorResult(error.message)
    }
}

module.exports = {
    registerUser,
    loginUser
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvbmFsZG8iLCJpYXQiOjE3MjE1ODQ4MDAsImV4cCI6MTcyOTM2MDgwMH0.N6R-ooZP5RpaAJyU5vtxa-nyjuKgmv_LBfaGBuFS7pk
