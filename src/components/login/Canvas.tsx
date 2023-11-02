"use client";
import { useAnimationFrame } from "framer-motion";
import { useEffect, useRef } from "react";

const R = function (x: number, y: number, time: number) {
    return Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + time));
};

const G = function (x: number, y: number, time: number) {
    return Math.floor(
        192 +
            64 *
                Math.sin(
                    (x * x * Math.cos(time / 4) + y * y * Math.sin(time / 3)) /
                        300
                )
    );
};

const B = function (x: number, y: number, time: number) {
    return Math.floor(
        192 +
            64 *
                Math.sin(
                    5 * Math.sin(time / 9) +
                        ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
                )
    );
};

export default function Canvas() {
    const canvasRef = useRef(null);

    useAnimationFrame((time) => {
        let diffTime = time * 0.0007;
        const canvas = canvasRef.current;
        if (!canvas) return;
        //@ts-ignore
        const context = canvas.getContext("2d");
        for (let x = 0; x <= 30; x++) {
            for (let y = 0; y <= 30; y++) {
                // @ts-ignore
                context.fillStyle = `rgb(${R(x, y, diffTime)}, ${G(
                    x,
                    y,
                    diffTime
                )}, ${B(x, y, diffTime)})`;
                context.fillRect(x, y, 10, 10);
            }
        }
    });

    return (
        <canvas
            ref={canvasRef}
            width={32}
            height={32}
            style={{
                width: "100%",
                height: "100%",
            }}
        />
    );
}
