"use server";

import { getServerStatus as getAwsServerStatus } from "@/lib/aws/ec2";
import { action } from "@/lib/server-actions/next-safe-action";
import { z } from "zod";

import { gamelist } from "@/configs/games/gamelist";
import { withErrorHandling } from "@/lib/error-handling/next-safe-action";

const getServerStatusSchema = z.object({
    game: z.enum(gamelist),
    serverId: z.number(),
});

export type GetServerStatus = z.infer<typeof getServerStatusSchema>;

export const getServerStatus = withErrorHandling(
    action(getServerStatusSchema, async ({ game, serverId }) => {
        return await getAwsServerStatus(game, serverId);
    })
);
