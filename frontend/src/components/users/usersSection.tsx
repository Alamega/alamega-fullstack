"use client";

import {useEffect, useState} from "react";
import {getUsers} from "@/libs/users";
import PaginatedList from "@/components/pagination/paginatedList";
import User from "@/components/users/user/user";

export default function UsersSection() {
    const [pageableUsers, setPageableUsers] = useState<IPageable<IUser>>();
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;

    useEffect(() => {
        getUsers(currentPage, pageSize)
            .then(setPageableUsers)
            .catch((err) => {
                setError(new Error(err.response?.data?.message || err.message || "Ошибка загрузки данных"));
            });
    }, [currentPage]);

    if (error) {
        throw error;
    }

    return (
        <>
            <PaginatedList
                pageable={pageableUsers}
                onPageChangeAction={setCurrentPage}
                renderItem={(user: IUser) => <User user={user} key={user.id}/>}
            />
        </>
    );
}
