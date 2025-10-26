import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromMustWatch = ({ movie }) => {
  const { removeFromMustWatch } = useContext(MoviesContext);

  const handleRemove = (e) => {
    e.preventDefault();
    removeFromMustWatch(movie);
  };

  return (
    <IconButton aria-label="remove from must watch" onClick={handleRemove}>
      <DeleteIcon fontSize="large"
        sx={{
          color: '#032541',      
          '&:hover': { color: '#01b4e4' },
        }}
      />
    </IconButton>
  );
};

export default RemoveFromMustWatch;
