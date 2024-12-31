import React from "react";
import { useFavorites } from "../Components/FavoritesContext"; // FavoritesContext
import { useDispatch, useSelector } from "react-redux"; // Redux
import { addReduxFavorite } from "../Redux/favoritesSlice"; // Redux action
import "../../Week2/FullTask.css";

const TaskTable = ({ tasks, onEdit, onDelete }) => {
    // FavoritesContext
    const { favorites, addToFavorites } = useFavorites();

    // Redux
    const reduxFavorites = useSelector((state) => state.reduxFavorites);
    const dispatch = useDispatch();

    return (
        <div className="task-table-container">
            <table className="task-table">
                <thead>
                    <tr>
                        <th className="table-header">Task Name</th>
                        <th className="table-header">Due Date</th>
                        <th className="table-header">Priority</th>
                        <th className="table-header">Description</th>
                        <th className="table-header">Actions</th>
                        <th className="table-header">Favorites</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => {
                        const isFavorite = favorites.includes(index);
                        const isReduxFavorite = reduxFavorites.includes(index);

                        return (
                            <tr key={index}>
                                <td className="table-cell">{task.name}</td>
                                <td className="table-cell">{task.date}</td>
                                <td className="table-cell">{task.priority}</td>
                                <td className="table-cell">{task.description}</td>
                                <td className="table-cell">
                                    <button
                                        className="action-btn"
                                        onClick={() => onEdit(index)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="action-btn"
                                        onClick={() => onDelete(index)}
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td className="table-cell">
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
        </div>
    );
};

export default TaskTable;
