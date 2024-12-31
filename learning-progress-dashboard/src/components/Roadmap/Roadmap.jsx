import React from "react";
import "./Roadmap.css";

const Roadmap = ({ weeks, onWeekClick }) => {
  return (
    <div className="roadmap-container">
      {weeks.map((week, index) => (
        <div
          key={week.number}
          className={`roadmap-week ${
            week.isCompleted ? "completed" : "not-completed"
          }`}
          onClick={() => onWeekClick(week.number)}
        >
          <span>Week {week.number}</span>
        </div>
      ))}
    </div>
  );
};

export default Roadmap;
