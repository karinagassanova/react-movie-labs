import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import React, { useState, useEffect } from "react";
import { getGenres, getLanguages } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";

// Shared FormControl styling for reusable layout
const formControl =
{
  margin: 1,
  minWidth: "90%",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: 1
};

export default function FilterMoviesCard(props) {

  // Fetch genre list from TMDB using React Query
  const { data: genresData, error: genresError, isLoading: genresLoading } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  // Fetch spoken languages from TMDB using React Query
  const { data: languagesData, error: langError, isLoading: langLoading } = useQuery({
    queryKey: ['languages'],
    queryFn: getLanguages,
  });

  // Handle loading & error states
  if (genresLoading || langLoading) return <Spinner />;
  if (genresError) return <h1>{genresError.message}</h1>;
  if (langError) return <h1>{langError.message}</h1>;

  // Ensure "All" option exists in genre dropdown
  const genres = genresData.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  // Ensure a default "All" option exists for languages
  const languages = languagesData || [];
  if (languages.length === 0 || languages[0].english_name !== "All") {
    languages.unshift({ iso_639_1: "", english_name: "All" });
  }

  // Ensure a default "All" option exists for languages
  const handleChange = (e, type, value) => {
    e.preventDefault();
    // Pass updated filter to parent component
    props.onUserInput(type, value);
  };

  // Specific handlers for each filter input
  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleLanguageChange = (e) => {
    handleChange(e, "language", e.target.value);
  };

  const handleReleaseDateChange = (e) => {
    handleChange(e, "releaseDate", e.target.value);
  };

  return (
    // Main filter container card with gradient styling
    <Card
      sx={{
        background: 'linear-gradient(90deg, #01b4e4 0%, #90cea1 100%)',
        color: '#fff',
      }}
      variant="outlined">
      <CardContent>
        {/* Title + Search Icon */}
        <Typography variant="h5" component="h1" sx={{ color: '#001f3f' }}>
          <SearchIcon fontSize="large" sx={{ color: '#fff', mr: 1 }} />
          Filter the movies.
        </Typography>
        {/* Movie Title Search */}
        <TextField
          sx={{ ...formControl }}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />

        {/* Genre Dropdown */}
        <FormControl sx={{ ...formControl }}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >

            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {/* Language Dropdown */}
        <FormControl sx={{ ...formControl }}>
          <InputLabel id="language-label">Language</InputLabel>
          <Select
            labelId="language-label"
            id="language-select"
            value={props.languageFilter || ""}
            onChange={handleLanguageChange}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.iso_639_1} value={lang.iso_639_1}>
                {lang.english_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Release Date Picker */}
        <TextField
          sx={{ ...formControl }}
          id="release-date"
          label="Release Date"
          type="date"
          variant="filled"
          value={props.releaseDateFilter}
          onChange={(e) => props.onUserInput("releaseDate", e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {/* Reset Release Date Button */}
        <Button
          sx={{
            ...formControl,
            mt: 1,
            color: 'fff',
            backgroundColor: '#032541',
            '&:hover': { backgroundColor: '#055075' },
            fontWeight: '400'
          }}
          variant="contained"
          onClick={() => props.onUserInput("releaseDate", "")}
        >Clear Release Date</Button>

        {/* Minimum Rating Slider */}
        <FormControl sx={{ ...formControl, p: 1 }}>
          {/* Slider label styled box */}
          <Typography id="vote-slider" gutterBottom
            sx={{
              color: '#001f3f',
              fontWeight: '900',
              mb: 1,
              backgroundColor: '#ffffff',
              borderRadius: 1,
              px: 1,
              py: 0.5,
              display: 'inline-block',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              fontSize: '1.1rem',
            }}
          >
            ⭐ Minimum Rating: {props.voteFilter}
          </Typography>

          {/* Rating range slider 0–10 */}
          <Slider
            // https://mui.com/material-ui/react-slider/
            // https://mui.com/material-ui/customization/how-to-customize/
            value={props.voteFilter || 0}
            onChange={(e, newValue) => props.onUserInput("vote", newValue)}
            valueLabelDisplay="auto"
            step={0.5}
            marks
            min={0}
            max={10}
            sx={{
              color: '#a02adb',
              '& .MuiSlider-thumb': {
                backgroundColor: '#fff',
                border: '2px solid #001f3f',
              },
              '& .MuiSlider-valueLabel': {
                backgroundColor: '#001f3f',
                color: '#fff',
                fontWeight: 'bold',
              },
              '& .MuiSlider-rail': {
                opacity: 0.3,
                backgroundColor: '#001f3f',
              },
              '& .MuiSlider-track': {
                background: 'linear-gradient(90deg, #01b4e4 0%, #90cea1 100%)',
              },
              '& .MuiSlider-mark': {
                backgroundColor: '#001f3f',
              },
            }}
          />
        </FormControl>
      </CardContent>
    </Card>
  );
}