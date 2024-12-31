import React, { useState } from "react";
import AddTaskForm from "./Pages/AddTaskForm";
import TaskList from "./Pages/TaskList";
import ContextFavorites from "./Pages/ContextFavorites";
import ReduxFavorites from "./Pages/ReduxFavorites";
import "../week2/FullTask.css";


const FullTaskWeek3 = () => {
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
        <button
          className={currentView === "context-favorites" ? "active" : ""}
          onClick={() => handleNavigation("context-favorites")}
        >
          Context Favorites
        </button>
        <button
          className={currentView === "redux-favorites" ? "active" : ""}
          onClick={() => handleNavigation("redux-favorites")}
        >
          Redux Favorites
        </button>
      </div>

      <div className="content">
        {currentView === "add-task" && <AddTaskForm />}
        {currentView === "task-list" && <TaskList />}
        {currentView === "context-favorites" && <ContextFavorites />}
        {currentView === "redux-favorites" && <ReduxFavorites />}
      </div>
    </div>
  );
};

export default FullTaskWeek3;
