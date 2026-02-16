"use client";

import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import "./videoPlayer.css";
import playIcon from "./play.png";
import pauseIcon from "./pause.png";
import fullScreenIcon from "./fullscreen.png";
import exitFullScreenIcon from "./exit-fullscreen.png";

export default function VideoPlayer({href}: Readonly<{ href: string }>) {
    const wrapper = useRef<HTMLDivElement>(null);
    const video = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [durationBarText, setDurationBarText] = useState("00:00/00:00");
    const [volume, setVolume] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        if (volume == 0) {
            const localVolume = localStorage.getItem("volume");
            setVolume(Number.parseFloat(localVolume ? localVolume : "0.5"));
        }
        if (video.current) {
            video.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        const currSec = Math.floor(currentTime % 60);
        const durSec = Math.floor((video.current?.duration || 0) % 60);
        setDurationBarText(Math.floor(currentTime / 60) + ":" + ((currSec < 10) ? "0" + currSec : currSec) + "/" + Math.floor((video.current?.duration || 0) / 60) + ":" + ((durSec < 10) ? "0" + durSec : durSec));
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

    async function handleVolumeChange(event: { target: { value: string } }) {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        localStorage.setItem("volume", newVolume.toString());
    }

    async function handleTimeUpdate() {
        if (video.current) {
            setCurrentTime(video.current.currentTime);
        }
    }

    function handleSeek(time: number) {
        if (video.current) {
            video.current.currentTime = time;
        }
    }

    return (
        <div ref={wrapper} className="player-wrapper">
            <video ref={video} src={href} className="player-video" onClick={handlePlayPause}
                   onTimeUpdate={handleTimeUpdate}/>
            <div className="player-control-wrapper">
                <input
                    className="player-control-timeline"
                    type="range"
                    min="0"
                    max={video.current?.duration || 0}
                    step="1"
                    value={currentTime}
                    onChange={(event) => handleSeek(parseFloat(event.target.value))}
                />
                <div className="player-control-bottom">
                    <Image className="player-button" onClick={handlePlayPause} src={isPlaying ? pauseIcon : playIcon}
                           alt="Старт/Стоп"
                           width={24} height={24}/>
                    <div className="player-duration-bar">
                        <span>{durationBarText}</span>
                    </div>
                    <input className="player-volume" type="range" min="0" max="1" step="0.05" value={volume}
                           onChange={handleVolumeChange}/>
                    <span className="player-space-creator-kekw"></span>
                    <Image className="player-button" onClick={handleFullScreen}
                           src={isFullScreen ? exitFullScreenIcon : fullScreenIcon}
                           alt="Полноэкранный режим" width={24} height={24}/>
                </div>
            </div>
        </div>
    );
};
