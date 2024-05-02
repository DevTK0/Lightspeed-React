import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const payload = req.body;
    console.log(payload);

    return new Response("", {
        status: 200,
    });
}
