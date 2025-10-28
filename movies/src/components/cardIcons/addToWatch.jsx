import React, { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { MoviesContext } from "../../contexts/moviesContext";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";

const AddToWatchIcon = ({ movie }) => {
   // Access the function from context that adds a movie to the "Must Watch" list
  const { addToMustWatch } = useContext(MoviesContext);
  // State to manage which element triggers the popover
  const [anchorEl, setAnchorEl] = useState(null);
   // When user clicks button, add movie and show popover
  const handleClick = (event) => {
    addToMustWatch(movie);
    setAnchorEl(event.currentTarget);
  };

   // Close popover by clearing anchor
  const handleClose = () => {
    setAnchorEl(null);
  };
// Popover Reference https://mui.com/material-ui/react-popover/
 // Popover open/close state and identifier
  const open = Boolean(anchorEl);
  const id = open ? "watch-popover" : undefined;

  return (
    <>
    <IconButton aria-label="add to watch list" onClick={handleClick}>
      <PlaylistAddIcon fontSize="large"
        sx={{
          color: '#032541',      
          '&:hover': { color: '#01b4e4' }, 
        }}
      />
    </IconButton>
  <Popover
  id={id}
  open={open}
  anchorEl={anchorEl}
  onClose={handleClose}
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "left",
  }}
  transformOrigin={{
    vertical: "top",
    horizontal: "left",
  }}
>
  <Typography sx={{ p: 2 }}>
    Added "{movie.title}" to Must Watch list!
  </Typography>
</Popover>
</>
);
};

export default AddToWatchIcon;
