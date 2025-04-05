"use client";

import {useEffect, useState} from "react";
import "./loader.css";

export default function Loader({message}: { message: string }) {
    const [dots, setDots] = useState<number>(1);

    useEffect(() => {
        const dotsIntervalId = setInterval(() => {
            setDots((prevDots) => (prevDots === 3 ? 1 : prevDots + 1));
        }, 1000);
        return () => clearInterval(dotsIntervalId);
    }, []);

    return (
        <div className={"loader"}>
            <p>{message}{Array(dots).fill(".")}</p>
        </div>
    );
};