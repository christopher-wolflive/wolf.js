import type IO from "../IO";

export default class CharmRequests {
  /**
   * Request Information about a Charm
   * @param io the socket.io client to send the request through
   * @param id the id of the charm
   */
  static Charm = async (io: IO, id: number) => io.Emit("charm list", { id });

  /**
   * Request Information about Charms
   * @param io the socket.io client to send the request through
   * @param idList the ids of the charms
   */
  static CharmList = async (io: IO, idList?: number[]) =>
    io.Emit(
      "charm list",
      (() => {
        let data: any = {};
        if (idList) data.idList = idList;
      })()
    );

  /**
   * Request a list of Starred Charms
   * @param io the socket.io client to send the request through
   */
  static CharmStarredList = async (io: IO) => io.Emit("charm starred list", {});

  /**
   * Return the active charms for a subscriber
   * @param io the socket.io client to send the request through
   * @param id the id of the subscriber
   */
  static CharmSubscriberActiveList = async (io: IO, id: number) =>
    io.Emit("charm subscriber active list", { id });

  /**
   * Returns the expired charms for a subscriber
   * @param io the socket.io client to send the request through
   * @param id the id of the subscriber
   */
  static CharmSubscriberExpiredList = async (io: IO, id: number) =>
    io.Emit("charm subscriber expired list", { id });

  /**
   * Deletes Charm Records
   * @param io the socket.io client to send the request through
   * @param idList the ids of the charms to delete
   */
  static CharmSubscriberDelete = async (io: IO, idList: number) =>
    io.Emit("charm subscriber delete", { idList });

  /**
   * Returns a list of active charms for a set of subscribers
   * @param io the socket.io client to send the request through
   * @param idList the ids of the subscribers
   */
  static CharmSubscriberSelectedList = async (io: IO, idList: number[]) =>
    io.Emit("charm subscriber selected list", { idList });

  /**
   * Set a list of charms for the user to display
   * @param io the socket.io client to send the request through
   * @param selectedCharms
   */
  static CharmSubscriberSetSelected = async (io: IO, selectedCharms) =>
    io.Emit("charm subscriber set selected", { selectedCharms });

  /**
   * Get a summary list of charms for a subscriber
   * @param io the socket.io client to send the request through
   * @param id the id of the subscriber
   */
  static CharmSubscriberSummaryList = async (io: IO, id: number) =>
    io.Emit("charm subscriber summary list", { id });

  /**
   * Get stats for a subscriber's charms
   * @param io the socket.io client to send the request through
   * @param id the id of the subcriber
   * @param extended will include further stats such as most gifted charm
   */
  static CharmSubscriberStatistics = async (
    io: IO,
    id: number,
    extended: boolean
  ) => io.Emit("charm subscriber staticstics", { id, extended });
}
