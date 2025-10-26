import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const HomePage = (props) => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError  } = useQuery({
    queryKey: ['discover',page],
    queryFn: () => getMovies(page),
  })
  
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 

  return (
    <>
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
    <Stack spacing={2} sx={{ alignItems: 'center', mt: 2 }}>
  <Pagination
  // https://mui.com/material-ui/react-pagination/
  // https://www.themoviedb.org/talk/655749887f054018d6f30816
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

  export default HomePage;
  
