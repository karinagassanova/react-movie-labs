import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  // Access favorite movie IDs from global context
  const { favorites: movieIds } = useContext(MoviesContext);

  // Create an array of queries to fetch all favorite movies in parallel
  const favoriteMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      }
    })
  });

  // Check if any of the queries is still loading
  const isPending = favoriteMovieQueries.find((m) => m.isPending === true);
  // Show spinner if data is still loading
  if (isPending) {
    return <Spinner />;
  }
  // Extract movie data from queries and normalize genre_ids
  const movies = favoriteMovieQueries.map((q) => {
    // Convert genres array to genre_ids for filtering purposes
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  // Placeholder function (not used, but kept for consistency)
  const toDo = () => true;

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            {/* Button to remove from favorites */}
            <RemoveFromFavorites movie={movie} />
            {/* Button to write a review */}
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default FavoriteMoviesPage;
