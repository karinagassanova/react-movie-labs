import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromMustWatch from "../components/cardIcons/removeFromMustWatch";

const MustWatchMoviesPage = () => {
  // Access the "must watch" movie IDs from global context
  const { mustWatch: movieIds } = useContext(MoviesContext);
  // Create an array of queries to fetch all must-watch movies in parallel
  const mustWatchMovieQueries = useQueries({
    queries: movieIds.map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getMovie,
    })),
  });

  const removeFromMustWatch = (movie) => {
    setMustWatch(mustWatch.filter((mId) => mId !== movie.id));
  };
  // Check if any of the queries are still loading
  const isPending = mustWatchMovieQueries.some((q) => q.isPending);
  // Show spinner while any movie data is loading
  if (isPending) return <Spinner />;
  // Extract movie data from queries
  const movies = mustWatchMovieQueries.map((q) => q.data);

  return (
    // Use PageTemplate to display list of movies
    <PageTemplate
      title="Must Watch Movies"
      movies={movies}
      action={(movie) => <RemoveFromMustWatch movie={movie} />}
    />
  );
};

export default MustWatchMoviesPage;
