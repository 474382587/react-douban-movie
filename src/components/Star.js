import React from 'react'

class Star extends React.Component {
  calculatePosition() {
    let coefficient = 10 - Math.round(Math.floor(this.props.rating * 2) / 2)
    let star = document.getElementById(this.props.id)
    if (star) {
      star.style.backgroundPosition = '0px -' + coefficient * 11 + 'px'
    }
  }
  componentDidMount() {
    console.log('Mount')
    this.calculatePosition()
  }
  render() {
    return (
      <div className="star" id={this.props.id}>
      </div>
    )
  }
}

export default Star