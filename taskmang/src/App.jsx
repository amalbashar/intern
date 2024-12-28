import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddTaskForm from "./pages/AddTaskForm";
import TaskList from "./pages/TaskList";
import { TaskProvider } from "./components/TaskContext";

function App() {
  return (
    <TaskProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/add-task" element={<AddTaskForm />} />
          <Route path="/task-list" element={<TaskList />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;
