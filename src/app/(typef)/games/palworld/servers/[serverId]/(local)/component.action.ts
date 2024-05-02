"use server";

import { action } from "@/(global)/lib/request/next-safe-action";

import { getMessage, getMessageSchema } from "./component.service";

export const getMessageAction = action(getMessageSchema, async (args) => {
    return await getMessage(args);
    // let response = { message: "hello_world" };
    // return response;
});
