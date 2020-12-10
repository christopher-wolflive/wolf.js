const { GenerateToken } = require('./Constants');
const { Events } = require('./Helpers');
const { Socket } = require('./Network');

class Client {
    Groups;
    Users;
    Token;
    Socket;
    On;

    constructor() {
        this.Token = GenerateToken(1024);
        this.Socket = new Socket(this);
        this.On = new Events(this);
    }

    /**
     * Login to WOLF
     * @param {string} email 
     * @param {string} password 
     * @param {1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9} deviceTypeId
     */
    Login = async (email, password, deviceTypeId = 8) => {
        try {
            let loginResp = await this.Socket.RequestLogin(email, password, deviceTypeId);

            this.On.EE.emit('security login success', loginResp);
        } catch {
            this.On.EE.emit('security login failed');
        }
    }

    /**
     * Logout from WOLF
     */
    Logout = async () => {
        try {
            await this.Socket.RequestLogout();
            this.On.EE.emit('security logout success');
        } catch {
            this.On.EE.emit('security logout failed')
        }
    }

    GetGroup = async (id) => {

    }

    GetGroups = async (id) => {
        
    }
}

module.exports = Client;