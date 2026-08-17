import { initBotId } from "botid/client/core";

// Attaches the invisible BotID challenge to the scoring endpoint so the
// server-side checkBotId() can classify each request.
initBotId({
  protect: [{ path: "/api/score", method: "POST" }],
});
