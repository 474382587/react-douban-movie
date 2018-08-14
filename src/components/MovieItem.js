import React from 'react'
import { Link } from 'react-router-dom'
import Star from './Star'

const MovieItem = props => {
  return (
    <Link to={`/detail/${props.item.id}`} className="movie-item">
      <div className="image-wrapper">
        <img src={props.item.images.large} alt="" className="movie-image" />
      </div>
      <p className="movie-title">{props.item.title}</p>
      <div className="movie-rating">
        <Star
          className="movie-rating"
          rating={props.item.rating.average}
          id={props.item.id}
        /> 
        {props.item.rating.average}
      </div>
    </Link>
  )
}
export default MovieItem
// <Stars rating="item.rating.average" itemid="item.id" />
