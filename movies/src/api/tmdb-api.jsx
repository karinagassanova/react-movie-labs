export const getMovies = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

  
export const getMovie = (args) => {
  console.log(args)
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

  
  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        import.meta.env.VITE_TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  
  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };


  export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getUpcomingMovies = async (page = 1) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  };

  // https://developer.themoviedb.org/reference/configuration-languages
  export const getLanguages = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/configuration/languages?api_key=${import.meta.env.VITE_TMDB_KEY}`
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || "Failed to fetch languages");
    }
    return await response.json();
  };

  // https://developer.themoviedb.org/reference/movie-popular-list
  export const getPopularMovies = async (page = 1) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || "Failed to fetch popular movies");
    }
    return await response.json();
  };
  
  // https://developer.themoviedb.org/reference/movie-top-rated-list
  export const getTopRatedMovies = async (page = 1) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || "Failed to fetch top rated movies");
    }
    return await response.json();
  };
  
  // https://developer.themoviedb.org/reference/movie-now-playing-list
  export const getNowPlayingMovies = async (page = 1) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || "Failed to fetch now playing movies");
    }
    return await response.json();
  };

  
  // https://developer.themoviedb.org/reference/movie-recommendations
  export const getMovieRecommendations = async (movieId) => {
   const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.status_message || "Failed to fetch movie recommendations");
  }
  return await response.json();
};

// https://developer.themoviedb.org/reference/movie-credits
export const getMovieCredits = async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.status_message || "Failed to fetch movie cast");
  }
  return response.json();
};

// 
export const getActorDetails = async (actorId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${actorId}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch actor details");
  }
  return response.json();
};

export const getActorMovies = async (actorId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch actor movies");
  }
  return response.json();
};

