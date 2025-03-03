import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./User";
import { isEmpty } from "lodash";
import { baseUrl } from "../services/api/config";

export const FavoritesContext = createContext({
    favorites: [],
    setFavorites: () => { },
    deleteFavorite: (id) => { },
    addToFavorites: (id, name, type) => { },
});

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const { user } = useContext(UserContext);

    const getUserFavourites = () => {
        fetch(`${baseUrl}/favourites`,{
            method:"GET",
            credentials:"include",
        })
            .then((res) => res.json())
            .then((data) => {
                setFavorites(data);
            });
    };

    const deleteFavorite = (externalId, type) => {
        const favoriteId = favorites.find((favorite) => {
            return favorite.type === type && favorite.external_id === externalId;
        }).id;
        fetch(`${baseUrl}/favourites/${favoriteId}`,{
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-TOKEN": sessionStorage.getItem("csrf_access_token"),
            },
            credentials: "include",
            body: JSON.stringify({
              id: favoriteId,
            }),
          })
            .then((res) => res.json())
            .then((data) =>{
                console.log(data)
                getUserFavourites();
            });
    };

    const addToFavorites = (externalId, name, type) => {
        fetch(`${baseUrl}/favourites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": sessionStorage.getItem("csrf_access_token"),
            },
            credentials: "include",
            body: JSON.stringify({
                external_id: externalId,
                name: name,
                type: type,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                getUserFavourites();
            })
    };

    useEffect(() => {
        if (!isEmpty(user)) {
            getUserFavourites();
        }
    }, [user]);

    return (
        <FavoritesContext.Provider
            value={{ favorites, setFavorites, addToFavorites, deleteFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};