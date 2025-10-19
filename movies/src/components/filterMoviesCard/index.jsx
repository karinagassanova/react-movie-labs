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
import React, {useState, useEffect}  from "react";
import { getGenres, getLanguages } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';

const formControl = 
  {
    margin: 1,
    minWidth: "90%",
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterMoviesCard(props) {

  const { data: genresData, error: genresError, isLoading: genresLoading } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });
  
  const { data: languagesData, error: langError, isLoading: langLoading } = useQuery({
    queryKey: ['languages'],
    queryFn: getLanguages,
  });
  
  if (genresLoading || langLoading) return <Spinner />;
  if (genresError) return <h1>{genresError.message}</h1>;
  if (langError) return <h1>{langError.message}</h1>;
  
  const genres = genresData.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const languages = languagesData || [];
  if (languages.length === 0 || languages[0].english_name !== "All") {
  languages.unshift({ iso_639_1: "", english_name: "All" });
}

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); 
  };

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
    <Card 
      sx={{
        backgroundColor: "rgb(204, 204, 0)"
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
        <TextField
      sx={{...formControl}}
      id="filled-search"
      label="Search field"
      type="search"
      variant="filled"
      value={props.titleFilter}
      onChange={handleTextChange}
    />

        <FormControl sx={{...formControl}}>
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

<TextField
  sx={{ ...formControl }}
  id="release-date"
  label="Release Date"
  type="date"
  variant="filled"
  value={props.releaseDateFilter}
  onChange={handleReleaseDateChange}
  InputLabelProps={{
    shrink: true,
  }}
/>

      </CardContent>
      <CardMedia
        sx={{ height: 300 }}
        image={img}
        title="Filter"
      />
    </Card>
  );
}