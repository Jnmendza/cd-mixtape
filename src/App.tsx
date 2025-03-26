import "98.css";
import Footer from "./components/Footer";
import AddLinks from "./components/AddLinks";
import CdPlayer from "./components/CdPlayer";
import { YouTubePlayer } from "react-youtube";
import React, { useState, useRef } from "react";
import GuiContainer from "./components/GuiContainer";
import { AnimatePresence, motion } from "motion/react";

const App: React.FC = () => {
  // Strings
  const [links, setLinks] = useState<string[]>([]);
  const [cdTitle, setCdTitle] = useState<string>("");
  const [newLink, setNewLink] = useState<string>("");

  // Booleans
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  const [startProgress, setStartProgress] = useState<boolean>(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);

  // Numbers
  const [volume, setVolume] = useState<number>(100);
  const [currentTrack, setCurrentTrack] = useState<number>(0);

  const playerRef = useRef<YouTubePlayer | null>(null);

  const handleVolumeChange = (value: number) => {
    setVolume(value); // Update React state

    if (playerRef.current) {
      playerRef.current.setVolume(value); // Update YouTube player volume
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {/* Desktop Icon (Non-Movable) */}
      <motion.div
        style={{
          top: "20px",
          left: "20px",
          display: "flex",
          cursor: "pointer",
          position: "absolute",
          alignItems: "center",
          flexDirection: "column",
        }}
        onClick={() => setIsVisible((prev) => !prev)}
      >
        <img
          src='https://win98icons.alexmeub.com/icons/png/cd_drive-5.png'
          alt='CD Burner App'
          style={{
            width: "48px",
            height: "48px",
          }}
        />
        <p
          style={{
            color: "white",
            marginTop: "4px",
            fontSize: "12px",
            userSelect: "none", // Prevents text selection
            padding: "2px 6px",
            borderRadius: "2px",
            textAlign: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Mimics Windows 98 text box
          }}
        >
          Media Player
        </p>
      </motion.div>

      {/* Main App UI */}
      <AnimatePresence initial={false}>
        {isVisible ? (
          <div
            style={{
              height: "100vh",
              display: "flex",
              alignItems: "center",
              paddingBottom: "30px",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {!showPlayer ? (
              <GuiContainer setIsVisible={setIsVisible}>
                <AddLinks
                  links={links}
                  newLink={newLink}
                  cdTitle={cdTitle}
                  startProgress={startProgress}
                  setLinks={setLinks}
                  setCdTitle={setCdTitle}
                  setNewLink={setNewLink}
                  setIsPlaying={setIsPlaying}
                  setShowPlayer={setShowPlayer}
                  setStartProgress={setStartProgress}
                />
              </GuiContainer>
            ) : (
              <CdPlayer
                links={links}
                cdTitle={cdTitle}
                playerRef={playerRef}
                isPlaying={isPlaying}
                currentTrack={currentTrack}
                setIsPlaying={setIsPlaying}
                setShowPlayer={setShowPlayer}
                setCurrentTrack={setCurrentTrack}
                setStartProgress={setStartProgress}
              />
            )}
          </div>
        ) : null}
      </AnimatePresence>
      <Footer
        volume={volume}
        showVolumeSlider={showVolumeSlider}
        handleVolumeChange={handleVolumeChange}
        setShowVolumeSlider={setShowVolumeSlider}
      />
    </div>
  );
};

export default App;
