import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import MovieCard from './components/MovieCard';
import SearchBox from './components/SearchBox';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch movies from TMDB API
  const fetchMovies = async () => {
    try {
      const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your key
      const response = await axios.get(
        searchQuery
          ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
          : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [searchQuery]);

  return (
    <div className="App">
      <h1>Movie Search App</h1>
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;