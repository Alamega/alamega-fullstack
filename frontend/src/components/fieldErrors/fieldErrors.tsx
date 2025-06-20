"use client";

import React from "react";
import "./fieldErrors.css";

export default function FieldErrorMessages({errorMessages}: { errorMessages?: string[] }) {
    if (!errorMessages || errorMessages.length === 0) return null;
    return (
        <>
            {[...errorMessages].sort((a, b) => a.localeCompare(b)).map((msg, index) => (
                <div key={index} className={"field-error"}>
                    {msg}
                    <br/>
                </div>
            ))}
        </>
    );
};