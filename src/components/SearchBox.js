import React from 'react';

const SearchBox = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;