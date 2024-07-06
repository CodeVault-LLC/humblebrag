import { GlobalRoute } from "./globals";
import { NetworkRoute } from "./network";
import { ScriptRoute } from "./scripts";

export class Router {
  private port: chrome.runtime.Port;
  public static instance: Router;

  constructor(port: chrome.runtime.Port) {
    this.port = port;

    // eslint-disable-next-line @typescript-eslint/no-misused-promises -- Safe
    this.port.onMessage.addListener(this.handleMessage);
    this.port.onDisconnect.addListener(this.handleDisconnect);

    Router.instance = this;
  }

  private handleMessage = async (msg: {
    type: string;
    method: string;
  }): Promise<void> => {
    if (msg.type === "scripts" && msg.method === "GET") {
      await ScriptRoute(this.respond);
    }

    if (msg.type === "networks" && msg.method === "GET") {
      await NetworkRoute(this.respond);
    }

    if (msg.type === "globals" && msg.method === "GET") {
      await GlobalRoute(this.respond);
    }

    if (msg.type === "payment" && msg.method === "GET") {
      const response = await fetch("http://localhost:3000/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan: "simple" }),
      });

      const data = await response.json();
      this.respond(data);
    }
  };

  public respond = (data: unknown): void => {
    this.port.postMessage(data);
  };

  private handleDisconnect = (): void => {
    // eslint-disable-next-line no-console -- Safe
    console.log("Disconnected from port");
  };
}
