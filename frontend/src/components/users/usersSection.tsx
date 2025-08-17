"use client";

import {useEffect, useState} from "react";
import {getUsers} from "@/libs/users";
import PaginatedList from "@/components/pagination/paginatedList";
import User from "@/components/users/user/user";

export default function UsersSection() {
    const [pageableUsers, setPageableUsers] = useState<IPageable<IUser>>();
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;

    useEffect(() => {
        getUsers(currentPage, pageSize).then(setPageableUsers).catch(_ => {
            setError("А вам сюда нельзя!")
        })
    }, [currentPage]);

    return (
        <>
            {error}
            <PaginatedList
                pageable={pageableUsers}
                onPageChangeAction={setCurrentPage}
                renderItem={(user: IUser) => <User user={user} key={user.id}/>}
            />
        </>
    );
}
