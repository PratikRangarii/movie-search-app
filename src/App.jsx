import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import MovieCard from './components/MovieCard';
import SearchBox from './components/SearchBox';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(
        searchQuery
          ? `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${searchQuery}`
          : `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      setMovies(response.data.results);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim() === '' || searchQuery.length > 2) {
        fetchMovies();
      }
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="App">
      <h1>Movie Search App</h1>
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {loading && <div className="loading">Loading movies...</div>}
      {error && <div className="error">Error: {error}</div>}
      
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          !loading && <div>No movies found</div>
        )}
      </div>
    </div>
  );
}

export default App;