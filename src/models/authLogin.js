class AuthLogin{
    constructor(requestData){
        this.username = requestData.username,
        this.password = requestData.password
    }
}

module.exports = AuthLogin