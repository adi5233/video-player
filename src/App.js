import React, { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import Playlist from "./components/Playlist";
import { videosData } from "./data/videosData";
import VideoDetails from "./components/VideoDetails";
import "./App.css";

function App() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videos, setVideos] = useState(videosData);

  const handleVideoChange = (index) => {
    setCurrentVideoIndex(index);
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="w-full bg-blue-400 p-2">
        <h1 className="text-2xl font-semibold p-2 text-white text-center">
          Video Player App
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-7">
        <div className="md:col-span-2 rounded-lg">
          {videos.length > 0 ? (
            <>
              <VideoPlayer src={videos[currentVideoIndex]?.sources[0]} />
              <VideoDetails video={videos[currentVideoIndex]} />
            </>
          ) : (
            <p>No videos available</p>
          )}
        </div>
        <div className="rounded-lg">
          {videos.length > 0 && (
            <Playlist
              playlistVideos={videos}
              onVideoChange={handleVideoChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
