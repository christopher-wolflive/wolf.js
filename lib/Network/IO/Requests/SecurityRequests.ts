import type IO from "../IO";

export default class SecurityRequests {
  /**
   * Login to WOLF with the given credentials
   * @param io the socket.io client to route this through
   * @param email the email of the account
   * @param password the password of the account
   * @param onlineState the onlineState
   */
  static SecurityLogin = async (
    io: IO,
    email: string,
    password: string,
    onlineState: number = 1
  ) =>
    await io.Emit("security login", {
      headers: { version: 2 },
      body: { username: email, password, onlineState, type: "email" },
    });

  /**
   * Logout from WOLF
   * @param io the socket.io client to route this through
   */
  static SecurityLogout = async (io: IO) =>
    await io.Emit("security logout", {});

  /**
   * Refresh the Security Token
   * @param io the socket.io client to route this through
   */
  static SecurityTokenRefresh = async (io: IO) =>
    await io.Emit("security token refresh", {});
}
