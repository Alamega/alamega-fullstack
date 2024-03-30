import {Metadata} from "next";
import VideoPlayer from "@/components/videoPlayer/videoPlayer";

export const metadata: Metadata = {
    title: "Мультики"
};

export default async function Movies() {
    return (
        <>
            <VideoPlayer href={"/videos/chika.mp4"}/>
        </>
    );
}
