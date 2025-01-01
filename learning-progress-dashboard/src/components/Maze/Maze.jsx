import React from "react";
import "./Maze.css";

const Maze = ({ progress, totalSteps }) => {
  const renderMaze = () => {
    const cells = [];
    for (let i = 0; i < totalSteps; i++) {
      cells.push(
        <div
          key={i}
          className={`maze-cell ${i < progress ? "completed" : ""}`}
        >
          {i === progress && <span className="player">P</span>}
        </div>
      );
    }
    return cells;
  };

  return <div className="maze-grid">{renderMaze()}</div>;
};

export default Maze;
