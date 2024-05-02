import { inngest } from "@/(global)/lib/inngest/client";
import { gamelist } from "@/(global)/meta/gamedata";
import { z } from "zod";

export const getMessageSchema = z.object({
    game: z.enum(gamelist),
    serverId: z.number(),
});

export async function getMessage({
    game,
    serverId,
}: z.infer<typeof getMessageSchema>) {
    let response = { message: `hello from ${game} number ${serverId}!` };
    return response;
}

export const helloWorldFn = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");

        const message = await getMessage({ game: "Palworld", serverId: 1 });

        console.log(message);

        return { event, body: message };
    }
);
