import { createSafeActionClient } from "next-safe-action";
import { ZodError } from "zod";

export const action = createSafeActionClient({
    handleReturnedServerError(err) {
        console.log(err);
        if (err instanceof ZodError) {
            // return first error message
            return err.issues[0].message;
        }
        return err.message;
    },
    async middleware() {
        // To Do:
        // Add auth features
    },
});

export type NextSafeAction = ReturnType<typeof action>;
