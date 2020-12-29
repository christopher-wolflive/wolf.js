const asyncPool = require('tiny-async-pool');
const Client = require('../Client');
const io = require('socket.io-client');

/**
 * Underlying Socket.IO Handler for WOLF Interactions
 */
module.exports = class Socket {
    /**
     * The Socket.IO Binder
     * @type {SocketIOClient.Socket}
     */
    IO;

    /**
     * The Client this Socket is Bound to
     * @type {Client}
     */
    Client;

    /**
     * Generate a new Socket.IO Handler
     * @param {Client} client The Client to bind this IO Handler To
     */
    constructor(client) {
        this.Client = client;
        this.IO = io('wss://v3-rc.palringo.com', {
            transports: ['websocket'],
            query: {
                token: this.Client.Token,
                device: 'web'
            }
        });
    }

    /**
     * Remove the specified function from the event, or remove all listeners if fn is not defined
     * @param {string} event the event string to remove from
     * @param {(...args: any[]) => void} fn the function to remove from the event
     */
    Off = (event, fn) => this.IO.off(event, fn);

    /**
     * Bind an event listener to Socket.IO
     * @param {string} event the event string to add to
     * @param {(...args: any[]) => void} fn the functon to add to the event
     */
    On = (event, fn) => this.IO.on(event, fn);

    /**
     * Bind an event listener to Socket.IO to be called one time
     * @param {string} event the event string to add to
     * @param {(...args: any[]) => void} fn the function to add the event to for one time callback
     */
    Once = (event, fn) => this.IO.once(event, fn);

    /**
     * Emit a packet to be sent to WOLF, will batch request if 'idList' is detected in the body
     * @param {string} event the packet name to be sent
     * @param {any} data the packet data to be sent, auto wrapped in body if not provided
     * @param {number} chunkSize if idList is defined in the body, this will be used to break into x sized chunks for batch requesting
     */
    Emit = async (event, data, chunkSize = 50) => {
        // Wrap the Data in a body if headers and body are not defined
        if (!data?.headers && !data?.body)
            data = { body: data };
        
        // If body does not contain idList, then return just the normal promise
        if (!data?.body?.idList)
            return new Promise(resolve => this.IO.emit(event, data ?? {}, resp => resolve(resp)));
        
        // If we reached here, this is a batch request, and we need to break the idList into x sized chunks
        let chunks = [];

        for (let i = 0; i < data?.body?.idList.length; i += chunkSize)
            chunks.push(data?.body?.idList.slice(i, i + chunkSize));
        
        // Create a function that the asyncPool library can call
        let req = (idList) => new Promise(resolve => this.IO.emit(event, { headers: data.headers, body: { ...data.body, idList } }, resp => resolve(resp)));

        // Have the Async Pool finish all the requests concurrently, and return the results
        return (await asyncPool(3, chunks, req))
            .reduce((responses, response) => { responses.push(response.body); return responses; }, [])
            .reduce((objs, obj) => { Object.keys(obj).map(key => objs[key] = obj[key]); return objs; }, {});
    }
}