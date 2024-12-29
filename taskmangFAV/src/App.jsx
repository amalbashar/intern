import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddTaskForm from "./pages/AddTaskForm";
import TaskList from "./pages/TaskList";
import { TaskProvider } from "./components/TaskContext";
import { FavoritesProvider } from "./components/FavoritesContext"; 
import ContextFavorites from "./pages/ContextFavorites";
import ReduxFavorites from "./pages/ReduxFavorites";
import { Provider } from "react-redux";
import store from "./redux/store";







function App() {
  return (
    <TaskProvider>
    <FavoritesProvider>
    <Provider store={store}>

      <Router>
        <Navbar />
        <Routes>
          <Route path="/add-task" element={<AddTaskForm />} />
          <Route path="/task-list" element={<TaskList />} />
          <Route path="/context-favorites" element={<ContextFavorites />} />
          <Route path="/redux-favorites" element={<ReduxFavorites />} />


        </Routes>
      </Router>.    
    </Provider>

      </FavoritesProvider>
      </TaskProvider>
  );
}

export default App;
