import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeReduxFavorite } from "../redux/favoritesSlice";
import { useContext } from "react";
import { TaskContext } from "../components/TaskContext";

const ReduxFavorites = () => {
    const reduxFavorites = useSelector((state) => state.reduxFavorites); // Redux Favorites
    const { tasks } = useContext(TaskContext); // Access all tasks
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Redux Favorites</h2>
            {reduxFavorites.length === 0 ? (
                <p>No favorite tasks yet.</p>
            ) : (
                <ul>
                    {reduxFavorites.map((index) => (
                        <li key={index}>
                            <span>
                                <strong>{tasks[index].name}</strong> - {tasks[index].date} -{" "}
                                {tasks[index].priority}
                            </span>
                            <button
                                style={{ marginLeft: "10px" }}
                                onClick={() => dispatch(removeReduxFavorite(index))}
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

export default ReduxFavorites;
