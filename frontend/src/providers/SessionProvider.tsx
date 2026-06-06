"use client";

import React, {createContext, useContext} from "react";

const SessionContext = createContext<ISession | null>(null);

export const SessionProvider = ({session, children}: {
    session: ISession | null;
    children: React.ReactNode
}) => {
    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);
