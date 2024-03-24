"use client"

import React, {useState} from "react";
import "./navbar.css";

export default function Navbar({children}: Readonly<{ children: React.ReactNode }>) {
    const [display, setDisplay] = useState("none");
    const [shadow, setShadow] = useState("");

    const handleClick = () => {
        if (display === "none") {
            setShadow("0 0 4px black");
            setDisplay("flex");
        } else {
            setShadow("");
            setDisplay("none");
        }
    };

    const handleLeave = () => {
        setShadow("");
        setDisplay("none");
    };

    return (
        <>
            <div className="navbar" onMouseLeave={handleLeave} style={{boxShadow: shadow}}>
                <button className="navbar_icon" onClick={handleClick}></button>
                <div className="navbar_menu" style={{display: display}}>
                    {children}
                </div>
            </div>
        </>
    );
}
