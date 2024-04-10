"use client"

import "./modal.css";
import {ReactNode} from "react";

export default function Modal({children}: { children: ReactNode }) {
    return (
        <>
            <div className="modal-wrapper">
                <div className="modal">
                    {children}
                </div>
            </div>
        </>
    );
}
