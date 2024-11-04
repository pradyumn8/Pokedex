import React from 'react'
import './Pokemon.css'
import { Link } from 'react-router-dom'

function Pokemon({id,name,image}) {
  return (
    <Link to={`/pokemon/${id}`} className='pokemon'>
        <div className='pokemon-name'>{name}</div>
        <div><img className='pokemon-img' src={image} alt={`${name}`} /></div>
    </Link>
  );
}

export default Pokemon