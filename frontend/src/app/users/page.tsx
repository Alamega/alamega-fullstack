import {Metadata} from "next";
import React from "react";
import UsersSection from "@/components/users/usersSection";

export const metadata: Metadata = {
    title: "Пользователи"
};

export default async function Users() {
    return (
        <>
            <UsersSection/>
        </>
    );
}
