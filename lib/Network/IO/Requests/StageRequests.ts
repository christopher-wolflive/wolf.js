import type IO from "../IO";

export default class StageRequests {
  /**
   * Request a list of all stage themes
   * @param io the socket.io client to send this request through
   * @param language the language id
   */
  static StageList = async (io: IO, language: number = 1) =>
    await io.Emit("stage list", { language });

  /**
   * Request a list of stage themes available to a group
   * @param io the socket.io client to send this request through
   * @param id the id of the group
   */
  static StageGroupActiveList = async (io: IO, id: number) =>
    await io.Emit("stage group active list", { id });
}
