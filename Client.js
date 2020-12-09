const { GenerateToken } = require('./Constants');

class Client {
    Token;

    constructor() {
        this.Token = GenerateToken(1024);
    }
}

module.exports = {
    Client
}