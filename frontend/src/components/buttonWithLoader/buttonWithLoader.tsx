"use client";

import React from "react";
import "./buttonWithLoader.css";

export default function ButtonWithLoader({loading, children, className = "button-green", ...props}: {
    loading: boolean;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <button {...props} className={className} disabled={loading}>
            {loading ? <span className="spinner"/> : children}
        </button>
    );
};