import type IO from "../IO";

export default class EventRequests {
  /**
   * Get a list of events the current subscriber is subscribed to
   * @param io the socket.io client to send this request through
   * @param subscribe
   */
  static SubscriberGroupEventList = async (io: IO, subscribe: boolean) =>
    await io.Emit("subscriber group event list", { subscribe });

  /**
   * Add an event to the current subscriber's list
   * @param io the socket.io client to send this request through
   * @param id the id of the event
   */
  static SubscriberGroupEventAdd = async (io: IO, id: number) =>
    await io.Emit("subscriber group event add", { id });

  /**
   * Remove an event from the current subscriber's list
   * @param io the socket.io client to send this request through
   * @param id the id of the event
   */
  static SubscriberGroupEventDelete = async (io: IO, id: number) =>
    await io.Emit("subscriber group event delete", { id });

  /**
   * Get details about an event
   * @param io the socket.io client to send this request through
   * @param id the id of the event
   */
  static GroupEvent = async (io: IO, id: number) =>
    await io.Emit("group event", { id });

  /**
   * Get detaild about multiple events
   * @param io the socket.io client to send this request through
   * @param idList the ids of the events
   */
  static GroupEvents = async (io: IO, idList: number[]) =>
    await io.Emit("group event", { idList });

  /**
   * Get events that are being hosted by a group
   * @param io the socket.io client to send this request through
   * @param id the id of the group
   * @param subscribe subscribe to changes to this list
   */
  static GroupEventList = async (io: IO, id: number, subscribe: boolean) =>
    await io.Emit("group event list", { id, subscribe });

  /**
   * Create an event
   * @param io the socket.io client to send this request through
   * @param groupId the id of the group
   * @param data the data to create the event with
   */
  static GroupEventCreate = async (io: IO, groupId: number, data: any) =>
    await io.Emit("group event create", { groupId, ...data });

  /**
   * Update an event
   * @param io the socket.io client to send this request through
   * @param id the id of the event
   * @param data the data to update the event with
   */
  static GroupEventUpdate = async (io: IO, id: number, data: any) =>
    await io.Emit("group event update", { id, ...data });
}
