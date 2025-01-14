import React from "react";
import { useFavorites } from "./FavoritesContext"; 
import { addReduxFavorite } from "../redux/chat/favoritesSlice"; 
import { useDispatch, useSelector } from "react-redux"; 
import Button from "../reusable/Button"; 


const TaskTable = ({ tasks, onEdit, onDelete }) => {
    const { favorites, addToFavorites } = useFavorites();

    const reduxFavorites = useSelector((state) => state.reduxFavorites);
    const dispatch = useDispatch();

    return (
        <div className="container">
            <table >
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Description</th>
                        <th>Actions</th>
                        <th>Favorites</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => {
                        const isFavorite = favorites.includes(index); 
                        const isReduxFavorite = reduxFavorites.includes(index); 

                        return (
                            <tr key={index}>
                                <td>{task.name}</td>
                                <td>{task.date}</td>
                                <td>{task.priority}</td>
                                <td>{task.description}</td>
                                <td>
                  <Button
                    onClick={() => onEdit(index, task)}
                    label="Edit"
                  />
                  <Button
                    onClick={() => onDelete(index)}
                    label="Delete"
                  />
                </td>
                <td>
                  <Button
                    onClick={() => addToFavorites(index)}
                    label={isFavorite ? "in con" : "con"}
                    disabled={isFavorite}
                  />
                  <Button
                    onClick={() => dispatch(addReduxFavorite(index))}
                    label={isReduxFavorite ? "In Redux " : " Redux"}
                    disabled={isReduxFavorite}
                  />
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
