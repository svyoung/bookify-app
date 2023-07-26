import React, { useState, useEffect } from 'react';

type Props = {
    query: string,
    setText: React.Dispatch<React.SetStateAction<string>>
}

const SearchField = ({ query, setText }: Props) => {
  return (
    <div>
      <input
        className="search_book"
        type="query" 
        name="search" 
        value={query} 
        onChange={(e) => setText(e.currentTarget.value)}
        placeholder="search book (ex. fantasy, Mark Twain, Dune)"
      />
    </div>
  )
}

export default SearchField;
