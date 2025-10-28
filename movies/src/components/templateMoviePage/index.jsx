import React, { useState, useEffect } from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'

const TemplateMoviePage = ({ movie, children }) => {
  // Fetch movie images (posters) from TMDB
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['images', { id: movie.id }],
    queryFn: getMovieImages,
  });
  // Fetch movie images (posters) from TMDB
  if (isPending) {
    return <Spinner />;
  }
  // Show error message if API call fails
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  // Extract poster images
  const images = data.posters


  return (
    <>
      {/* Movie page header with title, tagline, and navigation */}
      <MovieHeader movie={movie} />
      {/* Main layout: Left side posters, right side details/children */}
      <Grid container spacing={5} style={{ padding: "15px" }}>
        {/* Left column: poster images */}
        <Grid size={{ xs: 3 }}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>
            <ImageList
              sx={{
                height: "100vh",
              }}
              cols={1}
            >
              {images.map((image) => (
                <ImageListItem key={image.file_path} cols={1}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt={image.poster_path}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>
        {/* Right column: main content/details passed as children */}
        <Grid size={{ xs: 9 }}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;
