import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import MustWatchMoviesPage from "./pages/mustWatchMoviesPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import ActorDetailsPage from "./pages/actorDetailsPage";

// Configure react-query client with caching and refetching defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* BrowserRouter wraps the app for routing */}
      <BrowserRouter>
        {/* SiteHeader is always visible */}
        <SiteHeader />
        {/* Provide global movie context (favorites, reviews, must watch) */}
        <MoviesContextProvider>
          {/* Define application routes */}
          <Routes>
            {/* Favorite movies page */}
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            {/* Movie review page */}
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            {/* Movie details page */}
            <Route path="/movies/:id" element={<MoviePage />} />
            {/* Home / Discover page */}
            <Route path="/" element={<HomePage />} />
            {/* Add a new movie review */}
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            {/* Upcoming movies */}
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            {/* Must Watch movies */}
            <Route path="/movies/mustwatch" element={<MustWatchMoviesPage />} />
            {/* Popular movies */}
            <Route path="/movies/popular" element={<PopularMoviesPage />} />
            {/* Top Rated movies */}
            <Route path="/movies/top-rated" element={<TopRatedMoviesPage />} />
            {/* Now Playing movies */}
            <Route path="/movies/now-playing" element={<NowPlayingMoviesPage />} />
            {/* Actor details page */}
            <Route path="/actors/:actorId" element={<ActorDetailsPage />} />
            {/* Catch-all: redirect to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      {/* Catch-all: redirect to home */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
// Render the App to the DOM
const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);
