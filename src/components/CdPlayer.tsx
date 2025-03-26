import React, { useState } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";
import CdTrackDisplay from "./CdTrackDisplay";
import { formatTime, youtubeRegex } from "../utils";
import InteractiveButton from "./InteractiveButton";
interface CdPlayerProps {
  cdTitle: string;
  links: string[];
  isPlaying: boolean;
  currentTrack: number;
  playerRef: YouTubePlayer | null;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentTrack: React.Dispatch<React.SetStateAction<number>>;
  setStartProgress: React.Dispatch<React.SetStateAction<boolean>>;
}

const CdPlayer = ({
  links,
  cdTitle,
  playerRef,
  setIsPlaying,
  currentTrack,
  setShowPlayer,
  setCurrentTrack,
  setStartProgress,
  isPlaying = false,
}: CdPlayerProps) => {
  const [duration, setDuration] = useState<number>(0);
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const count = `${currentTrack + 1}/${links.filter((l) => l).length}`;
  const opts: YouTubeProps["opts"] = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 0,
    },
  };

  const time = `${formatTime(currentTime)} / ${formatTime(duration)}`;

  const getVideoId = (url: string): string => {
    const match = url.match(youtubeRegex);
    return match ? match[1] : "";
  };

  const nextTrack = () => {
    const validTracks = links?.filter((l) => l).length;
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
    <div
      style={{
        position: "relative",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle at 40% 40%, #ccc, #999)",
        boxShadow: "inset -8px -8px 12px #bbb, inset 8px 8px 12px #888",
        border: "4px solid #666",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {[1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${100 - i * 12}%`,
            height: `${100 - i * 12}%`,
            border: "1px solid black",
            opacity: 0.15,
            borderRadius: "50%",
          }}
        ></div>
      ))}
      <style>
        {`@keyframes spin {0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }}`}
      </style>
      {/* See-through CD window */}
      <div
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          border: "3px solid rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(2px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* CD Disc Behind Track Info */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "1px solid grey",
            background: `conic-gradient(
                white, white, white, grey, grey, violet, deepskyblue, aqua, palegreen, yellow, orange, red,
                grey, grey, white, white, white, white, grey, grey, violet, deepskyblue, aqua, palegreen,
                yellow, orange, red, grey, grey, white
              )`,
            animation: "spin 2s linear infinite",
            animationPlayState: isPlaying ? "running" : "paused",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "25%",
              fontSize: "20px",
              color: "#222",
              fontFamily: "Permanent Marker",
              fontWeight: 400,
              fontStyle: "normal",
              padding: "2px 6px",
              borderRadius: "4px",
              transform: "rotate(-15deg)", // gives it a real printed label vibe
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {cdTitle}
          </div>
          {/* Simulated ::before pseudo-element */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "30%",
              height: "30%",
              marginLeft: "-15%",
              marginTop: "-15%",
              borderRadius: "50%",
              background: "lightgrey",
              border: "10px solid rgba(0, 0, 0, 0.2)",
              boxSizing: "border-box",
              boxShadow: "0 0 1px grey",
            }}
          />

          {/* Simulated ::after pseudo-element */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "18%",
              height: "18%",
              marginLeft: "-9%",
              marginTop: "-9%",
              borderRadius: "50%",
              background: "white",
              border: "10px solid rgba(0, 0, 0, 0.1)",
              boxSizing: "border-box",
              boxShadow: "0 0 1px grey",
              filter: "drop-shadow(0 0 2px grey)",
            }}
          />
        </div>

        {/* Track Info Display Strip */}
        <div
          style={{
            position: "absolute",
            top: "35%",
            width: "100%",
            height: "120px", // ⬆️ give more vertical space
            backgroundColor: "rgba(20, 20, 20, 1)",
            border: "1px solid #444",
            borderRadius: "35px",
            color: "lime",
            fontFamily: "Doto",
            fontSize: "18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px", // ⬅️ give internal padding
            boxSizing: "border-box",
            zIndex: 2,
          }}
        >
          <CdTrackDisplay
            trackTitle={videoTitle}
            isLoading={!playerRef}
            count={count}
            trackTime={time}
          />

          <div
            style={{
              marginTop: 8,
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden", // ⬅️ prevent spill
              width: "fit-content", // ⬅️ use full width of pill
              maxWidth: "100%", // ⬅️ contain within the pill visually
            }}
          >
            <InteractiveButton
              onClick={() => {
                setShowPlayer(false);
                setStartProgress(false);
              }}
            >
              Edit Tracks
            </InteractiveButton>
            <InteractiveButton onClick={prevTrack}>⏮</InteractiveButton>
            <InteractiveButton onClick={playPause}>
              {isPlaying ? "⏸" : "▶"}
            </InteractiveButton>
            <InteractiveButton onClick={nextTrack}>⏭</InteractiveButton>
          </div>
          <YouTube
            opts={opts}
            onReady={onPlayerReady}
            onStateChange={onStateChange}
          />
        </div>
      </div>
      <p
        style={{
          position: "absolute",
          bottom: "20px",
          fontSize: "20px",
          color: "#333",
          fontFamily: "Kdam Thmor Pro",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        DiscMan
      </p>
    </div>
  );
};

export default CdPlayer;
