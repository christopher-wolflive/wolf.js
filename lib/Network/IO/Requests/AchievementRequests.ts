import { isNull } from "util";
import type IO from "../IO";

export default class AchievementRequests {
  /**
   * Request information about a set of achievements
   * @param io the socket.io client to route this through
   * @param idList the idList of the achievements to fetch, if blank it will get all achievements
   * @param languageId the languageId to localize the achievements to, defaults to 1 (English)
   */
  static AchievementList = async (
    io: IO,
    idList?: number[],
    languageId?: number
  ) =>
    await io.Emit(
      "achievement list",
      (() => {
        let data: any = {};

        if (idList) data.isList = idList;
        if (languageId) data.languageId = languageId;

        return data;
      })()
    );

  /**
   * Request a list of achievement ids for a subscriber
   * @param io the socket.io client to route this through
   * @param id the id of the subscriber
   * @param parentId the parent id of the achievemenet
   * @param order criteria to order the result by
   */
  static AchievementSubscriberList = async (
    io: IO,
    id: number,
    parentId?: number,
    order?: string
  ) =>
    await io.Emit(
      "achievement subscriber list",
      (() => {
        let data: any = { id };

        if (parentId) data.parentId = parentId;
        if (order) data.order = order;

        return data;
      })()
    );
}
