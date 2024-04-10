"use client"

import "./modal.css";
import {BaseSyntheticEvent, ReactNode, useRef} from "react";

export default function Modal({children, isOpen, closeModal}: {
    children: ReactNode,
    isOpen: boolean,
    closeModal: () => void
}) {
    const modalWrapper = useRef(null);

    function handleOut(event: BaseSyntheticEvent) {
        if (event.target === modalWrapper.current) closeModal();
    }

    return (
        <>
            {isOpen &&
                <div ref={modalWrapper} onClick={handleOut} className="modal-wrapper">
                    <div className="modal">
                        {children}
                    </div>
                </div>
            }
        </>
    );
}
