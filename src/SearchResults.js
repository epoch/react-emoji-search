import React from 'react'
import EmojiItem from './EmojiItem'

function SearchResults({ results, maxNumOfResults, onLoadMore, onSelect, onHover }) {
  return <ul className="search-results" style={{ display: 'flex' }}>
    {results.slice(0, maxNumOfResults).map(result => 
      <EmojiItem 
        key={result.no} 
        data={result}
        onSelect={onSelect}
        onHover={onHover} 
      />
    )}
    {maxNumOfResults < results.length && <button onClick={onLoadMore}>show more</button>}
  </ul>    
}

export default SearchResults