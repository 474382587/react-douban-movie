import React from 'react'
import { Link } from "react-router-dom";
const MovieItem = (props) => {
  return (
    <Link to='/'>
      <div className="image-wrapper">
        <img src="" alt="" className="movie-image"/>
      </div>
      <p className="movie-title"></p>
      <div className="movie-rating">
        <Stars rating="item.rating.average" itemid="item.id" />
      </div>
    </Link>
  )
}
export default MovieItem