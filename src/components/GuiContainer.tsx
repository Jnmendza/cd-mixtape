import React from "react";
import Navbar from "./Navbar";

interface GuiContainerProps {
  isMinimized: boolean;
  children: React.ReactNode;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMinimized: React.Dispatch<React.SetStateAction<boolean>>;
}

const GuiContainer: React.FC<GuiContainerProps> = ({
  children,
  setIsVisible,
  setIsMinimized,
}) => {
  return (
    <div style={{ width: 500 }}>
      <div className='window w-[500px]'>
        <Navbar setIsVisible={setIsVisible} setIsMinimized={setIsMinimized} />
        <div className='window-body'>{children}</div>
      </div>
    </div>
  );
};

export default GuiContainer;
