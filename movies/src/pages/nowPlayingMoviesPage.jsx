import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNowPlayingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const NowPlayingMoviesPage = () => {
    // Track current page for TMDB pagination
    const [page, setPage] = useState(1);
    // Fetch "Now Playing" movies for the current page
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ["nowPlayingMovies", page],
        queryFn: () => getNowPlayingMovies(page),
    });
    // Show spinner while loading
    if (isLoading) return <Spinner />;
    // Display error if API call fails
    if (isError) return <h1>{error.message}</h1>;
    // Extract movie results from API response
    const movies = data.results;

    return (
        <>
            {/* Movie list with "Add to Favorites" action */}
            <PageTemplate
                title="Now Playing"
                movies={movies}
                action={(movie) => <AddToFavoritesIcon movie={movie} />}
            />
            {/* Pagination component to navigate pages */}
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
