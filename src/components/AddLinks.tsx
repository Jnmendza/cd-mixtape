import React from "react";
import ProgressIndicator from "./ProgressIndicator";
import TableViewLinkList from "./TableViewLinkList";
import { MAX_LINKS } from "../constants";
import { isValidYouTubeLink } from "../utils";
import HorizontalSeparator from "./HorizontalSeparator";

interface AddLinksProps {
  links: string[];
  cdTitle: string;
  newLink: string;
  startProgress: boolean;
  setCdTitle: React.Dispatch<React.SetStateAction<string>>;
  setLinks: React.Dispatch<React.SetStateAction<string[]>>;
  setNewLink: React.Dispatch<React.SetStateAction<string>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  setStartProgress: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddLinks = ({
  links,
  cdTitle,
  newLink,
  startProgress,
  setLinks,
  setCdTitle,
  setNewLink,
  setIsPlaying,
  setShowPlayer,
  setStartProgress,
}: AddLinksProps) => {
  const handleDeleteLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };

  const handleAddLink = () => {
    if (isValidYouTubeLink(newLink) && links.length < MAX_LINKS) {
      setLinks([...links, newLink]);
      setNewLink(""); // Clear input after adding
    } else if (!isValidYouTubeLink(newLink)) {
      console.log("Invalid YouTube link"); // Optional: Replace with UI feedback
    }
  };

  const burnCD = () => {
    if (links.some((link) => link.trim() !== "")) {
      setShowPlayer(true);
      setIsPlaying(false);
      console.log("CD Burn complete");
    }
  };

  return (
    <div>
      <img
        src='/banner.jpg'
        alt='burn-your-cd'
        style={{ height: 250, width: 475, marginBottom: 10 }}
      />
      <div>
        <input
          type='text'
          value={cdTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCdTitle(e.target.value)
          }
          placeholder='CD Title'
        />
        <p>Type your CD Title</p>
      </div>

      <TableViewLinkList links={links} onDelete={handleDeleteLink} />
      <div
        style={{
          width: 350,
          marginTop: 8,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <input
          type='text'
          value={newLink}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewLink(e.target.value)
          }
          placeholder='YouTube Link'
          style={{ width: 250 }}
        />
        <button
          onClick={handleAddLink}
          disabled={newLink.trim() === "" || links.length >= MAX_LINKS}
        >
          Add Link
        </button>
      </div>
      <HorizontalSeparator />
      <div
        style={{
          width: 435,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <ProgressIndicator start={startProgress} onComplete={burnCD} />
        <button
          onClick={() => setStartProgress(true)}
          disabled={startProgress}
          style={{ marginLeft: 10 }}
        >
          Burn CD
        </button>
      </div>
    </div>
  );
};

export default AddLinks;
