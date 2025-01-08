import React from "react";
import { useContext } from "react";
import { TaskContext } from "./TaskContext";
import { useFavorites } from "./FavoritesContext";

import Button from "../reusable/Button"; 



const ContextFavorites = () => {
    const { favorites, removeFromFavorites } = useFavorites(); 
    const { tasks } = useContext(TaskContext); 

    return (
        <div>
            <h2>Context Favorites</h2>
            {favorites.length === 0 ? (
                <p >No favorite tasks yet.</p> 
            ) : (
                <ul>
                    {favorites.map((index) => {
                        const task = tasks[index]; 
                        if (!task) return null; 
                        return (
                            <li key={index} >
                                <span >
                                    <strong>{task.name}</strong> - {task.date} - {task.priority}
                                </span>
                            <Button
                            label="Remove"
                            onClick={() => removeFromFavorites(index)}
                            />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default ContextFavorites;
