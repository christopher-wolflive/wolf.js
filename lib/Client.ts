import { EventEmitter } from "events";

export default class Client {
  Token: string;

  Emitter: EventEmitter;

  constructor(token?: string) {
    this.Token = token ?? this.GenerateToken();
    this.Emitter = new EventEmitter();
    this.Emitter.setMaxListeners(Number.MAX_SAFE_INTEGER);
  }

  private GenerateToken = (): string => {
    let d = new Date().getTime();
    return (
      "WolfJS" +
      "x".repeat(64).replace(/[x]/gi, (c) => {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      })
    );
  };
}
