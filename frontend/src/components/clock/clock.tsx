"use client";

import React, {useEffect, useState} from "react";
import "./clock.css";

export default function Clock() {
    const [time, setTime] = useState(new Date());
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div id="clock">
            {isMounted &&
                <>
                    {time.getHours().toString().padStart(2, "0")}:
                    {time.getMinutes().toString().padStart(2, "0")}:
                    {time.getSeconds().toString().padStart(2, "0")}
                </>
            }
        </div>
    );
};