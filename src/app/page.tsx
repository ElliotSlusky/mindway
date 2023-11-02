"use client";
import { useEffect, useState } from "react";
import LoginForm from "../components/login/LoginForm";
import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("../components/login/Canvas"), {
    ssr: false,
});
export default function Home() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <main className="bg-indigo-100 min-h-screen h-full">
            <div className="absolute inset-0 left-auto w-96 min-h-screen h-full">
                <div className="absolute top-80 left-0 right-0 text-center text-black opacity-50 text-5xl font-bold">
                    Mindway
                </div>
                <Canvas />
            </div>
            <div className="px-48 pt-40 pr-[582px]">
                {isClient && <LoginForm />}
            </div>
        </main>
    );
}
