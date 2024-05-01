import Navbar from "./(local)/navbar/navbar";
import { Toaster } from "@/(global)/components/ui/toaster";

export default async function TypeFLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <div className="block">
                <div className="border-t">
                    <div className="bg-background">{children}</div>
                </div>
            </div>
            <Toaster />
        </>
    );
}
