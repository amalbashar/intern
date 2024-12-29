import React from "react";
import { useFavorites } from "../components/FavoritesContext";
import { useContext } from "react";
import { TaskContext } from "../components/TaskContext";

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
                    {favorites.map((index) => (
                        <li key={index} style={{ marginBottom: "10px" }}>
                            <span>
                                <strong>{tasks[index].name}</strong> - {tasks[index].date} -{" "}
                                {tasks[index].priority}
                            </span>
                            <button
                                style={{ marginLeft: "10px" }}
                                onClick={() => removeFromFavorites(index)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ContextFavorites;
