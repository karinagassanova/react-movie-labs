import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    context.addToFavorites(movie);
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
    <FavoriteIcon 
        fontSize="large" 
        sx={{ 
          color: '#032541',           
          '&:hover': {
            color: '#01b4e4',       
          },
        }} 
      />
    </IconButton>
  );
};

export default AddToFavoritesIcon;
