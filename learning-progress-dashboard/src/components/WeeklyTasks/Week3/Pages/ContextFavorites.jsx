import React from "react";
import { useFavorites } from "../components/FavoritesContext";
import { useContext } from "react";
import { TaskContext } from "../../Week2/Components/TaskContext";

const ContextFavorites = () => {
    const { favorites, removeFromFavorites } = useFavorites(); 
    const { tasks } = useContext(TaskContext); 

    return (
        <div>
            <h2>Context Favorites</h2>
            {favorites.length === 0 ? (
                <p>No favorite tasks yet.</p> 
            ) : (
                <ul>
                    {favorites.map((index) => {
                        const task = tasks[index]; // التحقق من وجود العنصر في tasks
                        if (!task) return null; // إذا كان غير موجود، تجاهله
                        return (
                            <li key={index} style={{ marginBottom: "10px" }}>
                                <span>
                                    <strong>{task.name}</strong> - {task.date} -{" "}
                                    {task.priority}
                                </span>
                                <button
                                    style={{ marginLeft: "10px" }}
                                    onClick={() => removeFromFavorites(index)}
                                >
                                    Remove
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default ContextFavorites;
