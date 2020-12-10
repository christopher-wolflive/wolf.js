const Client = require('../Client');
const { entityInCache, updateValues } = require('../Constants');
const Group = require('../Models/Group');

/**
 * 
 * @param {Client} client 
 */
module.exports = async client => {
    client.Socket.IO.on('group update', async data => {
        const { id, hash } = data.body;
        
        let group = entityInCache(client.Groups, 'Id', id);

        if (!group.cached)
            return client.GetGroup(id);
        
        if (group.value['Hash'] === hash)
            return;
        
        let updatedGroup = new Group(await client.Socket.RequestGroupById(id));

        updateValues(client.Groups, 'Id', id, updatedGroup);
    });
}