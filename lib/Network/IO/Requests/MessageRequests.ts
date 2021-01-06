import type IO from "../IO";

export default class MessageRequests {
  /**
   * Subscribe to all group messages
   * @param io the socket.io client to send this request through
   */
  static MessageGroupSubscribe = async (io: IO) =>
    await io.Emit("message group subscribe", {
      headers: { version: 4 },
    });

  /**
   * Subscribe to all private messages
   * @param io the socket.io client to send this request through
   */
  static MessagePrivateSubscribe = async (io: IO) =>
    await io.Emit("message private subscribe", {});

  /**
   * Request the current subscriber's message list
   * @param io the socket.io client to send this request through
   * @param timestamp the timestamp (unix epoch) to start from
   */
  static MessageConversationList = async (io: IO, timestamp: number) =>
    await io.Emit("message conversation list", {
      headers: { version: 4 },
      body: { timestamp },
    });

  /**: any
   * Request the Message Settings for the current subscriber
   * @param io the socket.io client to send this request through
   */
  static MessageSetting = async (io: IO) =>
    await io.Emit("message setting", {});

  /**
   * Update the current subscriber's message settings
   * @param io the socket.io client to send this request through
   * @param enabled whether or not the spam filter is enabled
   * @param tier the level of the spam filter
   */
  static MessageSettingUpdate = async (
    io: IO,
    enabled: boolean,
    tier: number
  ) =>
    await io.Emit("message setting update", { spamFilter: { enabled, tier } });

  /**
   * Update the content of a message
   * @param io the socket.io client to send this request through
   * @param recipientId the recipient id of the message
   * @param timestamp the timestamp of the message
   * @param isGroup whether this a group message or not
   * @param data the data of the message
   */
  static MessageUpdateData = async (
    io: IO,
    recipientId: number,
    timestamp: number,
    isGroup: boolean,
    data: any
  ) =>
    await io.Emit("message update", { recipientId, timestamp, isGroup, data });

  /**
   * Update the deletion status of a message
   * @param io the socket.io client to send this request through
   * @param recipientId the recipient id of the message
   * @param timestamp the timestamp of the message
   * @param isGroup whether this a group message or not
   * @param isDeleted whether this is delete or not
   */
  static MessageUpdateDeleted = async (
    io: IO,
    recipientId: number,
    timestamp: number,
    isGroup: boolean,
    isDeleted: boolean
  ) =>
    await io.Emit("message update", {
      recipientId,
      timestamp,
      isGroup,
      metadata: { isDeleted },
    });

  /**
   * Get a list of message update history
   * @param io the socket.io client to send this request through
   * @param recipientId the recipient id of the message
   * @param timestamp the timestamp of the message
   * @param isGroup whether this a group message or not
   * @param offsetTimestamp get history from this unix epoch timestamp
   * @param limit the limit of results to return
   */
  static MessageUpdateList = async (
    io: IO,
    recipientId: number,
    timestamp: number,
    isGroup: boolean,
    offsetTimestamp: number,
    limit: number
  ) =>
    await io.Emit("message update list", {
      recipientId,
      timestamp,
      isGroup,
      offsetTimestamp,
      limit,
    });

  /**
   * Send a Message
   * @param io the socket.io client to send this request through
   * @param recipient the recpiient of this message
   * @param isGroup is the message meant for a group
   * @param data the data to be sent
   * @param mimeType the mimetype of the data
   */
  static MessageSend = async (
    io: IO,
    recipient: number,
    isGroup: boolean,
    data: any,
    mimeType: string
  ) =>
    await io.Emit("message send", {
      recipient,
      isGroup,
      data,
      mimeType,
      flightId: `wolf.js_${recipient}_${new Date().getTime()}`,
    });

  /**
   * Add a subscriber to the current subscriber's whitelist
   * @param io the socket.io client to send this request through
   * @param id the id of the subscriber
   */
  static SubscriberWhitelistAdd = async (io: IO, id: number) =>
    await io.Emit("subscriber whitelist add", { id });
}
