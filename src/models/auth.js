class Auth{
    constructor(requestData){
        this.name = requestData.name,
        this.username = requestData.username,
        this.email = requestData.email,
        this.password = requestData.password
    }
}

module.exports = Auth