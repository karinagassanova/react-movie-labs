import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromMustWatch from "../components/cardIcons/removeFromMustWatch";

const MustWatchMoviesPage = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);

  const mustWatchMovieQueries = useQueries({
    queries: movieIds.map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getMovie,
    })),
  });

  const removeFromMustWatch = (movie) => {
    setMustWatch(mustWatch.filter((mId) => mId !== movie.id));
  };
  
  const isPending = mustWatchMovieQueries.some((q) => q.isPending);

  if (isPending) return <Spinner />;

  const movies = mustWatchMovieQueries.map((q) => q.data);

  return (
    <PageTemplate
      title="Must Watch Movies"
      movies={movies}
      action={(movie) => <RemoveFromMustWatch movie={movie} />}
    />
  );
};

export default MustWatchMoviesPage;
