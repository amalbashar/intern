import React, { useState } from "react";
import Roadmap from "../components/Roadmap/Roadmap";
import FullTaskWeek1 from "../components/WeeklyTasks/Week1/FullTask";
import FullTaskWeek2 from "../components/WeeklyTasks/Week2/FullTask";
import { TaskProvider } from "../components/WeeklyTasks/Week2/Components/TaskContext";
import FullTaskWeek3 from "../components/WeeklyTasks/Week3/FullTask";
import { FavoritesProvider } from "../components/WeeklyTasks/Week3/Components/FavoritesContext";
import { Provider } from "react-redux";
import store from "../components/WeeklyTasks/Week3/Redux/store";
import "./Home.css";

const Home = () => {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [completedTopics, setCompletedTopics] = useState([]);

  const topicsPerWeek = {
    1: ["Topic 1.1", "Topic 1.2", "Topic 1.3", "Topic 1.4"],
    2: ["Topic 2.1", "Topic 2.2", "Topic 2.3", "Topic 2.4"],
    3: ["Topic 3.1", "Topic 3.2", "Topic 3.3", "Topic 3.4"],
  };

  const tasksPerWeek = {
    1: ["Task 1.1", "Task 1.2", "Task 1.3", "Task 1.4"],
    2: ["Task 2.1", "Task 2.2", "Task 2.3", "Task 2.4"],
    3: ["Task 3.1", "Task 3.2", "Task 3.3", "Task 3.4"],
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

  const handleTopicComplete = (topic) => {
    if (!completedTopics.includes(topic)) {
      setCompletedTopics([...completedTopics, topic]);
    }
  };
////// ارجعي زبطي هون لازم يسيفو مو يشيلو و يكوةن نفسو يلي جوا الديتيلز    - تنبيه
/// حتعملي انو كل ما يقرا توبيك يعملها دن وتمشي البروسس معو مش تتعاجزي تسويها هاا


  const handleWeekClick = (weekNumber) => {
    setSelectedWeek(weekNumber);
    setCompletedTopics([]);
  };

  const handleBackToRoadmap = () => {
    setSelectedWeek(null);
  };

  const getProgress = () => {
    const totalTopics = topicsPerWeek[selectedWeek]?.length || 0;
    const completedCount = completedTopics.length;
    return (completedCount / totalTopics) * 100;
  };

  return (
    <div className="home-container">
      {!selectedWeek ? (
        <>
          <h1>My Learning Journey</h1>
          <Roadmap onWeekClick={handleWeekClick} />
        </>
      ) : (
        <div className="week-content">
          <button className="back-button" onClick={handleBackToRoadmap}>
            Back to Roadmap
          </button>
          <div className="week-layout">
            {/* Topics Section */}
            <div
              className="topics-section"
              style={{
                border: `10px solid`,
                borderImageSource: `linear-gradient(to right, #007bff ${
                  getProgress() || 0
                }%, #ccc ${getProgress() || 0}%)`,
                borderImageSlice: 1,
              }}
            >
              <h2>Week {selectedWeek} Topics</h2>
              <ul className="topics-list">
                {topicsPerWeek[selectedWeek]?.map((topic, index) => (
                  <li
                    key={index}
                    className={`topic-item ${
                      completedTopics.includes(topic) ? "completed" : ""
                    }`}
                    onClick={() => handleTopicComplete(topic)}
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tasks Section */}
            <div className="tasks-section">
              <h2>What you will be able to to after this week?</h2>
              
              {/* FullTask Section */}
              <div className="full-task-section">
                {taskComponents[selectedWeek]}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
