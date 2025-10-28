import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";


function MovieListPageTemplate({ movies, title, action }) {
  // State for filtering movies
  const [nameFilter, setNameFilter] = useState("");
  // "0" means All genres
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);
  const [languageFilter, setLanguageFilter] = useState("");
  const [releaseDateFilter, setReleaseDateFilter] = useState("");
  const [voteFilter, setVoteFilter] = useState(0);

  // Filter movies based on user-selected criteria
  let displayedMovies = movies
    // Filter by movie title
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    // Filter by genre if a specific genre is selected
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    // Filter by language
    .filter((m) => {
      return languageFilter ? m.original_language === languageFilter : true;
    })
    // Filter by exact release date
    .filter((m) => {
      return releaseDateFilter ? m.release_date === releaseDateFilter : true;
    })
    // Filter by minimum vote average
    .filter((m) => {
      return m.vote_average >= voteFilter;
    });


  // Update filter state based on type of input
  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "language") setLanguageFilter(value);
    else if (type === "releaseDate") setReleaseDateFilter(value);
    else if (type === "vote") setVoteFilter(Number(value));
  };

  return (
    <Grid container>
      {/* Page header with title */}
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        {/* Sidebar: Filter card for user inputs */}
        <Grid
          key="find"
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            languageFilter={languageFilter}
            releaseDateFilter={releaseDateFilter}
            voteFilter={voteFilter}
          />
        </Grid>
        {/* Main content: List of filtered movies */}
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
