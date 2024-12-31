import React, { useState } from "react";
import AddTaskForm from "./Pages/AddTaskForm";
import TaskList from "./Pages/TaskList";

import "./FullTask.css";

const FullTask = () => {
  const [currentView, setCurrentView] = useState("add-task"); 

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="full-task-container">
      <div className="navigation">
        <button
          className={currentView === "add-task" ? "active" : ""}
          onClick={() => handleNavigation("add-task")}
        >
          Add Task
        </button>
        <button
          className={currentView === "task-list" ? "active" : ""}
          onClick={() => handleNavigation("task-list")}
        >
          Task List
        </button>
      </div>

      <div className="content">
        {currentView === "add-task" && <AddTaskForm />}
        {currentView === "task-list" && <TaskList />}
      </div>
    </div>
  );
};

export default FullTask;
