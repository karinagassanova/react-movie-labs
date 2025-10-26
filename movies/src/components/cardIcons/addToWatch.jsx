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
      <PlaylistAddIcon fontSize="large"
        sx={{
          color: '#032541',      
          '&:hover': { color: '#01b4e4' }, 
        }}
      />
    </IconButton>
  );
};

export default AddToWatchIcon;
