const Client = require('../Client');
const Requests = require('../Network/IO/Requests');
const { RTCPeerConnection, RTCSessionDescription, getUserMedia } = require('wrtc');

module.exports = class StageManager {
    /**
     * @type {Client}
     */
    #Client;

    /**
     * @type {RTCPeerConnection}
     */
    #PeerConnection;

    /**
     * Create a new StageManager
     * @param {Client} client 
     */
    constructor(client) {
        this.#Client = client;
    }

    JoinStage = async (groupId, slotId) => {
        if (this.#PeerConnection)
            return false;
        
        try {
            let pc = new RTCPeerConnection();

            const offer = await pc.createOffer({
                offerToSendAudio: true,
                offerToSendVideo: false,
                offerToReceiveAudio: false,
                offerToReceiveVideo: false
            });

            let offerSdp = offer.sdp.replace('a=sendrecv', 'a=recvonly');

            pc.setLocalDescription(offer);

            let response = await Requests.GroupAudioBroadcast(this.#Client.V3, groupId, slotId, offerSdp);

            console.log(response);

            const {
                sdp,
                slot
            } = response;

            pc.uuid = slot.uuid;

            await pc.setRemoteDescription(new RTCSessionDescription({
                type: 'answer',
                sdp
            }));

            this.#PeerConnection = pc;
        } catch (e) { console.log(e); return false; }
    }
}