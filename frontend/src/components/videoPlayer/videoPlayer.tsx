"use client";

import React, {useRef, useState} from "react";
import "./videoPlayer.css";

export default function VideoPlayer({href}: Readonly<{ href: string }>) {
    const wrapper = useRef<HTMLDivElement>(null);
    const video = useRef<HTMLVideoElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [currentTime, setCurrentTime] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handlePlayPause = () => {
        if (video.current) {
            if (video.current.paused) {
                video.current.play();
            } else {
                video.current.pause();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleFullScreen = () => {
        if (wrapper.current) {
            if (isFullScreen) {
                document.exitFullscreen();
            } else {
                wrapper.current.requestFullscreen();
            }
            setIsFullScreen(!isFullScreen);
        }
    };

    const handleVolumeChange = (event: { target: { value: string } }) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        if (video.current) {
            video.current.volume = newVolume;
        }
    };

    const handleTimeUpdate = () => {
        if (video.current) {
            setCurrentTime(video.current.currentTime);
        }
    };

    const handleSeek = (time: number) => {
        if (video.current) {
            video.current.currentTime = time;
        }
    };

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
                    step="0.01"
                    value={currentTime}
                    onChange={(event) => handleSeek(parseFloat(event.target.value))}
                />
                <div className="player-control-bottom">
                    <button className="player-button" onClick={handlePlayPause}>
                        {isPlaying ? "Пауза" : "Продолжить"}
                    </button>
                    <input className="player-volume" type="range" min="0" max="1" step="0.01" value={volume}
                           onChange={handleVolumeChange}/>

                    <button className="player-button" onClick={handleFullScreen}>
                        {isFullScreen ? "Не полный" : "Полный"}
                    </button>
                </div>
            </div>
        </div>
    );
};
