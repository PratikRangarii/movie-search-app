import React from 'react';
import './MovieCard.css'; // New CSS file for component

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="movie-card">
      <div className="poster-container">
        <img src={posterUrl} alt={movie.title} loading="lazy" />
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="rating">
          <span>⭐</span>
          <span>{movie.vote_average.toFixed(1)}/10</span>
        </div>
        <p className="release-date">
          {movie.release_date ? formatDate(movie.release_date) : 'Date unavailable'}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;