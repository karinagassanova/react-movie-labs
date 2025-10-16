import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { MoviesContext } from "../../contexts/moviesContext";

const AddToWatchIcon = ({ movie }) => {
  const { addToMustWatch } = useContext(MoviesContext);

  const handleClick = () => {
    addToMustWatch(movie);
  };

  return (
    <IconButton aria-label="add to watch list" onClick={handleClick}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToWatchIcon;
