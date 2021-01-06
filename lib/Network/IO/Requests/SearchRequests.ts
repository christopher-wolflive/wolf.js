import type IO from "../IO";

export default class SearchRequests {
  /**
   *
   * @param io the socket.io client to send this request through
   * @param query the search query
   * @param maxResults the max results to return
   * @param offset the offset of the list
   * @param types the types of search
   */
  static Search = async (
    io: IO,
    query: string,
    maxResults: number,
    offset: number,
    types: string[] = ["related", "groups"]
  ) => io.Emit("search", { types, query, maxResults, offset });
}
