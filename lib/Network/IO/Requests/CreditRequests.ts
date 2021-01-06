import type IO from "../IO";

export default class CreditRequests {
  /**
   * Get the current subscriber's credit balance
   * @param io the socket.io client to send this request through
   * @param subscribe subscribe to credit balance updates
   */
  StoreCreditBalance = async (io: IO, subscribe: boolean) =>
    await io.Emit("store credit balance", { subscribe });
}
