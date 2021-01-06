import type IO from "../IO";

export default class DiscoveryRequests {
  /**
   * Request the Group Gallery List
   * @param io the socket.io client to request this through
   * @param language the language id
   * @param offset the list offset
   * @param maxResults the maximum number of results to return
   * @param recipeId the recipe id to return
   */
  static GroupGalleryList = async (
    io: IO,
    language: number,
    offset: number,
    maxResults: number,
    recipeId: number
  ) =>
    await io.Emit("group gallery list", {
      language,
      offset,
      maxResults,
      recipeId,
    });

  /**
   * Request the Group Discovery List
   * @param io the socket.io client to request this through
   * @param language the language id
   * @param offset the list offset
   * @param maxResults the maximum number of results to return
   * @param recipeId the recipe id to return
   */
  static GroupDiscoveryList = async (
    io: IO,
    language: number,
    offset: number,
    maxResults: number,
    recipeId: number
  ) =>
    await io.Emit("group discovery list", {
      language,
      offset,
      maxResults,
      recipeId,
    });

  /**
   * Request the Group Recommendation List
   * @param io the socket.io client to request this through
   */
  static GroupRecommendationList = async (io: IO) =>
    await io.Emit("group recommendation list", {});
}
