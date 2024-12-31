import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./WeekDetails.css";

const WeekDetails = () => {
  const { weekNumber } = useParams();
  const [selectedTopic, setSelectedTopic] = useState(0);

  const weekContent = {
    1: [
      { id: 0, title: "Introduction to React", content: "Learn the basics of React, including components, JSX, and props." },
      { id: 1, title: "State and Props", content: "Understand how state and props work in React to manage data and interactions." },
      { id: 2, title: "Hooks in React", content: "Explore React Hooks such as useState and useEffect for functional components." },
      { id: 3, title: "React Router", content: "Learn how to implement navigation using React Router." },
    ],
    2: [
      { id: 0, title: "Advanced React Components", content: "Delve into advanced React patterns, including higher-order components and render props." },
      { id: 1, title: "Context API", content: "Learn how to use the Context API for state management." },
      { id: 2, title: "Performance Optimization", content: "Understand how to optimize React applications for better performance." },
    ],
    3: [
      { id: 0, title: "Redux Basics", content: "Learn the fundamentals of Redux for state management." },
      { id: 1, title: "Middleware in Redux", content: "Explore middleware like redux-thunk for async actions." },
      { id: 2, title: "Testing React", content: "Understand how to write tests for React components." },
    ],
  };

  const topics = weekContent[weekNumber] || [];

  return (
    <div className="week-details-container">
      <aside className="sidebar">
        <h3>Topics</h3>
        <ul>
          {topics.map((topic) => (
            <li
              key={topic.id}
              className={selectedTopic === topic.id ? "active" : ""}
              onClick={() => setSelectedTopic(topic.id)}
            >
              {topic.title}
            </li>
          ))}
        </ul>
      </aside>
      <main className="content">
        {topics.length > 0 ? (
          <>
            <h2>{topics[selectedTopic].title}</h2>
            <p>{topics[selectedTopic].content}</p>
          </>
        ) : (
          <p>No topics available for this week.</p>
        )}
      </main>
    </div>
  );
};

export default WeekDetails;
