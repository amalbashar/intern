import React from "react";
import "../App.css";
import { useFavorites } from "./FavoritesContext";
import { useDispatch, useSelector } from "react-redux";
import { addReduxFavorite } from "../redux/favoritesSlice";

const TaskTable = ({ tasks, onEdit, onDelete }) => {
    //  FavoritesContext
    const { favorites, addToFavorites } = useFavorites();

    //  Redux
    const reduxFavorites = useSelector((state) => state.reduxFavorites); 
    const dispatch = useDispatch(); 

    return (
        <table>
            <thead>
                <tr>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Task Name</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Due Date</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Priority</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Description</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Actions</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Favorites</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, index) => {
                    const isFavorite = favorites.includes(index);
                    const isReduxFavorite = reduxFavorites.includes(index); 

                    return (
                        <tr key={index}>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{task.name}</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{task.date}</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{task.priority}</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{task.description}</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>
                                <button onClick={() => onEdit(index)}>Edit</button>
                                <button onClick={() => onDelete(index)}>Delete</button>
                            </td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>

                                <button
                                    onClick={() => addToFavorites(index)}
                                    disabled={isFavorite}
                                >
                                    {isFavorite ? "Added to Favorites" : "Add to CON Favorites"}
                                </button>

                                <button
                                    onClick={() => dispatch(addReduxFavorite(index))}
                                    disabled={isReduxFavorite}
                                    style={{ marginLeft: "10px" }}
                                >
                                    {isReduxFavorite ? "In Redux Favorites" : "Add to Redux"}
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TaskTable;
