import { NextSafeAction } from "../server-actions/next-safe-action";

export function withErrorHandling<I, O>(handler: NextSafeAction) {
    return async function (params: I) {
        const { data, serverError, validationErrors } = await handler(params);

        if (serverError) {
            throw new ServerError(serverError);
        }

        for (const error in validationErrors) {
            throw new ValidationError("Invalid " + error);
        }

        return data as O;
    };
}

export class ServerError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
    }
}
