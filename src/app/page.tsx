"use client";

import { redirect } from "next/navigation";
import { routes } from "@/configs/site";

export default function Home() {
    redirect(routes.landing);

    return <></>;
}
