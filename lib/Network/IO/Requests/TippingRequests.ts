import type IO from "../IO";

export default class TippingRequests {
  /**
   * Add a tip to someone on stage or a message
   * @param io the socket.io client to send this request through
   * @param subscriberId the id of the subscriber
   * @param groupid the id of the group
   * @param charmList the ids and quantities of the charms to add
   * @param context the type and context id
   */
  static TipAdd = async (
    io: IO,
    subscriberId: number,
    groupId: number,
    charmList: any,
    context: any
  ) => await io.Emit("tip add", { subscriberId, groupId, charmList, context });

  /**
   * Get the details about a tip for a context
   * @param io the socket.io client to send this request through
   * @param groupId the id of the group
   * @param contextType the context type
   * @param id the id of the context
   * @param offset the offset of the list
   * @param limit the limit of the list
   */
  static TipDetail = async (
    io: IO,
    groupId: number,
    contextType: string,
    id: number,
    offset: number,
    limit: number
  ) => await io.Emit("tip detail", { groupId, contextType, id, offset, limit });

  /**
   * Get the Summary of Tips for a context
   * @param io the socket.io client to send this request through
   * @param groupId the id of the group
   * @param contextType the context type
   * @param id the id of the context
   */
  static TipSummary = async (
    io: IO,
    groupId: number,
    contextType: string,
    id: number
  ) => await io.Emit("tip summary", { groupId, contextType, id });

  /**
   * Get the summaries of tips for multiple contexts
   * @param io the socket.io client to send this request through
   * @param groupId the group id
   * @param contextType the context type
   * @param idList the ids of the context
   */
  static TipSummaries = async (
    io: IO,
    groupId: number,
    contextType: string,
    idList: number[]
  ) => await io.Emit("tip summary", { groupId, contextType, idList });

  /**
   * Subscribe to Tip Events in Groups
   * @param io the socket.io client to send this request through
   */
  static TipGroupSubscribe = async (io: IO) =>
    await io.Emit("tip group subscribe", {});

  /**
   * Get the Tipping Leaderboard for a Group
   * @param io the socket.io client to send this request through
   * @param groupId the group id
   * @param type the type
   * @param period the period
   * @param tipDirection the direction
   */
  static TipLeaderboardGroup = async (
    io: IO,
    groupId: number,
    type: string,
    period: string,
    tipDirection: string
  ) =>
    await io.Emit("tip leaderboard group", {
      groupId,
      type,
      period,
      tipDirection,
    });

  /**
   * Get the Tipping Leaderboard Summary for a Group
   * @param io the socket.io client to send this request through
   * @param groupId the group id
   */
  static TipLeaderboardGroupSummary = async (io: IO, groupId: number) =>
    await io.Emit("tip leaderboard group summary", { groupId });

  /**
   * Get the Global Tipping Leaderboard
   * @param io the socket.io client to send this request through
   * @param type the type
   * @param period the period
   * @param tipDirection the direction
   */
  static TipLeaderboardGlobal = async (
    io: IO,
    type: string,
    period: string,
    tipDirection: string
  ) => await io.Emit("tip leaderboard global", { type, period, tipDirection });

  /**
   * Get the Global Tipping Leaderboard Summary
   * @param io the socket.io client to send this request through
   * @param period the period
   */
  static TipLeaderboardGlobalSummary = async (io: IO, period: string) =>
    await io.Emit("tipe leaderboard global summary", { period });
}
