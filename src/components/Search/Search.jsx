import React from 'react'
import './Search.css'

function Search() {
  return (
    <div className='search-wrapper'>
          <input
          id='pokemon-name-search'
    type='text'
    placeholder='Pokemon name....'
    />
    </div>
  )
}

export default Search