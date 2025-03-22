const HelpWindow = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      className='window'
      style={{
        width: "300px",
        position: "fixed", // Ensures it's above everything
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", // Centers it
        zIndex: 1000, // Ensures it appears above everything
      }}
    >
      {/* Title Bar */}
      <div className='title-bar'>
        <div className='title-bar-text'>Help</div>
        <div className='title-bar-controls'>
          <button aria-label='Close' onClick={onClose}></button>
        </div>
      </div>

      {/* Window Body */}
      <div className='window-body'>
        <ul>
          <li>Open the Media Player</li>
          <li>Add YouTube links</li>
          <li>Burn your CD</li>
          <li>Right click on the speaker icon at the bottom of the screen</li>
        </ul>
      </div>
    </div>
  );
};

export default HelpWindow;
