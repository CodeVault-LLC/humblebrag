export interface Message {
  type: "log" | "error" | "info" | "warn" | "success";
  message: string;

  sentAt: string;

  [key: string]: unknown;
}

export interface ScriptResponse {
  name: string;
  size: number;
  content?: string;
}
