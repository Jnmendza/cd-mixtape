export const getCurrentTime = (): string => {
  const now = new Date();
  return now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Set to false for 24-hour format
  });
};

export const youtubeRegex =
  /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;

export const isValidYouTubeLink = (url: string): boolean => {
  return youtubeRegex.test(url); // Returns true if it matches
};
