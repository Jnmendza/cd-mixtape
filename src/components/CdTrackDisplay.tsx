import { motion } from "framer-motion";

interface CdTrackDisplayProps {
  trackTitle: string;
  isLoading: boolean;
  count: string;
  trackTime: string;
}

const CdTrackDisplay = ({
  trackTitle,
  isLoading,
  count,
  trackTime,
}: CdTrackDisplayProps) => {
  const text = isLoading ? "Waiting for playback..." : trackTitle;

  return (
    <div
      style={{
        width: "80%",
        height: "50px",
        backgroundColor: "#213330", // lighter gray
        borderRadius: "25px",
        border: "1px solid #444",
        display: "flex",
        alignItems: "center",
        justifyContent: isLoading ? "center" : "flex-start",
        padding: "0 12px",
        overflow: "hidden",
        fontFamily: "Doto",
        fontSize: "14px",
        color: "lime",
        zIndex: 2,
      }}
    >
      {isLoading ? (
        <span>{text}</span>
      ) : (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "70px", // enough room for both layers
            overflow: "hidden",
          }}
        >
          {/* Top info bar - positioned over the marquee */}
          <div
            style={{
              position: "absolute",
              top: 2,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "space-between",
              padding: "0 6px",
              zIndex: 2,
            }}
          >
            <p>Track: {count}</p>
            <p>{trackTime}</p>
          </div>

          {/* Scrolling track title underneath */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              bottom: 15,
              whiteSpace: "nowrap",
              zIndex: 1,
            }}
          >
            {text}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CdTrackDisplay;
