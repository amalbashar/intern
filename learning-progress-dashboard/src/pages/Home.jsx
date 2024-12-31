import React, { useState } from "react";
import Roadmap from "../components/Roadmap/Roadmap";
import "./Home.css";
import FullTaskWeek1 from "../components/WeeklyTasks/Week1/FullTask";
import FullTaskWeek2 from "../components/WeeklyTasks/Week2/FullTask";
import { TaskProvider } from "../components/WeeklyTasks/Week2/Components/TaskContext";
import FullTaskWeek3 from "../components/WeeklyTasks/Week3/FullTask";
import { FavoritesProvider } from "../components/WeeklyTasks/Week3/Components/FavoritesContext";
import { Provider } from "react-redux";
import store from "../components/WeeklyTasks/Week3/Redux/store"; 

const Home = () => {
  const [weeks, setWeeks] = useState([
    { number: 1, isCompleted: true },
    { number: 2, isCompleted: true },
    { number: 3, isCompleted: false },
    { number: 4, isCompleted: false },
    { number: 5, isCompleted: false },
    { number: 6, isCompleted: false },
    { number: 7, isCompleted: false },
    { number: 8, isCompleted: false },
  ]);

  const topicsPerWeek = {
    1: ["Topic 1.1", "Topic 1.2", "Topic 1.3", "Topic 1.4"],
    2: ["Topic 2.1", "Topic 2.2", "Topic 2.3", "Topic 2.4"],
    3: ["Topic 3.1", "Topic 3.2", "Topic 3.3", "Topic 3.4"],
  };

  const taskComponents = {
    1: <FullTaskWeek1 />, 
    2: (
      <TaskProvider>
        <FullTaskWeek2 />
      </TaskProvider>
    ),
    3: (
      <TaskProvider>
        <FavoritesProvider>
          <Provider store={store}>
            <FullTaskWeek3 />
          </Provider>
        </FavoritesProvider>
      </TaskProvider>
    ),
  };

  const [selectedWeek, setSelectedWeek] = useState(null);

  const handleWeekClick = (weekNumber) => {
    setSelectedWeek(weekNumber);
  };

  const handleCloseWeek = () => {
    setSelectedWeek(null);
  };

  return (
    <div className="home-container">
      {selectedWeek === null ? (
        <>
          <h1>My Learning Journey</h1>
          <p>Track your progress and click on a week to dive in!</p>
          <Roadmap weeks={weeks} onWeekClick={handleWeekClick} />
        </>
      ) : (
        <div className="week-details-container">
          <button className="close-button" onClick={handleCloseWeek}>
            Back to Roadmap
          </button>
          <div className="week-info">
            <h2>Week {selectedWeek}</h2>
            <ul>
              {topicsPerWeek[selectedWeek]?.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>
          <div className="week-example">
            <h3>What you'll learn:</h3>
            {taskComponents[selectedWeek] || <p>Content not available for this week yet!</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
