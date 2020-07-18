import { serve } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  acceptable,
} from "https://deno.land/std/ws/mod.ts";

import { chatConnection } from "./ws/chatroom.ts";

/* acceptWebSocket upgrades given TCP connection into websocket connection */
/* acceptable returns whether given headers is acceptable for websocket  */

// Setup server
const server = serve({ port: 3000 });
console.log("http://localhost:3000");

for await (const req of server) {
  // serve index page
  if (req.url === "/") {
    req.respond({ status: 200, body: await Deno.open("./public/index.html") });
  }

  // accept websocket connection
  if (req.url === "/ws") {
    if (acceptable(req)) {
      acceptWebSocket(
        {
          conn: req.conn,
          bufWriter: req.w,
          bufReader: req.r,
          headers: req.headers,
        },
      ).then(chatConnection);
    }
  }
}
