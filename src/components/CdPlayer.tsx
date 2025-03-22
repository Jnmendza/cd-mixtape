interface CdPlayerProps {
  cdTitle: string;
}

const CdPlayerShell = ({ cdTitle }: CdPlayerProps) => {
  const isPlaying = false;
  return (
    <div
      style={{
        position: "relative",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle at 40% 40%, #ccc, #999)",
        boxShadow: "inset -8px -8px 12px #bbb, inset 8px 8px 12px #888",
        border: "4px solid #666",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <style>
        {`@keyframes spin {0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }}`}
      </style>

      {/* See-through CD window */}
      <div
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          border: "3px solid rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(2px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* CD Disc Behind Track Info */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "1px solid grey",
            background: `conic-gradient(
                white, white, white, grey, grey, violet, deepskyblue, aqua, palegreen, yellow, orange, red,
                grey, grey, white, white, white, white, grey, grey, violet, deepskyblue, aqua, palegreen,
                yellow, orange, red, grey, grey, white
              )`,
            animation: "spin 2s linear infinite",
            animationPlayState: isPlaying ? "running" : "paused",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "25%",
              fontSize: "20px",
              color: "#222",
              fontFamily: "Permanent Marker",
              fontWeight: 400,
              fontStyle: "normal",
              padding: "2px 6px",
              borderRadius: "4px",
              transform: "rotate(-15deg)", // gives it a real printed label vibe
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            My Mix 2001
          </div>
          {/* Simulated ::before pseudo-element */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "30%",
              height: "30%",
              marginLeft: "-15%",
              marginTop: "-15%",
              borderRadius: "50%",
              background: "lightgrey",
              border: "10px solid rgba(0, 0, 0, 0.2)",
              boxSizing: "border-box",
              boxShadow: "0 0 1px grey",
            }}
          />

          {/* Simulated ::after pseudo-element */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "18%",
              height: "18%",
              marginLeft: "-9%",
              marginTop: "-9%",
              borderRadius: "50%",
              background: "white",
              border: "10px solid rgba(0, 0, 0, 0.1)",
              boxSizing: "border-box",
              boxShadow: "0 0 1px grey",
              filter: "drop-shadow(0 0 2px grey)",
            }}
          />
        </div>

        {/* Track Info Display Strip */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "90px",
            backgroundColor: "rgba(20, 20, 20, 1)",
            border: "1px solid #444",
            borderRadius: "35px",
            color: "lime",
            fontFamily: "Doto",
            fontSize: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          Track Info
        </div>
      </div>
    </div>
  );
};

export default CdPlayerShell;
