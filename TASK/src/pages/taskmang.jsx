import React, { useContext, useState } from "react";
import Form from "../components/taskmang/Form";
import TaskList from "../components/taskmang/TaskList";
import { TaskContext } from "../components/taskmang/TaskContext";
import { useNavigate } from "react-router-dom";

import Button from "../components/reusable/Button"; 



const TaskMang = () => {

  const navigate = useNavigate();


  const { addTask, updateTask } = useContext(TaskContext);
  const [editingIndex, setEditingIndex] = useState(null);
  const [initialData, setInitialData] = useState(null);

  const handleTaskSubmit = (taskData) => {
    if (editingIndex !== null) {
      updateTask(editingIndex, taskData); 
      setEditingIndex(null);
      setInitialData(null); 
    } else {
      addTask(taskData); 
    }
  };

  const handleEdit = (index, task) => {
    setEditingIndex(index);
    setInitialData(task);
  };

  return (
    
    <div className="container" >
      <h1 style={{ textAlign: "center" }}>Task Management </h1>

      <div>
        <Form
          onSubmit={handleTaskSubmit}
          initialData={initialData} 
        />
      </div>

      <div>
        <TaskList onEdit={handleEdit} />
      </div>
      <div style={{ textAlign: "center", margin: "20px" }}>
      <Button
        label="Go to Context Favorites"
        onClick={() => navigate("favorites-context")}
      />
      <Button
        label="Go to Redux Favorites"
        onClick={() => navigate("favorites-redux")}
      />
    </div>

    </div>
  );
};

export default TaskMang;
