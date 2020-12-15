const Client = require('../Client');
const IManager = require('./IManager');
const Group = require('../Models/Group/Group');
const GroupAudioConfig = require('../Models/Group/GroupAudioConfig');
const GroupAudioCounts = require('../Models/Group/GroupAudioCounts');
const GroupMember = require('../Models/GroupMember/GroupMember');
const Message = require('../Models/Message/Message');

module.exports = class GroupManager extends IManager {
    #Client

    /**
     * @param {Client} client 
     */
    constructor(client) {
        super();
        this.IdKey = 'Id';
        this.#Client = client;

        this.#Client.Socket.On('group update', this.#GroupUpdate);
        this.#Client.Socket.On('group member add', async data => this.#GroupMemberAction(data, 'join'));
        this.#Client.Socket.On('group member update', async data => this.#GroupMemberAction(data, 'update'));
        this.#Client.Socket.On('group member delete', async data => this.#GroupMemberAction(data, 'leave'));
    }

    /**
     * 
     * @param {number} id 
     * @returns {Group}
     */
    GetGroup = async (id) => {
        let group = this.GetEntity(id);

        if (group)
            return group;
        
        group = await this.#RequestGroup(id);

        if (!group)
            return null;
        
        this.AddEntities(group);
        return group;
    }

    /**
     * 
     * @param  {...number} ids 
     * @returns {Group[]}
     */
    GetGroups = async (...ids) => {
        let groups = this.GetEntities(...ids);
        let groupsIds = groups.map(group => group[this.IdKey]);

        ids = ids.filter(id => !groupsIds.includes(id));
        let fGroups = await this.#RequestGroups(...ids);
        
        this.AddEntities(...fGroups);
        groups.push(...fGroups);

        return groups;
    }

    /**
     * 
     * @param {number} id 
     * @returns {GroupMember[]}
     */
    GetGroupMemberList = async (id) => {
        let group = await this.GetGroup(id);

        if (group.MemberListLoaded)
            return group.MemberList;
        
        let groupMemberList = await this.#RequestGroupMemberList(id);

        this.UpdateEntity(id, { MemberList: groupMemberList, MemberListLoaded: true });

        return groupMemberList;
    }

    /**
     * 
     * @param {number} groupId 
     * @param {number} userId 
     * @returns {GroupMember}
     */
    GetGroupMember = async (groupId, userId) => {
        let groupMemberList = await this.GetGroupMemberList(groupId);
        return groupMemberList.find(t => t.Id === userId);
    }

    //#region Event Binders

    #GroupUpdate = async data => {
        const { id, hash } = data.body;

        let group = this.GetGroup(id);

        if (group.Hash === hash)
            return;
        
        this.UpdateEntity(id, this.#RequestGroup(id));
    }

    /**
     * 
     * @param {any} data 
     * @param {'join' | 'update' | 'leave'} update 
     */
    #GroupMemberAction = async (data, update) => {
        try {
            const { subscriberId, groupId, capabilities } = data.body;

            let members = await this.GetGroupMemberList(groupId);
            let index = members.indexOf(members.find(t => t.Id === subscriberId));

            if (update === 'join')
                members.push(new GroupMember(subscriberId, capabilities));

            if (update === 'leave')
                members.splice(index, 1);

            if (update === 'update')
                this.FillValues(members[index], { capabilities });
        
            this.UpdateEntity(groupId, { Members: members.length, MemberList: members });
        } catch {}
    }

    //#endregion

    //#region Data Requestors

    /**
     * 
     * @param {number} id 
     * @returns {Group}
     */
    #RequestGroup = async id => {
        try {
            let resp = await this.#Client.Socket.Request('group profile', {
                headers: {
                    version: 4
                },
                body: {
                    id,
                    entities: ['base', 'extended', 'audioConfig', 'audioCounts'],
                    subscribe: true
                }
            });

            return this.#GenerateGroup(resp);
        } catch { return null }
    }

    /**
     * @param  {...number} ids
     * @returns {Group[]}
     */
    #RequestGroups = async (...ids) => {
        let groups = [];
        let chunkSize = 50;

        for (let i = 0; i < ids.length; i += chunkSize) {
            try {
                let resp = await this.#Client.Socket.Request('group profile', {
                    headers: { version: 4 },
                    body: {
                        idList: ids.slice(i, i + chunkSize),
                        entities: ['base', 'extended', 'audioConfig', 'audioCounts'],
                        subscribe: true
                    }
                });

                let fGroups = Object.values(resp).filter(t => t.code === 200).map(t => this.#GenerateGroup(t.body));
                groups.push(...fGroups);
            } catch { }
        }

        return groups;
    }

    #RequestGroupMemberList = async (id) => {
        try {
            let resp = await this.#Client.Socket.Request('group member list', {
                headers: { version: 3 },
                body: {
                    id,
                    subscribe: true
                }
            });

            return this.#GenerateGroupMemberList(resp);
        } catch { return []; }
    }

    //#endregion

    //#region Data Processors

    /**
     * @param {any} data 
     * @returns {Group}
     */
    #GenerateGroup = data => {
        const { base, extended, audioConfig, audioCounts } = data;
        
        let g = {};

        if (base)
            g = this.FillValues(g, base);
        
        if (extended)
            g = this.FillValues(g, extended);
        
        if (audioConfig) {
            let ac = this.FillValues(new GroupAudioConfig(), audioConfig);
            g = this.FillValues(g, { AudioConfig: ac });
        }

        if (audioCounts) {
            let ac = this.FillValues(new GroupAudioCounts(), audioCounts);
            g = this.FillValues(g, { AudioCounts: ac });
        }

        return this.FillValues(new Group(), g);
    }

    /**
     * 
     * @param {any} data
     * @returns {GroupMember[]} 
     */
    #GenerateGroupMemberList = data => data.map(t => new GroupMember(t.id, t.capabilities));

    //#endregion
}