import {getSession} from "@/libs/auth";
import axios from "axios";

export async function POST(request: Request) {
    const session = await getSession();
    return Response.json(
        axios.post(process.env.NEXT_PUBLIC_API_URL + "/posts", await request.json(), {
            headers: {
                Authorization: "Bearer " + session?.user.token
            }
        }).then(response => {
            return response.data;
        })
    )
}