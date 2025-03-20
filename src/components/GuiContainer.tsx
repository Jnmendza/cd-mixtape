import React from "react";
import Navbar from "./Navbar";

interface GuiContainerProps {
  children: React.ReactNode;
}

const GuiContainer: React.FC<GuiContainerProps> = ({ children }) => {
  return (
    <div
      style={{ width: 500 }}
      className='min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 flex items-center justify-center p-4'
    >
      <div className='window w-[500px]'>
        <Navbar />
        <div className='window-body'>{children}</div>
      </div>
    </div>
  );
};

export default GuiContainer;
