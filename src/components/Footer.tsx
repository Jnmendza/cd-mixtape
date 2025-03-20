import React from "react";
import { getCurrentTime } from "../utils";
import VerticalSeparator from "./VerticalSeparator";

const Footer = () => {
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

        {/* Right-aligned content */}
        <div style={{ display: "flex", alignItems: "center", marginRight: 8 }}>
          <VerticalSeparator />
          <img
            src='https://win98icons.alexmeub.com/icons/png/loudspeaker_rays-1.png'
            alt='speaker'
            style={{ width: 16, height: 16, marginRight: 4 }}
          />
          <p className='status-bar-field'>{getCurrentTime()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
