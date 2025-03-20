import React, { useState, useRef } from "react";
import YouTube, { YouTubeProps, YouTubePlayer } from "react-youtube";
import "98.css";
import GuiContainer from "./components/GuiContainer";
import TableViewTrackList from "./components/TableViewTrackList";
import TableViewLinkList from "./components/TableViewLinkList";
import ProgressIndicator from "./components/ProgressIndicator";
import Footer from "./components/Footer";

const MAX_LINKS = 5; // Constant for max number of inputs

const App: React.FC = () => {
  const [links, setLinks] = useState<string[]>([]);
  const [cdTitle, setCdTitle] = useState<string>("My CDs Title");
  const [newLink, setNewLink] = useState<string>("");
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  const [startProgress, setStartProgress] = useState<boolean>(false);
  const [volume, setVolume] = useState(100);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const playerRef = useRef<YouTubePlayer | null>(null);

  const trackCount = `${links.length}/${MAX_LINKS}`;

  // Regex for YouTube validation (same as getVideoId)
  const youtubeRegex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;

  const isValidYouTubeLink = (url: string): boolean => {
    return youtubeRegex.test(url); // Returns true if it matches
  };

  const handleAddLink = () => {
    if (isValidYouTubeLink(newLink) && links.length < MAX_LINKS) {
      setLinks([...links, newLink]);
      setNewLink(""); // Clear input after adding
    } else if (!isValidYouTubeLink(newLink)) {
      console.log("Invalid YouTube link"); // Optional: Replace with UI feedback
    }
  };

  const handleDeleteLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };

  const getVideoId = (url: string): string => {
    const match = url.match(youtubeRegex);
    return match ? match[1] : "";
  };

  const burnCD = () => {
    if (links.some((link) => link.trim() !== "")) {
      setShowPlayer(true);
      setIsPlaying(false);
      console.log("CD Burn complete");
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

  const onPlayerReady = (event: { target: YouTubePlayer }) => {
    playerRef.current = event.target;
    const initialVideoId = getVideoId(links[currentTrack]);
    if (initialVideoId) {
      event.target.cueVideoById(initialVideoId);
    }
  };

  const onStateChange = (event: { target: YouTubePlayer; data: number }) => {
    const state = event.data;
    console.log("Player state:", state);
    if (state === 0) {
      console.log("Track ended, moving to next");
      nextTrack();
    } else if (state === 1) {
      setIsPlaying(true);
    } else if (state === 2) {
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value); // Update React state

    if (playerRef.current) {
      playerRef.current.setVolume(value); // Update YouTube player volume
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        paddingBottom: "30px",
      }}
    >
      <GuiContainer>
        {!showPlayer ? (
          <div>
            <h4>Burn Your CD</h4>
            <input
              type='text'
              value={cdTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCdTitle(e.target.value)
              }
              placeholder='CD Title'
            />
            <h4>{trackCount}</h4>
            <TableViewLinkList links={links} onDelete={handleDeleteLink} />
            <div
              style={{
                width: 350,
                marginTop: 8,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <input
                type='text'
                value={newLink}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewLink(e.target.value)
                }
                placeholder='YouTube Link'
                style={{ width: 250 }}
              />
              <button
                onClick={handleAddLink}
                disabled={newLink.trim() === "" || links.length >= MAX_LINKS}
              >
                Add Link
              </button>
            </div>
            <div
              style={{
                width: 435,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <ProgressIndicator start={startProgress} onComplete={burnCD} />
              <button
                onClick={() => setStartProgress(true)}
                disabled={startProgress}
                style={{ marginLeft: 10 }}
              >
                Burn CD
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1>{cdTitle}</h1>
            <div>
              <div>
                <span>{cdTitle}</span>
              </div>
            </div>
            <ul>
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
        )}
      </GuiContainer>
      <Footer
        showVolumeSlider={showVolumeSlider}
        volume={volume}
        handleVolumeChange={handleVolumeChange}
        setShowVolumeSlider={setShowVolumeSlider}
      />
    </div>
  );
};

export default App;
