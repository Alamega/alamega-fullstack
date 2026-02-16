import {useEffect} from "react";
import {useRouter} from "next/navigation";

export function useAuthGuard(session: ISession | null, redirectTo: string = "/auth/login") {
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.push(redirectTo);
        }
    }, [session, router, redirectTo]);
}