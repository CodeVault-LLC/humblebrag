export interface CusResponse {
  type: "table" | "json" | "text" | "error" | "dir"; // print method.
  data: unknown;
}
