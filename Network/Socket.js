const io = require('socket.io-client');
const Client = require('../Client');

class Socket {
    Client;
    IO;

    /**
     * @param {Client} client 
     * @param {'web' | 'ios' | 'android'} device
     */
    constructor(client, device = 'web') {
        this.Client = client;
        this.IO = io('wss://v3.palringo.com', {
            transports: ['websocket'],
            query: {
                device,
                token: this.Client.Token
            }
        });
    }

    /**
     * 
     * @param {string} command 
     * @param {{headers?: { version?: number, [key: string]: any }, body?: { [key: string]: any }}} data 
     */
    Request = async (command, data) => {
        if (!data)
            data = {};
        else if (!data.headers && !data.body) {
            data = { body: data };
        }

        return new Promise((resolve, reject) => {
            
            this.IO.emit(command, data, (resp) => {
                if (resp.code && resp.code >= 200 && resp.code <= 299)
                    resolve(resp.body ?? resp);
                else
                    reject(res);
            });
        });
    }

    /**
     * Login to WOLF
     * @param {string} email 
     * @param {string} password 
     * @param {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9} deviceTypeId 
     */
    RequestLogin = async (email, password, deviceTypeId = 8) => {
        return await this.Request('security login', {
            username: email,
            password,
            deviceTypeId
        });
    }

    /**
     * Logout from WOLF
     */
    RequestLogout = async () => {
        return await this.Request('security logout');
    }

    /**
     * Request a Single Group By ID
     * @param {number} id 
     */
    RequestGroupById = async (id) => {
        return this.Request('group profile', {
            headers: {
                version: 4
            },
            body: {
                id,
                entities: ['base', 'extended', 'audioConfig', 'audioCounts'],
                subscribe: true
            }
        });
    }

    /**
     * Request Multiple Groups By ID
     * @param {number[]} ids 
     */
    RequestGroupsById = async (ids) => {
        let responses = [];
        let chunkSize = 50;

        for (let i = 0; i < ids.length; i += chunkSize) {
            let response = await this.Request('group profile', {
                headers: {
                    version: 4
                },
                body: {
                    idList: ids.slice(i, i + chunkSize),
                    entities: ['base', 'extended', 'audioConfig', 'audioCounts'],
                    subscribe: true
                }
            });

            console.log(response);
        }

        return responses;
    }

    /**
     * Request a User by ID
     * @param {number} id
     */
    RequestUserById = async (id) => {
        return this.Request('subscriber profile', {
            headers: {},
            body: {
                id,
                extended: true,
                subscribe: true
            }
        });
    }

    RequestUsersById = async (id) => {
        return this.Request('subscriber profile', {

        });
    }
}

module.exports = {
    Socket
}