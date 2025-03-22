import { useState } from "react";

const InteractiveButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)} // reset if user drags out
      onClick={onClick}
      style={{
        width: "10px",
        height: "10px",
        borderRadius: "15px",
        background: isPressed ? "#222" : "#111", // 👈 toggle background shade
        border: "1px solid #2b2b2b",
        boxShadow: `
          inset 1px 1px 2px rgba(255, 255, 255, 0.08),
          inset -1px -1px 1px rgba(0, 0, 0, 0.5),
          1px 1px 2px rgba(0, 0, 0, 0.6)
        `,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "lime",
        fontSize: "10px",
        lineHeight: 1,
        cursor: "pointer",
        whiteSpace: "nowrap",
        minWidth: "60px",
        padding: 0,
        userSelect: "none",
        transition: "background 0.1s ease",
      }}
    >
      {children}
    </button>
  );
};

export default InteractiveButton;
