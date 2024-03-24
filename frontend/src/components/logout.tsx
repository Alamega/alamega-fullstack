"use client"

import React from "react";
import {logout} from "@/lib";

const signOut = async () => {
    await logout();
};

export function LogoutLink() {
    return (
        <>
            <a style={{cursor: "pointer"}} onClick={signOut}>Выйти</a>
        </>
    );
}

export function LogoutBtn() {
    return (
        <>
            <button className="button-green" onClick={signOut}>Выйти</button>
        </>
    );
}