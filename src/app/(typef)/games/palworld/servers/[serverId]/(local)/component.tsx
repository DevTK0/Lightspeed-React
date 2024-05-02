"use client";

import { Button } from "@/(global)/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getMessageAction } from "./component.action";
import { actionWithErrorHandling } from "@/(global)/lib/request/next-safe-action";
import { useError } from "@/(global)/components/error-toast/error-toast";

export function Component() {
    const {
        isError,
        isPending,
        data: response,
        error,
    } = useQuery({
        queryKey: ["component"],
        queryFn: actionWithErrorHandling(() =>
            getMessageAction({ serverId: 1, game: "Palworld" })
        ),
    });

    useError(isError, error);

    return (
        <>
            <div> {isPending ? "Loading..." : response?.message} </div>
        </>
    );
}
