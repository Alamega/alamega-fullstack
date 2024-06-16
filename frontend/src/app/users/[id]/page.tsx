import {Metadata, ResolvingMetadata} from "next";
import {getUserInfo} from "@/libs/users";

export async function generateMetadata({params}: {
    params: { id: string }
}, parent: ResolvingMetadata): Promise<Metadata> {
    const user = await getUserInfo(params.id)
    return {
        title: user.username,
    }
}


export default async function User({params}: { params: { id: string } }) {
    const user = await getUserInfo(params.id)
    return (
        <>
            <p>id: {user.id}</p>
            <p>username: {user.username}</p>
            <p>role: {user.role}</p>
        </>
    )
}
