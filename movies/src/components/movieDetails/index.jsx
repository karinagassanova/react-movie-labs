import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getMovieRecommendations } from "../../api/tmdb-api";
import { getMovieCredits } from "../../api/tmdb-api";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};

const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
  // Controls visibility of review drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Load recommended movies
  const { data: recommendations, isLoading: isRecLoading } = useQuery({
    queryKey: ["movieRecommendations", movie.id],
    queryFn: () => getMovieRecommendations(movie.id),
  });
  // Load cast information
  const { data: credits, isLoading: isCreditsLoading, error: creditsError } = useQuery({
    queryKey: ["movieCredits", movie.id],
    queryFn: () => getMovieCredits(movie.id),
  });



  return (
    <>
      {/* Movie overview */}
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>
      {/* List of genres */}
      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Genres" sx={{
            backgroundColor: "#032541",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#054161" },
            ...chip
          }}
          />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>
      {/* Show production countries only if available */}
      {movie.production_countries && movie.production_countries.length > 0 && (
        <Paper component="ul" sx={{ ...root }}>
          <li>
            <Chip
              label="Production Countries"
              sx={{
                backgroundColor: "#032541",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#054161" },
                ...chip
              }}
            />
          </li>
          {movie.production_countries.map((country) => (
            <li key={country.name}>
              <Chip label={country.name} sx={{ ...chip }} />
            </li>
          ))}
        </Paper>
      )}
      {/* Runtime, revenue, rating info */}
      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`$${movie.revenue?.toLocaleString() || "N/A"}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      {/* Cast linked to actor pages */}
      {!isCreditsLoading && credits?.cast?.length > 0 && (
        <>
          <Typography variant="h5" component="h3" sx={{ mt: 3, color: "#032541" }}>
            Cast
          </Typography>
          <Paper component="ul" sx={{ ...root, mt: 1 }}>
            {credits.cast.slice(0, 10).map((actor) => (
              <li key={actor.id}>
                <Link to={`/actors/${actor.id}`} style={{ textDecoration: "none" }}>
                  <Chip
                    label={actor.name}
                    clickable
                    sx={{
                      backgroundColor: "#032541",
                      color: "#fff",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#054161" },
                      ...chip
                    }}
                  />
                </Link>
              </li>
            ))}
          </Paper>
        </>
      )}
      {/* Recommended movies */}
      {!isRecLoading && recommendations?.results?.length > 0 && (
        <>
          <Typography variant="h5" component="h3" sx={{ mt: 3, color: "#032541" }}>
            Recommended Movies
          </Typography>

          <Paper
            component="ul"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              listStyle: "none",
              padding: 1.5,
              margin: 0,
              gap: 1,
              backgroundColor: "#fff",
              borderRadius: 2,
            }}
          >
            {recommendations.results.map((rec) => (
              <li key={rec.id} style={{ margin: 0.5 }}>
                <Link to={`/movies/${rec.id}`} style={{ textDecoration: "none" }}>
                  <Chip
                    label={rec.title}
                    clickable
                    sx={{
                      backgroundColor: "#032541",
                      color: "#fff",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#054161",
                      },
                    }}
                  />
                </Link>
              </li>
            ))}
          </Paper>
        </>
      )}
      {/* Floating button opens review drawer */}
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "1em",
          right: "1em",
          backgroundColor: "#00bfff",
          color: "#fff",
          "&:hover": {
            backgroundColor: "grey",
          },

        }}
      >
        <NavigationIcon sx={{ mr: 1 }} />
        Reviews
      </Fab>
      {/* Review drawer */}
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MovieReviews movie={movie} />
      </Drawer>
    </>


  );
};


export default MovieDetails;
