import React from "react";

interface NavbarProps {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ setIsVisible }: NavbarProps) => {
  return (
    <div className='title-bar'>
      <div className='title-bar-text'>Burn your CD</div>
      <div className='title-bar-controls'>
        <button aria-label='Minimize'></button>
        <button aria-label='Maximize' disabled></button>
        <button aria-label='Close' onClick={() => setIsVisible(false)}></button>
      </div>
    </div>
  );
};

export default Navbar;
