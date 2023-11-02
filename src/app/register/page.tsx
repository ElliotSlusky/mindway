"use client";
import Canvas from "@/components/login/Canvas";
import RegisterForm from "@/components/login/RegisterForm";
// import LoginForm from "../components/login/LoginForm";
import { useEffect, useState } from "react";

export default function Home() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <main className="bg-indigo-100 min-h-screen h-full">
            <div className="absolute inset-0 right-auto w-96 min-h-screen h-full">
                <div className="absolute top-80 left-0 right-0 text-center text-black opacity-50 text-5xl font-bold">
                    Mindway
                </div>
                <Canvas />
            </div>
            <div className="px-48 pt-40 pl-[582px]">
                {isClient && <RegisterForm />}
            </div>
        </main>
    );
}
