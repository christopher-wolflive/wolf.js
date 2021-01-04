const IO = require('../IO');

module.exports = class AudioRequests {
    /**
     * Request Stage Information for a Group
     * @param {IO} io the socket.io client to send this request through
     * @param {number} id the id of the group
     */
    static GroupAudio = async (io, id) => await io.Emit('group audio', { id });

    /**
     * Update a Group's Stage Configuration
     * @param {IO} io the socket.io client to send the request through
     * @param {number} id the id of the group
     * @param {boolean} enabled is the stage enabled?
     * @param {number} minRepLevel the minimum rep level required to join stage
     * @param {number} stageId the id of the stage
     */
    static GroupAudioUpdate = async (io, id, enabled, minRepLevel, stageId) => await io.Emit('group audio update', {
        headers: { version: 2 },
        body: { id, enabled, minRepLevel, stageId }
    });

    /**
     * Get information about Audio Slots for a Group
     * @param {IO} io the socket.io client to send this request through
     * @param {number} id the id of the group
     * @param {booleam} subscribe subscribe to updates to the audio slots
     */
    static GroupAudioSlotList = async (io, id, subscribe) => await io.Emit('group audio slot list', { id, subscribe });

    /**
     * Update a Group's Stage Slot
     * @param {IO} io the socket.io client to send this request through
     * @param {number} id the id of the group
     * @param {number} slotId the slot id to update
     * @param {boolean} locked is the slot locked?
     */
    static GroupAudioSlotUpdate = async (io, id, slotId, locked) => await io.Emit('group audio slot update', { id, slot: { id: slotId, locked } });

    /**
     * Broadcast to a group's audio slot
     * @param {IO} io the socket.io client to send this request through 
     * @param {*} id the id of the group
     * @param {*} slotId the slot id to broascast to
     * @param {*} sdp the session description protocol message
     */
    static GroupAudioBroadcast = async (io, id, slotId, sdp) => await io.Emit('group audio broadcast', { id, slotId, sdp });

    /**
     * Updates a current broadcast on a group stage slot
     * @param {IO} io the socket.io client to send this request through
     * @param {number} id the id of the group
     * @param {number} slotId the id of the slot
     * @param {number} occupierId the id of the subscriber making the request
     * @param {boolean} occupierMuted whether or not the occupier is muted
     */
    static GroupAudioBroadcastUpdate = async (io, id, slotId, occupierId, occupierMuted) => await io.Emit('group audio broadcast update', {
        id, slotId, occupierId, occupierMuted
    });

    /**
     * Releases a slot and disconnects from the publishing audio stream
     * @param {IO} io the socket.io client to send this request through
     * @param {number} id the id of the group
     * @param {number} slotId the id of the slot
     * @param {number} occupierId the id of the subscriber making the request
     */
    static GroupAudioBroadcastDisconnect = async (io, id, slotId, occupierId) => await io.Emit('group audio broadcast disconnect', {
        id, slotId, occupierId
    });

    /**
    * Consume audio from a group's audio slot
    * @param {IO} io the socket.io client to send this request through
    * @param {*} id the id of the group
    * @param {*} slotId the slot id to broascast to
    * @param {*} sdp the session description protocol message
    */
    static GroupAudioConsume = async (io, id, slotId, sdp) => await io.Emit('group audio consume', { id, slotId, sdp });

    /**
     * Get a list of all stage themes available
     * @param {IO} io the socket.io client to send this request through
     * @param {number} languageId the language id to localize the stage name
     */
    static StageList = async (io, languageId) => await io.Emit('stage list', { languageId });

    /**
     * Get a list of all stage themes avialable to a group
     * @param {IO} io the socket.io client to send this request through
     * @param {number} id the id of the group
     */
    static StageGroupActiveList = async (io, id) => await io.Emit('stage group active list', { id });
}