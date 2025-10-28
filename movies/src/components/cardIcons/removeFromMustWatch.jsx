import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromMustWatch = ({ movie }) => {
  // Access the function from context that removes a movie from the "Must Watch" list
  const { removeFromMustWatch } = useContext(MoviesContext);
  // Handle removing movie when the delete icon is clicked
  const handleRemove = (e) => {
    // Prevent default click behavior if inside a link or form
    e.preventDefault();
    removeFromMustWatch(movie); // Remove movie using context action
  };

  return (
    // Button that triggers removal from Must Watch list
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
