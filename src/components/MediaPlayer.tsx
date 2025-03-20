import React, { useState } from "react";
import YouTube, { YouTubeProps, YouTubePlayer } from "react-youtube";
import { formatTime } from "../utils";
import { youtubeRegex } from "../utils";

interface MediaPlayerProps {
  cdTitle: string;
  links: string[];
  currentTrack: number;
  setCurrentTrack: React.Dispatch<React.SetStateAction<number>>;
  playerRef: YouTubePlayer | null;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  setStartProgress: React.Dispatch<React.SetStateAction<boolean>>;
}

const MediaPlayer = ({
  cdTitle,
  links,
  currentTrack,
  setCurrentTrack,
  playerRef,
  isPlaying,
  setIsPlaying,
  setShowPlayer,
  setStartProgress,
}: MediaPlayerProps) => {
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  console.log("DATA", { videoTitle, duration, currentTime });
  const opts: YouTubeProps["opts"] = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 0,
    },
  };

  const getVideoId = (url: string): string => {
    const match = url.match(youtubeRegex);
    return match ? match[1] : "";
  };

  const nextTrack = () => {
    const validTracks = links.filter((l) => l).length;
    const nextIndex = (currentTrack + 1) % validTracks;
    setCurrentTrack(nextIndex);
    if (playerRef.current) {
      const nextVideoId = getVideoId(links[nextIndex]);
      playerRef.current.loadVideoById(nextVideoId);
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

  const playPause = () => {
    if (!playerRef.current) {
      console.log("Player not ready");
      return;
    }
    const playerState = playerRef.current.getPlayerState();
    if (playerState === 1) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const onPlayerReady = (event: { target: YouTubePlayer }) => {
    playerRef.current = event.target;

    const initialVideoId = getVideoId(links[currentTrack]);
    if (initialVideoId) {
      event.target.loadVideoById(initialVideoId);
      event.target.pauseVideo(); // Pause so it doesn't autoplay
    }
  };

  const onStateChange = (event: { target: YouTubePlayer; data: number }) => {
    const player = event.target;
    const state = event.data;

    console.log("Player state:", state);

    if (state === 0) {
      console.log("Track ended, moving to next");
      nextTrack();
    } else if (state === 1) {
      // Video started playing
      setIsPlaying(true);

      // Fetch title when playback starts
      const videoData = player.getVideoData();
      if (videoData?.title) {
        setVideoTitle(videoData.title);
      }

      // Fetch total duration of the video
      const videoDuration = player.getDuration();
      if (videoDuration) {
        setDuration(videoDuration);
      }

      // Start polling current time every second
      if (!intervalId) {
        const id = setInterval(() => {
          if (playerRef.current) {
            setCurrentTime(playerRef.current.getCurrentTime());
          }
        }, 1000); // Update every second
        setIntervalId(id);
      }
    } else if (state === 2) {
      // Video paused
      setIsPlaying(false);
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }

    if (state === 0 || state === 2) {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  };

  return (
    <div>
      <h4>{cdTitle}</h4>
      <div>
        <div>
          <span>{cdTitle}</span>
        </div>
      </div>
      <div>
        <p>
          <strong>Now Playing:</strong>{" "}
          {videoTitle || "Waiting for playback..."}
        </p>
        <p>
          <strong>Elapsed Time:</strong> {formatTime(currentTime)} /{" "}
          {formatTime(duration)}
        </p>
      </div>

      <div>
        <button onClick={prevTrack}>⏪</button>
        <button onClick={playPause}>{isPlaying ? "⏸" : "▶"}</button>
        <button onClick={nextTrack}>⏩</button>
      </div>
      <YouTube
        opts={opts}
        onReady={onPlayerReady}
        onStateChange={onStateChange}
      />
      <button
        onClick={() => {
          setShowPlayer(false);
          setStartProgress(false);
        }}
      >
        Edit Tracks
      </button>
    </div>
  );
};

export default MediaPlayer;
