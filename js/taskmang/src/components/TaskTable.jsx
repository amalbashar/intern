import React from "react";
import "../App.css";

const TaskTable = ({ tasks, onEdit, onDelete }) => {
    
  return (
    <table >
      <thead>
        <tr>
          <th style={{ border: "1px solid black", padding: "8px" }}>Task Name</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>Due Date</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>Priority</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>Description</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid black", padding: "8px" }}>{task.name}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{task.date}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{task.priority}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{task.description}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <button onClick={() => onEdit(index)}>Edit</button>
              <button onClick={() => onDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
