const io = require('socket.io-client');

module.exports = class Socket {
    #IO;

    /**
     * @param {string} token 
     */
    constructor(token) {
        this.#IO = io('wss://v3.palringo.com', {
            transports: ['websocket'],
            query: {
                token,
                device: 'web'
            }
        });
    }

    /**
     * Send a request
     * @param {string} command 
     * @param {{headers?: { version?: number, [key: any]: any }, body?: { [key: any]: any }}} data 
     * @returns {Promise<any>}
     */
    Request = (command, data) => {
        if (!data)
            data = {};
        else if (!data.headers && !data.body)
            data = { body: data };
        
        return new Promise((resolve, reject) => {
            this.#IO.emit(command, data, (resp) => {
                if (resp.code && resp.code >= 200 && resp.code <= 299)
                    return resolve(resp.body ?? resp);
                else
                    return reject(resp);
            });
        });
    }

    /**
     * Listen to events
     * @param {string} event
     * @param {(...any) => void} fn 
     */
    On = (event, fn) => {
        this.#IO.on(event, fn);
    }
}

// const io = require('socket.io-client');
// const Client = require('../Client');
// const { HandleMessageSend, HandleSubscriberUpdate, HandleGroupUpdate, HandleGroupMember } = require('../Handlers');

// class Socket {
//     Client;
//     IO;

//     /**
//      * @param {Client} client 
//      * @param {'web' | 'ios' | 'android'} device
//      */
//     constructor(client, device = 'web') {
//         this.Client = client;
//         this.IO = io('wss://v3.palringo.com', {
//             transports: ['websocket'],
//             query: {
//                 device,
//                 token: this.Client.Token
//             }
//         });
//     }

//     /**
//      * 
//      * @param {Client} client 
//      */
//     HandleSocketEvents = async client => {
//         HandleMessageSend(client);
//         HandleSubscriberUpdate(client);
//         HandleGroupUpdate(client);
//         HandleGroupMember(client);
//     }

//     /**
//      * 
//      * @param {string} command 
//      * @param {{headers?: { version?: number, [key: string]: any }, body?: { [key: string]: any }}} data 
//      */
//     Request = async (command, data) => {
//         if (!data)
//             data = {};
//         else if (!data.headers && !data.body) {
//             data = { body: data };
//         }

//         return new Promise((resolve, reject) => {
            
//             this.IO.emit(command, data, (resp) => {
//                 if (resp.code && resp.code >= 200 && resp.code <= 299)
//                     resolve(resp.body ?? resp);
//                 else
//                     reject(resp);
//             });
//         });
//     }

//     /**
//      * Login to WOLF
//      * @param {string} email 
//      * @param {string} password 
//      * @param {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9} deviceTypeId 
//      */
//     RequestLogin = async (email, password, deviceTypeId = 8) => {
//         return await this.Request('security login', {
//             username: email,
//             password,
//             deviceTypeId
//         });
//     }

//     /**
//      * Logout from WOLF
//      */
//     RequestLogout = async () => {
//         return await this.Request('security logout');
//     }

//     /**
//      * Request a Single Group By ID
//      * @param {number} id 
//      */
//     RequestGroupById = async (id) => {
//         return this.Request('group profile', {
//             headers: {
//                 version: 4
//             },
//             body: {
//                 id,
//                 entities: ['base', 'extended', 'audioConfig', 'audioCounts'],
//                 subscribe: true
//             }
//         });
//     }

//     /**
//      * Request Multiple Groups By ID
//      * @param {number[]} ids 
//      */
//     RequestGroupsById = async (ids) => {
//         let responses = [];
//         let chunkSize = 50;

//         for (let i = 0; i < ids.length; i += chunkSize) {
//             let response = await this.Request('group profile', {
//                 headers: {
//                     version: 4
//                 },
//                 body: {
//                     idList: ids.slice(i, i + chunkSize),
//                     entities: ['base', 'extended', 'audioConfig', 'audioCounts'],
//                     subscribe: true
//                 }
//             });

//             let groups = Object.values(response).filter(t => t.code === 200).map(t => t.body);
//             responses.push(...groups);
//         }

//         return responses;
//     }

//     /**
//      * Request Group Members List
//      * @param {number} id 
//      */
//     RequestGroupMemberList = async (id) => {
//         return await this.Request('group member list', {
//             headers: {
//                 version: 3
//             },
//             body: {
//                 id,
//                 subscribe: true
//             }
//         });
//     }

//     /**
//      * Request a User by ID
//      * @param {number} id
//      */
//     RequestUserById = async (id) => {
//         return this.Request('subscriber profile', {
//             headers: {
//                 version: 4
//             },
//             body: {
//                 id,
//                 extended: true,
//                 subscribe: true
//             }
//         });
//     }

//     /**
//      * Request Users by ID
//      * @param {number[]} ids 
//      */
//     RequestUsersById = async (ids) => {
//         let responses = [];
//         let chunkSize = 50;

//         for (let i = 0; i < ids.length; i += chunkSize) {
//             let response = await this.Request('subscriber profile', {
//                 headers: {
//                     version: 4
//                 },
//                 body: {
//                     idList: ids.slice(i, i + chunkSize),
//                     extended: true,
//                     subscribe: true
//                 }
//             });

//             let users = Object.values(response).filter(t => t.code === 200).map(t => t.body);
//             responses.push(...users);
//         }

//         return responses;
//     }

//     /**
//      *
//      * @param {number} id
//      * @param {any} content
//      * @param {boolean} isGroup
//      * @param {string} mimeType
//      */
//     RequestSendMessage = async (id, content, isGroup, mimeType) => {
//         return await this.Request('message send', {
//             recipient: id,
//             isGroup,
//             mimeType,
//             data: content,
//             flightId: `${this.Client.CurrenUser.Id}_${id}_${new Date().getTime()}`
//         })
//     }
// }

// module.exports = {
//     Socket
// }