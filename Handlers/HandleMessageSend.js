const Client = require('../Client');
const { Message } = require('../Models');

/**
 * 
 * @param {Client} client 
 */
module.exports = async client => {
    client.Socket.IO.on('message send', async data => {
        let mesg = new Message(data.body);

        // Process Group Admin Actions
        if (mesg.MimeType === 'application/palringo_group_action') {
            return;
        }

        client.On.EE.emit('message send', mesg);
    });
}