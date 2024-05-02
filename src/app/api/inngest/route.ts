import { serve } from "inngest/next";
import { inngest } from "@/(global)/lib/inngest/client";

import { helloWorldFn } from "@/app/(typef)/games/palworld/servers/[serverId]/(local)/component.service";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        /* your functions will be passed here later! */
        helloWorldFn,
    ],
});
