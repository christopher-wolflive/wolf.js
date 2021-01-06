import type IO from "../IO";

export default class BlockedRequests {
  /**
   * Get the block list of the current subscriber
   * @param io the socket.io client to send this request through
   * @param subscribe subscribe to updates to the block list
   */
  static SubscriberBlockList = async (io: IO, subscribe: boolean) =>
    await io.Emit("subscriber block list", { subscribe });

  /**
   * Block a subscriber
   * @param io the socket.io client to send this request through
   * @param id the id of the subscriber
   */
  static SubscriberBlockAdd = async (io: IO, id: number) =>
    await io.Emit("subscriber block add", { id });

  /**
   * Unblock a subscriber
   * @param io the socket.io client to send this request through
   * @param id the id of the subscriber
   */
  static SubscriberBlockDelete = async (io: IO, id: number) =>
    await io.Emit("subscriber block delete", { id });
}
