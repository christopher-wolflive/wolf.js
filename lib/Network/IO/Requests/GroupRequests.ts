import type IO from "../IO";

export default class GroupRequests {
  /**
   * Create a Group
   * @param io the socket.io clien to route this through
   * @param data the data to create the group with
   */
  static GroupCreate = async (io: IO, data: any) =>
    await io.Emit("group create", data);

  /**
   * Get a Group by name or id
   * @param io the socket.io clien to route this through
   * @param nameOrId the name or id of the group
   * @param entities the entities of the group to fetch
   * @param subscribe subscribe to group profile updates
   */
  static GroupProfile = async (
    io: IO,
    nameOrId: string | number,
    entities: string[] = ["base", "extended", "audioConfig", "audioCounts"],
    subscribe: boolean = false
  ) =>
    await io.Emit("group profile", {
      headers: { version: 4 },
      body: {
        [typeof nameOrId === "string" ? "name" : "id"]: nameOrId,
        entities,
        subscribe,
      },
    });

  /**
   * Get Multiple Groups by ID
   * @param io the socket.io clien to route this through
   * @param idList the ids of the groups
   * @param entities the entities of the groups to fetch
   * @param subscribe subscribe to profile updates to these groups
   */
  static GroupProfiles = async (
    io: IO,
    idList: number[],
    entities: string[] = ["base", "extended", "audioConfig", "audioCounts"],
    subscribe: boolean = false
  ) =>
    await io.Emit("group profile", {
      headers: { version: 4 },
      body: {
        idList,
        entities,
        subscribe,
      },
    });

  /**
   * Get the stats for a group
   * @param io the entities of the group to fetch
   * @param id the id of the group
   */
  static GroupStats = async (io: IO, id: number) =>
    await io.Emit("group stats", {
      headers: { version: 2 },
      body: { id },
    });

  /**
   * Update a Group
   * @param io the socket.io clien to route this through
   * @param id the id of the group to update
   * @param data the data to update the group with
   */
  static GroupProfileUpdate = async (io: IO, id: number, data: any) =>
    await io.Emit("group profile update", { id, ...data });
}
