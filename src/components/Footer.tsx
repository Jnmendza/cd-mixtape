import React from "react";
import { getCurrentTime } from "../utils";
import VerticalSeparator from "./VerticalSeparator";

interface FooterProps {
  showVolumeSlider: boolean;
  volume: number;
  handleVolumeChange: (value: number) => void;
  setShowVolumeSlider: React.Dispatch<React.SetStateAction<boolean>>; // Fix here
}

const Footer: React.FC<FooterProps> = ({
  showVolumeSlider,
  volume,
  handleVolumeChange,
  setShowVolumeSlider,
}) => {
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
          <VerticalSeparator />
          <p className='status-bar-field'>Slide 1</p>
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
          <img
            src='https://win98icons.alexmeub.com/icons/png/loudspeaker_rays-1.png'
            alt='speaker'
            style={{ width: 16, height: 16, marginRight: 4, cursor: "pointer" }}
            onClick={() => handleVolumeChange(volume === 0 ? 100 : 0)} // Toggle mute on left-click
            onContextMenu={(e) => {
              e.preventDefault();
              setShowVolumeSlider((prev) => !prev); // Right-click to show slider
            }}
          />
          <p className='status-bar-field'>{getCurrentTime()}</p>

          {/* Volume Slider (Only Shows When Right-Clicked) */}
          {showVolumeSlider && (
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
                } // Real-time volume update
                style={{ width: "100px" }}
              />
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
