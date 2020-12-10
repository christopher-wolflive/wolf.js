const Client = require('../Client');
const GroupMemberUpdate = require('../Models/GroupMemberUpdate');
const { updateValues } = require('../Constants');
const GroupMember = require('../Models/GroupMember');
const { entityInCache } = require('../Constants/CacheUtils');

/**
 * 
 * @param {Client} client 
 */
module.exports = async client => {
    client.Socket.IO.on('group member update', async data => {
        try {
            const { subscriberId, groupId, capabilities } = data.body;

            let group = await client.GetGroup(groupId);

            let groupMembers = group.MemberList;

            updateValues(groupMembers, 'Id', subscriberId, { capabilities });
            updateValues(client.Groups, 'Id', groupId, { MemberList: groupMembers });

            let gmu = new GroupMemberUpdate(subscriberId, groupId, capabilities);

            client.On.EE.emit('group action', gmu);
        } catch {}
    });

    client.Socket.IO.on('group member add', async data => {
        try {
            const { subscriberId, groupId, capabilities } = data.body;

            let group = await client.GetGroup(groupId);
            let groupMembers = group.MemberList;
            let memberCount = group.Members + 1;

            groupMembers.push(new GroupMember(subscriberId, capabilities));

            updateValues(client.Groups, 'Id', groupId, { MemberList: groupMembers, Members: memberCount });

            console.log(await client.GetGroup(groupId));

            client.On.EE.emit('group action', new GroupMemberUpdate(subscriberId, groupId, capabilities));
        } catch {}
    });

    client.Socket.IO.on('group member delete', async data => {
        try {
            const { subscriberId, groupId } = data.body;

            let group = await client.GetGroup(groupId);
            let groupMembers = group.MemberList;
            let memberCount = group.Members - 1;

            let search = entityInCache(groupMembers, 'Id', subscriberId);
            let index = groupMembers.indexOf(search.value);

            groupMembers.splice(index, 1);

            updateValues(client.Groups, 'Id', groupId, { MemberList: groupMembers, Members: memberCount });

            console.log(await client.GetGroup(groupId));

            client.On.EE.emit('group action', new GroupMemberUpdate(subscriberId, groupId, -1));
        } catch {}
    });
}