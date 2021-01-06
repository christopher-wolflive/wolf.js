import type IO from "../IO";

export default class ContactRequests {
  /**
   * Get the contact list of the current subscriber
   * @param io the socket.io client to send this request through
   * @param subscribe subscribe to updates to the block list
   */
  static SubscriberContactList = async (io: IO, subscribe = false) =>
    await io.Emit("subscriber contact list", { subscribe });

  /**
   * Add the subscriber as a contact
   * @param io the socket.io client to send this request through
   * @param id the id of the subscriber
   */
  static SubscriberContactAdd = async (io: IO, id: number) =>
    await io.Emit("subscriber contact add", { id });

  /**
   * Delete the subscriber as a contact
   * @param io the socket.io client to send this request through
   * @param id the id of the subscriber
   */
  static SubscriberContactDelete = async (io: IO, id: number) =>
    await io.Emit("subscriber contact delete", { id });
}
