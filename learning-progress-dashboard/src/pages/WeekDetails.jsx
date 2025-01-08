import React from "react";
import "./WeekDetails.css";
import FullTaskWeek1 from "../components/WeeklyTasks/Week1/FullTask";
import FullTaskWeek2 from "../components/WeeklyTasks/Week2/FullTask";
import { TaskProvider } from "../components/WeeklyTasks/Week2/Components/TaskContext";
import FullTaskWeek3 from "../components/WeeklyTasks/Week3/FullTask";
import { FavoritesProvider } from "../components/WeeklyTasks/Week3/Components/FavoritesContext";
import { Provider } from "react-redux";
import store from "../components/WeeklyTasks/Week3/Redux/store";

const WeekDetails = () => {
  const weeksData = {
    1: {
      topics: [
        { title: "Introduction to React", content: "React is a JavaScript library for building user interfaces." },
        { title: "Components", content: "Components are the building blocks of any React app." },
        { title: "JSX Basics", content: "JSX allows you to write HTML elements in JavaScript." },
        { title: "Props", content: "Props are used to pass data between components." },
      ],
      fullTask: <FullTaskWeek1 />,   ////////// ازززالة من كل الاسابيع مخربة علي شكل الصفحة مو حلوة او ازبط ستايل كل التاسكات -تنبيه

   },
    2: {
      topics: [
        { title: "State Management", content: "State is a way to manage changing data in React apps." },
        { title: "Events in React", content: "Events in React are similar to DOM events." },
        { title: "Conditional Rendering", content: "Render elements based on conditions in React." },
      ],
      fullTask: (
        <TaskProvider>
          <FullTaskWeek2 />
        </TaskProvider>
      ),
    },
    3: {
      topics: [
        { title: "Hooks Overview", content: "Hooks let you use state and lifecycle methods in functional components." },
        { title: "useState Hook", content: "The useState hook is used to manage state in React." },
        { title: "useEffect Hook", content: "The useEffect hook is used for side effects in React." },
      ],
      fullTask: (
        <TaskProvider>
          <FavoritesProvider>
            <Provider store={store}>
              <FullTaskWeek3 />
            </Provider>
          </FavoritesProvider>
        </TaskProvider>
      ),
    },
  };

  const handleScrollToWeek = (weekNumber) => {
    document.getElementById(`week-${weekNumber}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="week-details-container">
      {/* Sidebar */}
      <aside className="sidebar">
        {Object.keys(weeksData).map((week) => (
          <div key={week} className="sidebar-week">
            <h3 onClick={() => handleScrollToWeek(Number(week))}>Week {week}</h3>
            <ul className="sidebar-list">
              {weeksData[week].topics.map((topic, index) => (
                <li
                  key={index}
                  className="sidebar-topic"
                  onClick={() => document.getElementById(`topic-${week}-${index}`)?.scrollIntoView({ behavior: "smooth" })}
                >
                  {topic.title}
                </li>
              ))}
            </ul>
            <button className="quiz-button" onClick={() => handleScrollToWeek(Number(week))}>
              Take Quiz
            </button>
          </div>
        ))}
      </aside>

      <main className="week-content">
        {Object.keys(weeksData).map((week) => (
          <section key={week} id={`week-${week}`} className="week-section">
            <h2>Week {week}</h2>
            <div className="full-task">{weeksData[week].fullTask}</div>
            <div className="topics-section">
              {weeksData[week].topics.map((topic, index) => (
                <div key={index} id={`topic-${week}-${index}`} className="topic-item">
                  <h3>{topic.title}</h3>
                  <p>{topic.content}</p>
                </div>
              ))}
            </div>
            <div className="quiz-section">
              <h3>Quiz</h3>
              <p>This is the quiz for Week {week}.</p>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default WeekDetails;
