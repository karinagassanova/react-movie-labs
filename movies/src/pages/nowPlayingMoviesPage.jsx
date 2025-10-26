import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNowPlayingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const NowPlayingMoviesPage = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["nowPlayingMovies",page],
    queryFn: () =>  getNowPlayingMovies(page),
  });

  if (isLoading) return <Spinner />;

  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <>
    <PageTemplate
      title="Now Playing"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
     <Stack spacing={2} sx={{ alignItems: 'center', mt: 2 }}>
  <Pagination
    count={data?.total_pages > 500 ? 500 : data?.total_pages} // TMDB limits pages to 500
    page={page}
    onChange={(event, value) => setPage(value)}
    sx={{
      "& .MuiPaginationItem-root": {
        color: "#032541",
        borderColor: "#032541",
      },
      "& .MuiPaginationItem-root:hover": {
        backgroundColor: "#032541",
        color: "#fff",
      },
      "& .MuiPaginationItem-root.Mui-selected": {
        backgroundColor: "#032541",
        color: "#fff",
      },
    }}
  />
</Stack>
      </>
  );
};

export default NowPlayingMoviesPage;
