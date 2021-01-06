import type Client from "../../Client";
import asyncPool from "tiny-async-pool";

/**
 * New Socket.IO Wrapper for WOLF
 */
export default class IO {
  Client: Client;

  Conn: SocketIOClient.Socket;

  /**
   * Create a new Socket.IO Wrapper
   * @param client The client to associate this underlying socket.io connection with
   * @param baseUrl The URL of the server to connect to
   * @param device The device type to connect as
   */
  constructor(
    client: Client,
    baseUrl: string = "wss://v3.palringo.com",
    device: "web" | "android" | "ios" = "web"
  ) {
    this.Client = client;
    this.Conn = io(baseUrl, {
      transports: ["websocket"],
      query: {
        token: this.Client.Token,
        device,
      },
    });
  }

  /**
   * Adds a listener for a particular event. Calling multiple times will add multiple listeners
   * @param event The event to listen for
   * @param fn the function to call when the event is recieved
   * @returns this emitter
   */
  On = (event: string, fn: Function): SocketIOClient.Emitter =>
    this.Conn.on(event, fn);

  /**
   * Adds a listener for a particular event that will be invoked a single time before being automatically removed
   * @param event the event to listen for
   * @param fn the function to call when the event is recieved
   * @returns this emitter
   */
  Once = (event: string, fn: Function): SocketIOClient.Emitter =>
    this.Conn.once(event, fn);

  /**
   * Removes a listener for a particular type of event. This will either remove a specific listener, or all listeners for this type of event
   * @param event The event that we want to remove the listener of
   * @param fn The function to remove, or null if we want to remove all functions
   * @returns this emitter
   */
  Off = (event: string, fn?: Function): SocketIOClient.Emitter =>
    this.Conn.off(event, fn);

  /**
   * Send a packet to WOLF
   * @param event the event that we want to send
   * @param data the data we want to send
   * @param batchSize the batch size if idList is found in the body
   */
  Emit = (event: string, data: any, batchSize: number = 50): Promise<any> =>
    new Promise(async (resolve, reject) => {
      // Wrap in Body if just raw data is passed along
      if (!data.headers && !data.body) data = { body: data };

      if (!data.body.idList)
        this.Conn.emit(event, data, (resp) =>
          resp.code >= 200 && resp.code <= 299 ? resolve(resp) : reject(resp)
        );

      let idList: number[] = new Array<number>(
        ...new Set<number>(data.body.idList)
      );

      let chunks: number[][] = [];

      for (let i = 0; i < idList.length; i += batchSize)
        chunks.push(idList.slice(i, i + batchSize));

      let req = (idList) =>
        new Promise((resolve, reject) => {
          this.Conn.emit(
            event,
            {
              headers: data.headers ?? {},
              body: { ...data.body, idList },
            },
            (resp) =>
              resp.code >= 200 && resp.code <= 299
                ? resolve(resp)
                : reject(resp)
          );
        });

      let responses = (await asyncPool(3, chunks, req))
        .reduce((resps: any[], resp: any) => {
          resps.push(...Object.values(resp.body));
          return resps;
        }, [])
        .reduce((entities: any[], entity: any) => {
          if (entity.code === 200) entities.push(entity.body);
          return entities;
        }, []);

      resolve(responses);
    });
}
