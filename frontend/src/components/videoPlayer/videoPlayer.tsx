"use client";

import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import "./videoPlayer.css";
import playIcon from "./play.png";
import pauseIcon from "./pause.png";
import fullScreenIcon from "./fullscreen.png";
import exitFullScreenIcon from "./exit-fullscreen.png";
import Hls from "hls.js";

export default function VideoPlayer({href}: Readonly<{ href: string }>) {
    const wrapper = useRef<HTMLDivElement>(null);
    const video = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [durationBarText, setDurationBarText] = useState("Live/00:00");
    const [volume, setVolume] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        const videoElement = video.current;
        if (!videoElement) return;
        if (href.endsWith(".m3u8")) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(href);
                hls.attachMedia(videoElement);
                hlsRef.current = hls;
            } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
                videoElement.src = href;
            }
        } else {
            videoElement.src = href;
        }
        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
            }
        };
    }, [href]);

    useEffect(() => {
        if (volume === 0) {
            const localVolume = localStorage.getItem("volume");
            setVolume(Number.parseFloat(localVolume ? localVolume : "0.5"));
        }
        if (video.current) {
            video.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        const isLive = video.current?.duration === Infinity;
        const currSec = Math.floor(currentTime % 60);
        const currMin = Math.floor(currentTime / 60);
        const timeStr = `${currMin}:${currSec < 10 ? "0" + currSec : currSec}`;
        if (isLive) {
            setDurationBarText(`LIVE / ${timeStr}`);
        } else {
            const dur = video.current?.duration || 0;
            const durSec = Math.floor(dur % 60);
            const durMin = Math.floor(dur / 60);
            setDurationBarText(`${timeStr} / ${durMin}:${durSec < 10 ? "0" + durSec : durSec}`);
        }
    }, [currentTime]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    async function handlePlayPause() {
        if (video.current) {
            if (video.current.paused) {
                await video.current.play();
            } else {
                video.current.pause();
            }
            setIsPlaying(!isPlaying);
        }
    }

    async function handleFullScreen() {
        if (!document.fullscreenElement) {
            if (wrapper.current) {
                try {
                    await wrapper.current.requestFullscreen();
                    setIsFullScreen(true);
                } catch (error) {
                    console.error(error);
                }
            }
        } else {
            try {
                await document.exitFullscreen();
                setIsFullScreen(false);
            } catch (error) {
                console.error(error);
            }
        }
    }

    async function handleTimeUpdate() {
        if (video.current) {
            setCurrentTime(video.current.currentTime);
        }
    }

    return (
        <div ref={wrapper} className="player-wrapper">
            <video
                ref={video}
                className="player-video"
                onClick={handlePlayPause}
                onTimeUpdate={handleTimeUpdate}
                playsInline
            />
            <div className="player-control-wrapper">
                {video.current?.duration !== Infinity && (
                    <input
                        className="player-control-timeline"
                        type="range"
                        min="0"
                        max={video.current?.duration || 0}
                        step="1"
                        value={currentTime}
                        onChange={(event) => {
                            if (video.current) video.current.currentTime = parseFloat(event.target.value);
                        }}
                    />
                )}
                <div className="player-control-bottom">
                    <button onClick={handlePlayPause} className="bg-transparent border-0 p-0">
                        <Image className="player-button" src={isPlaying ? pauseIcon : playIcon}
                               alt="Старт/Стоп" width={24} height={24}/>
                    </button>
                    <div className="player-duration-bar">
                        <span>{durationBarText}</span>
                    </div>
                    <input className="player-volume" type="range" min="0" max="1" step="0.05" value={volume}
                           onChange={(e) => {
                               const v = parseFloat(e.target.value);
                               setVolume(v);
                               localStorage.setItem("volume", v.toString());
                           }}/>
                    <span className="player-space-creator-kekw"></span>
                    <button onClick={handleFullScreen} className="bg-transparent border-0 p-0">
                        <Image className="player-button" src={isFullScreen ? exitFullScreenIcon : fullScreenIcon}
                               alt="Полноэкранный режим" width={24} height={24}/>
                    </button>
                </div>
            </div>
        </div>
    );
}