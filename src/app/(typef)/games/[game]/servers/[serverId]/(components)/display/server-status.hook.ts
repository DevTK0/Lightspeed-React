import { useQuery } from "@tanstack/react-query";
import { Input, Output, getServerStatus } from "./server-status.action";
import { withErrorHandling } from "@/lib/error-handling/next-safe-action";

export function useServerStatus(params: Input) {
    return useQuery({
        queryKey: ["server", params.serverId, "status"],
        queryFn: async () =>
            withErrorHandling<Input, Output>(getServerStatus)(params),
    });
}
