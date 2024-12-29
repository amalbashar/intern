import React, { useContext, useState } from "react";
import TaskTable from "../components/TaskTable";
import { TaskContext } from "../components/TaskContext";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const { tasks, deleteTask } = useContext(TaskContext);
  const navigate = useNavigate(); 
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


  const handleEdit = (index) => {
    navigate("/add-task", { state: { taskIndex: index } });
  };

  const handleDelete = (index) => {
    deleteTask(index);
  };

  return (
    <div className="task-list-container">
      <div className="controls-container">
        <label>
          Filter by Priority:
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label>
          Show Overdue Tasks:
          <input
            type="checkbox"
            checked={showOverdue}
            onChange={(e) => setShowOverdue(e.target.checked)}
          />
        </label>

        <div>
          <button onClick={() => setSortOrder("asc")}>
            Sort by Date (Ascending)
          </button>
          <button onClick={() => setSortOrder("desc")}>
            Sort by Date (Descending)
          </button>
          <button onClick={() => setSortOrder(null)}>Remove Sorting</button>
        </div>
      </div>

      <TaskTable
        tasks={sortOrder ? sortedTasks : filteredTasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TaskList;
