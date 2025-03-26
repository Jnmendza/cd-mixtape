import React from "react";

interface NavbarProps {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMinimized: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ setIsVisible, setIsMinimized }: NavbarProps) => {
  return (
    <div className='title-bar'>
      <div className='title-bar-text'>Burn your CD</div>
      <div className='title-bar-controls'>
        <button
          aria-label='Minimize'
          onClick={() => {
            setIsVisible(false);
            setIsMinimized(true);
          }}
        ></button>
        <button aria-label='Maximize' disabled></button>
        <button
          aria-label='Close'
          onClick={() => {
            setIsVisible(false);
            setIsMinimized(false);
          }}
        ></button>
      </div>
    </div>
  );
};

export default Navbar;
