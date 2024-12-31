import React from "react";
import "./WeekCard.css";

const WeekCard = ({ weekNumber, description, isLocked, onClick }) => {
  return (
    <div
      className={`week-card ${isLocked ? "locked" : ""}`}
      onClick={!isLocked ? onClick : null}
    >
      <h2>Week {weekNumber}</h2>
      <p>{description}</p>
      {isLocked && <span className="lock-icon">🔒</span>}
    </div>
  );
};

export default WeekCard;
