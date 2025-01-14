import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
        const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
            return JSON.parse(savedFavorites);
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (index) => {
        if (!favorites.includes(index)) {
            setFavorites([...favorites, index]);
        }
    };

    const removeFromFavorites = (index) => {
        setFavorites(favorites.filter((favIndex) => favIndex !== index));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);
