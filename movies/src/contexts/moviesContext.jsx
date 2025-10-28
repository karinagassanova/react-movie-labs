import React, { useState } from "react";

// Create context for global movie-related state
export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  // State for favorite movies (array of movie IDs)
  const [favorites, setFavorites] = useState([])
  // State for user reviews (object: { movieId: review })
  const [myReviews, setMyReviews] = useState({})
  // State for "Must Watch" movies (array of movie IDs)
  const [mustWatch, setMustWatch] = useState([]);

  // Add a movie to the Must Watch list if not already included
  const addToMustWatch = (movie) => {
    if (!mustWatch.includes(movie.id)) {
      const newMustWatch = [...mustWatch, movie.id];
      setMustWatch(newMustWatch);
      console.log("Must Watch list:", newMustWatch); // confirm
    }
  };

  // Add a movie to the Favorites list if not already included
  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    }
    else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

  // Add or update a review for a movie
  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review })
  };
  console.log(myReviews);


  // Remove a movie from the Favorites list
  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter(
      (mId) => mId !== movie.id
    ))
  };

  // Remove a movie from the Must Watch list
  const removeFromMustWatch = (movie) => {
    setMustWatch(mustWatch.filter((mId) => mId !== movie.id));
  };

  // Provide context values and functions to children components
  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        mustWatch,
        addToMustWatch,
        removeFromMustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
