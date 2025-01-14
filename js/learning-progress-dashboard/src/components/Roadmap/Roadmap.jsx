import React from "react";
import "./Roadmap.css";

const Roadmap = ({ onWeekClick }) => {
  const weeks = Array.from({ length: 12 }, (_, index) => ({
    number: index + 1,
    isCompleted: false, // يمكن تحديث هذه الحالة بناءً على تقدم المستخدم
  }));

  return (
    <div className="roadmap-container">
      {weeks.map((week) => (
        <div
          key={week.number}
          className={`roadmap-week ${week.isCompleted ? "completed" : ""}`}
          onClick={() => onWeekClick(week.number)}
        >
          Week {week.number}
        </div>
      ))}
    </div>
  );
};

export default Roadmap;
