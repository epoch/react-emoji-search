import React from 'react'
import { pluralize } from './utils'

export default function SearchBar({ searchResults, allResults, onSearch }) {
  return <section className="search-bar">
    <input
      className="search-input" 
      autoFocus={true} 
      onChange={onSearch} 
      type="text" 
      placeholder="type to search" 
    />
    <section className="result-stats">
      {`${searchResults.length} / ${allResults.length} ${pluralize('result', 'results', searchResults.length)}`}
    </section>
  </section>
}