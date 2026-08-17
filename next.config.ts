import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  /* config options here */
};

// Sets up the BotID proxy rewrites so the challenge can't be blocked by
// ad-blockers or third-party script filters.
export default withBotId(nextConfig);
