import React, { useState } from "react";

interface TableRow {
  track: string;
  duration: string;
  format: string;
}

const data: TableRow[] = [
  { track: "Not like us", duration: "3:20", format: "mp3" },
  { track: "Euphoria", duration: "4:43", format: "mp3" },
  { track: "California Love", duration: "3:25", format: "mp3" },
  {
    track: "One step closer",
    duration: "3:48",
    format: "mp3",
  },
];

const TableView = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleRowClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    <div className='sunken-panel' style={{ width: 350 }}>
      <table className='interactive'>
        <thead>
          <tr>
            <th style={{ width: 150 }}>Track</th>
            <th style={{ width: 150 }}>Duration</th>
            <th style={{ width: 50 }}>Format</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
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
              <td style={{ textOverflow: "ellipsis" }}>{row.track}</td>
              <td>{row.duration}</td>
              <td>{row.format}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
