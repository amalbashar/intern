import React from "react";
import "./Maze.css";

const Maze = ({ currentStep, totalSteps }) => {
  return (
    <div className="maze-container">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`maze-step ${index < currentStep ? "completed" : ""}`}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default Maze;
