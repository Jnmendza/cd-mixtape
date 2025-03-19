import React from "react";

const Navbar = () => {
  return (
    <div className='title-bar'>
      <div className='title-bar-text'>Burn your CD</div>
      <div className='title-bar-controls'>
        <button aria-label='Minimize'></button>
        <button aria-label='Maximize' disabled></button>
        <button aria-label='Close'></button>
      </div>
    </div>
  );
};

export default Navbar;
