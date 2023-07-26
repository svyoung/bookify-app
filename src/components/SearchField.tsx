import React, { useState, useEffect } from 'react';

type Props = {
    query: string,
    setQuery: React.Dispatch<React.SetStateAction<string>>
}

const SearchField = ({ query, setQuery }: Props) => {
  return (
    <div>
      <input
        className="search_book"
        type="query" 
        name="search" 
        value={query} 
        onChange={(e) => setQuery(e.currentTarget.value)}
        placeholder="search book (ex. fantasy, Mark Twain, Dune)"
      />
    </div>
  )
}

export default SearchField;
