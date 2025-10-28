import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToWatchIcon from "../components/cardIcons/addToWatch";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const UpcomingMoviesPage = () => {
  // State to track the current page for TMDB API pagination
  const [page, setPage] = useState(1);
  // Fetch upcoming movies for the current page
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["upcomingMovies", page],
    queryFn: () => getUpcomingMovies(page),
  });
  // Show spinner while loading
  if (isLoading) {
    return <Spinner />;
  }
  // Display error message if API call fails
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  // Extract movie results from API response
  const movies = data.results;

  return (
    <>
      {/* Display movies using PageTemplate with "Add to Watch" action */}
      <PageTemplate
        title="Upcoming Movies"
        movies={movies}
        action={(movie) => <AddToWatchIcon movie={movie} />}
      />
      {/* Pagination component for navigating pages */}
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

export default UpcomingMoviesPage;
