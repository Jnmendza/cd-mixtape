import React, { useState, useRef } from "react";
import { YouTubePlayer } from "react-youtube";
import "98.css";
import GuiContainer from "./components/GuiContainer";
import Footer from "./components/Footer";
import AddLinks from "./components/AddLinks";
import MediaPlayer from "./components/MediaPlayer";

const App: React.FC = () => {
  // Strings
  const [links, setLinks] = useState<string[]>([]);
  const [cdTitle, setCdTitle] = useState<string>("My CDs Title");
  const [newLink, setNewLink] = useState<string>("");

  // Booleans
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  const [startProgress, setStartProgress] = useState<boolean>(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);

  // Numbers
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [volume, setVolume] = useState<number>(100);

  const playerRef = useRef<YouTubePlayer | null>(null);

  const handleVolumeChange = (value: number) => {
    setVolume(value); // Update React state

    if (playerRef.current) {
      playerRef.current.setVolume(value); // Update YouTube player volume
    }
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
          <AddLinks
            cdTitle={cdTitle}
            setCdTitle={setCdTitle}
            links={links}
            setLinks={setLinks}
            newLink={newLink}
            setNewLink={setNewLink}
            startProgress={startProgress}
            setStartProgress={setStartProgress}
            setIsPlaying={setIsPlaying}
            setShowPlayer={setShowPlayer}
          />
        ) : (
          <MediaPlayer
            cdTitle={cdTitle}
            links={links}
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
            playerRef={playerRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setShowPlayer={setShowPlayer}
            setStartProgress={setStartProgress}
          />
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
