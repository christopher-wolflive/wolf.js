import type IO from "../IO";

export default class SubscriberRequests {
  /**
   * Request a Subscriber's Profile
   * @param io the socket.io clien to route this through
   * @param id the id of the subscriber
   * @param extended fetch the extended portion of the subscriber's profile
   * @param subscribe subscribe to changes to this subscriber's profile
   */
  static SubscriberProfile = async (
    io: IO,
    id: number,
    extended = false,
    subscribe = false
  ) =>
    await io.Emit("subscriber profile", {
      headers: { version: 4 },
      body: {
        id,
        extended,
        subscribe,
      },
    });

  /**
   * Request Multiple Subscriber's IDs
   * @param io the socket.io client to route this through
   * @param idList the list of ids to fetch
   * @param extended fetch the extended portion of the profiles
   * @param subscribe subscribe to updates to these user's profiles
   */
  static SubscriberProfiles = async (
    io: IO,
    idList: number[],
    extended = false,
    subscribe = false
  ) =>
    await io.Emit(
      "subscriber profile",
      {
        headers: { version: 4 },
        body: {
          idList,
          extended,
          subscribe,
        },
      },
      50
    );

  /**
   * Request and Update to the Client's currently logged in subscriber's profile
   * @param io the socket.io client to route this through
   * @param data the update data
   */
  static SubscriberProfileUpdate = async (io: IO, data: any) =>
    await io.Emit("subscriber profile update", data);

  /**
   * Request the list of groups for the current subscribers
   * @param io the socket.io client to route this through
   * @param subscribe subscribe to changes to the subscriber's group list
   */
  static SubscriberGroupList = async (io: IO, subscribe: boolean = false) =>
    await io.Emit("subscriber group list", { subscribe });

  /**
   * Get the current subsctiber's settings
   * @param io the socket.io client to route this through
   */
  static SubscriberSettings = async (io: IO) =>
    await io.Emit("subscriber settings", {});

  /**
   * Update the current subscriber's settings
   * @param io the socket.io client to route this through
   * @param state the new state
   */
  static SubscriberSettingsUpdate = async (io: IO, state: string) =>
    await io.Emit("subscriber settings update", { state: { state } });

  /**
   * Get the presence of a subscriber
   * @param io the socket.io client to route this through
   * @param id the id of the subscriber
   */
  static SubscriberPresence = async (io: IO, id: number) =>
    await io.Emit("subscriber presence", { id });

  /**
   * The the presence of multiple subscribers
   * @param io the socket.io client to route this through
   * @param idList the ids of the subscribers
   */
  static SubscriberPresences = async (io: IO, idList: number[]) =>
    await io.Emit("subscriber presence", { idList });
}
