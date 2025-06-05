import React from "react";
import "./user.css";

export default function User({user}: {
    user: IUser,
}) {
    return (
        <div className={"user-wrapper"}>
            {user.username}
        </div>
    );
}