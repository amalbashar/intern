import React, { useContext, useEffect, useState } from "react";
import Form from "../components/Form";
import { useLocation } from "react-router-dom";
import { TaskContext } from "../components/TaskContext";


const AddTaskForm = () => {
  const location = useLocation();
  const { taskIndex } = location.state || {};
  const { tasks, updateTask, addTask } = useContext(TaskContext);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    priority: "",
    description: "",
  });

  useEffect(() => {
    if (taskIndex !== undefined) {
      const taskToEdit = tasks[taskIndex];
      setFormData(taskToEdit); 
    }
  }, [taskIndex, tasks]);

  const handleSubmit = (data) => {
    if (taskIndex !== undefined) {
      updateTask(taskIndex, data); 
    } else {
      addTask(data); 
    }
  };

  return (
    <div>
<h2 style={{ marginTop: "50px" }}>
  {taskIndex !== undefined ? "Edit Task" : "Add Task"}
</h2>
      <Form initialData={formData} onSubmit={handleSubmit} />

    </div>
  );
};

export default AddTaskForm;