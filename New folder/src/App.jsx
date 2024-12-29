import React from "react";
import { Provider } from "react-redux"; 
import store from "./redux/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddTaskForm from "./pages/AddTaskForm";
import TaskList from "./pages/TaskList";
import { TaskProvider } from "./components/TaskContext";

function App() {
  return (
    <Provider store={store}> 
      <TaskProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<AddTaskForm />} />
            <Route path="/add-task" element={<AddTaskForm />} />
            <Route path="/task-list" element={<TaskList />} />
          </Routes>
        </Router>
      </TaskProvider>
    </Provider>
  );
}

export default App;
