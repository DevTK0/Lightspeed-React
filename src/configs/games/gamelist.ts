import { z } from "zod";

const gamelist = ["Palworld", "Minecraft", "Corekeeper", "VRising"] as const;

export const games = z.enum(gamelist);

export type Games = z.infer<typeof games>;
