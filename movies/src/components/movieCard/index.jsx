import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router";
import Avatar from '@mui/material/Avatar';
import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";

export default function MovieCard({ movie, action }) {
  // Access favorites list + function to add a movie to favorites
  const { favorites, addToFavorites } = useContext(MoviesContext);

  // Mark movie object as 'favorite' if its ID exists in the favorites list
  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  // Handler to add movie to favorites context state
  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  return (
    // Main card layout with vertical flex arrangement
    <Card sx={{ height: 700, display: "flex", flexDirection: "column" }}>
      {/* Card Header — shows favorite badge if movie is favorited */}
      <CardHeader
        avatar={
          movie.favorite ? (
            <Avatar
              sx={{
                background: 'linear-gradient(45deg, #01b4e4 0%, #90cea1 100%)',
              }}
            >
              {/* White favorite icon inside colored avatar */}
              <FavoriteIcon sx={{ color: '#fff' }} />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p" noWrap sx={{ fontSize: "1.1rem", fontWeight: 600 }}>
            {movie.title}
          </Typography>
        }
      />
      {/* Poster image — use TMDB path if available, otherwise fallback placeholder */}
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      {/* Release date + rating inline layout */}
      <CardContent>
        <Grid container>
          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      {/* Action buttons row */}
      <CardActions disableSpacing>
        {/* Dynamic action passed in from parent (e.g., add/remove buttons) */}
        {action(movie)}
        {/* Link to detailed movie page */}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium"
            sx={{
              color: '#032541',
              borderColor: '#032541',
              '&:hover': {
                backgroundColor: '#032541',
                color: '#fff',
              },
            }}
          >
            More Info ...
          </Button>
        </Link>

      </CardActions>

    </Card>
  );
}
