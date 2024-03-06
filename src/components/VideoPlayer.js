import React, { useRef, useState, useEffect } from "react";

const VideoPlayer = ({ src, ...props }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Accroding to new chrome policy, video has to be muted inorder to use autoplay.
    // comment out it for using autoplay -
    // video.muted = true;
    // video.autoPlay = true;
    // video.play();

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(video.duration);
    };

    const handlePlayPause = () => {
      setIsPlaying(video.paused);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("play", handlePlayPause);
    video.addEventListener("pause", handlePlayPause);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("play", handlePlayPause);
      video.removeEventListener("pause", handlePlayPause);
    };
  }, []);

  const handlePlayPause = () => {
    const video = videoRef.current;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (event) => {
    const video = videoRef.current;
    const seekTime = event.target.value;
    video.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleSpeedChange = (event) => {
    const speed = parseFloat(event.target.value);
    setPlaybackSpeed(speed);
    videoRef.current.playbackRate = speed;
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="video-container flex flex-col h-">
      <div className="video-play relative">
        <video
          {...props}
          ref={videoRef}
          src={src}
          onClick={handlePlayPause}
          className="w-full h-auto"
        />
      </div>
      <div className="video-features flex flex-row items-center justify-between bg-gray-200 p-1">
        <div>
          <button onClick={handlePlayPause} className="cursor-pointer p-1">
            {isPlaying ? (
              <img src="/play.svg" className="h-4 w-4" alt="Play" />
            ) : (
              <img src="/pause.svg" className="h-4 w-4" alt="Pause" />
            )}
          </button>
        </div>
        <div className="flex-grow mx-2">
          <input
            className="w-full cursor-pointer"
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
          />
        </div>
        <div className="flex items-center mx-2">
          <span>{formatTime(currentTime)}</span> /{" "}
          <span>{formatTime(duration)}</span>
        </div>
        <div className="flex items-center">
          <label className="mr-2">Speed:</label>
          <select
            value={playbackSpeed}
            onChange={handleSpeedChange}
            className="p-1 border border-gray-300 rounded"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
