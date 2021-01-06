import type IO from "../IO";

export default class GroupMemberRequests {
  /**
   * Add the current subscriber of this connection to a group
   * @param io the socket.io client to send this request through
   * @param nameOrId the name or id of the group
   * @param password the password of the group
   * @param referredBy the id of the subscriber who referred the client
   */
  static GroupMemberAdd = async (
    io,
    nameOrId,
    password = null,
    referredBy = null
  ) =>
    await io.Emit(
      "group member add",
      (() => {
        let data = { [typeof nameOrId === "string" ? "name" : "id"]: nameOrId };

        if (password) data.password = password;
        if (referredBy) data.referredBy = referredBy;

        return data;
      })()
    );

  /**
   * Update the capabilities of a group member
   * @param io the socket.io client to send this request through
   * @param groupId the id of the group
   * @param subscriberId the id of the subscriber
   * @param capabilities the new capabilities of the subscriber
   */
  static GroupMemberUpdate = async (io, groupId, subscriberId, capabilities) =>
    await io.Emit("group member update", {
      groupId,
      subscriberId,
      capabilities,
    });

  /**
   * Kick or Remove the current subscriber of this connection from a group
   * @param io the socket.io client to send this request through
   * @param subscriberId the id of the subscriber
   */
  static GroupMemberDelete = async (io, subscriberId) =>
    await io.Emit("group member delete", { subscriberId });

  /**
   * Request the group member's list
   * @param io the socket.io client to send this request through
   * @param id the id of the group
   * @param subscribe subscribe to updates to the group member list
   */
  static GroupMemberList = async (io, id, subscribe = false) =>
    await io.Emit("group member list", {
      headers: { version: 3 },
      body: { id, subscribe },
    });
}
