import type IO from "../IO";

export default class MetadataRequests {
  /**
   * Get metadata about a url
   * @param io the socket.io client to send this request through
   * @param url the url
   */
  static MetadataUrl = async (io: IO, url: string) =>
    await io.Emit("metadata url", { url });

  /**
   * Get the list of blacklisted URLs
   * @param io the socket.io client to send this request through
   */
  static MetadataUrlBlacklist = async (io: IO) =>
    await io.Emit("metadata url blacklist", {});
}
