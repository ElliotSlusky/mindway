import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Favicon from '/public/mindwaylogo.png';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Mindway",
    description: "Mindway",
    icons: [{ rel: 'icon', url: Favicon.src }],

};


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
