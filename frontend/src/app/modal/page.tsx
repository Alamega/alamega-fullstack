import {Metadata} from "next";
import React from "react";
import UseModalExample from "@/components/modal/example";

export const metadata: Metadata = {
    title: "Модальное окно"
};

export default async function ModalPage() {
    return (
        <>
            <UseModalExample/>
        </>
    );
}

