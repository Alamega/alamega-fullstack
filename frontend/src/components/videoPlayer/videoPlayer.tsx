"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./videoPlayer.css";
import playIcon from "./play.png";
import pauseIcon from "./pause.png";
import fullScreenIcon from "./fullscreen.png";
import exitFullScreenIcon from "./exit-fullscreen.png";
import Hls from "hls.js";

export default function VideoPlayer({ href }: Readonly<{ href: string }>) {
    const wrapper = useRef<HTMLDivElement>(null);
    const video = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const [volume, setVolume] = useState(() => {
        if (typeof window !== "undefined") {
            const localVolume = localStorage.getItem("volume");
            return localVolume ? parseFloat(localVolume) : 0.5;
        }
        return 0.5;
    });

    const [isFullScreen, setIsFullScreen] = useState(false);

    // ВЫЧИСЛЕНИЕ СТРОКИ ВРЕМЕНИ НАПРЯМУЮ ПРИ РЕНДЕРЕ (БЕЗ ЭФФЕКТОВ)
    const isLive = duration === Infinity;
    const currSec = Math.floor(currentTime % 60);
    const currMin = Math.floor(currentTime / 60);
    const timeStr = `${currMin}:${currSec < 10 ? "0" + currSec : currSec}`;

    let durationBarText = `LIVE / ${timeStr}`;
    if (!isLive) {
        const durSec = Math.floor(duration % 60);
        const durMin = Math.floor(duration / 60);
        durationBarText = `${timeStr} / ${durMin}:${durSec < 10 ? "0" + durSec : durSec}`;
    }

    // Инициализация HLS
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

    // Синхронизация громкости
    useEffect(() => {
        if (video.current) {
            video.current.volume = volume;
        }
    }, [volume]);

    // Отслеживание полноэкранного режима
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
                setIsPlaying(true);
            } else {
                video.current.pause();
                setIsPlaying(false);
            }
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

    function handleTimeUpdate() {
        if (video.current) {
            setCurrentTime(video.current.currentTime);
        }
    }

    function handleDurationChange() {
        if (video.current) {
            setDuration(video.current.duration);
        }
    }

    return (
        <div ref={wrapper} className="player-wrapper">
            <video
                ref={video}
                className="player-video"
                onClick={handlePlayPause}
                onTimeUpdate={handleTimeUpdate}
                onDurationChange={handleDurationChange}
                playsInline
            />
            <div className="player-control-wrapper">
                {!isLive && (
                    <input
                        className="player-control-timeline"
                        type="range"
                        min="0"
                        max={duration}
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
