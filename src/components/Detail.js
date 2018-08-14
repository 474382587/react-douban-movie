import React from 'react'

const Detail = (props) => {
  return (
    <div>This is Detail {props.match.params.id}</div>
  )
}

export default Detail