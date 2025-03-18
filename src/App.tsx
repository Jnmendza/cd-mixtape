import React, { useState, useRef } from "react";
import YouTube, { YouTubeProps, YouTubePlayer } from "react-youtube";
import "./App.css";

const App: React.FC = () => {
  const [links, setLinks] = useState<string[]>(["", "", "", "", ""]);
  const [cdTitle, setCdTitle] = useState<string>("My Mixtape");
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  const playerRef = useRef<YouTubePlayer | null>(null);

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const getVideoId = (url: string): string => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    return url.match(regex)?.[1] || "";
  };

  const burnCD = () => {
    if (links.some((link) => link.trim() !== "")) {
      setShowPlayer(true);
      setIsPlaying(false);
    }
  };

  const playPause = () => {
    if (!playerRef.current) {
      console.log("Player not ready");
      return;
    }
    const playerState = playerRef.current.getPlayerState();
    if (playerState === 1) {
      // Playing
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    const validTracks = links.filter((l) => l).length;
    const nextIndex = (currentTrack + 1) % validTracks;
    setCurrentTrack(nextIndex);
    if (playerRef.current) {
      const nextVideoId = getVideoId(links[nextIndex]);
      playerRef.current.loadVideoById(nextVideoId); // Load and play immediately
      setIsPlaying(true);
    } else {
      console.log("Player not ready for next track");
    }
  };

  const prevTrack = () => {
    const validTracks = links.filter((l) => l).length;
    const prevIndex = (currentTrack - 1 + validTracks) % validTracks;
    setCurrentTrack(prevIndex);
    if (playerRef.current) {
      const prevVideoId = getVideoId(links[prevIndex]);
      playerRef.current.loadVideoById(prevVideoId);
      setIsPlaying(true);
    } else {
      console.log("Player not ready for prev track");
    }
  };

  const onPlayerReady = (event: { target: YouTubePlayer }) => {
    playerRef.current = event.target;
    const initialVideoId = getVideoId(links[currentTrack]);
    if (initialVideoId) {
      event.target.cueVideoById(initialVideoId); // Queue first track on load
    }
  };

  const onStateChange = (event: { target: YouTubePlayer; data: number }) => {
    const state = event.data;
    console.log("Player state:", state); // Debug player state
    if (state === 0) {
      // Ended
      console.log("Track ended, moving to next");
      nextTrack();
    } else if (state === 1) {
      // Playing
      setIsPlaying(true);
    } else if (state === 2) {
      // Paused
      setIsPlaying(false);
    }
  };

  const opts: YouTubeProps["opts"] = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 flex items-center justify-center p-4'>
      <div className='bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full'>
        {!showPlayer ? (
          <div className='space-y-4'>
            <h1 className='text-2xl text-white font-bold text-center'>
              Burn Your CD
            </h1>
            <input
              type='text'
              value={cdTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCdTitle(e.target.value)
              }
              placeholder='CD Title'
              className='w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
            {links.map((link, index) => (
              <input
                key={index}
                type='text'
                value={link}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleLinkChange(index, e.target.value)
                }
                placeholder={`Track ${index + 1} YouTube Link`}
                className='w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500'
              />
            ))}
            <button
              onClick={burnCD}
              className='w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition'
            >
              Burn CD
            </button>
          </div>
        ) : (
          <div className='space-y-4'>
            <h1 className='text-2xl text-white font-bold text-center'>
              {cdTitle}
            </h1>
            <div className='relative w-48 h-48 mx-auto'>
              <div className='absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 rounded-full shadow-inner'></div>
              <div className='absolute inset-4 bg-gray-900 rounded-full flex items-center justify-center'>
                <span className='text-white text-sm font-mono'>{cdTitle}</span>
              </div>
              <div className='absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-30 rounded-full animate-spin-slow'></div>
            </div>
            <ul className='text-white text-sm'>
              {links
                .filter((l) => l)
                .map((link, index) => (
                  <li
                    key={index}
                    className={`py-1 ${
                      currentTrack === index ? "text-indigo-400" : ""
                    }`}
                  >
                    Track {index + 1}
                  </li>
                ))}
            </ul>
            <div className='flex justify-center space-x-4'>
              <button
                onClick={prevTrack}
                className='text-white hover:text-indigo-400'
              >
                ⏪
              </button>
              <button
                onClick={playPause}
                className='text-white hover:text-indigo-400'
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button
                onClick={nextTrack}
                className='text-white hover:text-indigo-400'
              >
                ⏩
              </button>
            </div>
            <YouTube
              opts={opts}
              onReady={onPlayerReady}
              onStateChange={onStateChange}
            />
            <button
              onClick={() => setShowPlayer(false)}
              className='w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition'
            >
              Edit Tracks
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
