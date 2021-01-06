import type IO from "../IO";

export default class AudioRequests {
  /**
   * Request Stage Information for a Group
   * @param io the socket.io client to send this request through
   * @param id the id of the group
   */
  static GroupAudio = async (io: IO, id: number) =>
    await io.Emit("group audio", { id });

  /**
   * Update a Group's Stage Configuration
   * @param io the socket.io client to send the request through
   * @param id the id of the group
   * @param enabled is the stage enabled?
   * @param minRepLevel the minimum rep level required to join stage
   * @param stageId the id of the stage
   */
  static GroupAudioUpdate = async (
    io: IO,
    id: number,
    enabled: boolean,
    minRepLevel: number,
    stageId: number
  ) =>
    await io.Emit("group audio update", {
      headers: { version: 2 },
      body: { id, enabled, minRepLevel, stageId },
    });

  /**
   * Get information about Audio Slots for a Group
   * @param io the socket.io client to send this request through
   * @param id the id of the group
   * @param subscribe subscribe to updates to the audio slots
   */
  static GroupAudioSlotList = async (io: IO, id: number, subscribe: boolean) =>
    await io.Emit("group audio slot list", { id, subscribe });

  /**
   * Update a Group's Stage Slot
   * @param io the socket.io client to send this request through
   * @param id the id of the group
   * @param slotId the slot id to update
   * @param locked is the slot locked?
   */
  static GroupAudioSlotUpdate = async (
    io: IO,
    id: number,
    slotId: number,
    locked: boolean
  ) =>
    await io.Emit("group audio slot update", {
      id,
      slot: { id: slotId, locked },
    });

  /**
   * Broadcast to a group's audio slot
   * @param io the socket.io client to send this request through
   * @param id the id of the group
   * @param slotId the slot id to broascast to
   * @param sdp the session description protocol message
   */
  static GroupAudioBroadcast = async (
    io: IO,
    id: number,
    slotId: number,
    sdp: string
  ) => await io.Emit("group audio broadcast", { id, slotId, sdp });

  /**
   * Updates a current broadcast on a group stage slot
   * @param io the socket.io client to send this request through
   * @param id the id of the group
   * @param slotId the id of the slot
   * @param occupierId the id of the subscriber making the request
   * @param occupierMuted whether or not the occupier is muted
   */
  static GroupAudioBroadcastUpdate = async (
    io: IO,
    id: number,
    slotId: number,
    occupierId: number,
    occupierMuted: boolean
  ) =>
    await io.Emit("group audio broadcast update", {
      id,
      slotId,
      occupierId,
      occupierMuted,
    });

  /**
   * Releases a slot and disconnects from the publishing audio stream
   * @param io the socket.io client to send this request through
   * @param id the id of the group
   * @param slotId the id of the slot
   * @param occupierId the id of the subscriber making the request
   */
  static GroupAudioBroadcastDisconnect = async (
    io: IO,
    id: number,
    slotId: number,
    occupierId: number
  ) =>
    await io.Emit("group audio broadcast disconnect", {
      id,
      slotId,
      occupierId,
    });

  /**
   * Consume audio from a group's audio slot
   * @param io the socket.io client to send this request through
   * @param id the id of the group
   * @param slotId the slot id to broascast to
   * @param sdp the session description protocol message
   */
  static GroupAudioConsume = async (
    io: IO,
    id: number,
    slotId: number,
    sdp: string
  ) => await io.Emit("group audio consume", { id, slotId, sdp });

  /**
   * Get a list of all stage themes available
   * @param io the socket.io client to send this request through
   * @param languageId the language id to localize the stage name
   */
  static StageList = async (io: IO, languageId?: number) =>
    await io.Emit(
      "stage list",
      (() => {
        let data: any = {};

        if (languageId) data.languageId = languageId;

        return data;
      })()
    );

  /**
   * Get a list of all stage themes avialable to a group
   * @param io the socket.io client to send this request through
   * @param id the id of the group
   */
  static StageGroupActiveList = async (io: IO, id: number) =>
    await io.Emit("stage group active list", { id });
}
