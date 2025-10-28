import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getActorDetails, getActorMovies } from "../api/tmdb-api";
import { Typography, Paper, Chip } from "@mui/material";

// Styling for the list container
const root = {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};

// Styling for individual chips
const chip = { margin: 0.5 };

const ActorDetailsPage = () => {
    // Extract actorId from URL parameters
    const { actorId } = useParams();

    // Fetch actor details using react-query
    const { data: actor, isLoading: actorLoading } = useQuery({
        queryKey: ["actor", actorId],
        queryFn: () => getActorDetails(actorId),
    });

    // Fetch movies that the actor appears in
    const { data: movies, isLoading: moviesLoading } = useQuery({
        queryKey: ["actorMovies", actorId],
        queryFn: () => getActorMovies(actorId),
    });

    // Show loading message while actor details are fetched
    if (actorLoading) return <Typography>Loading actor...</Typography>;
    // Show message if no actor data found
    if (!actor) return <Typography>No actor found</Typography>;

    return (
        <>
            {/* Actor name */}
            <Typography variant="h4">{actor.name}</Typography>
            {/* Actor biography */}
            <Typography variant="body1" sx={{ mb: 2 }}>
                {actor.biography || "No biography available."}
            </Typography>
            {/* Display movies the actor appears in */}
            {!moviesLoading && movies?.cast?.length > 0 && (
                <>
                    <Typography variant="h5" sx={{ mt: 3, color: "#032541" }}>
                        Appears In
                    </Typography>
                    {/* Movie list as chips */}
                    <Paper component="ul" sx={root}>
                        {movies.cast.slice(0, 10).map((movie) => (
                            <li key={movie.id}>
                                <Link
                                    to={`/movies/${movie.id}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Chip
                                        label={movie.title}
                                        clickable
                                        sx={{
                                            backgroundColor: "#032541",
                                            color: "#fff",
                                            fontWeight: "bold",
                                            "&:hover": { backgroundColor: "#054161" },
                                            ...chip,
                                        }}
                                    />
                                </Link>
                            </li>
                        ))}
                    </Paper>
                </>
            )}
        </>
    );
};

export default ActorDetailsPage;
