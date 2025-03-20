import React, { useState } from "react";
import "98.css";

interface TableViewLinkListProps {
  links: string[];
  onDelete: (index: number) => void;
}

const TableViewLinkList = ({ links, onDelete }: TableViewLinkListProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleRowClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    <div style={{ display: "flex" }}>
      <div className='sunken-panel' style={{ width: 350, minHeight: 100 }}>
        <table className='interactive'>
          <thead>
            <tr>
              <th style={{ width: 350 }}>link</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(index)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedIndex === index ? "#bfdbfe" : "transparent",
                  transition: "background-color 0.2s ease-in-out",
                }}
              >
                <td style={{ textOverflow: "ellipsis" }}>{link}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button
          onClick={() => selectedIndex !== null && onDelete(selectedIndex)}
          disabled={selectedIndex === null}
          style={{ marginLeft: 8 }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TableViewLinkList;
