"use server";

import { getServerStatus as getStatus } from "@/lib/aws/ec2";
import { action } from "@/lib/server-actions/next-safe-action";
import { z } from "zod";

import { games } from "@/configs/games/gamelist";

const getServerStatusSchema = z.object({
    game: games,
    serverId: z.number(),
});

export type Input = z.infer<typeof getServerStatusSchema>;
export type Output = Awaited<ReturnType<typeof getServerStatus>>["data"];

export const getServerStatus = action(
    getServerStatusSchema,
    async ({ game, serverId }) => {
        return await getStatus(game, serverId);
    }
);
