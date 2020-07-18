import { WebSocket } from "https://deno.land/std/ws/mod.ts";

const chatConnection = async (ws: WebSocket) => {
  console.log("new socket connection");
};

export { chatConnection };
