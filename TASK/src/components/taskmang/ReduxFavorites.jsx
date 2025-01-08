import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeReduxFavorite } from "../redux/chat/favoritesSlice";
import { useContext } from "react";
import { TaskContext } from "./TaskContext";

import Button from "../reusable/Button"; 


const ReduxFavorites = () => {
  const reduxFavorites = useSelector((state) => state.reduxFavorites); 
  const { tasks } = useContext(TaskContext); 
  const dispatch = useDispatch();

  return (
    <div >
      <h2 >Redux Favorites</h2>
      {reduxFavorites.length === 0 ? (
        <p >No favorite tasks yet.</p>
      ) : (
        <ul>
          {reduxFavorites.map((index) => {
            const task = tasks[index]; 
            if (!task) {
              return null; 
            }
            return (
              <li key={index} >
                <span >
                  <strong>{task.name}</strong> - {task.date} - {task.priority}
                </span>
               
                <Button
                            label="Remove"
                            onClick={() => dispatch(removeReduxFavorite(index))}
                            />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ReduxFavorites;
