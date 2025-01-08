import React, { useContext, useState } from "react";
import { TaskContext } from "./TaskContext";
import TaskTable from "./TaskTable";
import Input from "../reusable/input"; 

const TaskList = ({ onEdit }) => { 
  const { tasks, deleteTask } = useContext(TaskContext);
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [showOverdue, setShowOverdue] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);

  const filteredTasks = tasks.filter((task) => {
    if (priorityFilter !== "All" && task.priority !== priorityFilter) {
      return false;
    }
    if (showOverdue) {
      const taskDate = new Date(task.date);
      const today = new Date();
      return taskDate < today;
    }
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (sortOrder === "asc") {
      return dateA - dateB;
    } else if (sortOrder === "desc") {
      return dateB - dateA;
    }
    return 0;
  });

  const handleDelete = (index) => {
    deleteTask(index);
  };

  return (
    <div className="container">
      <div >

        <Input
          label="Filter by Priority"
          type="select"
          options={[
            { value: "All", label: "All" },
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        />


        <Input
                  label="Show Overdue Tasks"
                  type="checkbox"
                  checked={showOverdue}
                  onChange={(e) => setShowOverdue(e.target.checked)}
        />

        <Input
          label="Sort by Date"
          type="select"
          options={[
            { value: "", label: "Select an option" },
            { value: "asc", label: " Asc" },
            { value: "desc", label: " Desc" },
            { value: "null", label: "Remove Sorting" },
          ]}
          onChange={(e) => {
            const selectedValue = e.target.value;
            setSortOrder(selectedValue === "null" ? null : selectedValue);
          }}
        />
      </div>

      <TaskTable
        tasks={sortOrder ? sortedTasks : filteredTasks}
        onEdit={onEdit} 
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TaskList;
