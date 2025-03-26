import React, { useEffect, useState } from "react";
import { getCurrentTime } from "../utils";
import VerticalSeparator from "./VerticalSeparator";
import HelpWindow from "./HelpWindow";

interface FooterProps {
  volume: number;
  isVisible: boolean;
  showPlayer: boolean;
  isMinimized: boolean;
  showVolumeSlider: boolean;
  handleVolumeChange: (value: number) => void;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMinimized: React.Dispatch<React.SetStateAction<boolean>>;
  setShowVolumeSlider: React.Dispatch<React.SetStateAction<boolean>>;
}

const Footer: React.FC<FooterProps> = ({
  volume,
  isVisible,
  showPlayer,
  isMinimized,
  showVolumeSlider,
  setIsVisible,
  setIsMinimized,
  handleVolumeChange,
  setShowVolumeSlider,
}) => {
  const [showHelp, setshowHelp] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F1") {
        e.preventDefault();
        setshowHelp(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: 25,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#c0c0c0",
        padding: "2px",
      }}
      className='window'
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
        className='status-bar'
      >
        {/* Left-aligned content */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className='status-bar-field'>Press F1 for help</p>
          {showHelp && <HelpWindow onClose={() => setshowHelp(false)} />}
          <VerticalSeparator />

          <button
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "0 4px",
              visibility: isMinimized && !isVisible ? "visible" : "hidden",
            }}
            onClick={() => {
              setIsMinimized(false);
              setIsVisible(true);
            }}
          >
            <img
              src='https://win98icons.alexmeub.com/icons/png/cd_audio_cd_a-0.png'
              alt='cd-icon'
              style={{ width: 21, height: 21, marginRight: 4 }}
            />
            Burn your CD
          </button>
        </div>

        {/* Right-aligned content (Speaker + Time) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: 8,
            position: "relative",
          }}
        >
          <VerticalSeparator />
          {showPlayer && (
            <img
              src='https://win98icons.alexmeub.com/icons/png/loudspeaker_rays-1.png'
              alt='speaker'
              style={{
                width: 16,
                height: 16,
                marginRight: 4,
                cursor: "pointer",
              }}
              onClick={() => handleVolumeChange(volume === 0 ? 100 : 0)} // Toggle mute on left-click
              onContextMenu={(e) => {
                e.preventDefault();
                setShowVolumeSlider((prev) => !prev); // Right-click to show slider
              }}
            />
          )}
          <p className='status-bar-field'>{getCurrentTime()}</p>

          {/* Volume Slider (Only Shows When Right-Clicked) */}
          {showVolumeSlider && showPlayer ? (
            <div
              style={{
                position: "absolute",
                bottom: "30px",
                right: "0",
                backgroundColor: "#c0c0c0",
                padding: "4px",
                border: "2px solid #808080",
                boxShadow: "inset -1px -1px #ffffff, inset 1px 1px #404040",
              }}
            >
              <input
                type='range'
                min='0'
                max='100'
                step='1'
                value={volume}
                onChange={(e) =>
                  handleVolumeChange(parseInt(e.target.value, 10))
                }
                style={{ width: "100px" }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
